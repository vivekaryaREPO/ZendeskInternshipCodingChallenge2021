import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import {RouterModule,Routes} from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {HttpClient} from '@angular/common/http';
import {ZendeskApiService} from '../app/services/zendesk-api.service';


const appRoutes:Routes=[
  {path:'ticketlist',component:TicketListComponent},
  {path:'ticketdetails/:ticketid',component:TicketDetailsComponent},
  {path:'',redirectTo:'/ticketlist',pathMatch:'full'},
  {path:'**',component:PageNotFoundComponent}
  ];

@NgModule({
  declarations: [
    AppComponent,
    TicketListComponent,
    TicketDetailsComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    RouterModule.forRoot(appRoutes,{useHash:true}),
    HttpClientModule,
    FormsModule
  ],
  providers: [HttpClient,ZendeskApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
