import {Food} from "./food";

export interface Diet {
  id: number;
  name: string;
  description: string;
  type: DietType;
  prix:number;
  foods: Food[]; // Array of Food IDs
}

export enum DietType {
  PROTEIN = 'PROTEIN',
  CARB = 'CARB',
  FAT = 'FAT'
}
