import {Component, OnInit} from '@angular/core';
import {Program, ProgramType} from "../../../../Core/Models/program";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Exercise, ExerciseType} from "../../../../Core/Models/exercice";
import {ProgramService} from "../../../../Core/Services/program.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ExerciseService} from "../../../../Core/Services/exercice.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-form-exercices',
  templateUrl: './form-exercices.component.html',
  styleUrls: ['./form-exercices.component.css']
})
export class FormExercicesComponent implements OnInit{
  editMode: boolean = false
  exercice!: Exercise;
  exerciceForm!: FormGroup;
  pattern = '^[ a-zA-Z0-9][a-zA-Z0-9 ]*$';
  exerciceTypes = Object.values(ExerciseType);
  constructor(private exerciceServ: ExerciseService,private router: Router,  private formBuilder: FormBuilder,  private currentRoute: ActivatedRoute)
  { }

  ngOnInit(): void {
    if (this.currentRoute.snapshot.params['id']) {
      this.editMode = true
      let id = this.currentRoute.snapshot.params['id'];
      this.exerciceServ.getExerciseById(id).subscribe({
        next: (exercice: Exercise) => {
          this.exercice = exercice;
          console.log(this.exercice)
          this.initFormEdit()
        },
        error: (err) => {
          console.log(err);
        }
      });

    } else {
      this.initForm()
    }
  }

  private initFormEdit() {
    const { nom, type, description } = this.exercice;

    this.exerciceForm = this.formBuilder.group({
      nom: [nom, [Validators.required, Validators.pattern(this.pattern), Validators.minLength(3)]],
      type: [type, Validators.required],
      description: [description, [Validators.required]],
      image: [''] // Assuming you want to update the image as well
    });
  }

  private initForm() {
    this.exerciceForm = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.pattern(this.pattern), Validators.minLength(3)]],
      type: [ExerciseType.CARDIO, Validators.required],
      description: ['', [Validators.required]],
      image: ['', [Validators.required]] // Assuming image is required for new exercises
    });
  }


  onSubmit() {
    if (!this.editMode) {
      Swal.fire({
        title: 'Are you sure you want to add this exercice?',
        text: 'This action cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, add',
      }).then((result) => {
        if (result.isConfirmed) {
          const newExercice = this.exerciceForm.value;
          const idp = this.currentRoute.snapshot.params['idp'];
          this.exerciceServ.addExercise(newExercice, idp).subscribe();
          Swal.fire('Added', 'Exercice has been created successfully.', 'success');
          this.router.navigate(['/backOffice/programs']);
        }
      });

    } else {
      Swal.fire({
        title: 'Are you sure you want to update this exercice?',
        text: 'This action cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, update',
      }).then((result) => {
        if (result.isConfirmed) {
          const id = this.currentRoute.snapshot.params['id'];
          const updatedExercice = this.exerciceForm.value;
          this.exerciceServ.updateExercise(id,updatedExercice).subscribe();
          Swal.fire('Updated', 'Exercice has been updated successfully.', 'success');
          this.router.navigate(['/backOffice/exercices']);
        }
      });}

  }
}
