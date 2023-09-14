import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/clases/usuario';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent 
{
  mail = "";
  name = "";
  password = "";

  constructor(private router: Router, private toastr: ToastrService) 
  {

  }

  onRegisterClick()
  {
    if(this.verifyCredentials())
    {
      this.toastr.success('¡Registro exitoso!', 'Éxito');
      let user : Usuario = new Usuario(this.name, this.password, this.mail);
      user.setLocalStorage();
      this.router.navigateByUrl('/home');
    }
    else
    {
      this.toastr.success('¡Complete los campos requeridos!', 'Error');
    }
  }

  verifyCredentials() : boolean
  {
    if(this.mail.length < 1)
    {
      return false;
    }
    if(this.password.length < 1)
    {
      return false;
    }
    if(this.name.length < 1)
    {
      return false;
    }

    return true;
  }
}
