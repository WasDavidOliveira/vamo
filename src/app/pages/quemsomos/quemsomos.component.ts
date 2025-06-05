import { Component } from '@angular/core';
import { ActualpageService } from 'src/app/services/actualpage.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'quemsomos-page',
  templateUrl: './quemsomos.component.html',
  styleUrls: ['./quemsomos.component.scss'],
})
export class QuemsomosComponent {
  constructor(private pageService: ActualpageService) {
    this.pageService.setCurrentPage('quem-somos');
  }

  customOptions: OwlOptions = {
    loop: true,
    dots: true,
    items: 1,
    margin: 0,
    nav: true,
    autoplay: true,
    autoplaySpeed: 1500,
    autoplayTimeout: 10000,
    autoplayHoverPause: true,
    navText: [
      '<i class="fa-solid fa-chevron-left"></i>',
      '<i class="fa-solid fa-chevron-right"></i>',
    ],
    autoWidth: true,
    autoHeight: true,
  };
}
