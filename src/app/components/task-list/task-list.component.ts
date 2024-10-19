import { Component, OnInit } from '@angular/core';
import { ResponseAll, Task, TaskService } from '../../services/task.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { WebSocketService } from '../../services/websocket.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  searchControl = new FormControl('');
  taskSubscription: Subscription | null = null;
  filters = {
    title: '',
    status: '',
    priority: '',
    createdAt: '',
    sortBy: '',
    sortOrder: '',
    page: 1,
    limit: 10,
  };
  totalPages: number = 1;

  constructor(
    private taskService: TaskService,
    private webSocketService: WebSocketService,
  ) {}

  ngOnInit(): void {

    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((searchTerm) => this.taskService.getTasks({ ...this.filters, title: searchTerm }))
      )
      .subscribe((response: ResponseAll) => {
        console.log(response);
        this.tasks = response.tasks;
        this.totalPages = response.totalPages;
      }, (error) => {
        console.error('Erro ao carregar as tarefas com filtro', error);
      });

    this.taskSubscription = this.webSocketService
      .listenToEvent('taskCreated')
      .subscribe((task: any) => {
        console.log(task);
        this.tasks.push(task);
      }, (error) => {
        console.error('Erro ao carregar as tarefas do evento', error);
      });

    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks(this.filters).subscribe((response: ResponseAll) => {
      console.log(response);
      this.tasks = response.tasks;
      this.totalPages = response.totalPages;
    }, (error) => {
      console.error('Erro ao carregar as tarefas', error);
    });
  }

  updateFilters() {
    this.loadTasks();
  }

  changePage(page: number) {
    this.filters.page = page;
    this.loadTasks();
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
    });
  }

  ngOnDestroy(): void {
    if (this.taskSubscription) {
      this.taskSubscription.unsubscribe();
    }
  }
}
