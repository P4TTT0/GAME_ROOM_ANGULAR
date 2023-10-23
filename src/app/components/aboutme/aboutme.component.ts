import { Component, OnInit } from '@angular/core';
import { GithubapiService } from 'src/app/services/githubapi.service';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.css']
})
export class AboutmeComponent implements OnInit{
  public profile : any;

  constructor(private git : GithubapiService) {}

  async ngOnInit() {
    this.git.getGithubProfile().subscribe(x =>
      {
        this.profile = x;
      });
  }
}
