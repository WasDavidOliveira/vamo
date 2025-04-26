import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocationService } from './location.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationModalService {
  private showModalSubject = new BehaviorSubject<boolean>(false);
  showModal$ = this.showModalSubject.asObservable();

  constructor(
    private locationService: LocationService, 
    private router: Router
  ) {
    // Verificar se deve mostrar o modal a cada mudança de rota
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkShouldShowModal();
    });
    
    // Verificação inicial
    this.checkShouldShowModal();
  }

  private checkShouldShowModal(): void {
    // Se não tiver o parâmetro de cidade ou não tiver uma localidade selecionada, mostra o modal
    if (!this.locationService.hasLocationParam() || !this.locationService.hasSelectedLocation()) {
      this.showModalSubject.next(true);
    }
  }

  showModal(): void {
    this.showModalSubject.next(true);
  }

  hideModal(): void {
    this.showModalSubject.next(false);
  }
} 