import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GithubapiService {

  private baseUrl = 'https://api.github.com/users/p4ttt0';

  constructor(private http: HttpClient) { }

  getGithubProfile() 
  {
    return this.http.get(this.baseUrl);
  }

}
