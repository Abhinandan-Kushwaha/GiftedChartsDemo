import React from 'react';
import { Text, View } from 'react-native';
import {
  LineChart,
  LineChartBicolor,
  ruleTypes,
} from 'react-native-gifted-charts';

import { ChartDef } from './ChartScreen';
import { theme } from './theme';

const series = (n: number, base: number, amp: number, phase = 0) =>
  Array.from({ length: n }, (_, i) => ({
    value: Math.round(base + Math.sin(i / 2 + phase) * amp + (i % 3) * 4),
  }));

const axisProps = {
  yAxisTextStyle: theme.axisText,
  xAxisLabelTextStyle: theme.axisText,
  yAxisThickness: 0,
  xAxisColor: '#444',
  rulesColor: '#333',
  noOfSections: 4,
};

const pw = (w: number) => w - theme.yAxisAllowance;

const labeled = (n: number, every: number) =>
  series(n, 60, 30).map((d, i) => ({
    ...d,
    label: i % every === 0 ? `${i + 1}` : '',
  }));

const pointerData = Array.from({ length: 40 }, (_, i) => ({
  value: Math.round(200 + Math.sin(i / 4) * 80 + Math.cos(i / 1.7) * 30),
  date: `${i + 1} Apr 2024`,
  label: i % 10 === 0 ? `${i + 1} Apr` : undefined,
  labelTextStyle: { color: theme.muted, width: 50, fontSize: 10 },
}));

