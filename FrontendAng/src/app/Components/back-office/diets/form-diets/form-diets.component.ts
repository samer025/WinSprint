import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { DietService } from '../../../../Core/Services/diet.service';
import { Diet, DietType } from '../../../../Core/Models/diet';
import { Food } from '../../../../Core/Models/food';
import { FoodService } from '../../../../Core/Services/food.service';

@Component({
  selector: 'app-form-diets',
  templateUrl: './form-diets.component.html',
  styleUrls: ['./form-diets.component.css']
})
export class FormDietsComponent implements OnInit {
  editMode: boolean = false;
  dietForm!: FormGroup;
  foods: Food[] = [];
  pattern = '^[ a-zA-Z0-9][a-zA-Z0-9 ]*$';
  dietTypes = Object.values(DietType);

  constructor(
    private fb: FormBuilder,
    private dietService: DietService,
    private foodService: FoodService,
    private router: Router,
    private currentRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadFoods(); // Load foods on component initialization
    if (this.currentRoute.snapshot.params['id']) {
      this.editMode = true;
      let id = this.currentRoute.snapshot.params['id'];
      this.dietService.getDietById(id).subscribe({
        next: (diet: Diet) => {
          this.dietForm.patchValue({
            name: diet.name,
            description: diet.description,
            type: diet.type,
            foods: diet.foods
          });
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  private initForm() {
    this.dietForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(this.pattern), Validators.minLength(3)]],
      description: ['', [Validators.required]],
      type: ['', [Validators.required]],
      foods: [[]]
    });
  }

  private loadFoods() {
    this.foodService.getAllFoods().subscribe({
      next: (foods: Food[]) => {
        this.foods = foods;
        // Assuming dietForm.controls.foods is your FormControl for the foods array
        foods.forEach(food => {
          if (this.dietForm.controls['foods'].value.includes(food.id)) {
            this.dietForm.controls['foods'].setValue([...this.dietForm.controls['foods'].value, food.id]);
          }
        });
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  isFoodSelected(food: Food, selectedFoods: Food[]): boolean {
    return selectedFoods.some(f => f.id === food.id);
  }

  onSubmit() {
    Swal.fire({
      title: this.editMode ? 'Are you sure you want to update this diet?' : 'Are you sure you want to add this diet?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.editMode ? 'Yes, update' : 'Yes, add',
    }).then((result) => {
      if (result.isConfirmed) {
        const formValue = this.dietForm.value;
        const diet: Diet = {
          id: 0, // Assuming the ID will be assigned by the backend
          name: formValue.name,
          description: formValue.description,
          type: formValue.type,
          foods: formValue.foods
        };

        if (this.editMode) {
          const id = this.currentRoute.snapshot.params['id'];
          this.dietService.updateDiet(id, diet).subscribe(() => {
            Swal.fire('Updated', 'Diet has been updated successfully.', 'success');
            this.router.navigate(['/backOffice/diets']);
          });
        } else {
          this.dietService.addDiet(diet).subscribe(() => {
            Swal.fire('Added', 'Diet has been created successfully.', 'success');
            this.router.navigate(['/backOffice/diets']);
          });
        }
      }
    });
  }
}
