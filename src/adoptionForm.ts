export class AdoptionForm {
  dname: string;
  fullname: string;
  email: string;
  age: number;
  experience: string;

  constructor(
    dname: string,
    fullname: string,
    email: string,
    age: number,
    experience: string
  ) {
    this.dname = dname;
    this.fullname = fullname;
    this.email = email;
    this.age = age;
    this.experience = experience;
  }
}
