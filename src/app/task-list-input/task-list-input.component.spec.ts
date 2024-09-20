import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListInputComponent } from './task-list-input.component';

describe('TaskListInputComponent', () => {
  let component: TaskListInputComponent;
  let fixture: ComponentFixture<TaskListInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskListInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskListInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
