import { Component, OnInit } from '@angular/core';
import { ResponseAll, Task, TaskService } from '../../services/task.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-completed-tasks',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './completed-tasks.component.html',
  styleUrl: './completed-tasks.component.css'
})
export class CompletedTasksComponent implements OnInit {
  completedTasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadCompletedTasks();
  }

  loadCompletedTasks(): void {
    this.taskService.getCompletedTasks().subscribe(
      (response: ResponseAll) => {
        this.completedTasks = response.tasks;
      },
      (error) => {
        console.error('Erro ao carregar as tarefas concluídas', error);
      }
    );
  }
}
