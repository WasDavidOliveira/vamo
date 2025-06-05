import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEscolhaCidadeComponent } from './home-escolha-cidade.component';

describe('HomeEscolhaCidadeComponent', () => {
  let component: HomeEscolhaCidadeComponent;
  let fixture: ComponentFixture<HomeEscolhaCidadeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeEscolhaCidadeComponent],
    });
    fixture = TestBed.createComponent(HomeEscolhaCidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
