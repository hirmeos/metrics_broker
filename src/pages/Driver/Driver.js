import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Button, Row, Col, Icon } from 'antd';
import moment from 'moment';
import { genericDriverIcon } from '../../utils/icons';
import DriverCard from '@/components/DriverCard';
import Field from '@/components/Field';

import styles from './Driver.less';

@connect(({ driver, loading }) => ({
  driver,
  loading: loading.models.driver
}))
class DriversDashboard extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'driver/fetch'
    });
  }

  render() {
    const {
      driver: { driver },
      loading
    } = this.props;

    const topColResponsiveProps = {
      xs: 36,
      sm: 24,
      md: 24,
      lg: 24,
      xl: 12,
      style: { marginBottom: 24 }
    };

    const actionButton = <Button icon="play-circle-o">Run</Button>;

    const actionButtonDisabled = (
      <Button icon="play-circle-o" disabled>
        Run
      </Button>
    );

    const actionMap = {
      error: actionButton,
      success: actionButton,
      running: actionButtonDisabled
    };

    const titleMap = {
      error: <span className={styles.error}>Error</span>,
      success: <span>Success</span>,
      running: <span>Running</span>
    };

    const iconMap = {
      error: <Icon className={styles.error} type="close-circle-o" />,
      success: <Icon className={styles.success} type="check-circle-o" />,
      running: <Icon className={styles.running} type="clock-circle-o" />
    };

    const drivers = driver.map(d => (
      <Col {...topColResponsiveProps} key={d.UUID}>
        <DriverCard
          bordered={false}
          title={titleMap[d.event.status]}
          total={d.name}
          loading={loading}
          avatar={
            <img
              alt={d.name}
              src={d.icon || genericDriverIcon}
              style={{ width: 56, height: 56 }}
            />
          }
          action={actionMap[d.event.status]}
          footer={
            <Fragment>
              <Field
                style={{ float: 'left' }}
                label="Last run"
                value={moment(d.event.timestamp).format('YYYY-MM-DD HH:mm')}
              />
              {d.event.status === 'error' && (
                <Fragment>
                  <Button
                    style={{ marginLeft: 16, float: 'right' }}
                    type="primary"
                  >
                    Fix
                  </Button>
                  <Button
                    style={{ marginLeft: 16, float: 'right' }}
                    type="danger"
                  >
                    Ignore
                  </Button>
                </Fragment>
              )}
            </Fragment>
          }
          contentHeight={50}
        >
          <div>
            {iconMap[d.event.status]}
            {d.event.message}
          </div>
        </DriverCard>
      </Col>
    ));

    return <Row gutter={24}>{drivers}</Row>;
  }
}

export default DriversDashboard;
