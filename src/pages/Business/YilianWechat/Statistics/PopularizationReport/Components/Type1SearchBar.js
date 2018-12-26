import React from 'react';
import { Select, Button, DatePicker } from 'antd';
import moment from 'moment';

import classes from '../PopularizationReport.less';

function type1SearchBar(props) {
  const { params, searchGroupList, onParamsChange, onReset, onExport, onSearch } = props;

  let options = '';
  if (searchGroupList && Array.isArray(searchGroupList)) {
    options = (
      <Select
        className={classes.Gap}
        name="groupName"
        value={params.groupName}
        onChange={value => onParamsChange(value, 'groupName')}
      >
        {searchGroupList.map(data => (
          <Select.Option key={data.id} value={data.name}>
            {data.name}
          </Select.Option>
        ))}
      </Select>
    );
  }

  const chooseTime = () => {
    let content = (
      <span>
        <span className={classes.Span}>
          开始日期：
          <DatePicker
            format="YYYY-MM-DD"
            showToday={false}
            allowClear={false}
            value={moment(params.startTime, 'YYYY-MM-DD')}
            onChange={(_, dateStrings) => onParamsChange(dateStrings, 'startTime')}
          />
        </span>
        <span className={classes.Span}>
          截止日期：
          <DatePicker
            format="YYYY-MM-DD"
            showToday={false}
            allowClear={false}
            value={moment(params.endTime, 'YYYY-MM-DD')}
            onChange={(_, dateStrings) => onParamsChange(dateStrings, 'endTime')}
          />
        </span>
      </span>
    );
    if (params.countType === 'month') {
      content = (
        <span>
          <span className={classes.Span}>
            开始月份：
            <DatePicker.MonthPicker
              format="YYYY-MM"
              showToday={false}
              allowClear={false}
              value={moment(params.startTime, 'YYYY-MM-DD')}
              onChange={(_, dateStrings) => onParamsChange(dateStrings, 'startTime')}
            />
          </span>
          <span className={classes.Span}>
            截止月份：
            <DatePicker.MonthPicker
              format="YYYY-MM"
              showToday={false}
              allowClear={false}
              value={moment(params.endTime, 'YYYY-MM-DD')}
              onChange={(_, dateStrings) => onParamsChange(dateStrings, 'endTime')}
            />
          </span>
        </span>
      );
    }
    if (params.countType === 'year') {
      const currentStart = moment(new Date().valueOf() - 2678400000).format('YYYY-MM-DD');
      const currentEnd = moment(new Date().valueOf() - 86400000).format('YYYY-MM-DD');

      // 默认开始年份
      const defaultStart = params.startTime.split('-').splice(0, 1);
      defaultStart.push('01', '01');
      const defaultStartTime = defaultStart.join('-');

      // 默认截止年份
      const defaultEnd = params.endTime.split('-').splice(0, 1);
      defaultEnd.push('12', '31');
      const defaultEndTime = defaultEnd.join('-');

      // 开始年份
      const startYear1 = currentStart.split('-').splice(0, 1);
      startYear1.push('01', '01');
      const startYear2 = startYear1.join('-');

      const startYear3 = parseInt(startYear2.split('-')[0], 10);
      const startyearArr = [{ date: startYear2, year: startYear3 }];

      // for (let i = 0; i < 20; i + 1) {
      //   startYear3 - 1;
      //   const startYear4 = [startYear3];
      //   startYear4.push('01', '01');
      //   const startYear5 = startYear4.join('-');
      //   startyearArr.push({ date: startYear5, year: startYear3 });
      // }

      // 截止年份
      const endYear1 = currentEnd.split('-').splice(0, 1);
      endYear1.push('12', '31');
      const endYear2 = endYear1.join('-');

      const endYear3 = parseInt(endYear2.split('-')[0], 10);
      const endyearArr = [{ date: endYear2, year: endYear3 }];

      // for (let i = 0; i < 20; i+1) {
      //   endYear3 - 1;
      //   const endYear4 = [endYear3];
      //   endYear4.push('12', '31');
      //   const endYear5 = endYear4.join('-');
      //   endyearArr.push({ date: endYear5, year: endYear3 });
      // }

      content = (
        <span>
          <span className={classes.Span}>
            开始年份：
            <Select
              className={classes.Gap}
              style={{ width: 150 }}
              value={defaultStartTime}
              onChange={value => onParamsChange(value, 'startTime')}
            >
              {startyearArr.map(item => (
                <Select.Option key={item.year} value={item.date}>
                  {item.year}
                </Select.Option>
              ))}
            </Select>
          </span>
          <span className={classes.Span}>
            截止年份：
            <Select
              className={classes.Gap}
              style={{ width: 150 }}
              value={defaultEndTime}
              onChange={value => onParamsChange(value, 'endTime')}
            >
              {endyearArr.map(item => (
                <Select.Option key={item.year} value={item.date}>
                  {item.year}
                </Select.Option>
              ))}
            </Select>
          </span>
        </span>
      );
    }
    return content;
  };

  return (
    <div className={classes.Search}>
      <Select
        className={classes.Span}
        name="countType"
        value={params.countType}
        onChange={value => onParamsChange(value, 'countType')}
      >
        <Select.Option value="day">按日统计</Select.Option>
        <Select.Option value="week">按周统计</Select.Option>
        <Select.Option value="month">按月统计</Select.Option>
        <Select.Option value="year">按年统计</Select.Option>
      </Select>
      {chooseTime()}
      <span className={classes.Span}>{options}</span>
      <Select
        className={classes.Span}
        name="project"
        value={params.project}
        onChange={value => onParamsChange(value, 'project')}
        style={{ width: 120 }}
      >
        <Select.Option value="">全部</Select.Option>
        <Select.Option value="fansCount">关注量</Select.Option>
        <Select.Option value="regCount">注册量</Select.Option>
        <Select.Option value="conversionRate">注册转化率</Select.Option>
      </Select>
      <span className={classes.BtnRight}>
        <Button type="primary" htmlType="button" onClick={onSearch} className={classes.Gap}>
          查询
        </Button>
        <Button type="primary" htmlType="button" onClick={onReset} className={classes.Gap}>
          重置
        </Button>
        <Button type="primary" htmlType="button" onClick={onExport}>
          导出
        </Button>
      </span>
    </div>
  );
}

export default type1SearchBar;
