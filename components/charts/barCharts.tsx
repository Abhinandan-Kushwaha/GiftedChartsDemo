import React from 'react';
import { Text, View } from 'react-native';
import { BarChart, ruleTypes } from 'react-native-gifted-charts';

import { ChartDef } from './ChartScreen';
import { theme } from './theme';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const palette = ['#0078F8', '#FF9704', '#B55AE2', '#F22750', '#33C83A', '#F2CA02'];

const axisProps = {
  yAxisTextStyle: theme.axisText,
  xAxisLabelTextStyle: theme.axisText,
  yAxisThickness: 0,
  xAxisColor: '#444',
  rulesColor: '#333',
  noOfSections: 4,
};

const pw = (w: number) => w - theme.yAxisAllowance;

const gradientData = [40, 65, 30, 80, 55, 90].map((value, i) => ({
  value,
  label: months[i],
  frontColor: '#006DFF',
  gradientColor: '#009FFF',
}));

const pairData = [
  [2500, 2400],
  [3500, 3000],
  [4500, 4000],
  [5200, 4900],
  [3000, 2800],
].flatMap(([a, b], i) => [
  {
    value: a,
    label: months[i],
    spacing: 4,
    frontColor: '#006DFF',
    gradientColor: '#009FFF',
  },
  { value: b, frontColor: '#3BE9DE', gradientColor: '#93FCF8' },
]);

const threeD = [
  ['#4ABFF4', '#23A7F3', '#92e6f6', 230],
  ['#79C3DB', '#68BCD7', '#9FD4E5', 180],
  ['#28B2B3', '#0FAAAB', '#66C9C9', 195],
  ['#4ADDBA', '#36D9B2', '#7DE7CE', 250],
  ['#91E3E3', '#85E0E0', '#B0EAEB', 320],
].map(([frontColor, sideColor, topColor, value], i) => ({
  value: value as number,
  label: months[i],
  frontColor: frontColor as string,
  sideColor: sideColor as string,
  topColor: topColor as string,
}));

const longData = Array.from({ length: 30 }, (_, i) => ({
  value: 20 + Math.round(Math.abs(Math.sin(i / 3)) * 70) + (i % 4) * 5,
  label: i % 5 === 0 ? `D${i + 1}` : '',
  frontColor: i % 2 ? '#0EB2F8' : '#0078F8',
}));

