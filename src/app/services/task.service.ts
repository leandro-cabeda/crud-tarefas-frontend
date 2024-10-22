import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  id?: number;
  title: string;
  status: 'open' | 'inProgress' | 'pending' | 'completed';
  priority: 'low' | 'medium' | 'high';
  createdAt?: Date;
  updatedAt?: Date;
}

export type ResponseAll = {
    tasks: Task[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
};

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  getTasks(filters: any = {}): Observable<ResponseAll> {
    let params = new HttpParams()
      .set('page', filters.page || 1)
      .set('limit', filters.limit || 10);

    if (filters.title) params = params.set('title', filters.title);
    if (filters.status) params = params.set('status', filters.status);
    if (filters.priority) params = params.set('priority', filters.priority);
    if (filters.createdAt) params = params.set('createdAt', filters.createdAt);
    if (filters.sortBy) params = params.set('sortBy', filters.sortBy);
    if (filters.sortOrder) params = params.set('sortOrder', filters.sortOrder);

    return this.http.get<ResponseAll>(this.apiUrl, { params });
  }

  getTask(id?: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getCompletedTasks(): Observable<ResponseAll> {
    return this.http.get<ResponseAll>(`${this.apiUrl}?status=completed`);
  }
}

