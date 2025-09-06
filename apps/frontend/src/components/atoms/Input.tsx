import React from 'react';
import { Input as AntInput, type InputProps as AntInputProps } from 'antd';

export type InputProps = AntInputProps & { testId?: string };

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ size = 'middle', testId, ...rest }, ref) => (
  <AntInput ref={ref} size={size as any} data-testid={testId} {...rest} />
));
Input.displayName = 'Input';

export const TextArea: React.FC<React.ComponentProps<typeof AntInput.TextArea>> = (props) => (
  <AntInput.TextArea size={(props as any).size ?? 'middle'} {...props} />
);

