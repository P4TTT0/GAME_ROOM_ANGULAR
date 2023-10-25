import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent {

  palabrasSecretas: string[] = 'PELOTA;COMPUTADORA;PARLANTE;TERMOTANQUE;SOMBRILLA;SALCHICHA;HERRAMIENTA;AUDIFONOS;TECLADO;ORNITORRINCO;SEMILLA;DRAGON;PESCADO;MILANESA;TOSTADA;ARGENTINA;PALINDROMO'.split(';'); 
  palabraOculta: string = '';
  intentosRestantes = 6; 
  letrasUsadas: string[] = []; 
  letras: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''); 
  palabraSecreta: string = "";
  puntos: number = 0;
  public isGameStarted : boolean = false; 

  constructor(private toast : ToastrService, private data : DataService, private auth : AuthService) { }

  ngOnInit() {
    this.iniciarJuego();
  }

  iniciarJuego() 
  {
    this.palabraSecreta =  this.palabrasSecretas[Math.floor(Math.random() * (this.palabrasSecretas.length + 1))];
    this.palabraOculta = '_ '.repeat(this.palabraSecreta.length);
    this.isGameStarted = true;
  }

  adivinar(letra: string) {
    this.letrasUsadas.push(letra);

    if (this.palabraSecreta.indexOf(letra) === -1) {
      this.intentosRestantes--;
    } 
    else
    {
      this.actualizarPalabraOculta(letra);
    }

    if (this.intentosRestantes === 0) 
    {
      this.data.savePoints(this.auth.userName, 'AHORCADO', this.puntos);
      this.puntos = 0;
      this.toast.error('¡Has perdido! La palabra secreta era: ' + this.palabraSecreta);
      this.reiniciarAcumuladores();
      this.isGameStarted = false;
    } 
    else 
    {
      if (this.palabraOculta.indexOf('_') === -1) 
      {
        this.puntos++;
        this.toast.success('¡Has ganado! La palabra secreta era: ' + this.palabraSecreta);
        this.reiniciarAcumuladores();
        this.iniciarJuego();
      }
    }
  }

  private reiniciarAcumuladores()
  {
    this.letrasUsadas = [];
    this.intentosRestantes = 6;
  }

  actualizarPalabraOculta(letra: string) 
  {
    for (let i = 0; i < this.palabraSecreta.length; i++) 
    {
      if (this.palabraSecreta[i] === letra) 
      {
        this.palabraOculta = this.palabraOculta.substring(0, i * 2) + letra + this.palabraOculta.substring(i * 2 + 1);
      }
    }
  }

}
