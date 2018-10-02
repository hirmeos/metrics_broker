import React, { PureComponent } from 'react';
import { Card, Button, Form, Icon, Select, Popover, message } from 'antd';
import router from 'umi/router';
import { connect } from 'dva';
import FooterToolbar from '@/components/FooterToolbar';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './style.less';
import URITableForm from './URITableForm';
import TitleTableForm from './TitleTableForm';
import { getLastPart, isUuid } from '@/utils/utils';

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

@connect(({ workType, publication, loading }) => ({
  workType,
  publication,
  loading: loading.models.publication,
  submitting: loading.effects['publication/submitAddForm']
}))
@Form.create()
class PublicationForm extends PureComponent {
  formAction = 'add';

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'workType/fetch',
      payload: {
        sort: 'work_type',
        order: 'asc'
      }
    });
    const part = getLastPart();
    if (isUuid(part)) {
      this.formAction = 'edit';
      dispatch({
        type: 'publication/fetch',
        payload: {
          uuid: part
        }
      });
    } else if (!isUuid(part) && part !== 'add' && part !== '') {
      message.error('You must provide a work UUID.');
      router.push('/publications/list');
    }
  }

  render() {
    const {
      workType: { workType },
      publication: { publication },
      form,
      dispatch,
      submitting
    } = this.props;

    const { getFieldDecorator, validateFieldsAndScroll, getFieldsError } = form;
    const validate = () => {
      validateFieldsAndScroll((error, values) => {
        if (!error) {
          // submit the values
          const newPub = {};
          newPub.type = values.type;
          newPub.uri = values.uri.map(uri => ({
            uri: uri.uri,
            canonical: uri.canonical
          }));
          newPub.title = values.title.map(title => title.title);
          dispatch({
            type: 'publication/submitAddForm',
            payload: newPub
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
            <Icon id="errors-icon" type="exclamation-circle" />
          </Popover>
          {errorCount}
        </span>
      );
    };
    const typeSelect = getFieldDecorator('type', {
      initialValue: publication.type,
      rules: fieldRules.type
    })(
      <Select placeholder="Please choose publication type">
        {workType.map(type => (
          <Option
            id={type.work_type}
            key={type.work_type}
            value={type.work_type}
          >
            {type.work_type}
          </Option>
        ))}
      </Select>
    );

    const pageTitle =
      this.formAction === 'add' ? 'New Publication' : 'Edit Publication';
    const pageDescription =
      this.formAction === 'add'
        ? 'Add a new publication and its URIs.'
        : 'Edit a publication and its URIs.';

    const titles = publication.title
      ? publication.title.map((val, key) => ({
          editable: false,
          isNew: false,
          key: `TITLE_ID_${key + 1}`,
          title: val
        }))
      : [];

    const uris = publication.URI
      ? publication.URI.map((val, key) => ({
          editable: false,
          isNew: false,
          key: `URI_ID_${key + 1}`,
          uri: val.URI,
          canonical: val.canonical
        }))
      : [];

    return (
      <PageHeaderLayout
        title={pageTitle}
        content={pageDescription}
        wrapperClassName={styles.advancedForm}
      >
        <Card id="type-card" className={styles.card} bordered={false}>
          <Form layout="vertical">
            <Form.Item label={fieldLabels.type}>{typeSelect}</Form.Item>
          </Form>
        </Card>
        <Card id="title-card" className={styles.card} bordered={false}>
          <Form.Item label={fieldLabels.title}>
            {getFieldDecorator('title', {
              rules: fieldRules.title,
              initialValue: titles
            })(<TitleTableForm />)}
          </Form.Item>
        </Card>
        <Card id="uri-card" className={styles.card} bordered={false}>
          <Form.Item label={fieldLabels.uri}>
            {getFieldDecorator('uri', {
              rules: fieldRules.uri,
              initialValue: uris
            })(<URITableForm />)}
          </Form.Item>
        </Card>
        <FooterToolbar>
          {getErrorInfo()}
          <Button
            id="form-submit-btn"
            type="primary"
            onClick={validate}
            loading={submitting}
          >
            Save
          </Button>
        </FooterToolbar>
      </PageHeaderLayout>
    );
  }
}

export default PublicationForm;
