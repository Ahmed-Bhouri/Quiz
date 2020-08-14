import { Component, OnInit } from '@angular/core';
import { BackDropsService } from '../services/back-drops.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { QuizService } from '../services/quiz.service';
import { isUndefined } from 'util';

@Component({
  selector: 'app-cheating',
  templateUrl: './cheating.component.html',
  styleUrls: ['./cheating.component.scss']
})
export class CheatingComponent implements OnInit {
  lastChance
  constructor(public _BackDropsService: BackDropsService, public _authservice: AuthService, public _QuizService: QuizService, public _router: Router){}

  ngOnInit(): void {

    this._QuizService.cheat().subscribe((result:any)=>{
      
      
      if(result.message== "This is a cheating warning") {
        this.lastChance = true
      }else {
        this.lastChance = false
        this._authservice.logOut()
        this._router.navigate(['/home'])
        setTimeout(()=>{this.close()},6000)
      }

    }, (err)=>{

    })
     

  }

  close(){
    this._BackDropsService.hideCC()
    
  }
}
