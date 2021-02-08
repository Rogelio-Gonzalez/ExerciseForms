import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseUserService {
  user : Observable<User[]>;
  private userCollection : AngularFirestoreCollection<User>;
  constructor(private firestore : AngularFirestore) {
    this.userCollection = firestore.collection<User>('user');
    this.getUsers();
   }
  deleteUsers(userId: string){
    const result = this.userCollection.doc(userId).delete();
    return result;   
  }
  saveUsers(user: User, userId: string){
    const id = userId || this.firestore.createId();
    const data = { id, ...user };
    const result = this.userCollection.doc(id).set(data);
    return result;
        
  }
  getUsers(): void {
    this.user = this.userCollection.snapshotChanges().pipe(
      map(data => data.map(a => a.payload.doc.data() as User))
  );
  }
}
