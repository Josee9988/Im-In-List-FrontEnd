import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**
 * Components
 */
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ListComponent } from './components/list/list.component';
import { ContactComponent } from './components/contact/contact.component';


const routes: Routes = [{
  path: 'home', component: HomeComponent
},
{
  path: 'login', component: LoginComponent
},
{
  path: 'register', component: RegisterComponent
},
{
  path: 'profile', component: ProfileComponent
},
{
  path: 'pricing', component: PricingComponent
},
{
  path: 'about', component: AboutUsComponent
},
{
  path: 'newList', component: ListComponent
},
{
  path: 'contact', component: ContactComponent
},
// fallback route
{ path: '**', component: NotFoundComponent },
{ path: '', pathMatch: 'full', redirectTo: 'home' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents: Array<any> = [NavbarComponent, NotFoundComponent,
  LoginComponent, RegisterComponent, ProfileComponent,
  HomeComponent, PricingComponent, AboutUsComponent,
  ListComponent, ContactComponent];
