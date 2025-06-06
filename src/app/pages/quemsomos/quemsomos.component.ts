import { Component } from '@angular/core';
import { ActualpageService } from 'src/app/services/actualpage.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-quemsomos',
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
    autoplaySpeed: 2000,
    autoplayTimeout: 8000,
    autoplayHoverPause: true,
    navText: [
      '<i class="fa-solid fa-chevron-left"></i>',
      '<i class="fa-solid fa-chevron-right"></i>',
    ],
    autoWidth: false,
    autoHeight: true,
    smartSpeed: 1000,
    responsive: {
      0: {
        items: 1,
        nav: true,
        dots: true,
        margin: 0,
        stagePadding: 0,
        autoHeight: false,
        mouseDrag: true,
        touchDrag: true
      },
      480: {
        items: 1,
        nav: true,
        dots: true,
        margin: 0,
        stagePadding: 0,
        autoHeight: false,
        mouseDrag: true,
        touchDrag: true
      },
      768: {
        items: 1,
        nav: true,
        dots: true,
        margin: 0,
        stagePadding: 0,
        autoHeight: false,
        mouseDrag: true,
        touchDrag: true
      },
      1024: {
        items: 1,
        nav: true,
        dots: true,
        margin: 0,
        stagePadding: 0,
        autoHeight: false,
        mouseDrag: true,
        touchDrag: true
      }
    }
  };
}
