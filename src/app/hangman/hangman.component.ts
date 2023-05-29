import { Component } from '@angular/core';

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.scss']
})
export class HangmanComponent {


  words: string[] = ['masina', 'casca', 'paralelipiped', 'artera', 'farfurie'];
  hangmanImages: string[] = [
    'assets/hangman-images/hng1.png',
    'assets/hangman-images/hng2.png',
    'assets/hangman-images/hng3.png',
    'assets/hangman-images/hng4.png',
    'assets/hangman-images/hng5.png',
    'assets/hangman-images/hng6.png',
    'assets/hangman-images/hng7.png',
  ];
  word: string = '';
  currentWord: string[] = [];
  incorrectGuesses: number = 0;
  remainingGuesses: number = 6;
  letter: string[] = [];
  currentLetter: string = '';
  gameOver: boolean = false;

  ngOnInit(): void {
    this.word = this.getRandomWord();
    this.currentWord = this.initializeCurrentWord();
  }

  getRandomWord(): string {
    const index = Math.floor(Math.random() * this.words.length);
    return this.words[index];
  }

  initializeCurrentWord(): string[] {
    return this.word.split('').map(letter => '_');
  }

  guessLetter(): void {

    if (this.currentLetter === '') {
      return;
    }

    if (this.letter.includes(this.currentLetter)) {
      return;
    }
  
    this.letter.push(this.currentLetter);
    if (this.word.includes(this.currentLetter)) {
      for (let i = 0; i < this.word.length; i++) {
        if (this.word[i] === this.currentLetter) {
          this.currentWord[i] = this.currentLetter;
        }
      }
      if (!this.currentWord.includes('_')) {
        this.gameOver = true;
        alert(`You won!`);
      }
    } else {
      this.incorrectGuesses++;
      this.remainingGuesses--;
      if (this.remainingGuesses === 0) {
        this.gameOver = true;
        alert(`Game over!`);
      }
    }
  }

  newGame(): void {
    this.incorrectGuesses = 0;
    this.remainingGuesses = 6;
    this.letter = [];
    this.word = this.getRandomWord();
    this.currentWord = this.initializeCurrentWord();
    this.gameOver = false;
  }

  getHangmanImage(): string {
    if (this.incorrectGuesses >= this.hangmanImages.length) {
      return this.hangmanImages[this.hangmanImages.length - 1];
    }
    return this.hangmanImages[this.incorrectGuesses];
  }
}

