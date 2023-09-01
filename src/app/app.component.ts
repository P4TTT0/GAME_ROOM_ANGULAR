import { Component } from '@angular/core';

@Component({
  selector: 'app-root', //Tag -> Template en index.html
  templateUrl: './app.component.html', // Linkeo de archivo HTML
  styleUrls: ['./app.component.css'] //Estilo
})
export class AppComponent {
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
