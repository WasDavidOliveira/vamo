import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LocationService, LocationPricing } from '../../services/location.service';
import { LocationModalService } from '../../services/location-modal.service';

@Component({
  selector: 'app-location-selector',
  templateUrl: './location-selector.component.html',
  styleUrls: ['./location-selector.component.scss']
})
export class LocationSelectorComponent implements OnInit {
  locations: LocationPricing[] = [];
  showModal = false;
  
  @Output() locationSelected = new EventEmitter<LocationPricing>();

  constructor(
    private locationService: LocationService,
    private locationModalService: LocationModalService
  ) { }

  ngOnInit(): void {
    this.locations = this.locationService.getLocations();
    
    // Subscrever para as mudanças no estado do modal
    this.locationModalService.showModal$.subscribe(show => {
      this.showModal = show;
    });
  }

  selectLocation(location: LocationPricing): void {
    this.locationService.selectLocation(location);
    this.locationModalService.hideModal();
    this.locationSelected.emit(location);
  }
} 