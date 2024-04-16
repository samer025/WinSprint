import {Component, OnInit} from '@angular/core';
import {Program} from "../../../../Core/Models/program";
import {Exercise} from "../../../../Core/Models/exercice";
import {ProgramService} from "../../../../Core/Services/program.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ExerciseService} from "../../../../Core/Services/exercice.service";

@Component({
  selector: 'app-detail-exercice',
  templateUrl: './detail-exercice.component.html',
  styleUrls: ['./detail-exercice.component.css']
})
export class DetailExerciceComponent implements OnInit{
  exercise!: Exercise;

  constructor(private exerciseServ: ExerciseService,private router: Router,  private currentRoute: ActivatedRoute)
  { }

  ngOnInit(): void {
    if (this.currentRoute.snapshot.params['id']) {
      let id = this.currentRoute.snapshot.params['id'];
      this.exerciseServ.getExerciseById(id).subscribe({
        next: (exercise: Exercise) => {
          this.exercise = exercise;
          console.log(this.exercise)

        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }
}