export const lineCharts: ChartDef[] = [
  {
    id: 'line-area',
    title: 'Curved Area Chart',
    subtitle: 'Smooth line with gradient fill and animation',
    render: w => (
      <LineChart
        {...axisProps}
        data={labeled(12, 3)}
        width={pw(w)}
        height={180}
        spacing={(pw(w) - 20) / 11}
        initialSpacing={10}
        curved
        areaChart
        isAnimated
        animationDuration={1200}
        color="#00ff83"
        thickness={3}
        hideDataPoints
        startFillColor="#00ff83"
        endFillColor="#00ff83"
        startOpacity={0.5}
        endOpacity={0.02}
        hideRules
      />
    ),
  },
  {
    id: 'line-two',
    title: 'Two Lines',
    subtitle: 'Compare two series with different colors and data points',
    render: w => (
      <LineChart
        {...axisProps}
        data={labeled(8, 1)}
        data2={series(8, 45, 25, 1.5)}
        width={pw(w)}
        spacing={(pw(w) - 20) / 7}
        initialSpacing={10}
        color1="#8a56ce"
        color2="#56acce"
        dataPointsColor1="#8a56ce"
        dataPointsColor2="#56acce"
        thickness={3}
        curved
      />
    ),
  },
  {
    id: 'line-pointer',
    title: 'Pointer with Tooltip',
    subtitle: 'Press and drag across the chart to read exact values',
    render: w => (
      <LineChart
        {...axisProps}
        areaChart
        data={pointerData}
        width={pw(w)}
        height={200}
        spacing={8}
        initialSpacing={0}
        hideDataPoints
        color="#00ff83"
        thickness={2}
        startFillColor="rgba(20,105,81,0.4)"
        endFillColor="rgba(20,85,81,0.01)"
        startOpacity={0.9}
        endOpacity={0.2}
        maxValue={400}
        noOfSections={4}
        pointerConfig={{
          pointerStripHeight: 200,
          pointerStripColor: 'lightgray',
          pointerStripWidth: 2,
          pointerColor: 'lightgray',
          radius: 6,
          pointerLabelWidth: 100,
          pointerLabelHeight: 80,
          autoAdjustPointerLabelPosition: true,
          pointerLabelComponent: (items: { date: string; value: number }[]) => (
            <View style={{ width: 100, justifyContent: 'center' }}>
              <Text style={{ color: 'white', fontSize: 12, textAlign: 'center' }}>
                {items[0].date}
              </Text>
              <View
                style={{
                  marginTop: 6,
                  paddingHorizontal: 12,
                  paddingVertical: 4,
                  borderRadius: 14,
                  backgroundColor: 'white',
                }}>
                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                  {'$' + items[0].value}
                </Text>
              </View>
            </View>
          ),
        }}
      />
    ),
  },
  {
    id: 'line-dataset',
    title: 'Multi-Series Data Set',
    subtitle: 'Three series defined through a single dataSet array',
    render: w => (
      <LineChart
        {...axisProps}
        dataSet={[
          { data: labeled(10, 3), color: '#0078F8', dataPointsColor: '#0078F8' },
          { data: series(10, 50, 20, 1), color: '#FF9704', dataPointsColor: '#FF9704' },
          { data: series(10, 40, 25, 2), color: '#F22750', dataPointsColor: '#F22750' },
        ]}
        width={pw(w)}
        spacing={(pw(w) - 20) / 9}
        initialSpacing={10}
        thickness={2}
        dataPointsRadius={3}
        isAnimated
      />
    ),
  },
  {
    id: 'line-segmented',
    title: 'Segmented Lines',
    subtitle: 'Dashed and gray segments inside a continuous line',
    render: w => (
      <LineChart
        {...axisProps}
        data={[0, 10, 8, 58, 56, 78, 74, 98].map(value => ({ value }))}
        data2={[0, 20, 18, 40, 36, 60, 54, 85].map(value => ({ value }))}
        lineSegments={[{ startIndex: 2, endIndex: 4, strokeDashArray: [3, 4] }]}
        lineSegments2={[
          { startIndex: 0, endIndex: 2, color: 'gray' },
          { startIndex: 4, endIndex: 6, strokeDashArray: [3, 4], color: 'gray' },
        ]}
        width={pw(w)}
        spacing={(pw(w) - 20) / 7}
        initialSpacing={10}
        color1="skyblue"
        color2="orange"
        dataPointsColor1="blue"
        dataPointsColor2="red"
        thickness={3}
        showVerticalLines
        verticalLinesColor="#333"
      />
    ),
  },
//   {
//     id: 'line-range',
//     title: 'Highlighted Range',
//     subtitle: 'Part of the line is colored differently for a value range',
//     render: w => (
//       <LineChart
//         {...axisProps}
//         data={[6, 6, 8, 5, 5, 8, 0, 8, 10, 10, 12, 15, 20, 22, 20].map(value => ({
//           value,
//         }))}
//         width={pw(w)}
//         spacing={(pw(w) - 20) / 14}
//         initialSpacing={10}
//         thickness={5}
//         color="#F22750"
//         hideRules
//         hideDataPoints
//         highlightedRange={{ from: 5, to: 12, color: '#33C83A' }}
//       />
//     ),
//   },
  {
    id: 'line-gradient',
    title: 'Gradient Line',
    subtitle: 'Line stroke blends from one color to another',
    render: w => (
      <LineChart
        {...axisProps}
        data={labeled(10, 3)}
        width={pw(w)}
        spacing={(pw(w) - 20) / 9}
        initialSpacing={10}
        thickness={5}
        curved
        hideDataPoints
        lineGradient
        lineGradientStartColor="#F22750"
        lineGradientEndColor="#2387DC"
        isAnimated
        hideRules
      />
    ),
  },
  {
    id: 'line-secondary',
    title: 'Secondary Y-Axis',
    subtitle: 'Two series with independent scales on left and right',
    render: w => (
      <LineChart
        {...axisProps}
        data={series(14, 100, 15).map((d, i) => ({
          ...d,
          label: i % 4 === 0 ? `Q${i / 4 + 1}` : '',
        }))}
        width={pw(w) - 30}
        maxValue={140}
        noOfSections={7}
        spacing={(pw(w) - 50) / 13}
        initialSpacing={10}
        hideDataPoints
        color="orange"
        yAxisColor="orange"
        yAxisThickness={1}
        secondaryData={[0.055, 0.02, 0.1, 0.01, 0.05, 0.06, 0.08, 0.1, 0.08, 0.07, 0.06, 0.025, 0.04, 0.06].map(
          value => ({ value }),
        )}
        secondaryLineConfig={{ color: '#56acce' }}
        secondaryYAxis={{
          maxValue: 0.2,
          noOfSections: 4,
          showFractionalValues: true,
          roundToDigits: 3,
          yAxisColor: '#56acce',
          yAxisTextStyle: theme.axisText,
        }}
      />
    ),
  },
  {
    id: 'line-step',
    title: 'Step Chart',
    subtitle: 'Values hold flat until the next point, with value labels',
    render: w => (
      <LineChart
        {...axisProps}
        dataSet={[
          {
            data: [100, 110, 108, 158, 156, 178, 174, 198].map(value => ({ value })),
            color: 'skyblue',
            dataPointsColor: 'blue',
          },
          {
            data: [100, 120, 118, 140, 136, 160, 154, 185].map(value => ({ value })),
            color: 'orange',
            dataPointsColor: 'red',
          },
        ]}
        stepChart
        width={pw(w)}
        spacing={(pw(w) - 20) / 7}
        initialSpacing={10}
        yAxisOffset={80}
        thickness={3}
        dataPointsRadius={3}
      />
    ),
  },
  {
    id: 'line-bicolor',
    title: 'Bicolor Area',
    subtitle: 'Green above zero, red below zero',
    render: w => (
      <LineChartBicolor
        {...axisProps}
        data={[0, 20, -18, 40, 36, -60, 54, 85].map(value => ({ value }))}
        width={pw(w)}
        spacing={(pw(w) - 20) / 7}
        initialSpacing={10}
        areaChart
        color="#33C83A"
        colorNegative="#F22750"
        startFillColor="#33C83A"
        startFillColorNegative="#F22750"
        thickness={2}
      />
    ),
  },
  {
    id: 'line-scroll',
    title: 'Scrolling Dashed Area',
    subtitle: 'Long series with dashed rules, scrolls horizontally',
    render: w => (
      <LineChart
        {...axisProps}
        areaChart
        data={labeled(40, 5)}
        width={pw(w)}
        spacing={22}
        initialSpacing={10}
        color="#B55AE2"
        thickness={2}
        startFillColor="#B55AE2"
        endFillColor="#B55AE2"
        startOpacity={0.4}
        endOpacity={0.02}
        rulesType={ruleTypes.DASHED}
        dataPointsColor="#B55AE2"
        dataPointsRadius={2}
        curved
      />
    ),
  },
];
