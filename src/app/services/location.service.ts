import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

export interface LocationPricing {
  name: string;
  slug: string;
  prices: {
    basic: number;
    standard: number;
    premium: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private locations: LocationPricing[] = [
    {
      name: 'Maceió',
      slug: 'maceio',
      prices: {
        basic: 49.90,
        standard: 79.90,
        premium: 99.90
      }
    },
    {
      name: 'São José da Laje',
      slug: 'sao-jose-da-laje',
      prices: {
        basic: 39.90,
        standard: 69.90,
        premium: 89.90
      }
    }
  ];

  private selectedLocationSubject = new BehaviorSubject<LocationPricing | null>(null);
  selectedLocation$ = this.selectedLocationSubject.asObservable();

  constructor(private router: Router, private route: ActivatedRoute) {
    // Verificar parâmetros da URL ao navegar
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkLocationParam();
    });

    // Verificação inicial de parâmetros
    this.checkLocationParam();
  }

  getLocations(): LocationPricing[] {
    return this.locations;
  }

  selectLocation(location: LocationPricing): void {
    localStorage.setItem('selectedLocation', JSON.stringify(location));
    this.selectedLocationSubject.next(location);
    
    // Adicionar o parâmetro na URL atual
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { cidade: location.slug },
      queryParamsHandling: 'merge'
    });
  }

  // Helper para navegar para uma rota mantendo o parâmetro cidade
  navigateTo(path: string[]): void {
    const cidade = this.selectedLocationSubject.value?.slug;
    if (cidade) {
      this.router.navigate(path, {
        queryParams: { cidade },
        queryParamsHandling: 'merge'
      });
    } else {
      this.router.navigate(path);
    }
  }

  hasLocationParam(): boolean {
    const params = new URLSearchParams(window.location.search);
    return params.has('cidade');
  }

  hasSelectedLocation(): boolean {
    return this.selectedLocationSubject.value !== null;
  }

  findLocationBySlug(slug: string): LocationPricing | null {
    return this.locations.find(loc => loc.slug === slug) || null;
  }

  private checkLocationParam(): void {
    const params = new URLSearchParams(window.location.search);
    const citySlug = params.get('cidade');
    
    if (citySlug) {
      const location = this.findLocationBySlug(citySlug);
      if (location) {
        this.selectedLocationSubject.next(location);
        localStorage.setItem('selectedLocation', JSON.stringify(location));
        return;
      }
    }
    
    // Se não encontrou na URL, tenta carregar do localStorage
    const saved = localStorage.getItem('selectedLocation');
    if (saved) {
      try {
        const savedLocation = JSON.parse(saved);
        this.selectedLocationSubject.next(savedLocation);
        
        // Adicionar à URL se não estiver lá
        if (!citySlug && savedLocation && savedLocation.slug) {
          const currentUrl = this.router.url.split('?')[0];
          this.router.navigateByUrl(currentUrl + '?cidade=' + savedLocation.slug);
        }
      } catch (e) {
        console.error('Erro ao analisar localização salva:', e);
        localStorage.removeItem('selectedLocation');
      }
    }
  }
} 