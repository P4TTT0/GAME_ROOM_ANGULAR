import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, Router } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AboutmeComponent } from './components/aboutme/aboutme.component';
import { RegisterComponent } from './components/register/register.component';
import { ErrorComponent } from './components/error/error.component';
import { ToastrModule } from 'ngx-toastr';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth, Auth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AuthService } from './services/auth.service';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { LoadingComponent } from './components/loading/loading.component';
import { ChatComponent } from './components/chat/chat.component';
import { AhorcadoComponent } from './components/ahorcado/ahorcado.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MayorMenorComponent } from './components/mayor-menor/mayor-menor.component';
import { PreguntadosComponent } from './components/preguntados/preguntados.component';
import { MatematicasComponent } from './components/matematicas/matematicas.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { TablaPuntajeComponent } from './components/tabla-puntaje/tabla-puntaje.component';
import { VistaEncuestasComponent } from './components/vista-encuestas/vista-encuestas.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AboutmeComponent,
    RegisterComponent,
    ErrorComponent,
    LoadingComponent,
    ChatComponent,
    AhorcadoComponent,
    MayorMenorComponent,
    PreguntadosComponent,
    MatematicasComponent,
    EncuestaComponent,
    TablaPuntajeComponent,
    VistaEncuestasComponent
  ],
  imports: [
    BrowserModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [ AuthService, {provide: FIREBASE_OPTIONS, useValue: environment.firebase}],
  bootstrap: [AppComponent]
})
export class AppModule { }
