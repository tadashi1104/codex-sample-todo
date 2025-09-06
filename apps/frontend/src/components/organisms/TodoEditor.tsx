import React, { useEffect } from 'react';
import { Form, Tag } from 'antd';
import { DatePicker } from '../atoms/DatePicker';
import { Input, TextArea } from '../atoms/Input';
import { Modal } from '../atoms/Modal';
import { Select } from '../atoms/Select';
import type { CreateTodo, Priority, Todo, UpdateTodo } from '../../lib/api';
import dayjs from 'dayjs';

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: CreateTodo | UpdateTodo) => Promise<void> | void;
  initial?: Todo | null;
};

export const TodoEditor: React.FC<Props> = ({ open, onClose, onSubmit, initial }) => {
  const [form] = Form.useForm<CreateTodo | UpdateTodo>();
  useEffect(() => {
    if (initial) {
      form.setFieldsValue({
        title: initial.title,
        description: initial.description,
        priority: initial.priority,
        dueDate: initial.dueDate ? dayjs(initial.dueDate) : undefined,
        tags: initial.tags,
        completed: initial.completed,
      } as any);
    } else {
      form.resetFields();
    }
  }, [initial]);

  return (
    <Modal
      open={open}
      title={initial ? 'タスクを編集' : 'タスクを追加'}
      okText={initial ? '更新' : '追加'}
      cancelText="閉じる"
      onCancel={onClose}
      onOk={() => {
        form.validateFields().then(async (v: any) => {
          const payload: any = { ...v };
          if (payload.dueDate) payload.dueDate = payload.dueDate.toISOString();
          await onSubmit(payload);
          onClose();
        });
      }}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="title" label="タイトル" rules={[{ required: true, message: '必須です' }]}>
          <Input placeholder="例: Buy milk" />
        </Form.Item>
        <Form.Item name="description" label="説明">
          <TextArea rows={3} placeholder="詳細" />
        </Form.Item>
        <Form.Item name="priority" label="優先度">
          <Select<Priority>
            allowClear
            options={[
              { value: 'high', label: '高' },
              { value: 'medium', label: '中' },
              { value: 'low', label: '低' },
            ]}
          />
        </Form.Item>
        <Form.Item name="dueDate" label="期限">
          <DatePicker />
        </Form.Item>
        <Form.Item name="tags" label="タグ">
          <Select mode="tags" tokenSeparators={[',', ' ']} placeholder="タグを入力" />
        </Form.Item>
        {initial && (
          <Form.Item name="completed" label="状態">
            <Select
              options={[
                { value: true, label: '完了' },
                { value: false, label: '未完了' },
              ]}
            />
          </Form.Item>
        )}
        {initial?.tags?.length ? (
          <div>
            {initial.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        ) : null}
      </Form>
    </Modal>
  );
};
