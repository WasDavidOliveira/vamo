# Sistema de Gerenciamento Dinâmico de Cidades

Este documento explica como adicionar, editar e gerenciar cidades no sistema Vamo de forma dinâmica.

## 📋 Índice
- [Estrutura do Sistema](#estrutura-do-sistema)
- [Adicionando Novas Cidades](#adicionando-novas-cidades)
- [Atualizando Preços](#atualizando-preços)
- [Removendo Cidades](#removendo-cidades)
- [Métodos Utilitários](#métodos-utilitários)
- [Exemplos Práticos](#exemplos-práticos)

## 🏗️ Estrutura do Sistema

### Serviços Principais

1. **LocationService** (`src/app/services/location.service.ts`)
   - Gerencia a lista de cidades e seus dados
   - Controla a seleção de localização
   - Manipula parâmetros de URL

2. **CityManagerService** (`src/app/services/city-manager.service.ts`)
   - Interface amigável para gerenciar cidades
   - Validação de dados
   - Operações em lote

### Interface de Dados

```typescript
interface LocationPricing {
  name: string;           // Nome da cidade
  slug: string;           // URL-friendly (gerado automaticamente)
  state: string;          // Estado (PE, AL, etc.)
  prices: {
    basic: number;        // Preço plano básico
    standard: number;     // Preço plano padrão
    premium: number;      // Preço plano premium
  };
  features?: {
    installationIncluded: boolean;
    support24h: boolean;
    wifi5g: boolean;
    hdChannels: number;
    speedGuarantee: boolean;
  };
}
```

## ➕ Adicionando Novas Cidades

### Método 1: Usando CityManagerService (Recomendado)

```typescript
import { CityManagerService, CityData } from './services/city-manager.service';

// Injetar o serviço no construtor
constructor(private cityManager: CityManagerService) {}

// Adicionar uma cidade
addNewCity() {
  const newCity: CityData = {
    name: 'Quipapá',
    state: 'PE',
    basicPrice: 42.90,
    standardPrice: 72.90,
    premiumPrice: 92.90
  };

  const success = this.cityManager.addCity(newCity);
  if (success) {
    console.log('Cidade adicionada com sucesso!');
  }
}
```

### Método 2: Adicionando Múltiplas Cidades

```typescript
addMultipleCities() {
  const cities: CityData[] = [
    {
      name: 'Quipapá',
      state: 'PE',
      basicPrice: 42.90,
      standardPrice: 72.90,
      premiumPrice: 92.90
    },
    {
      name: 'Benedito do Sul',
      state: 'PE',
      basicPrice: 41.90,
      standardPrice: 71.90,
      premiumPrice: 91.90
    }
  ];

  const result = this.cityManager.addMultipleCities(cities);
  console.log(`${result.success} cidades adicionadas, ${result.failed} falharam`);
}
```

## 💰 Atualizando Preços

```typescript
updatePrices() {
  const newPrices = {
    basic: 45.90,
    standard: 75.90,
    premium: 95.90
  };

  const success = this.cityManager.updateCityPrices('Quipapá', newPrices);
  if (success) {
    console.log('Preços atualizados com sucesso!');
  }
}
```

## ❌ Removendo Cidades

```typescript
removeCity() {
  const success = this.cityManager.removeCity('Nome da Cidade');
  if (success) {
    console.log('Cidade removida com sucesso!');
  }
}
```

## 🛠️ Métodos Utilitários

### Validação de Dados

```typescript
validateCity() {
  const cityData: CityData = {
    name: 'Nova Cidade',
    state: 'PE',
    basicPrice: 40.00,
    standardPrice: 70.00,
    premiumPrice: 90.00
  };

  const validation = this.cityManager.validateCityData(cityData);
  if (!validation.valid) {
    console.log('Erros encontrados:', validation.errors);
  }
}
```

### Estatísticas

```typescript
getStats() {
  const stats = this.cityManager.getCityStatistics();
  console.log('Total de cidades:', stats.totalCities);
  console.log('Estados atendidos:', stats.statesCount);
  console.log('Preços médios:', stats.averagePrices);
  console.log('Cidades por estado:', stats.citiesByState);
}
```

### Filtros e Buscas

```typescript
import { LocationService } from './services/location.service';

constructor(private locationService: LocationService) {}

searchCities() {
  // Buscar por termo
  const results = this.locationService.searchLocations('quipa');
  
  // Buscar por estado
  const peCities = this.locationService.getLocationsByState('PE');
  
  // Buscar com filtro combinado
  const filtered = this.locationService.searchLocations('benedito', 'PE');
}
```

## 📝 Exemplos Práticos

### 1. Componente para Adicionar Cidade (Admin)

```typescript
@Component({
  selector: 'app-add-city',
  template: `
    <form (ngSubmit)="addCity()">
      <input [(ngModel)]="cityData.name" placeholder="Nome da cidade" required>
      <input [(ngModel)]="cityData.state" placeholder="Estado (PE, AL)" required>
      <input [(ngModel)]="cityData.basicPrice" type="number" placeholder="Preço básico" required>
      <input [(ngModel)]="cityData.standardPrice" type="number" placeholder="Preço padrão" required>
      <input [(ngModel)]="cityData.premiumPrice" type="number" placeholder="Preço premium" required>
      <button type="submit">Adicionar Cidade</button>
    </form>
  `
})
export class AddCityComponent {
  cityData: CityData = {
    name: '',
    state: '',
    basicPrice: 0,
    standardPrice: 0,
    premiumPrice: 0
  };

  constructor(private cityManager: CityManagerService) {}

  addCity() {
    const validation = this.cityManager.validateCityData(this.cityData);
    
    if (!validation.valid) {
      alert('Erros: ' + validation.errors.join(', '));
      return;
    }

    const success = this.cityManager.addCity(this.cityData);
    if (success) {
      alert('Cidade adicionada com sucesso!');
      this.resetForm();
    } else {
      alert('Erro ao adicionar cidade');
    }
  }

  resetForm() {
    this.cityData = {
      name: '',
      state: '',
      basicPrice: 0,
      standardPrice: 0,
      premiumPrice: 0
    };
  }
}
```

### 2. Console Commands (Para Development)

No console do navegador (F12):

```javascript
// Obter instância do serviço (se disponível globalmente)
const cityManager = window.ng.getInjector().get('CityManagerService');

// Adicionar cidade rapidamente
cityManager.addCity({
  name: 'Nova Cidade',
  state: 'PE',
  basicPrice: 45.90,
  standardPrice: 75.90,
  premiumPrice: 95.90
});

// Ver estatísticas
console.table(cityManager.getCityStatistics());

// Exportar dados para backup
console.log(JSON.stringify(cityManager.exportCitiesData(), null, 2));
```

## 🎯 Cidades Já Adicionadas

O sistema já inclui as seguintes cidades:

### Alagoas (AL)
- **Maceió**: R$ 49,90 / R$ 79,90 / R$ 99,90
- **São José da Laje**: R$ 39,90 / R$ 69,90 / R$ 89,90

### Pernambuco (PE)
- **Quipapá**: R$ 42,90 / R$ 72,90 / R$ 92,90
- **Benedito do Sul**: R$ 41,90 / R$ 71,90 / R$ 91,90

## 🔧 Manutenção

### Backup dos Dados

```typescript
exportData() {
  const data = this.cityManager.exportCitiesData();
  const json = JSON.stringify(data, null, 2);
  
  // Salvar em arquivo ou enviar para servidor
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'cities-backup.json';
  a.click();
}
```

### Monitoramento

```typescript
ngOnInit() {
  // Monitorar mudanças nas cidades
  this.locationService.selectedLocation$.subscribe(location => {
    if (location) {
      console.log(`Cidade selecionada: ${location.name}, ${location.state}`);
      console.log(`Preços: Basic R$ ${location.prices.basic}, Standard R$ ${location.prices.standard}, Premium R$ ${location.prices.premium}`);
    }
  });
}
```

## 📊 URLs com Parâmetros

O sistema gera automaticamente URLs amigáveis:

- `http://site.com/planos?cidade=quipapa`
- `http://site.com/planos?cidade=benedito-do-sul`
- `http://site.com/planos?cidade=maceio`

## 🚀 Próximos Passos

1. **Interface Admin**: Criar tela administrativa para gerenciar cidades
2. **API Integration**: Conectar com backend para persistência de dados
3. **Caching**: Implementar cache para melhor performance
4. **Analytics**: Adicionar tracking de seleções de cidade

---

*Sistema desenvolvido para facilitar o gerenciamento dinâmico de cidades e preços no projeto Vamo.* 
