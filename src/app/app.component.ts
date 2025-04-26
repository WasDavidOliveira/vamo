import { Component } from '@angular/core';
import { LocationPricing } from './services/location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vamo';
  
  onLocationSelected(location: LocationPricing): void {
    // O modal será fechado automaticamente pelo serviço
  }
}
