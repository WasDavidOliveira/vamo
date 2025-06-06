import { Injectable } from '@angular/core';
import { LocationService, LocationPricing } from './location.service';

export interface CityData {
  name: string;
  state: string;
  basicPrice: number;
  standardPrice: number;
  premiumPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class CityManagerService {

  constructor(private locationService: LocationService) {}

  // Adicionar nova cidade com validação
  addCity(cityData: CityData): boolean {
    try {
      const slug = this.locationService.createSlug(cityData.name);

      // Verificar se a cidade já existe
      if (this.locationService.findLocationBySlug(slug)) {
        console.warn(`Cidade ${cityData.name} já existe no sistema.`);
        return false;
      }

      const newLocation: LocationPricing = {
        name: cityData.name,
        slug: slug,
        state: cityData.state.toUpperCase(),
        prices: {
          basic: cityData.basicPrice,
          standard: cityData.standardPrice,
          premium: cityData.premiumPrice,
        },
        features: {
          installationIncluded: true,
          support24h: true,
          wifi5g: true,
          hdChannels: 100,
          speedGuarantee: true,
        },
      };

      this.locationService.addLocation(newLocation);
      console.log(`Cidade ${cityData.name} adicionada com sucesso!`);
      return true;

    } catch (error) {
      console.error('Erro ao adicionar cidade:', error);
      return false;
    }
  }

  // Atualizar preços de uma cidade
  updateCityPrices(cityName: string, prices: { basic: number; standard: number; premium: number }): boolean {
    const slug = this.locationService.createSlug(cityName);
    return this.locationService.updateLocationPrices(slug, prices);
  }

  // Remover cidade
  removeCity(cityName: string): boolean {
    const slug = this.locationService.createSlug(cityName);
    return this.locationService.removeLocation(slug);
  }

  // Adicionar múltiplas cidades de uma vez
  addMultipleCities(cities: CityData[]): { success: number; failed: number; results: { city: string; success: boolean; error?: string }[] } {
    const results = cities.map(city => {
      try {
        const success = this.addCity(city);
        return { city: city.name, success };
      } catch (error) {
        return {
          city: city.name,
          success: false,
          error: error instanceof Error ? error.message : 'Erro desconhecido'
        };
      }
    });

    const successCount = results.filter(r => r.success).length;
    const failedCount = results.filter(r => !r.success).length;

    return {
      success: successCount,
      failed: failedCount,
      results
    };
  }

  // Validar dados da cidade
  validateCityData(cityData: CityData): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!cityData.name || cityData.name.trim().length < 2) {
      errors.push('Nome da cidade deve ter pelo menos 2 caracteres');
    }

    if (!cityData.state || cityData.state.trim().length !== 2) {
      errors.push('Estado deve ter exatamente 2 caracteres (ex: PE, AL)');
    }

    if (cityData.basicPrice <= 0 || cityData.basicPrice > 1000) {
      errors.push('Preço do plano básico deve estar entre R$ 0,01 e R$ 1000,00');
    }

    if (cityData.standardPrice <= cityData.basicPrice) {
      errors.push('Preço do plano standard deve ser maior que o básico');
    }

    if (cityData.premiumPrice <= cityData.standardPrice) {
      errors.push('Preço do plano premium deve ser maior que o standard');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  // Obter estatísticas das cidades
  getCityStatistics(): {
    totalCities: number;
    statesCount: number;
    averagePrices: { basic: number; standard: number; premium: number };
    citiesByState: Record<string, number>;
  } {
    const locations = this.locationService.getLocations();

    const totalCities = locations.length;
    const states = this.locationService.getAvailableStates();
    const statesCount = states.length;

    // Calcular preços médios
    const totalPrices = locations.reduce(
      (acc, loc) => ({
        basic: acc.basic + loc.prices.basic,
        standard: acc.standard + loc.prices.standard,
        premium: acc.premium + loc.prices.premium,
      }),
      { basic: 0, standard: 0, premium: 0 }
    );

    const averagePrices = {
      basic: Number((totalPrices.basic / totalCities).toFixed(2)),
      standard: Number((totalPrices.standard / totalCities).toFixed(2)),
      premium: Number((totalPrices.premium / totalCities).toFixed(2)),
    };

    // Contar cidades por estado
    const citiesByState = locations.reduce((acc, loc) => {
      acc[loc.state] = (acc[loc.state] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalCities,
      statesCount,
      averagePrices,
      citiesByState,
    };
  }

  // Exportar dados das cidades (para backup/debug)
  exportCitiesData(): LocationPricing[] {
    return this.locationService.getLocations();
  }

  // Exemplo de uso para adicionar as novas cidades
  addNewCities(): void {
    const newCities: CityData[] = [
      {
        name: 'Quipapá',
        state: 'PE',
        basicPrice: 42.90,
        standardPrice: 72.90,
        premiumPrice: 92.90,
      },
      {
        name: 'Benedito do Sul',
        state: 'PE',
        basicPrice: 41.90,
        standardPrice: 71.90,
        premiumPrice: 91.90,
      },
    ];

    const result = this.addMultipleCities(newCities);
    console.log(`Resultado: ${result.success} cidades adicionadas, ${result.failed} falharam`);

    if (result.failed > 0) {
      result.results.filter(r => !r.success).forEach(r => {
        console.error(`Erro ao adicionar ${r.city}:`, r.error);
      });
    }
  }
}
