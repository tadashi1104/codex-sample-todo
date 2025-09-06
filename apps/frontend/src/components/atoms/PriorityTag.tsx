import React from 'react';
import { Tag } from 'antd';
import type { Priority } from '../../lib/api';

export const PriorityTag: React.FC<{ value?: Priority }> = ({ value }) => {
  if (!value) return null;
  const color = value === 'high' ? 'red' : value === 'medium' ? 'gold' : 'green';
  const label = value === 'high' ? '高' : value === 'medium' ? '中' : '低';
  return <Tag color={color}>優先度: {label}</Tag>;
};

