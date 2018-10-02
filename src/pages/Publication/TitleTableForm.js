import React, { PureComponent, Fragment } from 'react';
import { Table, Button, Input, message, Popconfirm, Divider } from 'antd';
import styles from './style.less';

export default class TitleTableForm extends PureComponent {
  index = 0;

  cacheOriginData = {};

  constructor(props) {
    super(props);

    this.state = {
      data: props.value,
      loading: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.index = nextProps.value ? nextProps.value.length + 1 : 0;
      this.setState({
        data: nextProps.value
      });
    }
  }

  getRowByKey(key, newData) {
    const { data } = this.state;
    return (newData || data).filter(item => item.key === key)[0];
  }

  getIndexByKey(key, newData) {
    const { data } = this.state;
    return (newData || data).indexOf(this.getRowByKey(key, newData));
  }

  toggleEditable = (e, key) => {
    e.preventDefault();
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    const index = this.getIndexByKey(key, newData);
    if (target) {
      if (!target.editable) {
        this.cacheOriginData[key] = { ...target };
      }
      newData[index].editable = !target.editable;
      this.setState({ data: newData });
    }
  };

  newTitle = () => {
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    newData.push({
      key: `TITLE_ID_${this.index}`,
      title: '',
      editable: true,
      isNew: true
    });
    this.index += 1;
    this.setState({ data: newData });
  };

  remove(key) {
    const { data } = this.state;
    const { onChange } = this.props;
    const newData = data.filter(item => item.key !== key);
    this.setState({ data: newData });
    onChange(newData);
  }

  handleKeyPress(e, key) {
    if (e.key === 'Enter') {
      this.saveRow(e, key);
    }
  }

  handleFieldChange(e, fieldName, key) {
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      target[fieldName] = e.target.value;
      this.setState({ data: newData });
    }
  }

  saveRow(e, key) {
    e.persist();
    this.setState({
      loading: true
    });
    setTimeout(() => {
      if (this.clickedCancel) {
        this.clickedCancel = false;
        return;
      }
      const target = this.getRowByKey(key) || {};
      if (!target.title) {
        message.error('Please complete the titles section');
        e.target.focus();
        this.setState({
          loading: false
        });
        return;
      }
      this.toggleEditable(e, key);
      const { data } = this.state;
      const { onChange } = this.props;
      delete target.isNew;
      onChange(data);
      this.setState({
        loading: false
      });
    }, 500);
  }

  cancel(e, key) {
    this.clickedCancel = true;
    e.preventDefault();
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (this.cacheOriginData[key]) {
      Object.assign(target, this.cacheOriginData[key]);
      target.editable = false;
      delete this.cacheOriginData[key];
    }
    this.setState({ data: newData });
    this.clickedCancel = false;
  }

  render() {
    const columns = [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        width: '80%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                id={`title-${record.key}`}
                value={text}
                autoFocus
                onChange={e => this.handleFieldChange(e, 'title', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="Title"
              />
            );
          }
          return record.title;
        }
      },
      {
        title: 'Actions',
        key: 'action',
        render: (text, record) => {
          const { loading } = this.state;
          if (!!record.editable && loading) {
            return null;
          }
          if (record.editable) {
            if (record.isNew) {
              return (
                <span>
                  <a
                    onClick={e => this.saveRow(e, record.key)}
                    id={`save-title-btn-${record.key}`}
                  >
                    Save
                  </a>
                  <Divider type="vertical" />
                  <Popconfirm
                    title="Are you sure you want to delete this title?"
                    onConfirm={() => this.remove(record.key)}
                  >
                    <a>Delete</a>
                  </Popconfirm>
                </span>
              );
            }
            return (
              <span>
                <a
                  onClick={e => this.saveRow(e, record.key)}
                  id={`save-title-btn-${record.key}`}
                >
                  Save
                </a>
                <Divider type="vertical" />
                <a onClick={e => this.cancel(e, record.key)}>Cancel</a>
              </span>
            );
          }
          return (
            <span>
              <a
                onClick={e => this.toggleEditable(e, record.key)}
                id={`edit-title-btn-${record.key}`}
              >
                Edit
              </a>
              <Divider type="vertical" />
              <Popconfirm
                title="Are you sure you want to delete this entry?？"
                onConfirm={() => this.remove(record.key)}
              >
                <a>Delete</a>
              </Popconfirm>
            </span>
          );
        }
      }
    ];

    const { loading, data } = this.state;

    return (
      <Fragment>
        <Table
          loading={loading}
          columns={columns}
          dataSource={data}
          pagination={false}
          rowClassName={record => {
            return record.editable ? styles.editable : '';
          }}
        />
        <Button
          id="new-title-btn"
          style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
          type="dashed"
          onClick={this.newTitle}
          icon="plus"
        >
          Add Title
        </Button>
      </Fragment>
    );
  }
}
