import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { QueryTodoDto } from './dto/query-todo.dto';

@Injectable()
export class TodosService {
  private readonly store = new Map<number, Todo>();
  private idSeq = 1;

  constructor() {
    this.seed();
  }

  create(dto: CreateTodoDto): Todo {
    const now = new Date();
    const todo: Todo = {
      id: this.idSeq++,
      title: dto.title,
      completed: dto.completed ?? false,
      description: dto.description,
      priority: dto.priority,
      dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
      tags: dto.tags,
      createdAt: now,
      updatedAt: now,
    };
    this.store.set(todo.id, todo);
    return todo;
  }

  findAll(query?: QueryTodoDto): Todo[] {
    let items = Array.from(this.store.values());
    if (query) {
      const { status, q, priority, before, after, sort, order } = query;
      if (status && status !== 'all') {
        items = items.filter((t) => (status === 'completed' ? t.completed : !t.completed));
      }
      if (priority) {
        items = items.filter((t) => t.priority === priority);
      }
      if (q) {
        const kw = q.toLowerCase();
        items = items.filter(
          (t) => t.title.toLowerCase().includes(kw) || (t.description ?? '').toLowerCase().includes(kw),
        );
      }
      if (before) {
        const d = new Date(before).getTime();
        items = items.filter((t) => (t.dueDate ? t.dueDate.getTime() <= d : false));
      }
      if (after) {
        const d = new Date(after).getTime();
        items = items.filter((t) => (t.dueDate ? t.dueDate.getTime() >= d : false));
      }
      if (sort) {
        const dir = order === 'desc' ? -1 : 1;
        items.sort((a, b) => {
          const av = (a as any)[sort];
          const bv = (b as any)[sort];
          const ax = av instanceof Date ? av.getTime() : av ?? '';
          const bx = bv instanceof Date ? bv.getTime() : bv ?? '';
          if (ax < bx) return -1 * dir;
          if (ax > bx) return 1 * dir;
          return 0;
        });
      }
    }
    return items;
  }

  findOne(id: number): Todo {
    const todo = this.store.get(id);
    if (!todo) throw new NotFoundException(`Todo ${id} not found`);
    return todo;
  }

  update(id: number, dto: UpdateTodoDto): Todo {
    const todo = this.findOne(id);
    if (dto.title !== undefined) todo.title = dto.title;
    if (dto.completed !== undefined) todo.completed = dto.completed;
    if (dto.description !== undefined) todo.description = dto.description;
    if (dto.priority !== undefined) todo.priority = dto.priority;
    if (dto.dueDate !== undefined) todo.dueDate = dto.dueDate ? new Date(dto.dueDate) : null;
    if (dto.tags !== undefined) todo.tags = dto.tags;
    todo.updatedAt = new Date();
    this.store.set(id, todo);
    return todo;
  }

  remove(id: number): void {
    if (!this.store.delete(id)) {
      throw new NotFoundException(`Todo ${id} not found`);
    }
  }

  private seed() {
    if (this.store.size > 0) return;
    const now = new Date();
    const iso = (d: Date) => d.toISOString();
    this.create({
      title: '買い物リスト作成',
      description: '週末の食材を整理して買い出しする',
      priority: 'medium',
      dueDate: iso(new Date(now.getTime() + 24 * 60 * 60 * 1000)),
      tags: ['home', 'planning'],
      completed: false,
    });
    this.create({
      title: 'プレゼン資料のドラフト',
      description: '来週の定例に向けて10枚程度の資料作成',
      priority: 'high',
      dueDate: iso(new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000)),
      tags: ['work'],
      completed: false,
    });
    this.create({
      title: 'ランニング 5km',
      description: 'ゆっくりペースでクールダウン重視',
      priority: 'low',
      tags: ['health'],
      completed: true,
    });
    this.create({
      title: '読書: Clean Architecture 第3章',
      description: '要点メモをNotionに残す',
      priority: 'medium',
      tags: ['study'],
      completed: false,
    });

    // 追加のサンプル（ページネーション確認用に十分な件数を投入）
    const priorities: Array<Todo['priority']> = ['low', 'medium', 'high'];
    const tagPool = ['home', 'work', 'urgent', 'health', 'study', 'misc'];
    for (let i = 1; i <= 24; i++) {
      const p = priorities[i % priorities.length];
      const completed = i % 3 === 0;
      const days = (i % 14) + 1; // 1〜14日
      const due = i % 4 === 0 ? undefined : iso(new Date(now.getTime() + days * 24 * 60 * 60 * 1000));
      const tags = [tagPool[i % tagPool.length], ...(i % 5 === 0 ? [tagPool[(i + 2) % tagPool.length]] : [])];
      this.create({
        title: `サンプルタスク ${i}`,
        description: `サンプルの詳細メモ ${i}。UI/UX 確認用。`,
        priority: p!,
        dueDate: due,
        tags,
        completed,
      });
    }
  }
}
