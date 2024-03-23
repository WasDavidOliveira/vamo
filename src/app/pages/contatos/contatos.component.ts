import { Component } from '@angular/core';
import { ActualpageService } from 'src/app/services/actualpage.service';

@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.scss']
})
export class ContatosComponent {

  constructor(private pageService: ActualpageService){

    this.pageService.setCurrentPage('contato');

  }

}
