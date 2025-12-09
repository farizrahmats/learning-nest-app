import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Task } from '../generated/prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  findAll(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  create(title: string): Promise<Task> {
    return this.prisma.task.create({
      data: { title },
    });
  }

  async update(
    id: number,
    attrs: { title?: string; completed?: boolean },
  ): Promise<Task> {
    await this.findOne(id); // memastikan exist

    return this.prisma.task.update({
      where: { id },
      data: attrs,
    });
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);

    await this.prisma.task.delete({ where: { id } });
  }
}
