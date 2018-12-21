import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import debounce from 'lodash.debounce';

import PopularizationBar from './PopularizationBar';
import PopularizationDetail from './PopularizationDetail';
import TableList from '@/components/PageComponents/Table/TableList';

const mapStateToProps = state => ({
  promoteAttentionList: state.businessYilianWechatStatisticDatas.list.promoteAttention,
  currentPage: state.businessYilianWechatStatisticDatas.currentPage.promoteAttention,
  totalElements: state.businessYilianWechatStatisticDatas.totalElements.promoteAttention,
  searchParam: state.businessYilianWechatStatisticDatas.searchParam.promoteAttention,
  allHosName: state.businessYilianWechatStatisticDatas.list.allHosName,
  allGroupName: state.businessYilianWechatStatisticDatas.list.allGroupName,
  groupHosName: state.businessYilianWechatStatisticDatas.list.groupHosName,
  loading: state.loading.effects['businessYilianWechatStatisticDatas/fetchPromoteAttentionAmount'],
});

const mapDispatchToProps = dispatch => ({
  onFetchPromoteAttentionAmount: (way, page) =>
    dispatch({
      type: 'businessYilianWechatStatisticDatas/fetchPromoteAttentionAmount',
      payload: { way, page },
    }),
  onFetchPromoteAttentionAmountDebounce: debounce(
    (way, page) =>
      dispatch({
        type: 'businessYilianWechatStatisticDatas/fetchPromoteAttentionAmount',
        payload: { way, page },
      }),
    500
  ),
  onFetchHosGroup: page =>
    dispatch({
      type: 'businessYilianWechatStatisticDatas/fetchHosGroup',
      payload: { page },
    }),
  onSearchParamChange: (key, value) =>
    dispatch({
      type: 'businessYilianWechatStatisticDatas/updateSearchParam',
      payload: { origin: 'promoteAttention', key, value },
    }),
  onFetchAllHosName: () =>
    dispatch({
      type: 'businessYilianWechatStatisticDatas/fetchAllHosName',
    }),
  onFetchAllGroupName: () =>
    dispatch({
      type: 'businessYilianWechatStatisticDatas/fetchAllGroupName',
    }),
  onDownloadPromoteAttentionAmount: page =>
    dispatch({
      type: 'businessYilianWechatStatisticDatas/downloadPromoteAttentionAmount',
      payload: { page },
    }),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class AppointmentsContainer extends Component {
  state = {
    // allHosNameArr: false,
    way: 'week',
    selectedName: '',
    selectedDate: '',
    showDetail: false,
  };

  componentDidMount() {
    const {
      onFetchPromoteAttentionAmount,
      onFetchAllHosName,
      onFetchAllGroupName,
      onFetchHosGroup,
    } = this.props;
    const { way } = this.state;

    onFetchPromoteAttentionAmount(way, 0);
    onFetchAllHosName();
    onFetchAllGroupName();
    onFetchHosGroup(0);
  }

  handleParamsChanged = async (value, dataKey) => {
    const { onSearchParamChange, onFetchPromoteAttentionAmountDebounce } = this.props;
    const { way } = this.state;

    if (dataKey === 'date') {
      await onSearchParamChange('startTime', value[0]);
      await onSearchParamChange('endTime', value[1]);
    } else {
      await onSearchParamChange(dataKey, value);
    }
    await onFetchPromoteAttentionAmountDebounce(way, 0);
    // await onFetchHosGroupDebounce(0);
  };

  setTableColumnsWechat = () => {
    const { way } = this.state;
    const renderGroupId = record => {
      let content = '';
      if (record) {
        content = <span>{record}组</span>;
      }
      return content;
    };

    const columns = [];

    switch (way) {
      case 'day':
        columns.push({
          title: '日期',
          dataIndex: 'date',
          key: 'date',
        });
        break;
      case 'week':
        columns.push({
          title: '周期',
          dataIndex: 'weeks',
          key: 'weeks',
        });
        break;
      case 'month':
        columns.push({
          title: '月份',
          dataIndex: 'months',
          key: 'months',
        });
        break;
      case 'year':
        columns.push({
          title: '年份',
          dataIndex: 'years',
          key: 'years',
        });
        break;
      default:
        break;
    }

    const columnsArr = [
      {
        title: '医院名称',
        dataIndex: 'hosName',
        key: 'hosName',
      },
      {
        title: '渠道',
        dataIndex: 'promoCode',
        key: 'promoCode',
      },
      {
        title: '注册量',
        dataIndex: 'regCount',
        key: 'regCount',
      },
      {
        title: '实名量',
        dataIndex: 'realCount',
        key: 'realCount',
      },
      {
        title: '关注量',
        dataIndex: 'fansCount',
        key: 'fansCount',
      },
      {
        title: '明细',
        dataIndex: 'id',
        key: 'action',
        render: (_, record) => (
          <span>
            <a onClick={e => this.handleDetail(e, record)}>查看</a>
          </span>
        ),
      },
      {
        title: '组别',
        dataIndex: 'groupId',
        key: 'groupId',
        render: record => renderGroupId(record),
      },
    ];

    columns.push(...columnsArr);
    return columns;
  };

  setTableColumnsApp = () => {
    const { way } = this.state;
    const renderGroupId = record => {
      let content = '';
      if (record) {
        content = <span>{record}组</span>;
      }
      return content;
    };

    const columns = [];

    switch (way) {
      case 'day':
        columns.push({
          title: '日期',
          dataIndex: 'date',
          key: 'date',
        });
        break;
      case 'week':
        columns.push({
          title: '周期',
          dataIndex: 'weeks',
          key: 'weeks',
        });
        break;
      case 'month':
        columns.push({
          title: '月份',
          dataIndex: 'months',
          key: 'months',
        });
        break;
      case 'year':
        columns.push({
          title: '年份',
          dataIndex: 'years',
          key: 'years',
        });
        break;
      default:
        break;
    }

    const columnsArr = [
      {
        title: '医院名称',
        dataIndex: 'hosName',
        key: 'hosName',
      },
      {
        title: '渠道',
        dataIndex: 'promoCode',
        key: 'promoCode',
      },
      {
        title: '注册量',
        dataIndex: 'regCount',
        key: 'regCount',
      },
      {
        title: '实名量',
        dataIndex: 'realCount',
        key: 'realCount',
      },
      {
        title: '明细',
        dataIndex: 'id',
        key: 'action',
        render: (_, record) => (
          <span>
            <a onClick={e => this.handleDetail(e, record)}>查看</a>
          </span>
        ),
      },
      {
        title: '组别',
        dataIndex: 'groupId',
        key: 'groupId',
        render: record => renderGroupId(record),
      },
    ];

    columns.push(...columnsArr);
    return columns;
  };

  handlePageChange = page => {
    const { onFetchPromoteAttentionAmount } = this.props;
    const { way } = this.state;
    onFetchPromoteAttentionAmount(way, page - 1);
  };

  handleSearch = async e => {
    e.preventDefault();
    const { onFetchPromoteAttentionAmount } = this.props;
    const { way } = this.state;
    onFetchPromoteAttentionAmount(way, 0);
  };

  handleReset = async e => {
    e.preventDefault();
    const { onSearchParamChange, onFetchPromoteAttentionAmount } = this.props;
    const { way } = this.state;
    await onSearchParamChange(
      'startTime',
      moment(new Date().valueOf() - 604800000).format('YYYY-MM-DD')
    );
    await onSearchParamChange('endTime', moment(new Date().valueOf()).format('YYYY-MM-DD'));
    await onSearchParamChange('way', 'week');
    await onSearchParamChange('origin', '');
    await onSearchParamChange('hosName', '');
    await onSearchParamChange('hosGrade', null);
    await onSearchParamChange('group', '1');
    await onSearchParamChange('channel', '微信');
    await onSearchParamChange('hosType', null);
    await onSearchParamChange('orderStatus', null);
    await onSearchParamChange('orderStatusWechat', null);
    await onSearchParamChange('orderStatusApp', null);
    await onSearchParamChange('isExport', false);
    await onFetchPromoteAttentionAmount(way, 0);
  };

  handleExport = e => {
    e.preventDefault();
    const { onDownloadPromoteAttentionAmount, onSearchParamChange, currentPage } = this.props;
    onSearchParamChange('isExport', true);
    onDownloadPromoteAttentionAmount(currentPage).then(data => {
      if (data) {
        const a = document.createElement('a');
        a.setAttribute('href', data);
        a.click();
      }
    });
    onSearchParamChange('isExport', false);
  };

  handleChangeWay = async value => {
    await this.setState({ way: value });
    const { onFetchPromoteAttentionAmount } = this.props;
    const { way } = this.state;
    await onFetchPromoteAttentionAmount(way, 0);
  };

  handleDetail = (e, record) => {
    e.preventDefault();
    this.setState({
      showDetail: true,
      selectedName: record.hosName,
      selectedDate: record.date || record.weeks || record.months || record.years,
    });
  };

  handleDetailClose = e => {
    e.preventDefault();
    this.setState({
      showDetail: false,
    });
  };

  render() {
    const {
      searchParam,
      promoteAttentionList,
      currentPage,
      totalElements,
      allHosName,
      allGroupName,
      groupHosName,
    } = this.props;

    const { showDetail, selectedName, way, selectedDate } = this.state;

    return (
      <React.Fragment>
        <PopularizationBar
          way={way}
          allHosName={allHosName}
          allGroupName={allGroupName}
          groupHosName={groupHosName}
          params={searchParam}
          onSearch={this.handleSearch}
          onReset={this.handleReset}
          onExport={this.handleExport}
          onChangeWay={this.handleChangeWay}
          onParamsChange={this.handleParamsChanged}
        />
        {searchParam.channel === 'app' ? (
          <TableList
            rowKey={(_, index) => index}
            list={promoteAttentionList}
            columns={this.setTableColumnsApp()}
            currentPage={currentPage}
            totalElements={totalElements}
            onPageChange={this.handlePageChange}
          />
        ) : (
          <TableList
            rowKey={(_, index) => index}
            list={promoteAttentionList}
            columns={this.setTableColumnsWechat()}
            currentPage={currentPage}
            totalElements={totalElements}
            onPageChange={this.handlePageChange}
          />
        )}
        <PopularizationDetail
          name={selectedName}
          date={selectedDate}
          visible={showDetail}
          onClose={this.handleDetailClose}
        />
      </React.Fragment>
    );
  }
}

export default AppointmentsContainer;
