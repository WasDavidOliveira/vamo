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
}
