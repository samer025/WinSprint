import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../../../../Core/Services/food.service';
import {FoodType} from "../../../../Core/Models/food";

@Component({
  selector: 'app-foods-form',
  templateUrl: './foods-form.component.html',
  styleUrls: ['./foods-form.component.css']
})
export class FoodsFormComponent implements OnInit {
  editMode: boolean = false;
  foodForm!: FormGroup;
  file!: File;
  pattern = '^[ a-zA-Z0-9][a-zA-Z0-9 ]*$';
  foodTypes = Object.values(FoodType);

  constructor(private fb: FormBuilder, private foodService: FoodService, private router: Router, private currentRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.initForm();
    if (this.currentRoute.snapshot.params['id']) {
      this.editMode = true;
      let id = this.currentRoute.snapshot.params['id'];
      this.foodService.getFoodById(id).subscribe({
        next: (food) => {
          console.log(food.name)
          this.foodForm.patchValue({
            name: food.name,
            description: food.description,
            type: food.type,
          });
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  private initForm() {
    this.foodForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(this.pattern), Validators.minLength(3)]],
      description: ['', [Validators.required]],
      type: ['', [Validators.required]],
      image: ['']
      // Add other form controls as needed
    });
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  onSubmit() {
    Swal.fire({
      title: this.editMode ? 'Are you sure you want to update this food?' : 'Are you sure you want to add this food?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.editMode ? 'Yes, update' : 'Yes, add',
    }).then((result) => {
      if (result.isConfirmed) {
        const formValue = this.foodForm.value;
        const formData = new FormData();
        formData.append('name', formValue.name);
        formData.append('description', formValue.description);
        formData.append('type', formValue.type);
        formData.append('file', this.file);

        if (this.editMode) {
          const id = this.currentRoute.snapshot.params['id'];
          this.foodService.updateFood(id, formData).subscribe(() => {
            Swal.fire('Updated', 'Food has been updated successfully.', 'success');
            this.router.navigate(['/backOffice/foods']);
          });
        } else {
          this.foodService.addFood(formData).subscribe(() => {
            Swal.fire('Added', 'Food has been created successfully.', 'success');
            this.router.navigate(['/backOffice/foods']);
          });
        }
      }
    });
  }
}
