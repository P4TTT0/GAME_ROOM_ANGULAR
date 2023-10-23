import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { DeckApiService } from 'src/app/services/deck-api.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['./mayor-menor.component.css']
})
export class MayorMenorComponent implements OnInit
{
  public deck : any;
  public leftCard: any;
  public rightCard: any;
  public isGameStarted : boolean = false; 
  public leftCardValue : number = 0;
  public rightCardValue : number = 0;
  public puntos : number = 0;
  public isWinEvent : boolean = false;

  constructor(private decks : DeckApiService, private toast : ToastrService, private loading : LoadingService, private data : DataService, private auth : AuthService) {}

  async ngOnInit()
  {
    (await this.decks.GetNewDeck()).subscribe(x => {
      this.deck = x;
    });
  }

  public async comenzar()
  {
    this.loading.show();
    (await this.decks.GetTwoCard(this.deck.deck_id)).subscribe(x => {
      let cards : any = x;
      this.rightCard = cards.cards[0].image;
      this.leftCard = cards.cards[1].image;
      this.rightCardValue = this.getCardValue(cards.cards[0]);
      this.leftCardValue = this.getCardValue(cards.cards[1]);
    });

    await new Promise<void>(resolve => {
      setTimeout(() => {
        this.loading.hide();
        resolve();
      }, 2000);
    });

    this.isGameStarted = true;
  }

  public async onMenorClick()
  {
    if (this.leftCardValue <= this.rightCardValue)
    {
      await this.winEvent();
    }
    else
    {
      this.loseEvent();
    }
  }

  public async onMayorClick()
  {
    if (this.leftCardValue >= this.rightCardValue)
    {
      await this.winEvent();
    }
    else
    {
      this.loseEvent();
    }
  }

  public async winEvent()
  {
    this.puntos++;
    this.toast.success('+1 Punto', '¡CORRECTO!', { timeOut: 2000, closeButton: true,
      progressBar: true, tapToDismiss: true});
    this.isWinEvent = true;

    await new Promise<void>(resolve => {
      setTimeout(() => {
        this.isWinEvent = false;
        resolve();
      }, 1000);
    });
    
    this.rightCard = this.leftCard;
    this.rightCardValue = this.leftCardValue;
    (await this.decks.GetTwoCard(this.deck.deck_id)).subscribe(x => {
      let card : any = x;
      this.leftCard = card.cards[0].image;
      this.leftCardValue = this.getCardValue(card.cards[0]);
    });
  }

  public async loseEvent()
  {
    this.data.savePoints(this.auth.userName, 'MAYOR-MENOR', this.puntos);
    this.toast.error('¡Hiciste ' + this.puntos + ' puntos!', '¡INCORRECTO!', { timeOut: 3000, closeButton: true,
      progressBar: true, tapToDismiss: true});

    (await this.decks.GetNewDeck()).subscribe(x => {
      this.deck = x;
    });

    this.isGameStarted = false;
    this.puntos = 0;
  }

  public getCardValue(card : any)
  {
    let cardValue : number = 0;

    if(Number.isInteger(parseInt(card.value)))
    {
      cardValue = card.value;
    }
    else
    {
      switch(card.value)
      {
        case 'JACK':
          cardValue = 11;
          break;
        case 'QUEEN':
          cardValue = 12;
          break;
        case 'KING':
          cardValue = 13;
          break;
        case 'ACE':
          cardValue = 14;
            break; 
      }
    }

    return cardValue;
  }
}
