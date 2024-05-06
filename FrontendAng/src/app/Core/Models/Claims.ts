import {TypeClaim} from "./TypeClaim";
import {User} from "./user";

export class Claims{
    idClaims!:number;
    title!: string;
    otherDetails!: string;
    description!: string;
    typeClaim!: TypeClaim;
    statusClaims!:string;
    createdAt!:Date;
    consultAt!:Date;
    user!:User;
    isDropdownOpen:boolean=false;
}
