import { getSalesData } from '@/lib/orderQueries';
import dayjs, { Dayjs } from 'dayjs';
import * as echarts from 'echarts';
import ReactECharts from 'echarts-for-react';
import React, { useEffect, useState } from 'react';

type salesResponseItem = {
    drink_id: Number;
    drink_name: String;
    sales: Number;
};

interface props {
    beginDate: Dayjs | null;
    endDate: Dayjs | null;
}

const BarEchart: React.FC<props> = ({ beginDate, endDate }) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(new Array<salesResponseItem>());
    const [chartBeginDate, setChartBeginDate] = useState(dayjs(new Date()));
    const [chartEndDate, setChartEndDate] = useState(dayjs(new Date()));

    const getData = React.useCallback(async (beginDate: Date, endDate: Date) => {
        const result = await getSalesData(beginDate, endDate);
        setData(result);
    }, []);

    useEffect(() => {
        setLoading(true);
        if (beginDate !== null && endDate !== null) {
            if (beginDate !== chartBeginDate || endDate !== chartEndDate) {
                setChartBeginDate(beginDate);
                setChartEndDate(endDate);
            }
            getData(beginDate.toDate(), endDate.toDate());            
        }
        setLoading(false);
    }, [getData, beginDate, endDate]);

    let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            label: {
                precision: '2'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: data.map((item) => (item.drink_name)),
            axisTick: {
              alignWithLabel: false
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Direct',
            type: 'bar',
            barWidth: '60%',
            data: data.map((item) => (item.sales)),
          }
        ]
      };

    return <ReactECharts option={option} />
}

export default BarEchart;