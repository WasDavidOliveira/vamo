import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocationService } from './location.service';

export interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
}

@Injectable({
  providedIn: 'root',
})
export class PlansService {
  private basicFeatures = [
    'Internet 50 Mbps',
    'Wi-Fi Grátis',
    'Instalação Gratuita',
  ];

  private standardFeatures = [
    'Internet 100 Mbps',
    'Wi-Fi Grátis',
    'Instalação Gratuita',
    'Suporte Técnico Prioritário',
  ];

  private premiumFeatures = [
    'Internet 300 Mbps',
    'Wi-Fi Grátis',
    'Instalação Gratuita',
    'Suporte Técnico Prioritário',
    'TV por Assinatura',
    'Aplicativo Exclusivo',
  ];

  constructor(private locationService: LocationService) {}

  getPlans(): Observable<Plan[]> {
    return this.locationService.selectedLocation$.pipe(
      map(location => {
        if (!location) {
          return [];
        }

        return [
          {
            id: 'basic',
            name: 'Básico',
            price: location.prices.basic,
            features: this.basicFeatures,
          },
          {
            id: 'standard',
            name: 'Padrão',
            price: location.prices.standard,
            features: this.standardFeatures,
          },
          {
            id: 'premium',
            name: 'Premium',
            price: location.prices.premium,
            features: this.premiumFeatures,
          },
        ];
      })
    );
  }
}
