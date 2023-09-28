import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/clases/usuario';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AutheticationService } from 'src/app/services/authetication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit
{
  public regForm : FormGroup;
  private validationMessages = 
  {
    email: 
    [
      { type: 'required', message: 'El correo electrónico es requerido.' },
      { type: 'email', message: 'El correo electrónico debe ser válido.' }
    ],
    password: 
    [
      { type: 'required', message: 'La contraseña es requerida.' }
    ]
  };

  constructor(private router: Router, private toastr: ToastrService, private auth : AutheticationService, private formBuilder : FormBuilder) 
  {
    this.regForm = this.formBuilder.group({
      email: ['',
        [
          Validators.required,
          Validators.email
        ]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void 
  {
  }

  public async OnRegisterClick()
  {
    // const loading = await this.loadingCtrl.create();
    // await loading.present();

    if (!this.regForm) 
    {
      return false;
    }

    if (this.regForm?.valid) 
    {
      const user = await this.auth.register(this.regForm.value.email, this.regForm.value.password).catch((error) => {
        console.log(error);
        // loading.dismiss();
      })

      if (user) 
      {
        // loading.dismiss();
        this.router.navigate(["/home"]);
      }
      else 
      {
        alert("¡Credenciales incorrectas!");
        //this.showMessage("¡Credenciales incorrectas!");
      }
    }
    else 
    {
      Object.keys(this.regForm?.controls).forEach(field => {
        const control = this.regForm?.get(field);

        if (control instanceof FormControl && !control.valid) 
        {
          const messages = this.validationMessages[field as keyof typeof this.validationMessages];
          let errorMessage = '';
          if (messages) 
          {
            for (const key in control.errors) {
              errorMessage += messages.find(x => x.type === key)?.message + " ";

            }
          }
          alert(errorMessage);
          // this.showMessage(errorMessage);
          // loading.dismiss();
        }
      })
    }

    return true;
  }

  get errorControl()
  {
    return this.regForm?.controls;
  }
}
