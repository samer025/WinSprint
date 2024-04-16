import {Component, OnInit} from '@angular/core';
import {ProgramService} from "../../../../Core/Services/program.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Program, ProgramType} from "../../../../Core/Models/program";
import Swal from "sweetalert2";
@Component({
  selector: 'app-form-programs',
  templateUrl: './form-programs.component.html',
  styleUrls: ['./form-programs.component.css']
})
export class FormProgramsComponent implements OnInit {
  editMode: boolean = false
  program!: Program;
  programForm!: FormGroup;
  pattern = '^[ a-zA-Z0-9][a-zA-Z0-9 ]*$';
  constructor(private programServ: ProgramService,private router: Router,  private formBuilder: FormBuilder,  private currentRoute: ActivatedRoute)
  { }

  ngOnInit(): void {
    if (this.currentRoute.snapshot.params['id']) {
      this.editMode = true
      let id = this.currentRoute.snapshot.params['id'];
      this.programServ.getProgramById(id).subscribe({
        next: (program: Program) => {
          this.program = program;
          console.log(this.program)
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
    const { title, description, programType,prix } = this.program;

    this.programForm = this.formBuilder.group({
      title: [title, [Validators.required, Validators.pattern(this.pattern), Validators.minLength(3)]],
      description: [description, [Validators.required]],
      programType: [programType, Validators.required],
      prix:[prix,[Validators.required]]

    });
  }

  private initForm() {
    this.programForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.pattern(this.pattern), Validators.minLength(3)]],
      description: ['', [Validators.required]],
      programType: [ProgramType.Fitness, Validators.required],
      prix: ['', [Validators.required]],
    });
  }


    onSubmit() {
      if (!this.editMode) {


          Swal.fire({
            title: 'Are you sure you want to add this program?',
            text: 'This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, add',
          }).then((result) => {
            if (result.isConfirmed) {
              const newProgram = this.programForm.value;

              this.programServ.addProgram(newProgram, 1).subscribe();
              Swal.fire('Added', 'Program has been created successfully.', 'success');
              this.router.navigate(['/backOffice/programs']);
            }
          });

      } else {
        Swal.fire({
        title: 'Are you sure you want to update this program?',
        text: 'This action cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, update',
      }).then((result) => {
        if (result.isConfirmed) {
          const id = this.currentRoute.snapshot.params['id'];
          const updatedProgram = this.programForm.value;
          this.programServ.updateProgram(id,updatedProgram).subscribe();
          Swal.fire('Updated', 'Program has been updated successfully.', 'success');
          this.router.navigate(['/backOffice/programs']);
        }
      });}

    }

}
