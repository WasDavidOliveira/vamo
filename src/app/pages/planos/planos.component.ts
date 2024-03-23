import { Component } from '@angular/core';
import { ActualpageService } from 'src/app/services/actualpage.service';
@Component({
  selector: 'planos-page',
  templateUrl: './planos.component.html',
  styleUrls: ['./planos.component.scss']
})
export class PlanosComponent {

  constructor(private pageService: ActualpageService){

    this.pageService.setCurrentPage('planos');

  }

}
