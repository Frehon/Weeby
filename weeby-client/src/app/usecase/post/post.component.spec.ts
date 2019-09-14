import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PostComponent} from './post.component';
import {MatButtonToggleModule, MatCardModule} from '@angular/material';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostComponent],
      imports: [MatCardModule, MatButtonToggleModule, HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
