import { Component, OnInit, HostListener } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { isNumber } from 'util';
import { BackDropsService } from '../services/back-drops.service';
import { Router } from '@angular/router';
import { error } from 'protractor';
@Component({
  selector: 'app-mainquiz',
  templateUrl: './mainquiz.component.html',
  styleUrls: ['./mainquiz.component.scss']
})
export class MainquizComponent implements OnInit {
  index;
  timer;
  timer_interval;
  get timer_value(){
    return this.timer
  }
  _currentUser = JSON.parse(localStorage.getItem('contestant')) 
  _currntQuestion
  _currntAnswer
  constructor(private _quizService: QuizService, public _BackDropsService: BackDropsService, public _router: Router) { }

  inputErr(){
    document.getElementById('options').classList.add('error-options')
    setTimeout(()=>{
      document.getElementById('options').classList.remove('error-options')
    },500)
  }

  countDown(int: any){
    this.timer = int
    this.timer_interval = setInterval(()=>{ 
      this.timer = this.timer-1
      if(this.timer == 0){
        if(document.getElementById("next").innerText == 'Submit'){
          clearInterval(this.timer_interval);
          this.skip()
          document.getElementById('skip').style.visibility = 'hidden'
          document.getElementById("next").innerText = 'Next'
        } else {
          clearInterval(this.timer_interval);
          this.getQuestion()
          if(this._currentUser._skips == 0){
            document.getElementById('skip').style.visibility = 'hidden'
          } else {
            document.getElementById('skip').style.visibility = 'visible'
          }
          document.getElementById("next").innerText = 'Submit'
          
        }
        clearInterval(this.timer_interval); 
      }
    }, 700);
  }

  
  @HostListener('window:blur', ['$event'])
  onBlur(event: any): void {
    console.log(event)
    this._BackDropsService.showCC()
}

@HostListener('window:beforeunload', ['$event']) 
yourfunction($event) {
  localStorage.setItem('index',String(this.index))
    localStorage.setItem('timer',String(this.timer))
    localStorage.setItem('question', JSON.stringify(this._currntQuestion))
}

  ngOnInit(): void {
    if(localStorage.getItem('timer')){
      this._currntQuestion = JSON.parse(localStorage.getItem('question'))
      
      this.index = localStorage.getItem('index')
      this.countDown(Number(localStorage.getItem('timer')))

      localStorage.removeItem('index')
      localStorage.removeItem('timer')
      localStorage.removeItem('question')
    } else {
      this.getQuestion()
    }
    
    
   
  }

  getQuestion(){
    this._quizService.getQuestion().subscribe((result:any)=>{
      if(result.message == "No more questions") {
        clearInterval(this.timer_interval);
        this._BackDropsService.showFQ()
      } else {
        this.index = result.index
        this._currntQuestion = result.question
        this.countDown(result.question.timing)
      }

    })
  }

  submitQuestion(){
    if (this._currntAnswer){
      
      this._quizService.submitAnswer(this._currntQuestion._id,this._currntAnswer._id).subscribe((result:any)=>{
        
        if ( result.answer._id == this._currntAnswer._id) {
          document.getElementById(result.answer._id).style.backgroundColor = 'rgb(65, 192, 111)'
        } else {
          this.inputErr()
          document.getElementById(this._currntAnswer._id).style.backgroundImage = 'linear-gradient(109deg, rgb(255, 75, 88) 23%, rgb(232, 80, 91) 81%)'
          document.getElementById(result.answer._id).style.backgroundColor = 'rgb(65, 192, 111)'

        }
        
        
        this._currntAnswer = undefined
        this.countDown(5)
      })
    } else {
      document.getElementById("next").innerText = 'Submit'
      this.inputErr()
      
    }

  }

  skip(){
    if(document.getElementById("next").innerText == 'Submit'){
      if (this._currentUser._skips == 0) {
        clearInterval(this.timer_interval);
        this._BackDropsService.showSLE()
      } else {
        this._quizService.skipQuestion(this._currntQuestion._id).subscribe((result:any)=>{
          this.inputErr()
          document.getElementById(result.answer._id).style.backgroundColor = 'rgb(65, 192, 111)'
          
          this._currentUser._skips = result.skips 
          localStorage.setItem('contestant', JSON.stringify(this._currentUser))
          clearInterval(this.timer_interval);
          document.getElementById('skip').style.visibility = 'hidden'
          document.getElementById("next").innerText = 'Next'
          

          this.countDown(5)
        },
        (error:any)=>{
          document.getElementById('skip').style.visibility = 'hidden'
          
        })
      }

    } else {
      this.next()
    }

  }


  next(){
    if (this._currntAnswer && document.getElementById("next").innerText == 'Submit'){

        clearInterval(this.timer_interval);
        this.submitQuestion()
        document.getElementById('skip').style.visibility = 'hidden'
        document.getElementById("next").innerText = 'Next'
  
  

    } else {
      if( document.getElementById("next").innerText == 'Submit'){
        this.inputErr()
      } else {
        clearInterval(this.timer_interval);
        this.getQuestion()
        if(this._currentUser._skips ==0){
          document.getElementById('skip').style.visibility = 'hidden'
        } else {
          document.getElementById('skip').style.visibility = 'visible'
        }
        
        document.getElementById("next").innerText = 'Submit'
      }

    }

  }
  changeAnswer(answer){
    if(document.getElementById("next").innerText == 'Submit'){
      this._currntAnswer = answer
    }
    
    
  }
}
