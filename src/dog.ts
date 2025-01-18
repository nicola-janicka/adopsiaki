export class Dog {
  name: string;
  age: number;
  gender: string;
  weight: number;
  description: string;
  constructor(
    name: string,
    age: number,
    gender: string,
    weight: number,
    description: string
  ) {
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.weight = weight;
    this.description = description;
  }
}
