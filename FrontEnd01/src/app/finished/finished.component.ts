import { Component, OnInit } from '@angular/core';
import { BackDropsService } from '../services/back-drops.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-finished',
  templateUrl: './finished.component.html',
  styleUrls: ['./finished.component.scss']
})
export class FinishedComponent implements OnInit {

  constructor(public _BackDropsService: BackDropsService, public _authservice: AuthService, public _router: Router){}
  FinishedQuiz: Subject<boolean> = this._BackDropsService.FinishedQuiz;

  ngOnInit(): void {
    this._authservice.logOut()
    this._router.navigate(['/home'])
    
  }

  close(){
    this._BackDropsService.hideFQ()
    
  }

}
