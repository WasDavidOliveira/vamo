import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HomeEscolhaCidadeComponent } from './components/home-escolha-cidade/home-escolha-cidade.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { QuemsomosComponent } from './pages/quemsomos/quemsomos.component';
import { PlanosComponent } from './pages/planos/planos.component';
import { ContatosComponent } from './pages/contatos/contatos.component';
import { AsideComponent } from './components/aside/aside.component';
import { ModalComponent } from './components/modal/modal.component';
import { LocationSelectorComponent } from './components/location-selector/location-selector.component';
import { LocationService } from './services/location.service';
import { PlansService } from './services/plans.service';
import { LocationModalService } from './services/location-modal.service';
import { LoadingService } from './services/loading.service';
import { LocationInfoComponent } from './components/location-info/location-info.component';
import { LoadingComponent } from './components/loading/loading.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'quem-somos', component: QuemsomosComponent },
  { path: 'planos', component: PlanosComponent },
  { path: 'contato', component: ContatosComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeEscolhaCidadeComponent,
    NavbarComponent,
    FooterComponent,
    QuemsomosComponent,
    PlanosComponent,
    ContatosComponent,
    AsideComponent,
    ModalComponent,
    LocationSelectorComponent,
    LocationInfoComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot(routes, {
      paramsInheritanceStrategy: 'always',
      onSameUrlNavigation: 'reload',
      scrollPositionRestoration: 'top'
    }),
    CarouselModule,
    BrowserAnimationsModule,
  ],
  providers: [LocationService, PlansService, LocationModalService, LoadingService],
  bootstrap: [AppComponent],
})

export class AppModule {}
