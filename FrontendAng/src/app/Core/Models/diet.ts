import {Food} from "./food";

export interface Diet {
  id: number;
  name: string;
  description: string;
  type: DietType;
  foods: Food[]; // Array of Food IDs
}

export enum DietType {
  PROTEIN = 'PROTEIN',
  CARB = 'CARB',
  FAT = 'FAT'
}
