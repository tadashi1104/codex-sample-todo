import React, { useEffect, useMemo, useState } from 'react';
import { App as AntApp, Card, Flex, message, Statistic, Divider } from 'antd';
import { api, Query, Todo } from '../lib/api';
import { TodoFilters } from '../components/molecules/TodoFilters';
import { TodoTable } from '../components/organisms/TodoTable';
import { TodoEditor } from '../components/organisms/TodoEditor';
import { StatsCharts } from '../components/organisms/StatsCharts';

export const TodosPage: React.FC = () => {
  const [query, setQuery] = useState<Query>({ status: 'all' });
  const [items, setItems] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editing, setEditing] = useState<Todo | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await api.list(query);
      setItems(data);
    } catch (e: any) {
      message.error(e.message ?? String(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [JSON.stringify(query)]);

  const counts = useMemo(() => {
    const total = items.length;
    const done = items.filter((i) => i.completed).length;
    return { total, done, active: total - done };
  }, [items]);

  return (
    <AntApp>
      <Flex vertical gap={16}>
        <Card>
          <TodoFilters value={query} onChange={setQuery} />
        </Card>
        <Flex gap={16}>
          <Card style={{ flex: 1 }}>
            <Statistic title="全タスク" value={counts.total} />
          </Card>
          <Card style={{ flex: 1 }}>
            <Statistic title="未完了" value={counts.active} />
          </Card>
          <Card style={{ flex: 1 }}>
            <Statistic title="完了" value={counts.done} />
          </Card>
        </Flex>
        <Card>
          <TodoTable
            data={items}
            loading={loading}
            onAdd={() => {
              setEditing(null);
              setEditorOpen(true);
            }}
            onEdit={(t) => {
              setEditing(t);
              setEditorOpen(true);
            }}
            onToggle={async (id, completed) => {
              await api.update(id, { completed });
              await load();
            }}
            onRemove={async (id) => {
              await api.remove(id);
              await load();
            }}
          />
        </Card>
        <Card>
          <Divider orientation="left">可視化</Divider>
          <StatsCharts data={items} />
        </Card>
      </Flex>
      <TodoEditor
        open={editorOpen}
        initial={editing}
        onClose={() => setEditorOpen(false)}
        onSubmit={async (v) => {
          if (editing) await api.update(editing.id, v);
          else await api.create({ title: '', ...v } as any);
          await load();
        }}
      />
    </AntApp>
  );
};
