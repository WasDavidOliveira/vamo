import { Component, OnInit } from '@angular/core';
import { ActualpageService } from 'src/app/services/actualpage.service';
import { LocationService } from '../../services/location.service';
import { LocationPricing } from '../../models/location-pricing.model';

@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.scss'],
})
export class ContatosComponent implements OnInit {
  selectedLocation: LocationPricing | null = null;

  constructor(private pageService: ActualpageService, private locationService: LocationService) {
    this.pageService.setCurrentPage('contato');
  }

  ngOnInit() {
    this.locationService.selectedLocation$.subscribe(location => {
      this.selectedLocation = location;
    });
  }

  getMapsUrl(): string {
    if (!this.selectedLocation) return 'https://bit.ly/MapsVamoTelecom';

    const mapsLinks: Record<string, string> = {
      'São José da Laje': 'https://maps.app.goo.gl/kTN36N5ubhBcjgY36',
      'Maceió': 'https://maps.app.goo.gl/TKDWq4HJ8H3mu1qZ6',
      'Quipapá': 'https://maps.app.goo.gl/qGaMLMhxRNsFyvnu7',
      'Benedito do Sul': 'https://maps.app.goo.gl/p223u3hdq4fb8sH76'
    };

    return mapsLinks[this.selectedLocation.name] || 'https://bit.ly/MapsVamoTelecom';
  }

  getSchedule() {
    if (!this.selectedLocation) {
      return {
        weekday: { day: 'Segunda à Sexta', time: '08:00 - 18:00' },
        saturday: { day: 'Sábado', time: '08:00 - 12:00' },
        sunday: { day: 'Domingo', time: 'Fechado' }
      };
    }

    const schedules: Record<string, any> = {
      'São José da Laje': {
        weekday: { day: 'Segunda à Sexta', time: '08:00 - 19:00' },
        saturday: { day: 'Sábado', time: '08:00 - 17:00' },
        sunday: { day: 'Domingo', time: '08:00 - 17:00' }
      },
      'Maceió': {
        weekday: { day: 'Segunda à Sexta', time: '08:00 - 18:00' },
        saturday: { day: 'Sábado', time: '08:00 - 12:00' },
        sunday: { day: 'Domingo', time: 'Fechado' }
      },
      'Quipapá': {
        weekday: { day: 'Segunda à Sexta', time: '08:00 - 19:00' },
        saturday: { day: 'Sábado', time: '08:00 - 17:30' },
        sunday: { day: 'Domingo', time: 'Fechado' }
      },
      'Benedito do Sul': {
        weekday: { day: 'Segunda à Sexta', time: '08:00 - 19:00' },
        saturday: { day: 'Sábado', time: '08:00 - 17:30' },
        sunday: { day: 'Domingo', time: 'Fechado' }
      }
    };

    return schedules[this.selectedLocation.name] || schedules['Maceió'];
  }
}
