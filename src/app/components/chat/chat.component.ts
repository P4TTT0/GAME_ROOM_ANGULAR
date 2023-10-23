import { Component, OnInit } from '@angular/core';
import { addDoc, collection, Firestore, getDoc, getDocs, updateDoc, collectionData, doc, query, where, orderBy, setDoc } from
'@angular/fire/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
  chatForm : FormGroup;
  messages : any;
  constructor(public auth : AuthService, private formBuilder : FormBuilder, private data : DataService, private firestore : Firestore)
  {
    this.chatForm = this.formBuilder.group({
      message: ['',[ Validators.required]],
    })
  }

  async ngOnInit() 
  {
    this.data.subscribeToMessages().subscribe((data) =>
    {
      this.messages = data;
    })
  }

  public async sendMessage()
  {
    if(this.chatForm.controls['message'].valid)
    {
      this.data.sendMessage(this.chatForm.controls['message'].value, this.auth.userName);
    }
    this.chatForm.controls['message'].setValue('');
  }
}
