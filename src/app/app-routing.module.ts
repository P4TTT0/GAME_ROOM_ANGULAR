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
import { loginGuard } from './guards/login.guard';
import { LoadingComponent } from './components/loading/loading.component';
import { ChatComponent } from './components/chat/chat.component';
import { AhorcadoComponent } from './components/ahorcado/ahorcado.component';
import { HttpClient } from '@angular/common/http';
import { MayorMenorComponent } from './components/mayor-menor/mayor-menor.component';
import { PreguntadosComponent } from './components/preguntados/preguntados.component';

const routes: Routes = [
{path: "home", component: HomeComponent, canActivate: [loginGuard]},
{path: "", redirectTo: "home", pathMatch: "full"},
{path: "login", component: LoginComponent},
{path: "register", component: RegisterComponent},
{path: "about-me", component: AboutmeComponent},
{path: "chat", component: ChatComponent, canActivate: [loginGuard]},
{path: "ahorcado", component: AhorcadoComponent, canActivate: [loginGuard]},
{path: "mayor-menor", component: MayorMenorComponent, canActivate: [loginGuard]},
{path: "preguntados", component: PreguntadosComponent, canActivate: [loginGuard]},
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
