import { Component } from '@angular/core';
import { ActualpageService } from 'src/app/services/actualpage.service';

@Component({
  selector: 'footer-component',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  currentPage: string = '';

  constructor(private actualPage: ActualpageService){}

  ngOnInit() {

    this.actualPage.getCurrentPage().subscribe(page => {

      this.currentPage = page;

    })

  }

}
