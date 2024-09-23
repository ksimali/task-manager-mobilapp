import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskApiService } from '../services/task-api.service';
import { UserService } from '../services/user.service';
import { TaskAPI } from '../models/task-api.model';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  activeButton: 'createdBy' | 'assignedTo' | null = 'createdBy';

  searchForm: FormGroup;
  isMobile: boolean;
  showCreatedBy: boolean;
  showAssignedTo: boolean;
  isCurrentUser: boolean;

  users: any[] = [];
  selectedUserUid: string = "";
  tasksAssigned?: any[] = [];
  tasksCreated?: any[] = [];

  constructor(
    private fb: FormBuilder,
    private taskApiService: TaskApiService,
    private userService: UserService,
  ){ 
    this.searchForm = this.fb.group({
      uid: ["", Validators.required]
    });

    this.isMobile = Capacitor.isNativePlatform();
    this.showCreatedBy = true;
    this.showAssignedTo = false;
    this.isCurrentUser = false;
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(){
    this.userService.getAllUsers().subscribe(
      (res)=>{
        this.users = res.allUsers;
      }
    );
  }

  searchTasks() {
    if(this.searchForm.valid){
      const {uid} = this.searchForm.value;
      this.selectedUserUid = uid;
      if (this.selectedUserUid) {
        this.fetchTasks(this.selectedUserUid);

        // Verification de l'utilisateur courant
        this.isCurrentUser = this.selectedUserUid === sessionStorage.getItem("authId");
      }
    }
  }

  fetchTasks(uid: string){
    this.taskApiService.getTasksAssignedToUid(uid, "").subscribe((data) => {
      if (data && Array.isArray(data.allTasks)) {
        this.tasksAssigned = data.allTasks;
      } else {
        this.tasksAssigned = [];
      }
    });

    this.taskApiService.getTasksCreatedByUid(uid, "").subscribe((data) => {
      console.log(data);
      if (data && Array.isArray(data.allTasks)) {
        this.tasksCreated = data.allTasks;
      } else {
        this.tasksCreated = [];
      }   
    });
  }

  shouldShowCreatedBy(){
    this.showCreatedBy = true;
    this.showAssignedTo = false;
    this.activeButton = 'createdBy';
  }
  shouldShowAssingedTo(){
    this.showCreatedBy = false;
    this.showAssignedTo = true;
    this.activeButton = 'assignedTo';
  }

  changeStatus(task: TaskAPI){
    this.taskApiService.updateTaskStatus("", task.taskUid, !task.done).subscribe(
      () => {
        this.fetchTasks(this.selectedUserUid);
      }
    );
  }

  deleteTask(task: TaskAPI){
    this.taskApiService.deleteTask("", task.taskUid).subscribe(
      ()=>{
        this.fetchTasks(this.selectedUserUid);
      }
    );
  }
}