import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ErrorComponent } from './components/error/error.component';
import { AboutmeComponent } from './components/aboutme/aboutme.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
{path: "home", component: HomeComponent},
{path: "", redirectTo: "home", pathMatch: "full"},
{path: "login", component: LoginComponent},
{path: "register", component: RegisterComponent},
{path: "about-me", component: AboutmeComponent},
{path: "**", component: ErrorComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes), 
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
