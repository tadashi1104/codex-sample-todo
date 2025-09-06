import React from 'react';
import { Table, Space, Tooltip, Tag } from 'antd';
import { Checkbox } from '../atoms/Checkbox';
import { Button } from '../atoms/Button';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { Todo } from '../../lib/api';
import { PriorityTag } from '../atoms/PriorityTag';
import { StatusTag } from '../atoms/StatusTag';

type Props = {
  data: Todo[];
  onToggle: (id: number, completed: boolean) => void;
  onRemove: (id: number) => void;
  onEdit: (todo: Todo) => void;
  onAdd: () => void;
  loading?: boolean;
};

export const TodoTable: React.FC<Props> = ({ data, onToggle, onRemove, onEdit, onAdd, loading }) => {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <div>合計 {data.length} 件</div>
        <Button type="primary" icon={<PlusOutlined />} onClick={onAdd}>
          追加
        </Button>
      </div>
      <Table
        rowKey={(r) => r.id}
        dataSource={data}
        loading={loading}
        pagination={{ pageSize: 10 }}
        columns={[
          {
            title: '状態',
            dataIndex: 'completed',
            width: 80,
            render: (v: boolean, r) => (
              <Checkbox checked={v} onChange={(e) => onToggle(r.id, e.target.checked)} />
            ),
          },
          {
            title: 'タイトル',
            dataIndex: 'title',
            sorter: (a, b) => a.title.localeCompare(b.title),
          },
          {
            title: '説明',
            dataIndex: 'description',
            ellipsis: true,
          },
          {
            title: '優先度',
            dataIndex: 'priority',
            width: 120,
            render: (_, r) => <PriorityTag value={r.priority} />,
          },
          {
            title: '期限',
            dataIndex: 'dueDate',
            width: 160,
            render: (v) => (v ? new Date(v).toLocaleString() : '-'),
          },
          {
            title: 'タグ',
            dataIndex: 'tags',
            render: (tags?: string[]) => (tags?.length ? tags.map((t) => <Tag key={t}>{t}</Tag>) : '-'),
          },
          {
            title: '完了',
            dataIndex: 'completed',
            width: 100,
            render: (v: boolean) => <StatusTag completed={v} />,
          },
          {
            title: '操作',
            key: 'actions',
            width: 120,
            render: (_, r) => (
              <Space>
                <Tooltip title="編集">
                  <Button icon={<EditOutlined />} onClick={() => onEdit(r)} />
                </Tooltip>
                <Tooltip title="削除">
                  <Button danger icon={<DeleteOutlined />} onClick={() => onRemove(r.id)} />
                </Tooltip>
              </Space>
            ),
          },
        ]}
      />
    </>
  );
};
