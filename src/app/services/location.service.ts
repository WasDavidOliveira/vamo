import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

export interface LocationPricing {
  name: string;
  slug: string;
  state: string;
  prices: {
    basic: number;
    standard: number;
    premium: number;
  };
  features?: {
    installationIncluded: boolean;
    support24h: boolean;
    wifi5g: boolean;
    hdChannels: number;
    speedGuarantee: boolean;
  };
}

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private locations: LocationPricing[] = [
    {
      name: 'Maceió',
      slug: 'maceio',
      state: 'AL',
      prices: {
        basic: 49.9,
        standard: 79.9,
        premium: 99.9,
      },
      features: {
        installationIncluded: true,
        support24h: true,
        wifi5g: true,
        hdChannels: 100,
        speedGuarantee: true,
      },
    },
    {
      name: 'São José da Laje',
      slug: 'sao-jose-da-laje',
      state: 'AL',
      prices: {
        basic: 39.9,
        standard: 69.9,
        premium: 89.9,
      },
      features: {
        installationIncluded: true,
        support24h: true,
        wifi5g: true,
        hdChannels: 100,
        speedGuarantee: true,
      },
    },
    {
      name: 'Quipapá',
      slug: 'quipapa',
      state: 'PE',
      prices: {
        basic: 42.9,
        standard: 72.9,
        premium: 92.9,
      },
      features: {
        installationIncluded: true,
        support24h: true,
        wifi5g: true,
        hdChannels: 100,
        speedGuarantee: true,
      },
    },
    {
      name: 'Benedito do Sul',
      slug: 'benedito-do-sul',
      state: 'PE',
      prices: {
        basic: 41.9,
        standard: 71.9,
        premium: 91.9,
      },
      features: {
        installationIncluded: true,
        support24h: true,
        wifi5g: true,
        hdChannels: 100,
        speedGuarantee: true,
      },
    },
  ];

  private selectedLocationSubject = new BehaviorSubject<LocationPricing | null>(
    null
  );
  selectedLocation$ = this.selectedLocationSubject.asObservable();

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Verificar parâmetros da URL ao navegar
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkLocationParam();
      });

    // Verificação inicial de parâmetros
    this.checkLocationParam();
  }

  getLocations(): LocationPricing[] {
    return this.locations;
  }

  // Métodos para gerenciar cidades dinamicamente
  addLocation(location: LocationPricing): void {
    const existingIndex = this.locations.findIndex(loc => loc.slug === location.slug);

    if (existingIndex >= 0) {
      // Atualiza cidade existente
      this.locations[existingIndex] = location;
    } else {
      // Adiciona nova cidade
      this.locations.push(location);
    }

    this.sortLocations();
  }

  removeLocation(slug: string): boolean {
    const index = this.locations.findIndex(loc => loc.slug === slug);
    if (index >= 0) {
      this.locations.splice(index, 1);
      return true;
    }
    return false;
  }

  updateLocationPrices(slug: string, prices: { basic: number; standard: number; premium: number }): boolean {
    const location = this.locations.find(loc => loc.slug === slug);
    if (location) {
      location.prices = { ...prices };
      return true;
    }
    return false;
  }

  getLocationsByState(state: string): LocationPricing[] {
    return this.locations.filter(loc => loc.state === state);
  }

  getAvailableStates(): string[] {
    const states = [...new Set(this.locations.map(loc => loc.state))];
    return states.sort();
  }

  // Busca com filtros avançados
  searchLocations(term: string, state?: string): LocationPricing[] {
    let filtered = this.locations;

    if (state) {
      filtered = filtered.filter(loc => loc.state === state);
    }

    if (term.trim()) {
      const searchTerm = term.toLowerCase();
      filtered = filtered.filter(loc =>
        loc.name.toLowerCase().includes(searchTerm) ||
        loc.state.toLowerCase().includes(searchTerm)
      );
    }

    return filtered;
  }

  private sortLocations(): void {
    this.locations.sort((a, b) => {
      // Primeiro por estado, depois por nome
      if (a.state !== b.state) {
        return a.state.localeCompare(b.state);
      }
      return a.name.localeCompare(b.name);
    });
  }

  // Utilitário para criar slug a partir do nome
  createSlug(name: string): string {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove acentos
      .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
      .replace(/\s+/g, '-') // Substitui espaços por hífen
      .replace(/-+/g, '-') // Remove hífens duplos
      .trim();
  }

  selectLocation(location: LocationPricing): void {
    localStorage.setItem('selectedLocation', JSON.stringify(location));
    this.selectedLocationSubject.next(location);

    // Adicionar o parâmetro na URL atual
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { cidade: location.slug },
      queryParamsHandling: 'merge',
    });
  }

  // Helper para navegar para uma rota mantendo o parâmetro cidade
  navigateTo(path: string[]): void {
    const cidade = this.selectedLocationSubject.value?.slug;
    if (cidade) {
      this.router.navigate(path, {
        queryParams: { cidade },
        queryParamsHandling: 'merge',
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
          this.router.navigateByUrl(
            currentUrl + '?cidade=' + savedLocation.slug
          );
        }
      } catch (e) {
        console.error('Erro ao analisar localização salva:', e);
        localStorage.removeItem('selectedLocation');
      }
    }
  }
}
