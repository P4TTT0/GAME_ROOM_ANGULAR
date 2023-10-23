import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { LoadingService } from 'src/app/services/loading.service';
import { PreguntadoApiService } from 'src/app/services/preguntado-api.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent implements OnInit {

  public preguntas : any;
  public repuestas : string[] = [];
  public puntos : number = 0;
  public pregunta : any;
  public isGameStarted : boolean = false;
  public preguntaDecodificada : string = "";
  public respuestasClases : string[] = ['button-question', 'button-question', 'button-question', 'button-question'];

  constructor(private preguntados : PreguntadoApiService, private data : DataService, private auth : AuthService, private toast : ToastrService, private loading : LoadingService) {}

  async ngOnInit()
  {
    (await this.preguntados.GetQuestions()).subscribe(x => {
      this.preguntas = x;
    })
  }

  public async comenzar()
  {
    this.loading.show();
    (await this.preguntados.GetQuestions()).subscribe(x => {
      this.preguntas = x;
    })

    await new Promise<void>(resolve => {
      setTimeout(() => {
        this.loading.hide();
        resolve();
      }, 2000);
    });

    this.siguientePregunta();
    this.isGameStarted = true;
  }

  public async siguientePregunta()
  {
    this.repuestas = [];
    this.pregunta = this.preguntas.results[this.puntos];
    this.preguntaDecodificada = this.decodeHtmlEntities(this.pregunta.question) || '';
    this.repuestas.push(this.pregunta.correct_answer);
    this.pregunta.incorrect_answers.forEach((x: string) => {
      this.repuestas.push(x);
    });

    this.repuestas = this.shuffleArray(this.repuestas);
  }

  public async verificarRespuesta(respuesta : string, index : number)
  {
    if (respuesta == this.pregunta.correct_answer) 
    {
      this.toast.success('+1 Punto', '¡CORRECTO!', { timeOut: 2000, closeButton: true,
        progressBar: true, tapToDismiss: true});

      this.respuestasClases[index] = 'correcto';

      await new Promise<void>(resolve => {
        setTimeout(() => {

          resolve();
        }, 2000);
      });

      this.puntos++;
      this.siguientePregunta();
      this.respuestasClases = ['button-question', 'button-question', 'button-question', 'button-question'];
    } 
    else 
    {
      this.respuestasClases[index] = 'incorrecto';
      this.toast.error('¡Hiciste ' + this.puntos + ' puntos!', '¡INCORRECTO!', { timeOut: 3000, closeButton: true,
        progressBar: true, tapToDismiss: true});

      this.data.savePoints(this.auth.userName, 'PREGUNTADOS', this.puntos);

      await new Promise<void>(resolve => {
        setTimeout(() => {

          resolve();
        }, 2000);
      });

      this.isGameStarted = false;
      this.respuestasClases = ['button-question', 'button-question', 'button-question', 'button-question'];
    }
  }

  public shuffleArray(array: string[]) 
  {
    for (let i = array.length - 1; i > 0; i--) 
    {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  public decodeHtmlEntities(html: string) 
  {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.documentElement.textContent;
  }
  
}


