import { Component, OnInit } from '@angular/core';
import {TicketDetails} from '../models/TicketDetails.model';
import {Group} from '../models/Group.model';
import {Brand} from '../models/Brand.model';
import {Organization} from '../models/Organization.model';
import {User} from '../models/User.model';
import { ActivatedRoute } from '@angular/router';
import {ZendeskApiService} from '../services/zendesk-api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {

  ticket:TicketDetails=null;
  ticketId:number;
  ticketBrand:Brand=null;
  ticketGroup:Group=null;
  ticketOrganisation:Organization=null;
  ticketRequester:User=null;
  ticketSubmitter:User=null;
  errorInService:boolean=false;
  ticketsCount:number;
  retrieveMessage:boolean=false;
  isPrev:boolean=false;
  isNext:boolean=false;
  constructor(private _activatedRoute:ActivatedRoute,private _zendeskApiService:ZendeskApiService,private _router:Router) {
    window.scrollTo(0, 0);
   }
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this._activatedRoute.paramMap.subscribe((params)=> {
                                  this.ticketId=+params.get('ticketid');
                                  this._zendeskApiService.getTicketById(this.ticketId).subscribe(
                                  (response:any)=>{
                                    this.ticket=response.ticket;
                                  
                                    this._zendeskApiService.getBrand(this.ticket.brand_id).subscribe((res)=>
                                      {
                                        this.ticketBrand=res.brand;
                                        
                                      },
                                      (error:any)=>{
                                                this.errorInService=true;
                                                
                                      });
                                      this._zendeskApiService.getGroup(this.ticket.group_id).subscribe((res)=>
                                        {
                                          this.ticketGroup=res.group;
                                          
                                        },
                                        (error:any)=>{
                                                  this.errorInService=true;
                                                  
                                        });
                                        this._zendeskApiService.getOrganisation(this.ticket.organization_id).subscribe((res)=>
                                          {
                                            this.ticketOrganisation=res.organization;
                                            
                                            if(this.ticket.organization_id==null)
                                            {
                                              this.ticketOrganisation.name="Zendesk Welcome Ticket-Please ignore";
                                            }
                                            
                                          },
                                          (error:any)=>{
                                                    this.errorInService=true;
                                                    
                                          });
                                          this._zendeskApiService.getRequester(this.ticket.requester_id).subscribe((res)=>
                                            {
                                              this.ticketRequester=res.user;
                                              
                                            },
                                            (error:any)=>{
                                                      this.errorInService=true;
                                                      
                                            });
                                            this._zendeskApiService.getSubmitter(this.ticket.submitter_id).subscribe((res)=>
                                              {
                                                this.ticketSubmitter=res.user;
                                                
                                              },
                                              (error:any)=>{
                                                        this.errorInService=true;
                                                        
                                              });
                                              if(this._zendeskApiService.isFirst)
                                              {
                                                this._zendeskApiService.isFirst=false;
                                              }
                                              else{
                                                this.retrieveMessage=true;
                                                setTimeout(()=>{ 
                                                  this.retrieveMessage = false;
                                             }, 3000);
                                              }
                                  },
                                  (error:any)=>{
                                            this.errorInService=true;
                                            
                                  },
                                  );
                                }
                              );

                              

  }


  reload()
  {
    
    this.errorInService=false;
    this._router.navigateByUrl('/RefreshComponent', { skipLocationChange: false }).then(() => {
      this._router.navigate(['/ticketdetails',this.ticketId]);
    });
  }
  getNextTicket()
  {
    this._zendeskApiService.isNext=true;
    this._zendeskApiService.isPrev=false;
    window.scrollTo(0, 0);
    this._zendeskApiService.getTicketsCount().subscribe((response)=>
      {
        this.ticketsCount=response.count.value;
        if(this.ticket.id<this.ticketsCount)
        {
          this.ticketId++;
          
          this._router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
            this._router.navigate(['/ticketdetails',this.ticketId]);
        });
        }
        else
        {
          this.ticketId=1;
          this._router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
            this._router.navigate(['/ticketdetails',this.ticketId]);
          });
        }
      },
      (error)=>
      {
        this.ticketRequester=null;
        this.errorInService=true;
      }
    )
  }
  getPreviousTicket()
  {
    this._zendeskApiService.isPrev=true;
    this._zendeskApiService.isNext=false;
    this.isNext=false;
    window.scrollTo(0, 0);
    this._zendeskApiService.getTicketsCount().subscribe((response)=>
      {
      
        this.ticketsCount=response.count.value;
        if(this.ticket.id>1)
        {
          this.ticketId--;
          this._router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
            this._router.navigate(['/ticketdetails',this.ticketId]);
          });
        }
        else
        {
          this.ticketId=this.ticketsCount;
          this._router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
            this._router.navigate(['/ticketdetails',this.ticketId]);
          });
          
        }
      },
      (error)=>
      {
        this.ticketRequester=null;
        this.errorInService=true;
      }
    )
  }


}
