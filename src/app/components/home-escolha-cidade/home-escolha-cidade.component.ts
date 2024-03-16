import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'home-escolha-cidade',
  templateUrl: './home-escolha-cidade.component.html',
  styleUrls: ['./home-escolha-cidade.component.scss']
})
export class HomeEscolhaCidadeComponent implements OnInit {

  constructor(private elementRef: ElementRef){
    
  }

  ngOnInit(): void {
      this.adicionarEvento();
  }

  adicionarEvento() {
    const elemento = this.elementRef.nativeElement.querySelector('.select-btn');

    elemento.addEventListener('click', (e:any) => {
      let dropdown :any = document.querySelector('.select-menu ul');

      if(dropdown.style.display == 'flex'){

        dropdown.style.display = 'none';

      }else{

        dropdown.style.display = 'flex';

      }

      
    });
  }

}
