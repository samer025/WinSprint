import {Exercise} from "./exercice";
import {User} from "./user";

export enum ProgramType {
  Fitness = "Fitness",
  Nutrition = "Nutrition",
  Mental = "Mental",
}

export class Program {
  id!: string;
  title!: string;
  description!: string;
  prix!:number;
  programType!: ProgramType;
  exercises!: Exercise[];
  user!: User;
}
