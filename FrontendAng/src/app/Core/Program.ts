import { Exercise } from "./Exercise";
import { User } from "./Uset";


export enum ProgramType {
  Fitness = "Fitness",
  Nutrition = "Nutrition",
  Mental = "Mental",
}

export class Program {
  id!: string;
  title!: string;
  description!: string;
  programType!: ProgramType;
  exercises!: Exercise[];
  user!: User;
}