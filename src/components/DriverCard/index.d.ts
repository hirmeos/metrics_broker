import * as React from 'react';
export interface IDriverCardProps {
  title: React.ReactNode;
  action?: React.ReactNode;
  total?: React.ReactNode | number | (() => React.ReactNode | number);
  footer?: React.ReactNode;
  contentHeight?: number;
  avatar?: React.ReactNode;
  style?: React.CSSProperties;
}

export default class DriverCard extends React.Component<IDriverCardProps, any> {}
