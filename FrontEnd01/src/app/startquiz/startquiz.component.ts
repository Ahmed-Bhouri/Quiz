import { Component, OnInit } from '@angular/core';
import { BackDropsService } from '../services/back-drops.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { isNumber } from 'util';

@Component({
  selector: 'app-startquiz',
  templateUrl: './startquiz.component.html',
  styleUrls: ['./startquiz.component.scss']
})
export class StartquizComponent implements OnInit {
  time = 5
  a:any = this.time
  startQuizTimer: Subject<boolean> = this._BackDropsService.startQuizTimer;
  get count(){
    return this.a
  }
    constructor(public _BackDropsService: BackDropsService, public _router: Router) { }
  
    ngOnInit(): void {
      this.bla()
    }
  bla(){
    
    
    var interval = setInterval(()=>{ 
      if( isNumber(this.a)){this.a --}
      
      
      if(this.a == 'GO !'){document.getElementById('timer').classList.remove('Timer');this._router.navigate(['/quiz'])}
      if (this.a == 0){ this.a  = 'GO !';  }
  
  
    }, 1000);
    setTimeout(() => { 
      this._BackDropsService.hideSQT()
      clearInterval(interval); 
      
      this.a = this.time
    }, (this.time + 1)  * 1000);
  }
}
