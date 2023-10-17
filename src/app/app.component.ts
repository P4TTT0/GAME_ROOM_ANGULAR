import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root', //Tag -> Template en index.html
  templateUrl: './app.component.html', // Linkeo de archivo HTML
  styleUrls: ['./app.component.css'] //Estilo
})
export class AppComponent {
  constructor(public auth : AuthService, public loading : LoadingService)
  {
    console.log( this.auth.logueado);
  }
  public async OnLogOutClick()
  {
    this.loading.show();
    setTimeout(async () => {
      this.loading.hide();
    }, 1000);
    this.auth.logOut();
  }
}
