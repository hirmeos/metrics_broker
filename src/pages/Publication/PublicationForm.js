import React, { PureComponent } from 'react';
import { Card, Button, Form, Icon, Select, Popover } from 'antd';
import { connect } from 'dva';
import FooterToolbar from '@/components/FooterToolbar';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './style.less';
import URITableForm from './URITableForm';
import TitleTableForm from './TitleTableForm';

const { Option } = Select;

const fieldLabels = {
  title: 'Publication title',
  type: 'Publication type',
  uri: 'Publication URIs'
};

const fieldRules = {
  title: [{ required: true, message: 'Please enter at least one title' }],
  type: [{ required: true, message: 'Please choose a publication type' }],
  uri: [{ required: true, message: 'Please enter at least one URI' }]
};

@connect(({ workType, loading }) => ({
  workType,
  submitting: loading.effects['publication/submitAddForm']
}))
@Form.create()
class AddPublicationForm extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'workType/fetch',
      payload: {
        sort: 'work_type',
        order: 'asc'
      }
    });
  }

  render() {
    const {
      workType: { workType },
      form,
      dispatch,
      submitting
    } = this.props;

    const { getFieldDecorator, validateFieldsAndScroll, getFieldsError } = form;
    const validate = () => {
      validateFieldsAndScroll((error, values) => {
        if (!error) {
          // submit the values
          dispatch({
            type: 'form/submitAddForm',
            payload: values
          });
        }
      });
    };
    const errors = getFieldsError();
    const getErrorInfo = () => {
      const errorCount = Object.keys(errors).filter(key => errors[key]).length;
      if (!errors || errorCount === 0) {
        return null;
      }
      const scrollToField = fieldKey => {
        const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
        if (labelNode) {
          labelNode.scrollIntoView(true);
        }
      };
      const errorList = Object.keys(errors).map(key => {
        if (!errors[key]) {
          return null;
        }
        return (
          <li
            key={key}
            className={styles.errorListItem}
            onClick={() => scrollToField(key)}
          >
            <Icon type="cross-circle-o" className={styles.errorIcon} />
            <div className={styles.errorMessage}>{errors[key][0]}</div>
            <div className={styles.errorField}>{fieldLabels[key]}</div>
          </li>
        );
      });
      return (
        <span className={styles.errorIcon}>
          <Popover
            title="Errors"
            content={errorList}
            overlayClassName={styles.errorPopover}
            trigger="click"
            getPopupContainer={trigger => trigger.parentNode}
          >
            <Icon type="exclamation-circle" />
          </Popover>
          {errorCount}
        </span>
      );
    };
    const typeSelect = getFieldDecorator('type', {
      rules: fieldRules.type
    })(
      <Select placeholder="Please choose publication type">
        {workType.map(type => (
          <Option key={type.work_type} value={type.work_type}>
            {type.work_type}
          </Option>
        ))}
      </Select>
    );

    return (
      <PageHeaderLayout
        title="New Publication"
        content="Add a new publication and its URIs."
        wrapperClassName={styles.advancedForm}
      >
        <Card className={styles.card} bordered={false}>
          <Form layout="vertical">
            <Form.Item label={fieldLabels.type}>{typeSelect}</Form.Item>
          </Form>
        </Card>
        <Card className={styles.card} bordered={false}>
          <Form.Item label={fieldLabels.title}>
            {getFieldDecorator('title', {
              rules: fieldRules.title,
              initialValue: []
            })(<TitleTableForm />)}
          </Form.Item>
        </Card>
        <Card className={styles.card} bordered={false}>
          <Form.Item label={fieldLabels.uri}>
            {getFieldDecorator('uri', {
              rules: fieldRules.uri,
              initialValue: []
            })(<URITableForm />)}
          </Form.Item>
        </Card>
        <FooterToolbar>
          {getErrorInfo()}
          <Button type="primary" onClick={validate} loading={submitting}>
            Submit
          </Button>
        </FooterToolbar>
      </PageHeaderLayout>
    );
  }
}

export default AddPublicationForm;
