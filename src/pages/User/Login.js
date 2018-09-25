import React, { Component } from 'react';
import { connect } from 'dva';
import { Alert } from 'antd';
import Login from '@/components/Login';
import styles from './Login.less';

const { UserName, Password, Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login']
}))
class LoginPage extends Component {
  handleSubmit = (err, values) => {
    const { dispatch } = this.props;
    if (!err) {
      dispatch({
        type: 'login/login',
        payload: {
          ...values
        }
      });
    }
  };

  renderMessage = content => {
    return (
      <Alert
        style={{ marginBottom: 24 }}
        message={content}
        type="error"
        showIcon
      />
    );
  };

  render() {
    const { login, submitting } = this.props;
    return (
      <div className={styles.main}>
        <Login onSubmit={this.handleSubmit}>
          {login.status === 'error' &&
            !submitting &&
            this.renderMessage('Incorrect email and/or password')}
          <UserName name="email" placeholder="Email" />
          <Password name="password" placeholder="Password" />
          <Submit id="loginBtn" loading={submitting}>
            Login
          </Submit>
        </Login>
      </div>
    );
  }
}

export default LoginPage;
