import React from 'react';
import { DatePicker as AntDatePicker, type DatePickerProps as AntDatePickerProps } from 'antd';

export type DatePickerProps = AntDatePickerProps & { testId?: string };

export function DatePicker({ size = 'middle', testId, ...rest }: DatePickerProps) {
  return <AntDatePicker size={size as any} data-testid={testId} {...rest} />;
}

