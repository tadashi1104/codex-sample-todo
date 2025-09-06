export type Priority = 'low' | 'medium' | 'high';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  description?: string;
  priority?: Priority;
  dueDate?: string | null;
  tags?: string[];
  createdAt: string | Date;
  updatedAt: string | Date;
};

export type CreateTodo = Partial<Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>> & {
  title: string;
};

export type UpdateTodo = Partial<Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>>;

export type Query = {
  status?: 'all' | 'active' | 'completed';
  q?: string;
  priority?: Priority;
  before?: string;
  after?: string;
  sort?: 'createdAt' | 'updatedAt' | 'dueDate' | 'title' | 'priority';
  order?: 'asc' | 'desc';
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`/api${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export const api = {
  list: (q?: Query) => {
    const sp = new URLSearchParams(q as any);
    const qs = sp.toString();
    return request<Todo[]>(`/todos${qs ? `?${qs}` : ''}`);
  },
  create: (body: CreateTodo) => request<Todo>(`/todos`, { method: 'POST', body: JSON.stringify(body) }),
  update: (id: number, body: UpdateTodo) => request<Todo>(`/todos/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
  remove: (id: number) => request<{ ok: true }>(`/todos/${id}`, { method: 'DELETE' }),
};

