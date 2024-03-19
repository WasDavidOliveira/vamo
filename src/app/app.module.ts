import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HomeEscolhaCidadeComponent } from './components/home-escolha-cidade/home-escolha-cidade.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ContatoComponent } from './pages/contato/contato.component';







const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'contato', component: ContatoComponent },
  
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeEscolhaCidadeComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    CarouselModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
