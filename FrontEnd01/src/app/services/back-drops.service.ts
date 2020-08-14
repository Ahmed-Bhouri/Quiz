import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackDropsService {

  constructor() { }

  Loading = new Subject<boolean>();
  showL() {
      this.Loading.next(true);
  }
  hideL() {
      this.Loading.next(false);
  }

  startQuizTimer = new Subject<boolean>();
  showSQT() {
      this.startQuizTimer.next(true);
  }
  hideSQT() {
      this.startQuizTimer.next(false);
  }

  FinishedQuiz = new Subject<boolean>();
  showFQ() {
      this.FinishedQuiz.next(true);
  }
  hideFQ() {
      this.FinishedQuiz.next(false);
  }

  CoughtCheating = new Subject<boolean>();
  showCC() {
      this.CoughtCheating.next(true);
  }
  hideCC() {
      this.CoughtCheating.next(false);
  }

  SkipLemitExeded = new Subject<boolean>();
  showSLE() {
      this.SkipLemitExeded.next(true);
  }
  hideSLE() {
      this.SkipLemitExeded.next(false);
  }
}
