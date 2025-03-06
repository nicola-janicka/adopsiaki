export class Dog {
  id: string;
  name: string;
  breed: string;
  age: number;
  gender: string;
  weight: number;
  description: string;
  constructor(
    name: string,
    breed: string,
    age: number,
    gender: string,
    weight: number,
    description: string
  ) {
    this.id = '';
    this.name = name;
    this.breed = breed;
    this.age = age;
    this.gender = gender;
    this.weight = weight;
    this.description = description;
  }

  setID(id: string) {
    this.id = id;
  }
}
