import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { Route, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit
{
  public regForm : FormGroup;

  constructor(private router: Router, private formBuilder : FormBuilder, private toast : ToastrService, private auth : AuthService, private data : DataService, private loading : LoadingService) {
    this.regForm = this.formBuilder.group({
      email: ['',[ Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {}
  

  public async OnLoginClick()
  {
    this.loading.show();
    if(this.regForm.controls['email'].valid && this.regForm.controls['password'].valid)
    {
      try{

        const credential = await this.auth.logIn(this.regForm.controls['email'].value, this.regForm.controls['password'].value);
        const userUid = credential?.user?.uid || '';
        const userName = await this.data.getUserNameByUID(userUid);
        this.toast.success('¡Log In completado!', 'Éxito');
        this.router.navigateByUrl('/home');
        console.log(this.auth.userName);
      }
      catch(error)
      {
        this.toast.error('¡Credenciales incorrectas!', 'Error');
      }
    }
    else
    {
      this.toast.error('¡Errores en los campos!', 'Error');
    }
    this.loading.hide();
  }

  public OnFillClick(email : string, password : string)
  {
    this.regForm.controls['email'].setValue(email);
    this.regForm.controls['password'].setValue(password);
  }

}
