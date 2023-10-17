import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent 
{
  public regForm : FormGroup;

  constructor(private router: Router, private toastr: ToastrService, private formBuilder : FormBuilder, private auth : AuthService, private loading : LoadingService) 
  {
    this.regForm = this.formBuilder.group({
      email: ['',
        [
          Validators.required,
          Validators.email
        ]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      user: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]]
    })
  }

  async onRegisterClick()
  {
    this.loading.show();
    if(this.regForm.controls['email'].valid && this.regForm.controls['password'].valid  && this.regForm.controls['user'].valid)
    {
      try
      {
        const register = await this.auth.register(this.regForm.controls['email'].value, this.regForm.controls['password'].value, this.regForm.controls['user'].value);
        if(!register)
        {
          this.toastr.error('¡Nombre de usuario en uso!', 'Error');
          this.loading.hide();
          return;
        }
      }
      catch(error)
      {
        this.toastr.error('¡Email en uso!', 'Error');
        this.loading.hide();
        return;
      }

      this.toastr.success('¡Registro exitoso!', 'Éxito');
      this.router.navigateByUrl('/home');
    }
    else
    {
      this.toastr.error('¡No se puedo realizar el registro!', 'Error');
    }
    this.loading.hide();
  }

}
