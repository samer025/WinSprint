import {Program} from "./program";

export class User {
  id!: number;
  username!: string;
  email!: string;
  password!: string;
  firstname!: string;
  lastname!: string;
  birthdate!: Date;
  address!: string;
  phone!: string;
  roles!: Role[];
  programs!: Program[];
}

export enum Role {
  ROLE_USER = 'ROLE_USER',
  ROLE_MODERATOR = 'ROLE_MODERATOR',
  ROLE_ADMIN = 'ROLE_ADMIN'
}

