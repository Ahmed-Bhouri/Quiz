import { Component, OnInit } from '@angular/core';
import { BackDropsService } from '../services/back-drops.service';
import { Subject } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  code: string='';
  constructor(public _BackDropsService: BackDropsService, public _AuthService: AuthService, public _router: ActivatedRoute){}
  startQuizTimer: Subject<boolean> = this._BackDropsService.startQuizTimer;

  ngOnInit(): void {
this._router.queryParams.subscribe(result=>{
  this.code = result.code
})
  }


  inputErr(){
    document.getElementById('enterinput').classList.add('error-input')
    setTimeout(()=>{
      document.getElementById('enterinput').classList.remove('error-input')
    },500)
  }
  startQuiz(){
    if (this.code ==""){
      this.inputErr()
      document.getElementById('err-msg').style.visibility = 'visible'
      document.getElementById('err-msg').innerHTML = '*This Field Is required'
    } else {
      this._AuthService.LogUser(this.code).subscribe((result:any)=>{
        localStorage.setItem('token', result.token)
        localStorage.setItem('contestant', JSON.stringify(result.contestant))
        this._BackDropsService.showSQT()
        document.getElementById('err-msg').style.visibility = 'hidden'
      }, 
      (error:any)=>{
        this.inputErr()
        document.getElementById('err-msg').style.visibility = 'visible'
        document.getElementById('err-msg').innerHTML = '*'+error.error.message
      })
    }

    
  }

}
