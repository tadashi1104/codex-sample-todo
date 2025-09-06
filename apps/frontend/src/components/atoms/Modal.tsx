import React from 'react';
import { Modal as AntModal, type ModalProps as AntModalProps } from 'antd';

export type ModalProps = AntModalProps & { testId?: string };

export function Modal({ testId, ...rest }: ModalProps) {
  return <AntModal data-testid={testId} {...rest} />;
}

