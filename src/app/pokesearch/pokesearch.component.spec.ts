import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokesearchComponent } from './pokesearch.component';

describe('PokesearchComponent', () => {
  let component: PokesearchComponent;
  let fixture: ComponentFixture<PokesearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokesearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokesearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
