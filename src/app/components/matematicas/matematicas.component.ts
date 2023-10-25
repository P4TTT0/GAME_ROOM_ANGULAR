import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-matematicas',
  templateUrl: './matematicas.component.html',
  styleUrls: ['./matematicas.component.css']
})
export class MatematicasComponent 
{
  public currentOperation: string = "";
  public userAnswer: number = 0;
  public puntos: number = 0;
  public timeLeft: number = 30;
  public operaciones: string[]  = ['+', '-', '*', '/'];
  public numeros: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  public numerosSeleccionables: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
  public level : number = 4;
  public operationValue : number = 0;
  public isGameStarted : boolean = false;
  public userResponse : string = "";
  public timer : any;

  constructor(private data : DataService, private auth : AuthService, private toast : ToastrService) {}

  public comenzar()
  {
    this.isGameStarted = true;
    this.startTimer();
    this.generateOperation();
  }

  generateOperation() 
  {
    this.operationValue = 0;
    this.currentOperation = "";

    for (let i = 1; i < this.level; i++) 
    {
      if(i % 2 != 0)
      {
        this.currentOperation += this.numeros[Math.floor(Math.random() * this.numeros.length)] + ' ';
      }
      else
      {
        this.currentOperation += this.operaciones[Math.floor(Math.random() * this.operaciones.length)] + ' ';
      }
    }

    this.operationValue  = this.getOperationResult(this.currentOperation);

    if(!Number.isFinite(this.operationValue) || Number.isNaN(this.operationValue) || this.operationValue < 0)
    {
      this.generateOperation();
      return;
    }
  }

  getOperationResult(operacion : string)
  {
    try 
    {
      return eval(operacion);
    } 
    catch (error) 
    {
      return "Error en la expresión";
    }
  }

  startTimer() {
    this.timeLeft = 30;
    this.timer = setInterval(() => 
    {
      if (this.timeLeft > 0) 
      {
        this.timeLeft--;
      } 
      else
      {
        clearInterval(this.timer);
        this.onCheckAnswer();
      }
    }, 1000);
  }

  public async winEvent()
  {
    this.puntos++;
    this.userResponse = "";
    this.toast.success('+1 Punto', '¡CORRECTO!', { timeOut: 2000, closeButton: true,
      progressBar: true, tapToDismiss: true});
    this.timeLeft = 30;
    if(this.puntos % 5 == 0)
    {
      this.level += 2;
    }
    clearInterval(this.timer);
    this.startTimer();
    this.generateOperation();
  }

  public loseEvent()
  {
    this.data.savePoints(this.auth.userName, 'MATEMATICAS', this.puntos);
    this.isGameStarted = false;
    this.userResponse = "";
    let operationValueString = this.operationValue.toString();
    if(operationValueString.includes('.'))
    {
      operationValueString = this.operationValue.toString().substring(0, 3);
    }
    this.toast.error('¡Hiciste ' + this.puntos + ' puntos! La respuesta correcta era: ' + operationValueString, '¡INCORRECTO!', { timeOut: 3000, closeButton: true,
      progressBar: true, tapToDismiss: true});
    clearInterval(this.timer);
    this.puntos = 0;
  }

  public seleccionar(numero : string)
  {
    this.userResponse += numero;
  }

  public onBorrarClick()
  {
    this.userResponse = this.userResponse.substring(0, this.userResponse.length - 1);
  }

  public onCheckAnswer() 
  {
    if (this.userResponse != null) 
    {
      let operationValueString = this.operationValue.toString();
      if(operationValueString.includes('.'))
      {
        operationValueString = this.operationValue.toString().substring(0, 3);
      }
      if(this.userResponse == operationValueString)
      {
        this.winEvent();
      }
      else
      {
        this.loseEvent();
      }
    }
    else
    {
      this.loseEvent();  
    }
  }
}
