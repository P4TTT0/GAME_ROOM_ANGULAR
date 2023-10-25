import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-vista-encuestas',
  templateUrl: './vista-encuestas.component.html',
  styleUrls: ['./vista-encuestas.component.css']
})
export class VistaEncuestasComponent implements OnInit{

  public encuestas : any;
  constructor(private data : DataService) {}

  async ngOnInit()
  {
    this.encuestas = await this.data.getPolls();
  }
}
