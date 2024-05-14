import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { ActualpageService } from 'src/app/services/actualpage.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'planos-page',
  templateUrl: './planos.component.html',
  styleUrls: ['./planos.component.scss'],
})
export class PlanosComponent {
  constructor(
    private pageService: ActualpageService,
    private elementRef: ElementRef
  ) {
    this.pageService.setCurrentPage('planos');
  }

  appsChoice: OwlOptions = {

    loop: false,
    items: 3,
    margin: 10,
    nav: false,
    autoplay: true,
    autoplaySpeed: 3000,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,


  };

  ngAfterViewInit(): void {
    const choicesApps =
      this.elementRef.nativeElement.querySelectorAll('.app img');

    if (choicesApps != null) {
      choicesApps.forEach((app: any) => {
        app.addEventListener('click', (appClicado: any) => {
          let qualPlano =
            appClicado.target.parentNode.parentNode.parentNode.parentNode;
          let qualApp = appClicado.target.alt;

          let appSelecionado = appClicado.target;

          let urlPlanoStandardPadrao =
            'https://api.whatsapp.com/send?phone=558005914866&text=Ol%C3%A1,%0AGostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20o%20plano%20de%20internet%20de%20300%20MEGA%20com%20instala%C3%A7%C3%A3o%20gr%C3%A1tis,%20suporte%2024/7,%20Wi-Fi%205G%20de%20alta%20performance%20e%20mais%20de%20100%20canais%20de%20TV%20HD%20por%20apenas%20R$%2064,90/m%C3%AAs.%20Como%20fa%C3%A7o%20para%20adquirir?';
          let urlPlanoPremiumPadrao =
            'https://api.whatsapp.com/send?phone=558005914866&text=Ol%C3%A1,%0AGostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20o%20plano%20de%20internet%20de%20500%20MEGA%20com%20instala%C3%A7%C3%A3o%20gr%C3%A1tis,%20suporte%2024/7,%20Wi-Fi%205G%20de%20alta%20performance%20e%20mais%20de%20100%20canais%20de%20TV%20HD%20por%20apenas%20R$%2084,90/m%C3%AAs.%20Como%20fa%C3%A7o%20para%20adquirir?';

          let urlPlanoStandardAddApp =
            'https://api.whatsapp.com/send?phone=558005914866&text=Ol%C3%A1,%0AGostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20o%20plano%20de%20internet%20de%20300%20MEGA%20com%20instala%C3%A7%C3%A3o%20gr%C3%A1tis,%20suporte%2024/7,%20Wi-Fi%205G%20de%20alta%20performance%20e%20mais%20de%20100%20canais%20de%20TV%20HD%20%2B%201%20app%20standard%20por%20apenas%20R%24%2064,90/m%C3%AAs.%20Como%20fa%C3%A7o%20para%20adquirir?';
          let urlPlanoPremiumAddApp =
            'https://api.whatsapp.com/send?phone=558005914866&text=Ol%C3%A1,%0AGostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20o%20plano%20de%20internet%20de%20500%20MEGA%20com%20instala%C3%A7%C3%A3o%20gr%C3%A1tis,%20suporte%2024/7,%20Wi-Fi%205G%20de%20alta%20performance%20e%20mais%20de%20100%20canais%20de%20TV%20HD%20%2B%201%20app%20premium%20por%20apenas%20R%24%2084,90/m%C3%AAs.%20Como%20fa%C3%A7o%20para%20adquirir?';

          if (qualPlano.classList.contains('plano-standard')) {
            let newText = '20%2B%20o%20aplicativo%20' + qualApp + '%';

            let cardPlano = document.querySelector(
              '.plano.plano-standard .card-plano'
            );

            let resetCardPlano = document.querySelector(
              '.plano.plano-premium .card-plano'
            );

            let resetHref = resetCardPlano?.querySelector('a');

            if(resetHref != null){

              resetHref.href = urlPlanoPremiumAddApp;

            }

            if (cardPlano != null) {
              let hrefLink = cardPlano.querySelector('a');

              if (hrefLink != null) {
                let index = hrefLink.href.indexOf('HD');
                hrefLink.href =
                  urlPlanoStandardPadrao.slice(0, index + 3) +
                  newText +
                  urlPlanoStandardPadrao.slice(index + 3);

                let allSelectedsApps =
                  this.elementRef.nativeElement.querySelectorAll(
                    '.app img.selecionado'
                  );

                if (allSelectedsApps != null) {
                  allSelectedsApps.forEach((AppSelected: any) => {
                    AppSelected.classList.remove('selecionado');
                  });
                }

                if (appSelecionado.classList.contains('selecionado')) {
                  appSelecionado.classList.remove('selecionado');
                } else {
                  appSelecionado.classList.add('selecionado');
                }
              }
            }
          } else if (qualPlano.classList.contains('plano-premium')) {
            let newText = '20%2B%20o%20aplicativo%20' + qualApp + '%';

            let cardPlano = document.querySelector(
              '.plano.plano-premium .card-plano'
            );

            let resetCardPlano = document.querySelector(
              '.plano.plano-standard .card-plano'
            );

            let resetHref = resetCardPlano?.querySelector('a');

            if(resetHref != null){

              resetHref.href = urlPlanoStandardAddApp;

            }

            if (cardPlano != null) {
              let hrefLink = cardPlano.querySelector('a');

              if (hrefLink != null) {
                let index = hrefLink.href.indexOf('HD');
                hrefLink.href =
                  urlPlanoPremiumPadrao.slice(0, index + 3) +
                  newText +
                  urlPlanoPremiumPadrao.slice(index + 3);

                console.log(hrefLink.href);

                let allSelectedsApps =
                  this.elementRef.nativeElement.querySelectorAll(
                    '.app img.selecionado'
                  );

                if (allSelectedsApps != null) {
                  allSelectedsApps.forEach((AppSelected: any) => {
                    AppSelected.classList.remove('selecionado');
                  });
                }

                if (appSelecionado.classList.contains('selecionado')) {
                  appSelecionado.classList.remove('selecionado');
                } else {
                  appSelecionado.classList.add('selecionado');
                }
              }
            }
          }
        });
      });
    }
  }
}
