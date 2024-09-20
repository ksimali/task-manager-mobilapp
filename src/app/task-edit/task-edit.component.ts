import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.scss'
})
export class TaskEditComponent {

  task: Task | undefined;
  editForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router,
    private fb: FormBuilder
  ){
    const taskId = this.route.snapshot.paramMap.get('id');
    this.task = this.taskService.getTask(taskId!);

    this.editForm = this.fb.group({
      description: ['', Validators.required]
    });

    if(this.task){
      this.editForm.patchValue({
        description: this.task.description
      })
    }

  }

  onSubmit(){
    console.log(this.editForm.value.description);
    if(this.task){
      this.task.description = this.editForm.value.description;
      this.taskService.updateTask(this.task);
      this.router.navigate([''])
    }
  }
}
