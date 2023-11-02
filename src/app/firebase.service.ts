import { Injectable } from '@angular/core';
import { User } from './module';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, collection, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { Observable, from, map } from 'rxjs';
import { Guid } from 'guid-typescript';
import { firebaseConfig } from './firebase-config';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {

  private firestore;

  constructor() {
    const app = initializeApp(firebaseConfig);
    this.firestore = getFirestore(app);
  }

  saveFormData(data: User): Observable<void> {
    try {
      data.id = Guid.create().toString();
      data.enquiredAt = new Date().toUTCString();
      const userDocRef = doc(this.firestore, 'User', data.id);

      return from(setDoc(userDocRef, data));
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
  getUserData(): Observable<User[]>{
    try{
      const userCollectionRef = collection(this.firestore, 'User');
      return from(getDocs(userCollectionRef)).pipe(
        map((querySnapshot) => querySnapshot.docs.map((doc) => doc.data() as User))
      );
    }
    catch(e){
      console.error(e);
      throw e;
    }
  }

  updateUserStatus(userId: string, status: string): Observable<void> {
    const userDocRef = doc(this.firestore, 'User', userId);

    return from(updateDoc(userDocRef, { status }));
  }
  deleteUserStatus(userId: string): Observable<void> {
    const userDocRef = doc(this.firestore, 'User', userId);

    return from(deleteDoc(userDocRef));
  }
}
