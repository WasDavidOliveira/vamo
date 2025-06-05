import { Component, OnInit } from '@angular/core';
import { ActualpageService } from 'src/app/services/actualpage.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class AsideComponent implements OnInit {
  currentPage = '';

  constructor(private actualPage: ActualpageService) {}

  ngOnInit() {
    this.actualPage.getCurrentPage().subscribe(page => {
      this.currentPage = page;
    });
  }
}
