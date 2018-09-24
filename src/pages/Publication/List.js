import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Input, Card, Button, Table, Icon, Divider } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './List.less';

@connect(({ publication, loading }) => ({
  publication,
  loading: loading.models.publication,
}))
export default class SearchList extends Component {
  pageSize = localStorage.getItem('metrics-borker-works-pagesize');
  state = {
    searchTitle: '',
    searchURI: '',
    filteredInfo: null,
    pagination: {
        position: 'both',
        pageSize: parseInt(this.pageSize) || 10,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['10', '25', '50','100', '500', '1000', '5000'],
    },
    sortedInfo: {columnKey: "title", field: "title", order:"descend"},
  };

  handleChange = (pagination, filters, sorter) => {
    localStorage.setItem('metrics-borker-works-pagesize', pagination.pageSize);
    this.setState({
      pagination: pagination,
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  }

  handleTitleSearch = (selectedKeys, confirm) => () => {
    confirm();
    this.setState({ searchTitle: selectedKeys[0] });
  }

  handleURISearch = (selectedKeys, confirm) => () => {
    confirm();
    this.setState({ searchURI: selectedKeys[0] });
  }

  handleTitleReset = clearFilters => () => {
    clearFilters();
    this.setState({ searchTitle: '' });
  }

  handleURIReset = clearFilters => () => {
    clearFilters();
    this.setState({ searchURI: '' });
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'publication/fetch',
      payload: {
        sort: 'title',
        order: 'asc',
      },
    });
  }

  render() {
    const {
      publication: { publication },
      loading,
    } = this.props;

    // get unique work types for filtering
    const types = [];
    const filters = [];
    publication.map(record => {
      if (types.indexOf(record.type) === -1) {
        types.push(record.type);
      }
    });
    types.map(type => filters.push({text: type, value: type}));

    let { sortedInfo, filteredInfo, pageSize, pagination } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};

    const onTitleSearch = (value, record) => record.title.toString().toLowerCase().includes(value.toLowerCase());
    const titleSearch = ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div className={styles.customFilterDropdown}>
          <Input
            id="title-search-input"
            ref={ele => this.searchInput = ele}
            placeholder="Search title"
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={this.handleTitleSearch(selectedKeys, confirm)}
          />
          <Button
            id="title-search-btn"
            type="primary"
            onClick={this.handleTitleSearch(selectedKeys, confirm)}
          >
            Search
          </Button>
          <Button
            id="title-search-reset-btn"
            onClick={this.handleTitleReset(clearFilters)}
          >
            Reset
          </Button>
        </div>
      );
    const onUriSearch = (value, record) => record.URI.map(uri => uri.URI.toLowerCase().replace(/-/g, '')).toString().includes(value.toLowerCase().replace(/-/g, ''));
    const uriSearch = ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div className={styles.customFilterDropdown}>
          <Input
            id="uri-search-input"
            ref={ele => this.searchInput = ele}
            placeholder="Search URI"
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={this.handleURISearch(selectedKeys, confirm)}
          />
          <Button
            id="uri-search-btn"
            type="primary"
            onClick={this.handleURISearch(selectedKeys, confirm)}
          >
            Search
          </Button>
          <Button
            id="uri-search-reset-btn"
            onClick={this.handleURIReset(clearFilters)}
          >
            Reset
          </Button>
        </div>
      );
    const onFilterDropdownVisibleChange = (visible) => {
        if (visible) {
          setTimeout(() => {
            this.searchInput.focus();
          });
        }
    };

    const columns = [{
      title: 'Title',
      dataIndex: 'title',
      sorter: (a, b) => a.title[0] < b.title[0],
      sortOrder: sortedInfo.columnKey === 'title' && sortedInfo.order,
      filterDropdown: titleSearch,
      filterIcon: filtered => <Icon id="title-search-icon" type="search" style={{ color: filtered ? '#108ee9' : '#aaa' }} />,
      onFilter: onTitleSearch,
      onFilterDropdownVisibleChange: onFilterDropdownVisibleChange,
      render: (text, record) => {
        const { searchTitle } = this.state;
        const regex = new RegExp(`(${searchTitle})`, 'ig');
        const k = `${record.UUID}-title`;
        return searchTitle ?
         text.map((title, key) => (
           <Fragment key={`${k}-${key}-search`}>
            <span>
              {title.split(regex).map((fragment, i) => (
                fragment.toLowerCase() === searchTitle.toLowerCase()
                ? <span key={`${k}-f-${i}`} className={styles.highlight}>
                    {fragment}
                  </span>
                : <span key={`${k}-f-${i}`}>{fragment}</span>
              ))}
            </span>
            <Divider type="vertical" />
           </Fragment>
         ))
        : (text.map((title, key) =>
            <Fragment key={`${k}-${key}`}>
              <span>{title}</span><Divider type="vertical" />
            </Fragment>
          ));
      },
    }, {
      title: 'URIs',
      dataIndex: 'URI',
      filterDropdown: uriSearch,
      filterIcon: filtered => <Icon id="uri-search-icon" type="search" style={{ color: filtered ? '#108ee9' : '#aaa' }} />,
      onFilter: onUriSearch,
      onFilterDropdownVisibleChange: onFilterDropdownVisibleChange,
      render: (text, record) => {
        const { searchURI } = this.state;
        const regex = new RegExp(`(${searchURI})`, 'ig');
        const k = `${record.UUID}-uri`;
        return searchURI ?
         text.map((uri, key) => (
           <Fragment key={`${k}-${key}-search`}>
            <span>
              {uri.URI.split(regex).map((fragment, i) => (
                fragment.toLowerCase() === searchURI.toLowerCase()
                ? <span key={`${k}-f-${i}`} className={styles.highlight}>
                    {fragment}
                  </span>
                : <span key={`${k}-f-${i}`}>{fragment}</span>
              ))}
            </span>
            <Divider type="vertical" />
           </Fragment>
         ))
        : (text.map((uri, key) =>
            <Fragment key={`${k}-${key}`}>
              <span>{uri.URI}</span><Divider type="vertical" />
            </Fragment>
          ));
      },
    }, {
      title: 'Type',
      dataIndex: 'type',
      filters: filters,
      filteredValue: filteredInfo.type || null,
      onFilter: (value, record) => record.type === value,
    }, {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href={`/publications/edit/${record.UUID}`}>Edit</a>
        </span>
      ),
    }];

    const expandedRowRender = record => <p><b>UUID:</b> {record.UUID}</p>
    const rowKey = record => record.UUID;

    const description = (
      <Fragment>
        <span>You may click </span>  [<Icon type="search" />] (on column headers) to search by publication title and/or URI. You may also click on [<Icon type="filter" />] to filter by work type.
      </Fragment>
    );

    return (
    <PageHeaderLayout
      title="Publications"
      content={description}
    >
      <Fragment>
          <Card
            className={styles.listCard}
            bordered={false}
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
          >
            <Table
              pagination={pagination}
              loading={loading}
              rowKey={rowKey}
              expandedRowRender={expandedRowRender}
              columns={columns}
              dataSource={publication}
              onChange={this.handleChange}
            />
          </Card>
      </Fragment>
    </PageHeaderLayout>
    );
  }
}
