import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Claims} from "../../../../Core/Models/Claims";
import {User} from "../../../../Core/Uset";
import {ClaimsService} from "../../../../Core/Services/Claims.service";
import {TypeClaim} from "../../../../Core/Models/TypeClaim";

@Component({
  selector: 'app-reclamtionfront',
  templateUrl: './reclamtionfront.component.html',
  styleUrls: ['./reclamtionfront.component.css']
})
export class ReclamtionfrontComponent {
  constructor(private ClaimsService: ClaimsService,private dialogRef : MatDialog,private formBuilder: FormBuilder){}
  allReclamation: Claims[] = [];
  user = new User();
  newClaimFormGroup!: FormGroup;
  ModifiClaimFormGroup!: FormGroup;
  openadd:boolean=false;
  openedit:boolean=false;
  showOtherDetails: boolean = false;
  showOtherDetails2: boolean = false;
  recaptchaResolved: boolean = true;
  claimTypes: string[] = ['Other', 'Workout', 'Nutrition', 'Equipment'];

  ngOnInit(): void {
    this.initializeForm();
    this.user.id=1;
    this.ClaimsService.GetALLClaims().subscribe((data) => {
      // @ts-ignore
      this.allReclamation = data;
    console.log( this.allReclamation)});
  }
  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
    this.recaptchaResolved = true;
  }
  initializeForm(): void {
    this.newClaimFormGroup = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      TypeClaim: ['', Validators.required],
      otherDetails: [null]

    });
  }
  gotoedit(claim:Claims){
    this.openedit=true;
    if(claim.typeClaim==TypeClaim.Other){
      this.showOtherDetails2=true;
    }
    this.ModifiClaimFormGroup = this.formBuilder.group({
      idClaims: [claim.idClaims, Validators.required],
      title: [claim.title, Validators.required],
      description: [claim.description, Validators.required],
      typeClaim: [claim.typeClaim, Validators.required],
      otherDetails: [claim.otherDetails]

    });
  }
  onDelete(claim:Claims){
    this.ClaimsService.Delete(claim.idClaims).subscribe({
      next: data => {
        location.reload();
      },
      error: err => {
        console.error(err);
      }
    });
  }
  Openpopupadd(){
    this.openadd=true;
  }
  closeadd(){
    this.openadd=false;
  }
  closeedit(){
    this.openedit=false;
  }
  toggleOtherDetails2(): void {
    const selectedType = this.ModifiClaimFormGroup.get('typeClaim')!.value;
    this.showOtherDetails2 = (selectedType === 'Other');
  }
  toggleOtherDetails(): void {
    const selectedType = this.newClaimFormGroup.get('TypeClaim')!.value;
    this.showOtherDetails = (selectedType === 'Other');
  }
  add():void{
    if(this.newClaimFormGroup.valid){
      let c =new Claims();
      c.title=this.newClaimFormGroup.get('title')!.value;
      c.description=this.newClaimFormGroup.get('description')!.value;
      c.otherDetails=this.newClaimFormGroup.get('otherDetails')!.value;
      if(this.newClaimFormGroup.get('TypeClaim')!.value=="Other"){
        c.typeClaim=TypeClaim.Other;
      }
      if (this.newClaimFormGroup.get('TypeClaim')!.value === 'Workout') {
        c.typeClaim = TypeClaim.Workout;
      }
      if (this.newClaimFormGroup.get('TypeClaim')!.value === 'Nutrition') {
        c.typeClaim = TypeClaim.Nutrition;
      }
      if (this.newClaimFormGroup.get('TypeClaim')!.value === 'Equipment') {
        c.typeClaim = TypeClaim.Equipment;
      }

      // @ts-ignore
      c.user=this.user;
      console.log(c)
      this.ClaimsService.AddClaim(c).subscribe({
        next: data => {
          location.reload();

        },
        error: err => {
          console.error(err);
        }
      });
    }

  }

  edit():void{
    if(this.ModifiClaimFormGroup.valid){
      let c =new Claims();
      c.idClaims=this.ModifiClaimFormGroup.get('idClaims')!.value;
      c.title=this.ModifiClaimFormGroup.get('title')!.value;
      c.description=this.ModifiClaimFormGroup.get('description')!.value;
      c.otherDetails=this.ModifiClaimFormGroup.get('otherDetails')!.value;
      if(this.ModifiClaimFormGroup.get('typeClaim')!.value=="Other"){
        c.typeClaim=TypeClaim.Other;
      }
      if (this.ModifiClaimFormGroup.get('typeClaim')!.value === 'Workout') {
        c.typeClaim = TypeClaim.Workout;
      }
      if (this.ModifiClaimFormGroup.get('typeClaim')!.value === 'Nutrition') {
        c.typeClaim = TypeClaim.Nutrition;
      }
      if (this.ModifiClaimFormGroup.get('typeClaim')!.value === 'Equipment') {
        c.typeClaim = TypeClaim.Equipment;
      }

      this.ClaimsService.UpdateClaims(c).subscribe({
        next: data => {
          location.reload();
        },
        error: err => {
          console.error(err);
        }
      });
    }

  }
}
