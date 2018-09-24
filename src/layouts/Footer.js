import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
        {
          key: 'github',
          title: <Fragment><Icon type="github" /> Metrics Broker</Fragment>,
          href: 'https://github.com/hirmeos',
          blankTarget: true,
        },
      ]}
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> 2018 Open Book Publishers
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
