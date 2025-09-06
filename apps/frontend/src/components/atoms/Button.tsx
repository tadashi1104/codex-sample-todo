import React from 'react';
import { Button as AntButton, type ButtonProps as AntButtonProps } from 'antd';

export type ButtonProps = AntButtonProps & { testId?: string };

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ size = 'middle', testId, ...rest }, ref) => {
    return <AntButton ref={ref as any} size={size} data-testid={testId} {...rest} />;
  },
);
Button.displayName = 'Button';

