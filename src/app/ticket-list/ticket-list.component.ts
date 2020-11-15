import { Component, OnInit } from '@angular/core';
import {Ticket} from '../models/TicketClass.model';
import {ZendeskApiService} from '../services/zendesk-api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  maxSize:number=20;
  showTicketFilter:boolean=false;
  page:number=1;
  totalRecords:number;
  id:number=10;
  ticketList:Ticket[]=null;
  filteredTicketList:Ticket[]=null;
  ticket:Ticket;
  idNotFound:boolean=false;
  statusNotFound=false;
  searchedId:number;
  status:string="all";
  showStatusFilter=false;
  errorWithService:boolean=false;
  total:number;
  new:number;
  open:number;
  closed:number;
  noOfPagesInPagination:number=0;

  constructor(private _zendeskApiService:ZendeskApiService,private _router:Router) { }

  ngOnInit(): void {
    window.scrollTo(0, 0)
    this._zendeskApiService.getAllTicket().subscribe((res)=>{

                                                            this.ticketList=res.tickets;
                                                            this.totalRecords=this.ticketList.length;                        
                                                            this.filteredTicketList=res.tickets.sort((a,b)=>(a.id>b.id)?1:-1);
                                                            this.errorWithService=false;
                                                            this.total=this.ticketList.length;
                                                            this.new= this.ticketList.filter(ticket=>ticket.status==='new').length;
                                                            this.noOfPagesInPagination=Math.ceil(this.total/25);
                                                            this.open= this.ticketList.filter(ticket=>ticket.status==='open').length;
                                                            this.closed= this.ticketList.filter(ticket=>ticket.status==='closed').length;
                                                          },
                                                        (error)=>{
                                                          this.errorWithService=true;
                                                        }  );
  

                    }

  filterTicketList()
  {
    this.idNotFound=false;
    this.statusNotFound=false;
    if(this.searchedId && this.status)
    {
      if(this.status=='all')
      {
        this.filteredTicketList=this.ticketList;
      }
      else
      {
        this.filteredTicketList=this.ticketList.filter(ticket=>
          ticket.status.toLowerCase().indexOf(this.status.toLowerCase())!==-1);
      }

        if(this.filteredTicketList.length>0)
        {
          this.statusNotFound=false;
          var tempTicketList:Ticket[]=this.filteredTicketList;
          this.filteredTicketList=tempTicketList.filter(ticket=>
            ticket.id==this.searchedId);
            if(this.filteredTicketList.length>0)
            {
              this.idNotFound=false;
              this.totalRecords=this.filteredTicketList.length;
              this.page=1;

              
            }
            else
            {
              this.statusNotFound=true;
              this.idNotFound=true;
              this.filteredTicketList=[];             
              this.totalRecords=0;
              this.page=1;

            }
            
        }
        else
        {
            this.statusNotFound=true;
            this.filteredTicketList=this.ticketList.filter(ticket=>
            this.id==this.searchedId);
            if(this.filteredTicketList.length>0)
            {
              this.idNotFound=false;
              this.totalRecords=this.filteredTicketList.length;
              this.page=1;

            }
            else
            {
              this.filteredTicketList=[];
              this.totalRecords=this.filteredTicketList.length;
              this.page=1;
              this.idNotFound=true;

            }

        }
    }
    else if(this.searchedId)
    {
      this.filteredTicketList=this.ticketList.filter(ticket=>
        this.id==this.searchedId);
        if(this.filteredTicketList.length>0)
        {
          this.idNotFound=false;
          this.totalRecords=this.filteredTicketList.length;
          this.page=1;
        }
        else
        {
          this.filteredTicketList=[];
          this.totalRecords=this.filteredTicketList.length;
          this.idNotFound=true;
          this.page=1;

        }
    }

    else if(this.status)
    {
      if(this.status=='all')
      {
          this.filteredTicketList=this.ticketList;
      }
      else
      {
        this.filteredTicketList=this.ticketList.filter(ticket=>
          ticket.status.toLowerCase().indexOf(this.status.toLowerCase())!==-1);
      }

      if(this.filteredTicketList.length>0)
      {
          this.statusNotFound=false;
          this.totalRecords=this.filteredTicketList.length;
          this.page=1;
      }
      
      else
      {
          this.filteredTicketList=[];
          this.totalRecords=this.filteredTicketList.length;
          this.page=1;
          this.statusNotFound=true;
      }
    }

    else{
      this.filteredTicketList=this.ticketList;
      this.totalRecords=this.filteredTicketList.length;
      this.page=1;
    }
   
  }
  

  firstLoad(){
    this._zendeskApiService.isFirst=true;
  }

  trackByTicketId(index:number,currentTicket:any):string{
    return currentTicket.id;
  }

  reload()
  {
    this.errorWithService=false;
    this._router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this._router.navigate(['/ticketlist']);
    });
  }

}
