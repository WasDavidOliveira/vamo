import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HomeEscolhaCidadeComponent } from './components/home-escolha-cidade/home-escolha-cidade.component';



const routes: Routes = [

  { path: '', component: HomeComponent },
  
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeEscolhaCidadeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
