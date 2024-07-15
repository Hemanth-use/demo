import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCategoriesListComponent } from './all-categories-list.component';

describe('AllCategoriesListComponent', () => {
  let component: AllCategoriesListComponent;
  let fixture: ComponentFixture<AllCategoriesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllCategoriesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllCategoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
