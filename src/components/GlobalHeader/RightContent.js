import React, { PureComponent } from 'react';
import { FormattedMessage } from 'umi/locale';
import { Spin, Tag, Menu, Icon, Dropdown, Tooltip } from 'antd';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import NoticeIcon from '../NoticeIcon';
import styles from './index.less';
import { bellIcon, genericDriverIcon } from '@/utils/icons';

export default class GlobalHeaderRight extends PureComponent {
  getNoticeData() {
    const { notices = [] } = this.props;
    if (notices.length === 0) {
      return {};
    }
    const newNotices = notices.map(notice => {
      const newNotice = { ...notice };
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold'
        }[newNotice.status];
        newNotice.extra = (
          <Tag color={color} style={{ marginRight: 0 }}>
            {newNotice.extra}
          </Tag>
        );
      }
      return newNotice;
    });
    return groupBy(newNotices, 'type');
  }

  render() {
    const {
      currentUser,
      fetchingDrivers,
      drivers = [],
      onMenuClick,
      theme
    } = this.props;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item key="logout">
          <Icon type="logout" />
          <FormattedMessage id="navbar.logout" />
        </Menu.Item>
      </Menu>
    );
    const noticeData = drivers;
    const errorData = noticeData.filter(
      driver => driver.event.status === 'error'
    );
    const successData = noticeData.filter(
      driver => driver.event.status === 'success'
    );
    const pendingData = noticeData.filter(
      driver => driver.event.status === 'running'
    );

    let className = styles.right;
    if (theme === 'dark') {
      className = `${styles.right}  ${styles.dark}`;
    }
    return (
      <div className={className}>
        <Tooltip title={<FormattedMessage id="navbar.documentation" />}>
          <a
            target="_blank"
            href="https://pro.ant.design/docs/getting-started"
            rel="noopener noreferrer"
            className={styles.action}
            title={<FormattedMessage id="navbar.documentation" />}
          >
            <Icon type="question-circle-o" />
          </a>
        </Tooltip>
        <NoticeIcon
          className={styles.action}
          count={errorData.length}
          onItemClick={(item, tabProps) => {
            console.log(item, tabProps); // eslint-disable-line
          }}
          loading={fetchingDrivers}
          popupAlign={{ offset: [20, -16] }}
        >
          <NoticeIcon.Tab
            list={errorData}
            title={<FormattedMessage id="driver.notice.tab.error" />}
            emptyText={<FormattedMessage id="driver.notice.empty.error" />}
            emptyImage={bellIcon}
            genericIcon={genericDriverIcon}
          />
          <NoticeIcon.Tab
            list={pendingData}
            title={<FormattedMessage id="driver.notice.tab.running" />}
            emptyText={<FormattedMessage id="driver.notice.empty.running" />}
            emptyImage={bellIcon}
            genericIcon={genericDriverIcon}
          />
          <NoticeIcon.Tab
            list={successData}
            title={<FormattedMessage id="driver.notice.tab.success" />}
            emptyText={<FormattedMessage id="driver.notice.empty.success" />}
            emptyImage={bellIcon}
            genericIcon={genericDriverIcon}
          />
        </NoticeIcon>
        {currentUser.name && currentUser.surname ? (
          <Dropdown overlay={menu}>
            <span className={`${styles.action} ${styles.account}`}>
              <span id="header-user-name" className={styles.name}>
                {currentUser.name} {currentUser.surname}
              </span>
            </span>
          </Dropdown>
        ) : (
          <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
        )}
      </div>
    );
  }
}
