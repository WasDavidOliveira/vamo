import { Component, OnInit } from '@angular/core';
import { LocationPricing } from './services/location.service';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'vamo';

  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.simulateAppLoad();
  }

  private simulateAppLoad(): void {
    const loadingSteps = [
      { delay: 800, message: 'Carregando dados...' },
      { delay: 1200, message: 'Configurando interface...' },
      { delay: 1800, message: 'Finalizando...' }
    ];

    let currentStep = 0;

    const executeStep = () => {
      if (currentStep < loadingSteps.length) {
        setTimeout(() => {
          currentStep++;
          if (currentStep < loadingSteps.length) {
            executeStep();
          } else {
            this.loadingService.hide();
          }
        }, loadingSteps[currentStep].delay);
      }
    };

    executeStep();
  }

  onLocationSelected(_location: LocationPricing): void {

  }
}
