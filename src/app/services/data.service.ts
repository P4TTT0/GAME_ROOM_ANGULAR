import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore, getDoc, getDocs, updateDoc, collectionData, doc, query, where, orderBy, setDoc, onSnapshot } from
'@angular/fire/firestore';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  constructor(private firestore : Firestore) { }

  public subscribeToMessages(): Observable<any[]> {
    const messageCollection = collection(this.firestore, 'Message');
    const q = query(messageCollection, orderBy('Timestamp', 'asc'));

    return new Observable<any[]>((observer) => {
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => doc.data());
        observer.next(messages);
      });

      return () => unsubscribe();
    });
  }

  public async getPoints(game : string)
  {
    const pollCollection = collection(this.firestore, 'Games');
    const q = query(pollCollection, where('Game', '==', game), orderBy('MaxPoints', 'desc'));
    const querySnapshot = await getDocs(q);
    const points = querySnapshot.docs.map(doc => doc.data());
    console.log(points);
    return points;
  }

  public async getPolls()
  {
    const pollCollection = collection(this.firestore, 'Encuesta');
    const querySnapshot = await getDocs(pollCollection);
    const polls = querySnapshot.docs.map(doc => doc.data());
    return polls;
  }

  public async isPollAnswered(userName : string)
  {
    const userCollection = collection(this.firestore, 'Encuesta');
    const q = query(userCollection, where('UserName', '==', userName));
    const querySnapshot = await getDocs(q);
    if(!querySnapshot.empty)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  public async savePoll(userName : string, nombre : string, apellido : string, edad : number, numeroTelefono : number, observaciones : string, juegoFavorito : string, valorPagina : number)
  {
    const userCollection = collection(this.firestore, 'Encuesta');
    await addDoc(userCollection,
      {
        UserName: userName,
        Nombre: nombre,
        Apellido: apellido,
        Edad: edad,
        NumeroTelefono: numeroTelefono,
        Observaciones: observaciones,
        JuegoFavorito: juegoFavorito,
        PuntajePagina: valorPagina,
      });
  }

  public async savePoints(userName : string, game : string, maxPoints : number)
  {
    const userCollection = collection(this.firestore, 'Games');
    const q = query(userCollection, where('UserName', '==', userName), where('Game', '==', game));
    const querySnapshot = await getDocs(q);
    if(!querySnapshot.empty)
    {
      const userDoc = querySnapshot.docs[0];
      let gameId = userDoc.id;
      let gameData = userDoc.data();
      if(maxPoints > gameData['MaxPoints'])
      {
        console.log(gameData['MaxPoints']);
        let gameDoc = doc(userCollection, gameId);
  
        await updateDoc(gameDoc, 
        {
          MaxPoints: maxPoints
        });
      }
    }
    else
    {
      await addDoc(userCollection,
      {
        UserName: userName,
        Game: game,
        MaxPoints: maxPoints,
      });
    }
  }

  public async getUsers()
  {
    const imageCollection = collection(this.firestore, 'User');
    const querySnapshot = await getDocs(imageCollection);
    const images = querySnapshot.docs.map(doc => doc.data());
  }

  public async SaveUser(userUID : string, userName : string, email : string)
  {
    const userCollection = collection(this.firestore, 'User');
    const docRef = doc(userCollection, userUID);

    await setDoc(docRef,
      {
        UserName: userName,
        Email: email,
        JoinDate: new Date(),
        Rol: 'Usuario'
      })
  }

  public async GetUserEmailByUserName(userName: string): Promise<string | null> {
    const userCollection = collection(this.firestore, 'User');
    const q = query(userCollection, where('UserName', '==', userName));
    const querySnapshot = await getDocs(q);
  
    if (querySnapshot.empty) 
    {
      return null;
    }
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
  
    if (userData && userData['Email']) {
      console.log(userData['Email']);
      return userData['Email'];
    } else {
      return null;
    }
  }

  public async userExist(userName : string)
  {
    const userCollection = collection(this.firestore, 'User');
    const q = query(userCollection, where('UserName', '==', userName));
    const querySnapshot = await getDocs(q);
  
    if (querySnapshot.empty) 
    {
      return false;
    }
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
  
    if (userData['UserName'] == userName) 
    {
      return true;
    } 
    else 
    {
      return false;
    }
  }
  

  public async getUserNameByUID(UIDUser: string)
  {
    const userCollection = collection(this.firestore, 'User');
    const userDoc = doc(userCollection, UIDUser);
    const userDocSnapshot = await getDoc(userDoc);
    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      return userData['UserName'];
    } 
    else 
    {
      console.log('User not found');
      return '';
    }
  }

  public async sendMessage(message : string, userName : string)
  {
    const messageCollection = collection(this.firestore, 'Message');
    const timestamp = new Date();
    await addDoc(messageCollection, 
      {
        Message: message,
        UserName: userName,
        Timestamp: timestamp,
      });
  }

  public async getMessage()
  {
    const messageCollection = collection(this.firestore, 'Message');
    const q = query(messageCollection,  orderBy('Timestamp', 'asc'));
    const querySnapshot = await getDocs(q);
    const messages = querySnapshot.docs.map((doc) => doc.data());
    return messages;
  }

}
