import React from 'react';
import { Input, Icon } from 'antd';
import styles from './index.less';

const map = {
  UserName: {
    component: Input,
    props: {
      size: 'large',
      prefix: <Icon type="user" className={styles.prefixIcon} />,
      placeholder: 'Email'
    },
    rules: [
      {
        required: true,
        message: 'Please enter your email.'
      },
      {
        type: 'email',
        message: 'Please enter a valid email.'
      }
    ]
  },
  Password: {
    component: Input,
    props: {
      size: 'large',
      prefix: <Icon type="lock" className={styles.prefixIcon} />,
      type: 'password',
      placeholder: 'Password'
    },
    rules: [
      {
        required: true,
        message: 'Please enter your password.'
      }
    ]
  },
  Captcha: {
    component: Input,
    props: {
      size: 'large',
      prefix: <Icon type="mail" className={styles.prefixIcon} />,
      placeholder: 'captcha'
    },
    rules: [
      {
        required: true,
        message: 'Please enter Captcha!'
      }
    ]
  }
};

export default map;
