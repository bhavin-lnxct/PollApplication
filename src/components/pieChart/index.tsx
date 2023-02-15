import React from 'react';
import {View} from 'react-native';
import {VictoryPie} from 'victory-native';
import {ms} from 'react-native-size-matters';
import colors from '../../theme/colors/colors';

interface PieChartInterface {
  item: object;
}

const PieChart = ({item}: PieChartInterface) => {
  const customColors = [
    colors.AppTheme.ChartFirst,
    colors.AppTheme.ChartSecond,
    colors.AppTheme.ChartThird,
    colors.AppTheme.ChartFourth,
    colors.AppTheme.ChartFifth,
    colors.AppTheme.ChartFourth,
    colors.AppTheme.ChartThird,
    colors.AppTheme.ChartSecond,
    colors.AppTheme.ChartFirst,
    colors.AppTheme.ChartSecond,
    colors.AppTheme.ChartThird,
    colors.AppTheme.ChartFourth,
    colors.AppTheme.ChartFifth,
    colors.AppTheme.ChartFourth,
    colors.AppTheme.ChartThird,
    colors.AppTheme.ChartSecond,
    colors.AppTheme.ChartFirst,
    colors.AppTheme.ChartSecond,
    colors.AppTheme.ChartThird,
    colors.AppTheme.ChartFourth,
    colors.AppTheme.ChartFifth,
    colors.AppTheme.ChartFourth,
    colors.AppTheme.ChartThird,
    colors.AppTheme.ChartSecond,
  ];
  const data = item?.options?.map(
    (val: {vote: number; option: string; total_votes: number}, index: any) => ({
      color: customColors[index],
      x: `${Math.round((val.vote * 100) / item.total_votes)}%`,
      y: val.vote,
    }),
  );

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <VictoryPie
        data={data?.filter(val => val.y !== 0)}
        labelRadius={ms(50)}
        height={ms(300)}
        width={ms(320)}
        style={{
          labels: {fontWeight: '600', fill: colors.AppTheme.Secondary},
          data: {fill: d => d.datum.color},
        }}
      />
    </View>
  );
};

export default PieChart;
