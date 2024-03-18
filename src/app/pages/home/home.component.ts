import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  ngOnInit() {
   
  }

  customOptions: OwlOptions = {
    loop: true,
    dots: true,
    items:1,
    margin:0,
    nav: false,
    autoplay: true,
    autoplaySpeed: 1500,
    autoplayTimeout: 5000,
    autoplayHoverPause:true,
  }

}
