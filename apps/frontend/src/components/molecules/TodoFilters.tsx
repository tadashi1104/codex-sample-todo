import React from 'react';
import { Flex, Segmented } from 'antd';
import { DatePicker } from '../atoms/DatePicker';
import { Input } from '../atoms/Input';
import { Select } from '../atoms/Select';
import type { Query } from '../../lib/api';
import dayjs from 'dayjs';

type Props = {
  value: Query;
  onChange: (q: Query) => void;
};

export const TodoFilters: React.FC<Props> = ({ value, onChange }) => {
  const set = (patch: Partial<Query>) => onChange({ ...value, ...patch });
  return (
    <Flex gap={8} wrap>
      <Segmented
        value={value.status ?? 'all'}
        onChange={(v) => set({ status: v as any })}
        options={[
          { label: 'すべて', value: 'all' },
          { label: '未完了', value: 'active' },
          { label: '完了', value: 'completed' },
        ]}
      />
      <Select
        allowClear
        placeholder="優先度"
        style={{ width: 120 }}
        value={value.priority}
        onChange={(v) => set({ priority: v as any })}
        options={[
          { value: 'high', label: '高' },
          { value: 'medium', label: '中' },
          { value: 'low', label: '低' },
        ]}
      />
      <DatePicker
        placeholder="期限(開始)"
        value={value.after ? dayjs(value.after) : undefined}
        onChange={(d) => set({ after: d ? d.toISOString() : undefined })}
      />
      <DatePicker
        placeholder="期限(終了)"
        value={value.before ? dayjs(value.before) : undefined}
        onChange={(d) => set({ before: d ? d.toISOString() : undefined })}
      />
      <Input.Search
        allowClear
        placeholder="検索（タイトル/説明）"
        style={{ width: 260 }}
        value={value.q}
        onChange={(e) => set({ q: e.target.value })}
      />
    </Flex>
  );
};
