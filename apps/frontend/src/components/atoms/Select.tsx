import React from 'react';
import { Select as AntSelect, type SelectProps as AntSelectProps } from 'antd';

export type SelectProps<T = any> = AntSelectProps<T> & { testId?: string };

export function Select<T = any>({ size = 'middle', testId, ...rest }: SelectProps<T>) {
  return <AntSelect size={size as any} data-testid={testId} {...rest} />;
}

