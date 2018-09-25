import React from 'react';
import { FormattedMessage } from 'umi/locale';
import Link from 'umi/link';
import styles from './UserLayout.less';
import logo from '../assets/logo.svg';

class UserLayout extends React.PureComponent {
  render() {
    const { children } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>
                  <FormattedMessage id="app.name" />
                </span>
              </Link>
            </div>
            <div className={styles.desc}>
              <FormattedMessage id="navbar.login" />
            </div>
          </div>
          {children}
        </div>
      </div>
    );
  }
}

export default UserLayout;
