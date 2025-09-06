import React from 'react';
import { Tag } from 'antd';

export const StatusTag: React.FC<{ completed: boolean }> = ({ completed }) => (
  <Tag color={completed ? 'blue' : 'default'}>{completed ? '完了' : '未完了'}</Tag>
);

