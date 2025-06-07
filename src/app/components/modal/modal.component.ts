import { Component, EventEmitter, Output, Input, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { LocationService, LocationPricing } from 'src/app/services/location.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, AfterViewInit {
  @Input() data: any;
  @Output() closeModalEvent = new EventEmitter<void>();

  selectedLocation: LocationPricing | null = null;
  selectedApp = '';

  constructor(
    private locationService: LocationService,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.locationService.selectedLocation$.subscribe(location => {
      this.selectedLocation = location;
    });
  }

  ngAfterViewInit() {
    this.setupAppSelection();
  }

  private setupAppSelection() {
    const appCards = this.elementRef.nativeElement.querySelectorAll('.app-card');

    appCards.forEach((card: any) => {
      card.addEventListener('click', () => {
        // Remove seleção anterior
        appCards.forEach((c: any) => c.classList.remove('selected'));

        // Adiciona seleção atual
        card.classList.add('selected');

        // Obtém o nome do app
        const appName = card.querySelector('h4').textContent;
        this.selectedApp = appName;
      });
    });
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

  getWhatsAppUrlModalStandard(): string {
    const price = this.getComboStandardPrice();
    let message = `https://api.whatsapp.com/send?phone=558005914866&text=Ol%C3%A1,%0AGostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20o%20plano%20de%20internet%20de%20300%20MEGA%20com%20instala%C3%A7%C3%A3o%20gr%C3%A1tis,%20suporte%20de%20domingo%20a%20domingo,%20Wi-Fi%205G%20de%20alta%20performance%20e%20mais%20de%20100%20canais%20de%20TV%20em%20HD`;

    if (this.selectedApp) {
      message += `%20%2B%20o%20aplicativo%20${encodeURIComponent(this.selectedApp)}`;
    }

    message += `%20por%20apenas%20R$%20${price}/m%C3%AAs.%20Como%20fa%C3%A7o%20para%20adquirir?`;
    return message;
  }

  getWhatsAppUrlModalPremium(): string {
    const price = this.getComboPremiumPrice();
    let message = `https://api.whatsapp.com/send?phone=558005914866&text=Ol%C3%A1,%0AGostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20o%20plano%20de%20internet%20de%20500%20MEGA%20com%20instala%C3%A7%C3%A3o%20gr%C3%A1tis,%20suporte%20de%20domingo%20a%20domingo,%20Wi-Fi%205G%20de%20alta%20performance%20e%20mais%20de%20100%20canais%20de%20TV%20em%20HD`;

    if (this.selectedApp) {
      message += `%20%2B%20o%20aplicativo%20${encodeURIComponent(this.selectedApp)}`;
    }

    message += `%20por%20apenas%20R$%20${price}/m%C3%AAs.%20Como%20fa%C3%A7o%20para%20adquirir?`;
    return message;
  }

  closeModal() {
    this.closeModalEvent.emit();
  }

  onImageError(event: any) {
    event.target.style.display = 'none';
    const parent = event.target.parentElement;
    if (parent && !parent.querySelector('.fallback-icon')) {
      const fallbackIcon = document.createElement('div');
      fallbackIcon.className = 'fallback-icon';
      fallbackIcon.innerHTML = '<i class="fas fa-image" style="font-size: 24px; color: #ccc;"></i>';
      fallbackIcon.style.cssText = 'display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; background: #f5f5f5; border-radius: 8px;';
      parent.appendChild(fallbackIcon);
    }
  }
}
