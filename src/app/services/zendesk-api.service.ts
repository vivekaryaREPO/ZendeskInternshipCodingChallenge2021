import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders,HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ZendeskApiService {
  email:string="aryanss.orisiss@gmail.com";
  password:string="test@1";
  isFirst:boolean;
  isNext:boolean;
  isPrev:boolean;
  constructor(private _httpClient:HttpClient) { }


  getAllTicket():Observable<any>
  {
    var headers = new HttpHeaders();
    headers = headers.append("Authorization", "Basic "+btoa(this.email+':'+this.password));
    headers = headers.append("Content-Type", "application/json");
   
    let params=new HttpParams().set("cursor",'MTU3NjYxMzUzOS4wfHw0NTF8');
    return this._httpClient.get<any>('/api/v2/incremental/tickets/cursor.json',{headers:headers,params:params}); 
  }

  getTicketById(id:number):Observable<any>
  {
    var url:string='api/v2/tickets/'+id+'.json';
    var headers = new HttpHeaders();
    headers = headers.append("Authorization", "Basic "+btoa(this.email+':'+this.password));
    headers = headers.append("Content-Type", "application/json");
    
    return this._httpClient.get<any>(url,{headers:headers}); 
  }

  getBrand(brandId:number):Observable<any>
  {
    var brandUrl:string='api/v2/brands/'+brandId+'.json';
    var headers = new HttpHeaders();
    headers = headers.append("Authorization", "Basic "+btoa(this.email+':'+this.password));
    headers = headers.append("Content-Type", "application/json");
     
    return this._httpClient.get<any>(brandUrl,{headers:headers}); 
  }
  getGroup(groupId:number):Observable<any>
  {
    var groupUrl:string='api/v2/groups/'+groupId+'.json';
    var headers = new HttpHeaders();
    headers = headers.append("Authorization", "Basic "+btoa(this.email+':'+this.password));
    headers = headers.append("Content-Type", "application/json");
    
    return this._httpClient.get<any>(groupUrl,{headers:headers});
  }
  getOrganisation(orgId:number):Observable<any>
  {
    if(orgId==null)
    {
      orgId=370551347754;
    }
    var organisationUrl:string='api/v2/organizations/'+orgId+'.json';
    var headers = new HttpHeaders();
    headers = headers.append("Authorization", "Basic "+btoa(this.email+':'+this.password));
    headers = headers.append("Content-Type", "application/json");
    
    return this._httpClient.get<any>(organisationUrl,{headers:headers});;
  }
    getRequester(requesterId:number):Observable<any>
  {
    var requesterUrl:string='api/v2/users/'+requesterId+'.json';
    var headers = new HttpHeaders();
    headers = headers.append("Authorization", "Basic "+btoa(this.email+':'+this.password));
    headers = headers.append("Content-Type", "application/json");
   
    return this._httpClient.get<any>(requesterUrl,{headers:headers});;
  }
    getSubmitter(submitterId:number):Observable<any>
  {
    var submitterUrl:string='api/v2/users/'+submitterId+'.json';
    var headers = new HttpHeaders();
    headers = headers.append("Authorization", "Basic "+btoa(this.email+':'+this.password));
    headers = headers.append("Content-Type", "application/json");
   
    return this._httpClient.get<any>(submitterUrl,{headers:headers});;
  }

  getTicketsCount():Observable<any>
  {
    var submitterUrl:string='api/v2/tickets/count.json';
    var headers = new HttpHeaders();
    headers = headers.append("Authorization", "Basic "+btoa(this.email+':'+this.password));
    headers = headers.append("Content-Type", "application/json");
    
    return this._httpClient.get<any>(submitterUrl,{headers:headers});;
  }


}
