import React from 'react';
import { Checkbox as AntCheckbox, type CheckboxProps as AntCheckboxProps } from 'antd';

export type CheckboxProps = AntCheckboxProps & { testId?: string };

export function Checkbox({ testId, ...rest }: CheckboxProps) {
  return <AntCheckbox data-testid={testId} {...rest} />;
}

