import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-list-input',
  templateUrl: './task-list-input.component.html',
  styleUrl: './task-list-input.component.scss'
})
export class TaskListInputComponent {
  @Input() tasks: Task[] = [];
  @Output() taskChanged = new EventEmitter<Task>();

  maskAsDone(task: Task){
    task.isDone = true;
    this.taskChanged.emit(task)
  }
}
