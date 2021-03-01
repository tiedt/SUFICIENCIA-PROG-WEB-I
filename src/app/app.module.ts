import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgxMaskModule } from 'ngx-mask'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TituloComponent } from './_shared/titulo/titulo.component';
import { NgxCurrencyModule } from "ngx-currency";
import { BsDropdownModule, TooltipModule, ModalModule, BsDatepickerModule, TabsModule } from 'ngx-bootstrap';
import { EmployeesComponent } from './employee/employee.component';
import { EmployeesService } from './_services/employee.service';
import { StorageService } from './_services/storage.service';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
   declarations: [
      AppComponent,
      DashboardComponent,
      NavComponent,
      TituloComponent,
      EmployeesComponent,
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      BsDatepickerModule.forRoot(),
      BsDropdownModule.forRoot(),
      TooltipModule.forRoot(),
      ModalModule.forRoot(),
      ToastrModule.forRoot(),
      TabsModule.forRoot(),
      NgxMaskModule.forRoot(),
      BrowserAnimationsModule,
      ReactiveFormsModule,
      NgxCurrencyModule,
      NgxPaginationModule,
   ],
   providers: [HttpClientModule,EmployeesService,StorageService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
