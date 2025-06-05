import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  LocationService,
  LocationPricing,
} from '../../services/location.service';
import { LocationModalService } from '../../services/location-modal.service';

@Component({
  selector: 'app-location-selector',
  templateUrl: './location-selector.component.html',
  styleUrls: ['./location-selector.component.scss'],
})
export class LocationSelectorComponent implements OnInit {
  locations: LocationPricing[] = [];
  filteredLocations: LocationPricing[] = [];
  showModal = false;
  searchTerm = '';

  @Output() locationSelected = new EventEmitter<LocationPricing>();

  constructor(
    private locationService: LocationService,
    private locationModalService: LocationModalService
  ) {}

  ngOnInit(): void {
    this.locations = this.locationService.getLocations();
    this.filteredLocations = [...this.locations];

    this.locationModalService.showModal$.subscribe(show => {
      this.showModal = show;
      if (show) {
        this.searchTerm = '';
        this.filteredLocations = [...this.locations];
      }
    });
  }

  selectLocation(location: LocationPricing): void {
    this.locationService.selectLocation(location);
    this.locationModalService.hideModal();
    this.locationSelected.emit(location);
  }

  closeModal(): void {
    this.locationModalService.hideModal();
  }

  trackByLocation(index: number, location: LocationPricing): string {
    return location.name;
  }

  filterLocations(): void {
    if (!this.searchTerm.trim()) {
      this.filteredLocations = [...this.locations];
    } else {
      this.filteredLocations = this.locations.filter(location =>
        location.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}
