import {Component, OnInit} from '@angular/core';
import {Program} from "../../../../Core/Models/program";
import {Exercise} from "../../../../Core/Models/exercice";
import {ProgramService} from "../../../../Core/Services/program.service";
import {Router} from "@angular/router";
import {ExerciseService} from "../../../../Core/Services/exercice.service";

@Component({
  selector: 'app-list-exercices',
  templateUrl: './list-exercices.component.html',
  styleUrls: ['./list-exercices.component.css']
})
export class ListExercicesComponent implements OnInit{
  public exercices!: Exercise[];
  constructor(private exerciceService: ExerciseService, private router: Router) { }

  ngOnInit(): void {
    this.loadExercices();
  }

  private loadExercices() {
    this.exerciceService.getAllExercises().subscribe({
      next: (params) => {
        this.exercices = params;
        console.log(this.exercices);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('complete');
      }
    });
  }


  deleteExercice(id: string) {
    const result = window.confirm('Are you sure you want to delete this exercice?');
    if (result) {
      this.exerciceService.deleteExercise(id).subscribe({
        next: () => {
          console.log('Exercice deleted successfully');
          // Remove the deleted program from the programs array
          // @ts-ignore
          this.exercices = this.exercices.filter(p => p.id !== id);
        },
        error: (error) => {
          console.log('Error deleting exercice:', error);
        }
      });
    }
  }
}
