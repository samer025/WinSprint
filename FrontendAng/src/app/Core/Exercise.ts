export enum ExerciseType {
    CARDIO = "CARDIO",
    CROSS = "CROSS",
    GYMNAS = "GYMNAS",
    MEDITATION = "MEDITATION",
  }
  
  
  
  export class Exercise {
    id!: string;
    nom!: string;
    type!: ExerciseType;
    description!: string;
    image!: string;
  }