import * as React from 'react';
export interface INoticeIconData {
  icon?: string;
  message?: React.ReactNode;
  timestamp?: React.ReactNode;
  driver?: React.ReactNode;
  style?: React.CSSProperties;
  key?: React.ReactNode;
  status?: React.ReactNode;
}

export interface INoticeIconTabProps {
  list?: INoticeIconData[];
  title?: React.ReactNode;
  emptyText?: React.ReactNode;
  emptyImage?: string;
  genericIcon?: React.ReactNode;
  style?: React.CSSProperties;
}

export default class NoticeIconTab extends React.Component<
  INoticeIconTabProps,
  any
> {}
