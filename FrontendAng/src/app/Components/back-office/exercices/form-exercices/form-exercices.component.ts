import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Exercise, ExerciseType } from "../../../../Core/Models/exercice";
import { ExerciseService } from "../../../../Core/Services/exercice.service";
import Swal from "sweetalert2";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-form-exercices',
  templateUrl: './form-exercices.component.html',
  styleUrls: ['./form-exercices.component.css']
})
export class FormExercicesComponent implements OnInit {
  editMode: boolean = false;
  exerciceForm!: FormGroup;
  pattern = '^[ a-zA-Z0-9][a-zA-Z0-9 ]*$';
  exerciceTypes = Object.values(ExerciseType);

  file!: File;

  constructor(private exerciceServ: ExerciseService, private formBuilder: FormBuilder, private router: Router, private currentRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.initForm();
    if (this.currentRoute.snapshot.params['id']) {
      this.editMode = true;
      let id = this.currentRoute.snapshot.params['id'];
      this.exerciceServ.getExerciseById(id).subscribe({
        next: (exercice: Exercise) => {
          this.exerciceForm.patchValue({
            nom: exercice.nom,
            type: exercice.type,
            description: exercice.description
          });
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  private initForm() {
    this.exerciceForm = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.pattern(this.pattern), Validators.minLength(3)]],
      type: [ExerciseType.CARDIO, Validators.required],
      description: ['', [Validators.required]],
      image: ['']
    });
  }

  onAddExercise() {
    const formValue = this.exerciceForm.value;
    const programId = 1; // Set the programId accordingly
    this.exerciceServ.addExercise(formValue.nom, formValue.type, formValue.description, programId, this.file).subscribe(() => {
      Swal.fire('Added', 'Exercise has been created successfully.', 'success');
      this.router.navigate(['/backOffice/exercices']);
    });
  }

  onUpdateExercise() {
    const formValue = this.exerciceForm.value;
    const id = this.currentRoute.snapshot.params['id'];
    this.exerciceServ.updateExercise(id, formValue.nom, formValue.type, formValue.description, this.file).subscribe(() => {
      Swal.fire('Updated', 'Exercise has been updated successfully.', 'success');
      this.router.navigate(['/backOffice/exercices']);
    });
  }

  onSubmit() {
    Swal.fire({
      title: this.editMode ? 'Are you sure you want to update this exercise?' : 'Are you sure you want to add this exercise?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.editMode ? 'Yes, update' : 'Yes, add',
    }).then((result) => {
      if (result.isConfirmed) {
        const formValue = this.exerciceForm.value;
        if (this.editMode) {
          const id = this.currentRoute.snapshot.params['id'];
          this.exerciceServ.updateExercise(id, formValue.nom, formValue.type, formValue.description, this.file).subscribe(() => {
            Swal.fire('Updated', 'Exercise has been updated successfully.', 'success');
            this.router.navigate(['/backOffice/exercices']);
          });
        } else {
          const idp = this.currentRoute.snapshot.params['idp'];
          this.exerciceServ.addExercise(formValue.nom, formValue.type, formValue.description, idp, this.file).subscribe(() => {
            Swal.fire('Added', 'Exercise has been created successfully.', 'success');
            this.router.navigate(['/backOffice/programs']);
          });
        }
      }
    });
  }



  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }
}
