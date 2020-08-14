import { Component, HostListener, OnDestroy } from '@angular/core';
import { BackDropsService } from './services/back-drops.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'FrontEnd';

  constructor(public _BackDropsService: BackDropsService){
    localStorage.setItem('cheats','1') 
  }
  startQuizTimer: Subject<boolean> = this._BackDropsService.startQuizTimer;
  FinishedQuiz: Subject<boolean> = this._BackDropsService.FinishedQuiz;
  CoughtCheating: Subject<boolean> = this._BackDropsService.CoughtCheating;
  SkipLemitExeded: Subject<boolean> = this._BackDropsService.SkipLemitExeded;
  isLoading: Subject<boolean> = this._BackDropsService.Loading;


  @HostListener('contextmenu', ['$event'])
  onRightClick(event) {
    event.preventDefault();
  }
  
  @HostListener('document:keydown.control.shift.i', ['$event']) 
  @HostListener('document:keydown.control.shift.c', ['$event']) 
  @HostListener('document:keydown.control.shift.j', ['$event']) 
  @HostListener('document:keydown.F12', ['$event']) 
  onDocument(event) {
    
    event.preventDefault();
  }

  ngOnDestroy(){
    localStorage.clear()
  }


}
