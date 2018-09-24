import React from 'react';
import moment from 'moment';
import { Avatar, List } from 'antd';
import classNames from 'classnames';
import styles from './NoticeList.less';

export default function NoticeList({
  data = [],
  onClick,
  title,
  locale,
  emptyText,
  emptyImage,
  genericIcon,
}) {
  if (data.length === 0) {
    return (
      <div className={styles.notFound}>
        {emptyImage ? <img src={emptyImage} alt="not found" /> : null}
        <div>{emptyText || locale.emptyText}</div>
      </div>
    );
  }
  return (
    <div>
      <List className={styles.list}>
        {data.map((item, i) => {
          const itemCls = classNames(styles.item, {
            [styles.read]: item.read,
          });
          return (
            <List.Item className={itemCls} key={item.UUID}>
              <List.Item.Meta
                className={styles.meta}
                avatar={<Avatar className={styles.icon} src={item.icon ? item.icon : genericIcon} />}
                title={
                  <div className={styles.title}>
                    {item.name}
                  </div>
                }
                description={
                  <div>
                    <div className={styles.description} title={item.message}>
                      {item.event.message}
                    </div>
                    <div className={styles.timestamp}>
                      {moment(item.event.timestamp).fromNow()}
                    </div>
                  </div>
                }
              />
            </List.Item>
          );
        })}
      </List>
    </div>
  );
}
