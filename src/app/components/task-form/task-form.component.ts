import { Component, OnInit } from '@angular/core';
import { Task, TaskService } from '../../services/task.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnInit {
  task: Task = {
    id: 0,
    title: '',
    status: 'open',
    priority: 'low',
  };

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.taskService.getTask(id).subscribe((task: Task) => {
        console.log(" task: ", task);
        this.task = task;
      });
    }
  }

  saveTask() {
    if (this.task.id) {
      this.taskService.updateTask(this.task.id, this.task).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.taskService.createTask(this.task).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
