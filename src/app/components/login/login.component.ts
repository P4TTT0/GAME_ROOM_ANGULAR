import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit
{
  ngOnInit(): void {
    
  }
  title = 'Perez Cardenal Patricio';
  
  mail = "";
  password = "";
  darSaludo()
  {
    alert("¡Hola mundo, " + this.title + "!");
  }

  iniciarSesion()
  {
    alert("Su mail es " + this.mail + "\n" + 
          "Su contraseña " + this.password);
  }
}
