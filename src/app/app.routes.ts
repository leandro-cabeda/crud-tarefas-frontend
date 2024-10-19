import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { CompletedTasksComponent } from './components/completed-tasks/completed-tasks.component';
import { TaskFormComponent } from './components/task-form/task-form.component';

export const routes: Routes = [
  { path: '', component: TaskListComponent },
  { path: 'completed', component: CompletedTasksComponent },
  { path: 'create', component: TaskFormComponent },
  { path: 'edit/:id', component: TaskFormComponent }
];
