import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { ActualpageService } from 'src/app/services/actualpage.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { PlansService, Plan } from 'src/app/services/plans.service';
import {
  LocationService,
  LocationPricing,
} from 'src/app/services/location.service';

@Component({
  selector: 'app-planos-page',
  templateUrl: './planos.component.html',
  styleUrls: ['./planos.component.scss'],
})
export class PlanosComponent implements OnInit, AfterViewInit {
  showModal = false;
  modalData: any;
  plans: Plan[] = [];
  selectedLocation: LocationPricing | null = null;

  constructor(
    private pageService: ActualpageService,
    private elementRef: ElementRef,
    private plansService: PlansService,
    private locationService: LocationService
  ) {
    this.pageService.setCurrentPage('planos');
  }

  ngOnInit(): void {
    this.plansService.getPlans().subscribe(plans => {
      this.plans = plans;
    });

    this.locationService.selectedLocation$.subscribe(location => {
      this.selectedLocation = location;
    });
  }

  openModal(type: string) {
    if (type == 'standard') {
      this.modalData = {
        content: 'standard',
      };
    } else if (type === 'premium') {
      this.modalData = {
        content: 'premium',
      };
    }
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  appsChoice: OwlOptions = {
    loop: false,
    items: 3,
    margin: 10,
    nav: false,
    dots: false,
    autoplay: true,
    autoplaySpeed: 3000,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      900: {
        items: 3
      }
    }
  };

  ngAfterViewInit(): void {
    const appOptions = this.elementRef.nativeElement.querySelectorAll('.app-option');

    appOptions.forEach((appOption: any) => {
      appOption.addEventListener('click', (event: any) => {
        let targetElement = event.target;

        if (!targetElement.classList.contains('app-option')) {
          targetElement = targetElement.closest('.app-option');
        }

        if (!targetElement) return;

        const comboCard = targetElement.closest('.combo-card');
        const selectedApps = this.elementRef.nativeElement.querySelectorAll('.app-option.selected');

        selectedApps.forEach((selectedApp: any) => {
          if (selectedApp.closest('.combo-card') === comboCard) {
            selectedApp.classList.remove('selected');
          }
        });

        targetElement.classList.toggle('selected');

        const ctaButton = comboCard.querySelector('.cta-button');
        if (ctaButton) {
          this.updateCtaButtonUrl(ctaButton, comboCard.id, targetElement);
        }
      });
    });
  }

  private updateCtaButtonUrl(button: any, planType: string, selectedApp: any) {
    const appId = selectedApp.id;
    let baseUrl = '';

    if (planType === 'standard' && appId) {
      baseUrl = 'https://api.whatsapp.com/send?phone=558005914866&text=Ol%C3%A1,%0AGostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20o%20plano%20de%20internet%20de%20300%20MEGA%20com%20instala%C3%A7%C3%A3o%20gr%C3%A1tis,%20suporte%20de%20domingo%20a%20domingo,%20Wi-Fi%205G%20de%20alta%20performance%20e%20mais%20de%20100%20canais%20de%20TV%20em%20HD';
    } else if (planType === 'premium' && appId) {
      baseUrl = 'https://api.whatsapp.com/send?phone=558005914866&text=Ol%C3%A1,%0AGostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20o%20plano%20de%20internet%20de%20500%20MEGA%20com%20instala%C3%A7%C3%A3o%20gr%C3%A1tis,%20suporte%20de%20domingo%20a%20domingo,%20Wi-Fi%205G%20de%20alta%20performance%20e%20mais%20de%20100%20canais%20de%20TV%20em%20HD';
    }

    if (baseUrl && appId && selectedApp.classList.contains('selected')) {
      const appText = '%20%2B%20o%20aplicativo%20' + appId;
      button.href = baseUrl + appText + '%20por%20apenas%20R%24%20' + (planType === 'standard' ? '64,90' : '84,90') + '/m%C3%AAs.%20Como%20fa%C3%A7o%20para%20adquirir?';
    } else {
      button.href = baseUrl + '%20por%20apenas%20R%24%20' + (planType === 'standard' ? '64,90' : '84,90') + '/m%C3%AAs.%20Como%20fa%C3%A7o%20para%20adquirir?';
    }
  }
}
