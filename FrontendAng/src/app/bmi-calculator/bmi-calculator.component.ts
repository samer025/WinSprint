import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-bmi-calculator',
  templateUrl: './bmi-calculator.component.html',
  styleUrls: ['./bmi-calculator.component.css']
})
export class BmiCalculatorComponent implements OnInit{
  feet: number = 0;
  inches: number = 0;
  weight: number = 0;
  bmi: number = 0;
  category: string = '';

  constructor() { }

  ngOnInit() { }

  calculateBmi() {
    const heightInInches = this.convertHeight(this.feet, this.inches);
    this.bmi = this.calcBMI(heightInInches, this.weight);
    this.category = this.categorize(this.bmi);
  }

  convertHeight(feet: number, inches: number): number {
    return (feet * 12) + inches;
  }

  calcBMI(heightInInches: number, weight: number): number {
    const heightInMeters = heightInInches / 39.37; // Convert inches to meters
    return (weight / Math.pow(heightInMeters, 2)) ;
  }

  categorize(bmi: number): string {
    if (bmi > 30) {
      return 'obese';
    } else if (bmi > 25 && bmi < 29.99) {
      return 'overweight';
    } else if (bmi > 18.5 && bmi < 24.99) {
      return 'healthy';
    } else {
      return 'underweight';
    }
  }
}
