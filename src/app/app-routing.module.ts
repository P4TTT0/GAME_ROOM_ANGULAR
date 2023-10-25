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
import { MatematicasComponent } from './components/matematicas/matematicas.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { TablaPuntajeComponent } from './components/tabla-puntaje/tabla-puntaje.component';
import { VistaEncuestasComponent } from './components/vista-encuestas/vista-encuestas.component';
import { adminGuardGuard } from './guards/admin-guard.guard';

const routes: Routes = [
{path: "home", component: HomeComponent},
{path: "", redirectTo: "home", pathMatch: "full"},
{path: "login", component: LoginComponent},
{path: "register", component: RegisterComponent},
{path: "about-me", component: AboutmeComponent},
{path: "chat", component: ChatComponent, canActivate: [loginGuard]},
{path: "ahorcado", component: AhorcadoComponent, canActivate: [loginGuard]},
{path: "mayor-menor", component: MayorMenorComponent, canActivate: [loginGuard]},
{path: "preguntados", component: PreguntadosComponent, canActivate: [loginGuard]},
{path: "matematicas", component: MatematicasComponent, canActivate: [loginGuard]},
{path: "tabla-puntos", component: TablaPuntajeComponent},
{path: "encuesta", component: EncuestaComponent},
{path: "verEncuestas", component: VistaEncuestasComponent, canActivate: [adminGuardGuard]},
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
