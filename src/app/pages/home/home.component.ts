import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ActualpageService } from 'src/app/services/actualpage.service';
import { LocationService, LocationPricing } from 'src/app/services/location.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  showModal = false;
  modalData: any;
  selectedLocation: LocationPricing | null = null;

  openModal(type: string) {
    console.log();

    if (type == 'standard') {
      this.modalData = {
        content: 'standard',
      };
    }

    if (type === 'premium') {
      this.modalData = {
        content: 'premium',
      };
    }

    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  ngOnInit() {
    this.pageService.setCurrentPage('home');

    this.locationService.selectedLocation$.subscribe(location => {
      this.selectedLocation = location;
    });
  }

  constructor(
    private pageService: ActualpageService,
    private elementRef: ElementRef,
    private locationService: LocationService
  ) {}

  appSelected = '';

  customOptions: OwlOptions = {
    loop: true,
    dots: true,
    items: 1,
    margin: 0,
    nav: true,
    autoplay: true,
    autoplaySpeed: 3000,
    autoplayTimeout: 10000,
    autoplayHoverPause: true,
    navText: [
      '<i class="fa-solid fa-angle-left"></i>',
      '<i class="fa-solid fa-angle-right"></i>',
    ],
    autoWidth: true,
    autoHeight: true,
  };

  appsChoice: OwlOptions = {
    loop: true,
    items: 1,
    margin: 10,
    nav: true,
    navText: [
      '<i class="fa-solid fa-angle-left"></i>',
      '<i class="fa-solid fa-angle-right"></i>',
    ],
    autoplay: true,
    autoplaySpeed: 3000,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      1024: {
        items: 3
      }
    }
  };

  ngAfterViewInit(): void {
    const choicesApps =
      this.elementRef.nativeElement.querySelectorAll('.app-choice');
    choicesApps.forEach((choiceApp: any) => {
      choiceApp.addEventListener('click', (element: any) => {
        let div = element.target;

        if (!div.classList.contains('app-choice')) {
          div = div.parentNode;
        }

        if (div.classList.contains('selected')) {
          div.classList.remove('selected');

          const cardPlano =
            div.parentNode.parentNode.parentNode.parentNode.parentNode
              .parentNode.parentNode.parentNode.parentNode;

          let url = 'null';

          if (cardPlano.id == 'standard' && div.id != null) {
            url =
              'https://api.whatsapp.com/send?phone=558005914866&text=Ol%C3%A1,%0AGostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20o%20plano%20de%20internet%20de%20300%20MEGA%20com%20instala%C3%A7%C3%A3o%20gr%C3%A1tis,%20suporte%20de%20domingo%20a%20domingo,%20Wi-Fi%205G%20de%20alta%20performance%20e%20mais%20de%20100%20canais%20de%20TV%20em%20HD%20por%20apenas%20R%24%2064,90/m%C3%AAs.%20Como%20fa%C3%A7o%20para%20adquirir?';
          } else if (cardPlano.id == 'premium' && div.id != null) {
            url =
              'https://api.whatsapp.com/send?phone=558005914866&text=Ol%C3%A1,%0AGostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20o%20plano%20de%20internet%20de%20500%20MEGA%20com%20instala%C3%A7%C3%A3o%20gr%C3%A1tis,%20suporte%20de%20domingo%20a%20domingo,%20Wi-Fi%205G%20de%20alta%20performance%20e%20mais%20de%20100%20canais%20de%20TV%20em%20HD%20por%20apenas%20R%24%2084,90/m%C3%AAs.%20Como%20fa%C3%A7o%20para%20adquirir?';
          }

          const hrefLink = cardPlano.querySelector('a');

          hrefLink.href = url;
        } else {
          const choicesAppsSelected =
            this.elementRef.nativeElement.querySelectorAll(
              '.app-choice.selected'
            );

          if (choicesAppsSelected != null) {
            choicesAppsSelected.forEach((choiceSelected: any) => {
              choiceSelected.classList.remove('selected');
            });
          }

          div.classList.add('selected');

          const cardPlano =
            div.parentNode.parentNode.parentNode.parentNode.parentNode
              .parentNode.parentNode.parentNode.parentNode;

          let url = 'null';

          if (cardPlano.id == 'plus' && div.id != null) {
            url =
              'https://api.whatsapp.com/send?phone=558005914866&text=Ol%C3%A1,%0AGostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20o%20plano%20de%20internet%20de%20300%20MEGA%20com%20instala%C3%A7%C3%A3o%20gr%C3%A1tis,%20suporte%20de%20domingo%20a%20domingo,%20Wi-Fi%205G%20de%20alta%20performance%20e%20mais%20de%20100%20canais%20de%20TV%20em%20HD%20por%20apenas%20R%24%2064,90/m%C3%AAs.%20Como%20fa%C3%A7o%20para%20adquirir?';
          } else if (cardPlano.id == 'ultra' && div.id != null) {
            url =
              'https://api.whatsapp.com/send?phone=558005914866&text=Ol%C3%A1,%0AGostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20o%20plano%20de%20internet%20de%20500%20MEGA%20com%20instala%C3%A7%C3%A3o%20gr%C3%A1tis,%20suporte%20de%20domingo%20a%20domingo,%20Wi-Fi%205G%20de%20alta%20performance%20e%20mais%20de%20100%20canais%20de%20TV%20em%20HD%20por%20apenas%20R%24%2084,90/m%C3%AAs.%20Como%20fa%C3%A7o%20para%20adquirir?';
          }

          const hrefLink = cardPlano.querySelector('a');
          const index = hrefLink.href.indexOf('HD');

          const newText = '20%2B%20o%20aplicativo%20' + div.id + '%';

          if (div.id != null) {
            if (index !== -1) {
              hrefLink.href =
                url.slice(0, index + 3) + newText + url.slice(index + 3);
            }
          }
        }
      });
    });
  }
}
