import { Component, AfterViewInit } from '@angular/core';
import { ActualpageService } from 'src/app/services/actualpage.service';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

@Component({
  selector: 'app-quemsomos',
  templateUrl: './quemsomos.component.html',
  styleUrls: ['./quemsomos.component.scss'],
})
export class QuemsomosComponent implements AfterViewInit {
  private swiper: Swiper | undefined;

  constructor(private pageService: ActualpageService) {
    this.pageService.setCurrentPage('quem-somos');
  }

  ngAfterViewInit(): void {
    this.initSwiper();
  }

  private initSwiper(): void {
    Swiper.use([Navigation, Pagination, Autoplay]);

    this.swiper = new Swiper('.hero-carousel .swiper', {
      loop: true,
      autoplay: {
        delay: 8000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 2000,
      autoHeight: true,
    });
  }
}
