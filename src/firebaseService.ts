import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { Injectable } from '@angular/core';

const firebaseConfig = {
  apiKey: 'AIzaSyA91XeK7UDUK1BUtoCElPuMOEeLfCxJCso',
  authDomain: 'adopsiaki.firebaseapp.com',
  projectId: 'adopsiaki',
  storageBucket: 'adopsiaki.firebasestorage.app',
  messagingSenderId: '607202541164',
  appId: '1:607202541164:web:bf076d5189a35c49662249',
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor() {}

  async addDog() {
    try {
      const docRef = await addDoc(collection(db, 'dogs'), {
        name: 'Reksio',
        born: 2016,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }
}
