import { Component } from '@angular/core';
import { ActualpageService } from 'src/app/services/actualpage.service';

@Component({
  selector: 'quemsomos-page',
  templateUrl: './quemsomos.component.html',
  styleUrls: ['./quemsomos.component.scss']
})
export class QuemsomosComponent {

  constructor(private pageService: ActualpageService){

    this.pageService.setCurrentPage('quem-somos');

  }


}
