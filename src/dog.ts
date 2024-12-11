export class Dog {
  name: string;
  born: number;
  constructor(name: string, born: number) {
    (this.name = name), (this.born = born);
  }
}
