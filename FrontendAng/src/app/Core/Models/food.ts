export interface Food {
  id: number;
  name: string;
  description: string;
  type: FoodType;
  image: string; // Assuming you will handle the image as an ArrayBuffer
}

export enum FoodType {
  PALEODIET = 'PALEODIET',
  KETODIET = 'KETODIET',
  CARNIVOREDIET = 'CARNIVOREDIET',
  HIGHCARB = 'HIGHCARB'
}
