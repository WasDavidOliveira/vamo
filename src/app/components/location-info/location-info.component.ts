import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocationService, LocationPricing } from '../../services/location.service';
import { LocationModalService } from '../../services/location-modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-location-info',
  templateUrl: './location-info.component.html',
  styleUrls: ['./location-info.component.scss']
})
export class LocationInfoComponent implements OnInit, OnDestroy {
  selectedLocation: LocationPricing | null = null;
  private locationSubscription?: Subscription;

  constructor(
    private locationService: LocationService,
    private locationModalService: LocationModalService
  ) { }

  ngOnInit(): void {
    this.locationSubscription = this.locationService.selectedLocation$.subscribe(location => {
      this.selectedLocation = location;
    });
  }

  ngOnDestroy(): void {
    this.locationSubscription?.unsubscribe();
  }

  openLocationSelector(): void {
    this.locationModalService.showModal();
  }
}
