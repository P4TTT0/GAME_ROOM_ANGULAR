import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit
{

  constructor(private router: Router) {}

  ngOnInit(): void {}
  
  mail = "";
  password = "";

  public OnLoginClick()
  {
    let users = Usuario.getLocalStorage();

    users.forEach(user => 
    {
      if (this.VerifyCredentials(user))
      {
        alert("¡Usuario logueado con exito!");
        this.router.navigateByUrl('/home');
        close();
      }
    });
    alert("¡Credenciales incorrectas!");
  }

  private VerifyCredentials(user : Usuario) : boolean
  {
    if(user.mail != this.mail && user.name != this.mail)
    {
      return false;
    }
    if(user.password != this.password)
    {
      return false;
    }

    return true;
  }

}
