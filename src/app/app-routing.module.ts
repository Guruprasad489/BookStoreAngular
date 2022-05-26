import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './Components/cart/cart.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { GetallbooksComponent } from './Components/getallbooks/getallbooks.component';
import { LoginComponent } from './Components/login/login.component';
import { OrdersuccessComponent } from './Components/ordersuccess/ordersuccess.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { QuickviewComponent } from './Components/quickview/quickview.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { SignupComponent } from './Components/signup/signup.component';

const routes: Routes = [
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path:'reset-password/:token',component:ResetPasswordComponent},
  {path: 'home', component: DashboardComponent,
   children:[{path: 'books', component: GetallbooksComponent},
   {path:'', redirectTo:'/home/books', pathMatch:'full' },
   {path: 'quickview/:bookId', component: QuickviewComponent},
   {path: 'cart', component: CartComponent},
   {path: 'order-success', component: OrdersuccessComponent}
  ]
},
  
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
