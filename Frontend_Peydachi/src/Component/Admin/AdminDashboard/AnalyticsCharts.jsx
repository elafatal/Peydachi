import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const AnalyticsCharts = ({ cityData, topRatersData }) => {
  const cityRef = useRef(null);
  const productRef = useRef(null);

  useEffect(() => {
    const cityChart = echarts.init(cityRef.current);
    const productChart = echarts.init(productRef.current);

    cityChart.setOption({
      animation: false,
      tooltip: { trigger: 'item' },
      legend: { top: '5%', left: 'center' },
      series: [
        {
          name: 'Stores by City',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: { show: false, position: 'center' },
          emphasis: {
            label: {
              show: true,
              fontSize: 16,
              fontWeight: 'bold'
            }
          },
          labelLine: { show: false },
          data: cityData
        }
      ]
    });

productChart.setOption({
  animation: false,
  grid: {
    bottom: 60,
  },
  xAxis: {
    type: 'category',
    data: topRatersData.categories,
    axisLine: { lineStyle: { color: '#e5e7eb' } },
    axisTick: { show: false },
    axisLabel: {
      color: '#6b7280',
      rotate: 30,
      fontSize: 12
    }
  },
  yAxis: {
    type: 'value',
    splitLine: { lineStyle: { color: '#f3f4f6' } },
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { color: '#6b7280' }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' }
  },
  series: [
    {
      data: topRatersData.values,
      type: 'bar',
      barWidth: '60%',
      itemStyle: { color: '#4F46E5', borderRadius: [6, 6, 0, 0] }
    }
  ]
});

    const handleResize = () => {
      cityChart.resize();
      productChart.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cityChart.dispose();
      productChart.dispose();
    };
  }, [cityData, topRatersData]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h4 className="text-sm font-medium text-gray-500 mb-4">توزیع فروشگاه توسط شهر</h4>
        <div ref={cityRef} className="w-full h-80" />
      </div>
      <div>
      <h4 className="text-sm font-medium text-gray-500 mb-4">
      کاربران با بیشترین مشارکت
      </h4>
        <div ref={productRef} className="w-full h-80" />
      </div>
    </div>
  );
};

export default AnalyticsCharts;
