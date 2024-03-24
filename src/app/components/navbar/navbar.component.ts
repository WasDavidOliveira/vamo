import { Component, Input, ElementRef, AfterViewInit} from '@angular/core';


import { ActualpageService } from 'src/app/services/actualpage.service';

@Component({
  selector: 'navbar-home',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  currentPage: string = '';

  constructor(private actualPage: ActualpageService, private elementRef: ElementRef){}

  ngAfterViewInit(): void {

    const hamburguerButton = this.elementRef.nativeElement.querySelector('.hamburguer');

    hamburguerButton.addEventListener('click', (e:any) => {

      let aside = this.elementRef.nativeElement.querySelector('aside');



      if(!aside.classList.contains('active')){

        aside.classList.add('active');

      }

    });

    const closeAsideButton = this.elementRef.nativeElement.querySelector('.aside-header .icon');

    closeAsideButton.addEventListener('click', (e:any) => {

      let aside = this.elementRef.nativeElement.querySelector('aside');


      if(aside.classList.contains('active')){

        aside.classList.remove('active');

      }

    })

  }

  ngOnInit() {

    this.actualPage.getCurrentPage().subscribe(page => {

      this.currentPage = page;

    })



  }





}
