import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-tabla-puntaje',
  templateUrl: './tabla-puntaje.component.html',
  styleUrls: ['./tabla-puntaje.component.css']
})
export class TablaPuntajeComponent implements OnInit{

  public ahorcadoList : any;
  public preguntadosList : any;
  public mayorMenorList : any;
  public matematicasList : any;

  constructor(private data : DataService) {}

  async ngOnInit()
  {
    this.ahorcadoList = await this.data.getPoints("AHORCADO");
    this.preguntadosList = await this.data.getPoints("PREGUNTADOS");
    this.mayorMenorList = await this.data.getPoints("MAYOR-MENOR");
    this.matematicasList = await this.data.getPoints("MATEMATICAS");
  }
  
}
