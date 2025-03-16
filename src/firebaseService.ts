import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  QuerySnapshot,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { Injectable } from '@angular/core';
import { Dog } from './dog';
import { query } from 'firebase/firestore';
import { where } from 'firebase/firestore';
import { Admin } from './admin';
import { AdoptionForm } from './adoptionForm';
import { Observable } from 'rxjs';

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

  async addDog(dog: Dog) {
    try {
      const docRef = await addDoc(collection(db, 'dogs'), {
        name: dog.name,
        breed: dog.breed,
        age: dog.age,
        gender: dog.gender,
        weight: dog.weight,
        description: dog.description,
        createdAt: dog.createdAt,
        pictures: dog.pictures,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  async getDogs(): Promise<Dog[]> {
    let dogsList: Dog[] = [];
    const querySnapshot = await getDocs(collection(db, 'dogs'));
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      let dog = new Dog(
        data['pictures'],
        data['name'],
        data['breed'],
        data['age'],
        data['gender'],
        data['weight'],
        data['description'],
        new Date(data['createdAt'])
      );
      dog.setID(doc.id);
      dogsList.push(dog);
    });
    console.log(dogsList);
    return dogsList;
  }

  async getDog(id: string): Promise<Dog> {
    const docRef = await getDoc(doc(db, 'dogs', id));
    docRef.data;
    let dog = new Dog(
      docRef.get('pictures'),
      docRef.get('name'),
      docRef.get('breed'),
      docRef.get('age'),
      docRef.get('gender'),
      docRef.get('weight'),
      docRef.get('description'),
      new Date(docRef.get('createdAt'))
    );
    dog.setID(docRef.id);
    return dog;
  }

  async deleteDog(id: string) {
    try {
      const docRef = await deleteDoc(doc(db, 'dogs', id));
      console.log(docRef);
    } catch (e) {
      console.error('Error removing document: ', e);
    }
  }

  async editDog(dog: Dog) {
    try {
      const docRef = await updateDoc(doc(db, 'dogs', dog.id), {
        name: dog.name,
        breed: dog.breed,
        age: dog.age,
        gender: dog.gender,
        weight: dog.weight,
        description: dog.description,
        createdAt: dog.createdAt,
        pictures: dog.pictures,
      });
    } catch (e) {
      console.error('Error editing document: ', e);
    }
  }

  // Admin login data

  async getAdmin(username: string) {
    const q = query(
      collection(db, 'admins'),
      where('username', '==', username)
    );
    const querySnaphot = await getDocs(q);
    querySnaphot.forEach((doc) => {
      let adminData = doc.data();
      let admin = new Admin(adminData['username'], adminData['password']);
      if (username === admin.username) {
        console.log(admin);
      }
    });
  }

  // Adoption forms data

  async addAdoptionForm(adoptionForm: AdoptionForm) {
    try {
      const docRef = await addDoc(collection(db, 'adoptionForms'), {
        dogName: adoptionForm.dname,
        fullname: adoptionForm.fullname,
        email: adoptionForm.email,
        age: adoptionForm.age,
        experience: adoptionForm.experience,
        status: 'new',
        createdAt: new Date(),
      });
    } catch (e) {
      console.log('Error adding document ', e);
    }
  }
}
