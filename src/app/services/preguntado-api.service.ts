import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreguntadoApiService {

  public preguntadoApiUrl : string = 'https://opentdb.com/api.php?amount=50&category=9';

  constructor(private http : HttpClient) { }

  public async GetQuestions()
  {
    return await this.http.get(this.preguntadoApiUrl);
  }
}
