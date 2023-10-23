import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeckApiService {

  constructor(private http: HttpClient) { }

  public async GetNewDeck()
  {
    return this.http.get('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
  }

  public async GetOneCard(deckId : string)
  {
    return this.http.get('https://www.deckofcardsapi.com/api/deck/' + deckId + '/draw/?count=1');
  }

  public async GetTwoCard(deckId : string)
  {
    return this.http.get('https://www.deckofcardsapi.com/api/deck/' + deckId + '/draw/?count=2');
  }


}
