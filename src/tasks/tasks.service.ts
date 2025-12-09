import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private nextId = 1;

  findAll(): Task[] {
    return this.tasks;
  }

  findOne(id: number): Task {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  create(title: string): Task {
    const newTask: Task = {
      id: this.nextId++,
      title,
      completed: false,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  update(id: number, attrs: Partial<Omit<Task, 'id'>>): Task {
    const task = this.findOne(id);
    if (attrs.title !== undefined) {
      task.title = attrs.title;
    }
    if (attrs.completed !== undefined) {
      task.completed = attrs.completed;
    }
    return task;
  }

  remove(id: number): void {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    this.tasks.splice(index, 1);
  }
}
