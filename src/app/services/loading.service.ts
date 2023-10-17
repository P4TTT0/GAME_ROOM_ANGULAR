import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }

  public isLoading = false;

  show() {
    this.isLoading = true;
  }

  hide() {
    this.isLoading = false;
  }
}
