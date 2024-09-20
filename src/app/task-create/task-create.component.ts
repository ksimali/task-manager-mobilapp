import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskApiService } from '../services/task-api.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { WebSocketService } from '../services/websocket.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrl: './task-create.component.scss'
})
export class TaskCreateComponent {
  taskForm: FormGroup;
  users: any[] = [];

  constructor(
    private fb: FormBuilder,
    private taskApiService: TaskApiService,
    private userService: UserService,
    private router: Router,
    private webSocketService: WebSocketService
  ){
    this.taskForm = this.fb.group({
      description: ["", Validators.required],
      uid: ["", Validators.required]
    });

    this.loadUsers();
  }

  loadUsers(){
    this.userService.getAllUsers().subscribe(
      (res)=>{
        this.users = res.allUsers;
      }
    );
  }

  createTask(){
    if(this.taskForm.valid){
      const {description, uid} = this.taskForm.value;
      this.taskApiService.createTask(description, uid).subscribe(
        (res)=>{
          console.log("Task Created successfully!");
          this.webSocketService.sendMessage({
            event: 'taskCreated',
            taskUid: res.id,
            assignedToUid: uid,
            description: description
          });
          this.router.navigate(["/"]);
        }
      )
    }
    else{
      console.error("Form is Invalid!")
    }
  }
}
