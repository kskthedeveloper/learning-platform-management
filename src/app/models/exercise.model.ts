export class Exercise {
  audio: string;
  audioQuestion: string;
  check: string[];
  givenWords: string[];
  questions: string[];
  img: string;

  constructor(public id: string, public isEdit: boolean) {}
}
