import { Component, OnInit } from '@angular/core';

import { AnimationItem  } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  options: AnimationOptions = {
    path: 'assets/animations/loader.json',
    loop:true
  };
  constructor() { }

  ngOnInit(): void {
  }

  

}
