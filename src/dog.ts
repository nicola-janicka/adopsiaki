import { Timestamp } from 'firebase/firestore';

export class Dog {
  id: string;
  pictures: string[];
  name: string;
  breed: string;
  age: number;
  gender: string;
  weight: number;
  description: string;
  createdAt: Date;
  constructor(
    pictures: string[],
    name: string,
    breed: string,
    age: number,
    gender: string,
    weight: number,
    description: string,
    createdAt: Date
  ) {
    this.id = '';
    this.pictures = pictures;
    this.name = name;
    this.breed = breed;
    this.age = age;
    this.gender = gender;
    this.weight = weight;
    this.description = description;
    this.createdAt = createdAt;
  }

  setID(id: string) {
    this.id = id;
  }
}
