import { Component, Input } from '@angular/core';


import { ActualpageService } from 'src/app/services/actualpage.service';

@Component({
  selector: 'navbar-home',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  currentPage: string = '';

  constructor(private actualPage: ActualpageService){}

  ngOnInit() {

    this.actualPage.getCurrentPage().subscribe(page => {

      this.currentPage = page;

    })

  }



}