export const barCharts: ChartDef[] = [
  {
    id: 'bar-gradient',
    title: 'Animated Gradient Bars',
    subtitle: 'Rounded bars with gradient fill, top labels and tap-to-highlight',
    render: w => (
      <BarChart
        {...axisProps}
        data={gradientData}
        width={pw(w)}
        barWidth={26}
        spacing={22}
        initialSpacing={10}
        barBorderRadius={8}
        showGradient
        isAnimated
        animationDuration={1000}
        highlightEnabled
        lowlightOpacity={0.3}
        showValuesAsTopLabel
        topLabelTextStyle={{ color: 'white', fontSize: 10 }}
        hideRules
      />
    ),
  },
  {
    id: 'bar-pair',
    title: 'Grouped Bars',
    subtitle: 'Bar pairs per month with dashed x-axis and custom y labels',
    render: w => (
      <BarChart
        {...axisProps}
        data={pairData}
        width={pw(w)}
        barWidth={12}
        spacing={14}
        initialSpacing={10}
        barBorderRadius={4}
        showGradient
        xAxisType={ruleTypes.DASHED}
        stepValue={1000}
        maxValue={6000}
        noOfSections={6}
        yAxisLabelTexts={['0', '1k', '2k', '3k', '4k', '5k', '6k']}
      />
    ),
  },
  {
    id: 'bar-stacked',
    title: 'Stacked Bars',
    subtitle: 'Multiple segments per bar with rounded top corners',
    render: w => (
      <BarChart
        {...axisProps}
        width={pw(w)}
        barWidth={28}
        spacing={22}
        initialSpacing={10}
        isAnimated
        stackBorderTopLeftRadius={10}
        stackBorderTopRightRadius={10}
        stackData={months.map((label, i) => ({
          label,
          stacks: [
            { value: 10 + ((i * 7) % 12), color: '#4ABFF4' },
            { value: 8 + ((i * 5) % 10), color: 'orange', marginBottom: 2 },
            { value: 5 + ((i * 3) % 8), color: '#28B2B3', marginBottom: 2 },
          ],
        }))}
      />
    ),
  },
  {
    id: 'bar-3d',
    title: '3D Bars',
    subtitle: 'Bars rendered with side and top faces',
    render: w => (
      <BarChart
        {...axisProps}
        data={threeD}
        width={pw(w)}
        barWidth={34}
        sideWidth={14}
        spacing={20}
        initialSpacing={10}
        isThreeD
        side="right"
        maxValue={400}
        hideRules
        showFractionalValues
      />
    ),
  },
  {
    id: 'bar-horizontal',
    title: 'Horizontal Bars',
    subtitle: 'Bars laid out left to right with value labels',
    render: w => (
      <BarChart
        {...axisProps}
        horizontal
        width={pw(w) - 20}
        barWidth={18}
        spacing={16}
        initialSpacing={6}
        barBorderRadius={6}
        hideRules
        isAnimated
        showValuesAsTopLabel
        topLabelTextStyle={{ color: 'white', fontSize: 10 }}
        data={['Swift', 'Kotlin', 'TS', 'Go', 'Rust'].map((label, i) => ({
          label,
          value: [60, 52, 85, 40, 33][i],
          frontColor: palette[i],
        }))}
      />
    ),
  },
  {
    id: 'bar-negative',
    title: 'Positive & Negative Bars',
    subtitle: 'Profit and loss with colors split by sign',
    render: w => (
      <BarChart
        {...axisProps}
        width={pw(w)}
        barWidth={24}
        spacing={22}
        initialSpacing={10}
        noOfSectionsBelowXAxis={3}
        barBorderRadius={4}
        data={[30, -12, 45, -25, 18, 40].map((value, i) => ({
          value,
          label: months[i],
          frontColor: value >= 0 ? '#33C83A' : '#F22750',
        }))}
      />
    ),
  },
  {
    id: 'bar-line',
    title: 'Bars with Line Overlay',
    subtitle: 'Combine a curved line series on top of bars',
    render: w => (
      <BarChart
        {...axisProps}
        width={pw(w)}
        barWidth={22}
        spacing={26}
        initialSpacing={10}
        barBorderRadius={4}
        frontColor="#177AD5"
        data={[50, 70, 45, 90, 60, 75].map((value, i) => ({
          value,
          label: months[i],
        }))}
        showLine
        lineConfig={{
          color: '#F29C6E',
          thickness: 3,
          curved: true,
          hideDataPoints: false,
          dataPointsColor: '#FF9704',
          isAnimated: true,
          shiftY: 6,
          initialSpacing: 10,
        }}
        lineData={[55, 62, 52, 80, 66, 70].map(value => ({ value }))}
      />
    ),
  },
  {
    id: 'bar-capped',
    title: 'Capped Bars',
    subtitle: 'Translucent bars with a solid cap on top',
    render: w => (
      <BarChart
        {...axisProps}
        width={pw(w)}
        barWidth={34}
        spacing={30}
        initialSpacing={14}
        cappedBars
        capColor="rgb(197, 166, 221)"
        capThickness={4}
        showGradient
        gradientColor="rgba(200, 100, 244, 0.8)"
        frontColor="rgba(219, 182, 249, 0.2)"
        data={[15, 40, 10, 30, 25].map((value, i) => ({
          value,
          label: months[i],
        }))}
      />
    ),
  },
  {
    id: 'bar-tooltip',
    title: 'Bars with Tooltip',
    subtitle: 'Tap a bar to see its value in a tooltip',
    render: w => (
      <BarChart
        {...axisProps}
        width={pw(w)}
        barWidth={26}
        spacing={22}
        initialSpacing={10}
        barBorderRadius={6}
        yAxisExtraHeight={30}
        // overflowTop={50}
        focusBarOnPress
        focusedBarConfig={{ color: '#FF9704' }}
        frontColor="#0078F8"
        data={[34, 58, 41, 76, 52, 63].map((value, i) => ({
          value,
          label: months[i],
        }))}
        renderTooltip={(item: { value: number }) => (
          <View
            style={{
              marginBottom: 4,
              marginLeft: -6,
              backgroundColor: 'white',
              paddingHorizontal: 8,
              paddingVertical: 3,
              borderRadius: 6,
            }}>
            <Text style={{ fontWeight: 'bold' }}>{item.value}</Text>
          </View>
        )}
      />
    ),
  },
  {
    id: 'bar-scroll',
    title: 'Scrollable Bars with Reference Line',
    subtitle: 'Thirty bars scroll horizontally; a dashed line marks the target',
    render: w => (
      <BarChart
        {...axisProps}
        data={longData}
        width={pw(w)}
        barWidth={12}
        spacing={14}
        initialSpacing={8}
        barBorderRadius={3}
        maxValue={120}
        showReferenceLine1
        referenceLine1Position={70}
        referenceLine1Config={{
          color: '#F2CA02',
          dashWidth: 4,
          dashGap: 4,
          labelText: 'Target 70',
          labelTextStyle: { color: '#F2CA02', fontSize: 10 },
        }}
      />
    ),
  },
];
