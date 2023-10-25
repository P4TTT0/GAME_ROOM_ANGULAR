import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  public regForm : FormGroup;
  public juegoFavorito : any = "Preguntados";
  public valorSeleccionado : any = 0;
  public observaciones : string = "";
  public encuestaEnviada : boolean = false;

  constructor(private router: Router, private formBuilder : FormBuilder, private toast : ToastrService, private auth : AuthService, private data : DataService, private loading : LoadingService) {
    this.regForm = this.formBuilder.group({
      Nombre: ['',[ Validators.required]],
      Apellido: ['', [Validators.required]],
      Edad: ['', [Validators.required ,Validators.min(18), Validators.max(99)]],
      NumeroTelefono: ['', [Validators.required,  Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.maxLength(10)]],
    })
  }

  async ngOnInit()
  {
    this.loading.show();
    await new Promise<void>(resolve => {
      setTimeout(() => {
        resolve();
        this.loading.hide();
      }, 2000);
    });
    let isPollAnswered = await this.data.isPollAnswered(this.auth.userName);
    console.log(isPollAnswered);
    if(isPollAnswered)
    {
      this.encuestaEnviada = true;
    }
  }

  public OnSubmitClick()
  {
    if(this.regForm.valid)
    {
      try
      {
        this.data.savePoll(this.auth.userName, this.regForm.controls['Nombre'].value, this.regForm.controls['Apellido'].value, this.regForm.controls['Edad'].value, this.regForm.controls['NumeroTelefono'].value, this.observaciones, this.juegoFavorito, this.valorSeleccionado);
        this.toast.success('¡Encuesta enviada con exito!', "Exito", { timeOut: 3000, closeButton: true,
          progressBar: true, tapToDismiss: true});
          this.encuestaEnviada = true;
      }
      catch(error)
      {
        this.toast.error('¡No hemos podido enviar la encuesta, intentalo más tarde!', "Error", { timeOut: 3000, closeButton: true,
          progressBar: true, tapToDismiss: true});
      }
    }
    else
    {
      this.toast.error('¡Tienes errores en los campos!', "Error", { timeOut: 3000, closeButton: true,
        progressBar: true, tapToDismiss: true});
    }
  }
  
}
