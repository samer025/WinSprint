import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  questions: any[] = [
    {
      text: 'I am :',
      options: [
        { value: 2, text: 'male' },
        { value: 1, text: 'female' },
      ],
      selectedValue: 1,
    },
    // ... add remaining questions similar to the provided structure
    {
      text: 'My shoulders are :',
      options: [
        { value: 1, text: 'wider than my hips' },
        { value: 2, text: 'the same width as my hips' },
        {value:3,text: 'narrower than my hips'}
      ],
      selectedValue: 1,
    },
    {
      text: 'A PAIR OF RELAXED-FIT JEANS (WITH A CORRECT WAIST SIZE) FIT ME. :',
      options: [
        { value: 1, text: 'tight around my glutes' },
        { value: 2, text: 'perfect around my glutes' },
        {value:  3, text: 'loose around my glutes'}
      ],
      selectedValue: 1,
    },
    {
      text: 'MY FOREARMS LOOK. :',
      options: [
        { value: 1, text: 'big' },
        { value: 2, text: 'average' },
        {value:  3, text: 'small'}
      ],
      selectedValue: 1,
    },
    {
      text: 'MY Body Tends to  :',
      options: [
        { value: 1, text: 'carry a bit of extra fat' },
        { value: 2, text: 'stay lean,yet muscular' },
        {value:  3, text: 'stay skinny'}
      ],
      selectedValue: 1,
    },
    {
      text: 'MY BODY LOOKS...  :',
      options: [
        { value: 1, text: 'round and soft' },
        { value: 2, text: 'square and rugged' },
        {value:  3, text: 'long and narrow'}
      ],
      selectedValue: 1,
    },
    {
      text: 'IF I ENCIRCLE MY WRIST WITH MY OTHER HAND"S MIDDLE FINGER AND THUMB :',
      options: [
        { value: 1, text: 'the middle finger and thumb do not touch' },
        { value: 2, text: 'the middle finger and thumb just touch' },
        {value:  3, text: 'the middle finger and thumb overlap'}
      ],
      selectedValue: 1,
    },
    {
      text: 'CONCERNING MY WEIGHT, I:',
      options: [
        { value: 1, text: 'gain weight easily but find it hard to lose' },
        { value: 2, text: 'gain and lose without too much struggle' },
        {value:  3, text: 'have trouble gaining way in form of muscle or fat'}
      ],
      selectedValue: 1,
    },
    {
      text: 'WHICH RANGE BEST DESCRIBES YOUR CHEST MEASUREMENTS?:',
      options: [
        { value: 1, text: '43 inches or more' },
        { value: 2, text: '37-43 inches' },
        {value:  3, text: '37 inches or less'}
      ],
      selectedValue: 1,
    },

  ];

  totalScore: number = 0;
  result: any = {};

  ngOnInit() {
    // Initialize questions with default selected values
  }

  calculateScore(): void {
    this.totalScore = this.questions.reduce((acc, question) => acc + question.selectedValue, 0);
    this.determineResult();
  }

  determineResult(): void {
    if (this.totalScore <= 11) {
      this.result = {
        title: 'You are an endomorph',
        message: 'This can mean you build muscle easily, but might struggle to keep off body fat.You should eat a high protein diet and limits your carbs intake',
      };
    } else if (this.totalScore > 11 && this.totalScore <= 19) {
      this.result = {
        title: 'You are a mesomorph',
        message: 'This can mean you have a naturally fit build and can gain muscle and burn fat more easily than other body types.',
      };
    } else if(this.totalScore>19 && this.totalScore <=26){
    // ... add remaining result logic for other score ranges
    this.result = {
      title: 'You are a ectomorph',
      message: 'This means you might burn fat easily, but struggle to add muscle.Focus on high carb diet with moderate protein.avoid cardio and do bodybuilding ',
    };
  }}

}
