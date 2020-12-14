import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';



@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers:[AuthGuard],
  exports:[
    HeaderComponent,
    FooterComponent
  ]
})
export class CoreModule { }
