import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { ActualpageService } from 'src/app/services/actualpage.service';
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

  getWhatsAppUrlBasic(): string {
    if (!this.selectedLocation) {
      return '#';
    }

    const priceMain = this.selectedLocation.prices.basic.toFixed(0);
    const priceCents = ((this.selectedLocation.prices.basic % 1) * 100).toFixed(0).padStart(2, '0');
    const price = `${priceMain},${priceCents}`;

    return `https://api.whatsapp.com/send?phone=558005914866&text=Ol%C3%A1,%0AGostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20o%20plano%20de%20internet%20de%20200%20MEGA%20com%20instala%C3%A7%C3%A3o%20gr%C3%A1tis,%20suporte%2024/7,%20Wi-Fi%205G%20de%20alta%20performance%20e%20mais%20de%20100%20canais%20de%20TV%20HD%20por%20apenas%20R$%20${price}/m%C3%AAs.%20Como%20fa%C3%A7o%20para%20adquirir?`;
  }

  getWhatsAppUrlPlus(): string {
    if (!this.selectedLocation) {
      return '#';
    }

    const priceMain = this.selectedLocation.prices.standard.toFixed(0);
    const priceCents = ((this.selectedLocation.prices.standard % 1) * 100).toFixed(0).padStart(2, '0');
    const price = `${priceMain},${priceCents}`;

    return `https://api.whatsapp.com/send?phone=558005914866&text=Ol%C3%A1,%0AGostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20o%20plano%20de%20internet%20de%20300%20MEGA%20com%20instala%C3%A7%C3%A3o%20gr%C3%A1tis,%20suporte%2024/7,%20Wi-Fi%205G%20de%20alta%20performance%20e%20mais%20de%20100%20canais%20de%20TV%20HD%20por%20apenas%20R$%20${price}/m%C3%AAs.%20Como%20fa%C3%A7o%20para%20adquirir?`;
  }

  getWhatsAppUrlUltra(): string {
    if (!this.selectedLocation) {
      return '#';
    }

    const priceMain = this.selectedLocation.prices.premium.toFixed(0);
    const priceCents = ((this.selectedLocation.prices.premium % 1) * 100).toFixed(0).padStart(2, '0');
    const price = `${priceMain},${priceCents}`;

    return `https://api.whatsapp.com/send?phone=558005914866&text=Ol%C3%A1,%0AGostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20o%20plano%20de%20internet%20de%20500%20MEGA%20com%20instala%C3%A7%C3%A3o%20gr%C3%A1tis,%20suporte%2024/7,%20Wi-Fi%205G%20de%20alta%20performance%20e%20mais%20de%20100%20canais%20de%20TV%20HD%20por%20apenas%20R$%20${price}/m%C3%AAs.%20Como%20fa%C3%A7o%20para%20adquirir?`;
  }

  getComboStandardPrice(): string {
    if (!this.selectedLocation) {
      return '64,90';
    }

    const basePrice = this.selectedLocation.prices.standard + 15;
    const priceMain = basePrice.toFixed(0);
    const priceCents = ((basePrice % 1) * 100).toFixed(0).padStart(2, '0');
    return `${priceMain},${priceCents}`;
  }

  getComboPremiumPrice(): string {
    if (!this.selectedLocation) {
      return '84,90';
    }

    const basePrice = this.selectedLocation.prices.premium + 15;
    const priceMain = basePrice.toFixed(0);
    const priceCents = ((basePrice % 1) * 100).toFixed(0).padStart(2, '0');
    return `${priceMain},${priceCents}`;
  }

  getWhatsAppUrlComboStandard(): string {
    const price = this.getComboStandardPrice();
    return `https://api.whatsapp.com/send?phone=558005914866&text=Ol%C3%A1,%0AGostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20o%20plano%20de%20internet%20de%20300%20MEGA%20com%20instala%C3%A7%C3%A3o%20gr%C3%A1tis,%20suporte%20de%20domingo%20a%20domingo,%20Wi-Fi%205G%20de%20alta%20performance%20e%20mais%20de%20100%20canais%20de%20TV%20em%20HD%20por%20apenas%20R$%20${price}/m%C3%AAs.%20Como%20fa%C3%A7o%20para%20adquirir?`;
  }

  getWhatsAppUrlComboPremium(): string {
    const price = this.getComboPremiumPrice();
    return `https://api.whatsapp.com/send?phone=558005914866&text=Ol%C3%A1,%0AGostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20o%20plano%20de%20internet%20de%20500%20MEGA%20com%20instala%C3%A7%C3%A3o%20gr%C3%A1tis,%20suporte%20de%20domingo%20a%20domingo,%20Wi-Fi%205G%20de%20alta%20performance%20e%20mais%20de%20100%20canais%20de%20TV%20em%20HD%20por%20apenas%20R$%20${price}/m%C3%AAs.%20Como%20fa%C3%A7o%20para%20adquirir?`;
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
    let price = '';

    if (planType === 'standard' && appId) {
      baseUrl = 'https://api.whatsapp.com/send?phone=558005914866&text=Ol%C3%A1,%0AGostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20o%20plano%20de%20internet%20de%20300%20MEGA%20com%20instala%C3%A7%C3%A3o%20gr%C3%A1tis,%20suporte%20de%20domingo%20a%20domingo,%20Wi-Fi%205G%20de%20alta%20performance%20e%20mais%20de%20100%20canais%20de%20TV%20em%20HD';
      price = this.getComboStandardPrice();
    } else if (planType === 'premium' && appId) {
      baseUrl = 'https://api.whatsapp.com/send?phone=558005914866&text=Ol%C3%A1,%0AGostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20o%20plano%20de%20internet%20de%20500%20MEGA%20com%20instala%C3%A7%C3%A3o%20gr%C3%A1tis,%20suporte%20de%20domingo%20a%20domingo,%20Wi-Fi%205G%20de%20alta%20performance%20e%20mais%20de%20100%20canais%20de%20TV%20em%20HD';
      price = this.getComboPremiumPrice();
    }

    if (baseUrl && appId && selectedApp.classList.contains('selected')) {
      const appText = '%20%2B%20o%20aplicativo%20' + appId;
      button.href = baseUrl + appText + '%20por%20apenas%20R%24%20' + price + '/m%C3%AAs.%20Como%20fa%C3%A7o%20para%20adquirir?';
    } else if (baseUrl) {
      button.href = baseUrl + '%20por%20apenas%20R%24%20' + price + '/m%C3%AAs.%20Como%20fa%C3%A7o%20para%20adquirir?';
    }
  }

  isMaceio(): boolean {
    return this.selectedLocation?.slug === 'maceio';
  }

  getHeroBanner(): string {
    return this.isMaceio()
      ? 'assets/Banners/MAX-Maceio.png'
      : 'assets/Banners/MAX.png';
  }
}
