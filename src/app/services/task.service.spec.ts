import { TestBed } from '@angular/core/testing';

import { Task, TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('Deve adicionar uma tarefa', async () => {
    let length = 0;
    let task = {} as Task;
    service.createTask({ title: 'Nova Tarefa', priority: 'low', status: 'open' });
    await service.getTasks().subscribe(resp => {
      length = resp.tasks.length;
      task = resp.tasks[0];
    })
    expect(length).toBe(1);
    expect(task.title).toBe('Nova Tarefa');
  });

  it('Deve retornar o tomanho de 2 tarefas', async() => {
    let length = 0;
    service.createTask({ title: 'Nova Tarefa', priority: 'low', status: 'open' });
    service.createTask({ title: 'Nova Tarefa2', priority: 'medium', status: 'completed' });
    await service.getTasks().subscribe(resp => {
      length = resp.tasks.length;
    })
    expect(length).toBe(2);
  });
});

