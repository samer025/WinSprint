import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface User {
  age: number;
  weight: number;
  height: number;
  gender: string;
  activityLevel: string;
  goal: string;
}

interface Macro {
  name: string;
  value: number;
}

@Component({
  selector: 'app-calorie-calculator',
  templateUrl: './calorie-calculator.component.html',
  styleUrls: ['./calorie-calculator.component.css']
})
export class CalorieCalculatorComponent implements OnInit {
  userForm: FormGroup;
  calculatedCalories: number = 0;
  activityLevels: string[] = ['Little to no exercise', 'Light exercise', 'Moderate exercise', 'Heavy exercise', 'Very heavy exercise'];
  goals: string[] = ['Lose weight (1lb/week)', 'Lose weight (2lb/week)', 'Gain weight (1lb/week)', 'Gain weight (2lb/week)', 'Maintain weight'];
  breakfastMacros: Macro[] = [];
  snackMacros: Macro[] = [];
  mainMealMacros: Macro[] = [];

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({ // Initialize userForm in constructor
      age: ['', Validators.required],
      weight: ['', Validators.required],
      height: ['', Validators.required],
      gender: ['', Validators.required],
      activityLevel: ['', Validators.required],
      goal: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      age: ['', Validators.required],
      weight: ['', Validators.required],
      height: ['', Validators.required],
      gender: ['', Validators.required],
      activityLevel: ['', Validators.required],
      goal: ['', Validators.required]
    });
  }

  calculateCalories(): void {
    const { age, weight, height, gender, activityLevel, goal } = this.userForm.value;

    // Implement the Harris-Benedict equation here
    // (You'll need to choose a specific formula based on gender)
    // Example for male:
    let bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    if (gender === 'female') {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }

    const activityFactor: { [key: string]: number } = {
      'Little to no exercise': 1.2,
      'Light exercise': 1.375,
      'Moderate exercise': 1.55,
      'Heavy exercise': 1.725,
      'Very heavy exercise': 1.9
    };

    const goalCalories: { [key: string]: number } = {
      'Lose weight (1lb/week)': -500,
      'Lose weight (2lb/week)': -1000,
      'Gain weight (1lb/week)': 500,
      'Gain weight (2lb/week)': 1000,
      'Maintain weight': 0
    };

    this.calculatedCalories = Math.round(bmr * activityFactor[activityLevel] + goalCalories[goal]);

    // Calculate macro percentages based on goal
    const proteinPercentage = 0.55;
    const carbsPercentage = 0.25;
    const fatPercentage = 0.2;

    this.breakfastMacros = [
      { name: 'protein', value: this.calculatedCalories * proteinPercentage / 4 },
      { name: 'carbs', value: this.calculatedCalories * carbsPercentage / 4 },
      { name: 'fat', value: this.calculatedCalories * fatPercentage / 8 }
    ];
    this.snackMacros = [
      { name: 'protein', value: this.calculatedCalories * proteinPercentage / 4 },
      { name: 'carbs', value: this.calculatedCalories * carbsPercentage / 4 },
      { name: 'fat', value: this.calculatedCalories * fatPercentage / 8 }];
  }}

