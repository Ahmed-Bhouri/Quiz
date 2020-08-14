import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  _api = environment.api + 'api/'
  _QuestioinRoute = this._api + 'quiz/question/'
  _AnswerRoute = this._api + 'quiz/answer/'
  _SkipRoute = this._api + 'quiz/skip/'
  _CheatRoute = this._api + 'quiz/cheat/'

  constructor(private _http: HttpClient) { }
  
  skipQuestion(QId){
    return this._http.patch(this._SkipRoute,{questionId: QId})
  }

  getQuestion(){
    return this._http.get(this._QuestioinRoute)
  }

  submitAnswer(QId, AId){
    return this._http.patch(this._AnswerRoute,{questionId: QId, answerId: AId })
  }

  cheat(){
    return this._http.patch(this._CheatRoute,{})
  }

}
