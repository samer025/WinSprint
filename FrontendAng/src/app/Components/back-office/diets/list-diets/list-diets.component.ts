import { Component, OnInit } from '@angular/core';
import { DietService } from '../../../../Core/Services/diet.service';
import { Diet } from '../../../../Core/Models/diet';
import Swal from "sweetalert2";

@Component({
  selector: 'app-list-diets',
  templateUrl: './list-diets.component.html',
  styleUrls: ['./list-diets.component.css']
})
export class ListDietsComponent implements OnInit {
  public diets!: Diet[];
  public showAllFoods: boolean = false;

  constructor(private dietService: DietService) { }

  ngOnInit(): void {
    this.loadDiets();
  }

  loadDiets() {
    this.dietService.getAllDiets().subscribe({
      next: (diets) => {
        this.diets = diets;
        console.log(this.diets);
      },
      error: (error) => {
        console.log('Error loading diets:', error);
      }
    });
  }

  deleteDiet(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this diet!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dietService.deleteDiet(id).subscribe({
          next: () => {
            Swal.fire(
              'Deleted!',
              'Your diet has been deleted.',
              'success'
            );
            this.diets = this.diets.filter(diet => diet.id !== id);
          },
          error: (error) => {
            Swal.fire(
              'Error!',
              'There was an error deleting the diet.',
              'error'
            );
            console.error('Error deleting diet:', error);
          }
        });
      }
    });
  }

  toggleShowAllFoods(): void {
    this.showAllFoods = !this.showAllFoods;
  }
}
