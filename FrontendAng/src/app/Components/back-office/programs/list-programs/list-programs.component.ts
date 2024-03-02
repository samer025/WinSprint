import { Component, OnInit } from '@angular/core';
import { ProgramService } from '../../../../Core/Services/program.service';
import { Program } from '../../../../Core/Models/program';
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-programs',
  templateUrl: './list-programs.component.html',
  styleUrls: ['./list-programs.component.css']
})
export class ListProgramsComponent implements OnInit {
  public showAllExercises: boolean = false;
  public programs!: Program[];
  constructor(private programService: ProgramService, private router: Router) { }

  ngOnInit(): void {
    this.loadPrograms();
  }

  loadPrograms() {
    this.programService.getAllPrograms().subscribe({
      next: (params) => {
        this.programs = params;
        console.log(this.programs);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('complete');
      }
    });
  }



  deleteProgram(id: string) {
    const result = window.confirm('Are you sure you want to delete this program?');
    if (result) {
      this.programService.deleteProgram(id).subscribe({
        next: () => {
          console.log('Program deleted successfully');
          // Remove the deleted program from the programs array
          // @ts-ignore
          this.programs = this.programs.filter(p => p.id !== id);
        },
        error: (error) => {
          console.log('Error deleting program:', error);
        }
      });
    }
  }


  toggleShowAllExercises(): void {
    this.showAllExercises = !this.showAllExercises;
  }




}
