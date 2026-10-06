import React from "react";
import {
  BubbleChart,
  CandleStickChart,
  PopulationPyramid,
  RadarChart,
} from "react-native-gifted-charts";

import { ChartDef } from "./ChartScreen";
import { theme } from "./theme";

const pw = (w: number) => w - theme.yAxisAllowance;
const labelStyle = { stroke: "white", fontSize: 10 };

const skills = ["Speed", "Power", "Agility", "Stamina", "Focus", "Skill"];

const candles = [
    { open: 50, high: 75, low: 45, close: 72 },
    { open: 72, high: 78, low: 38, close: 42 },
    { open: 42, high: 65, low: 35, close: 60 },
    { open: 60, high: 95, low: 58, close: 89 },
    { open: 75, high: 80, low: 20, close: 25 },
    { open: 25, high: 55, low: 22, close: 52 },
    { open: 52, high: 85, low: 48, close: 82 },
    { open: 82, high: 86, low: 30, close: 35 },
    { open: 35, high: 60, low: 32, close: 58 },
  ];

const ages = ["0-10", "10-20", "20-30", "30-40", "40-50", "50-60"];

export const moreCharts: ChartDef[] = [
  {
    id: "radar-basic",
    title: "Radar Chart",
    subtitle: "Single polygon across six axes",
    render: (w) => (
      <RadarChart
        data={[80, 60, 90, 50, 70, 85]}
        labels={skills}
        maxValue={100}
        chartSize={Math.min(w - 90, 260)}
        labelConfig={labelStyle}
        polygonConfig={{
          stroke: "#00ff83",
          fill: "#00ff83",
          opacity: 0.35,
          strokeWidth: 2,
        }}
        width={320}
        gridConfig={{ stroke: "#555" }}
        asterLinesConfig={{ stroke: "#555" }}
        isAnimated
        labelsPositionOffset={16}
        chartContainerProps={{
          height: Math.min(w - 70, 280),
          width: Math.min(w - 70, 280),
          shiftX: 10,
        }}
      />
    ),
  },
  {
    id: "radar-multi",
    title: "Radar Comparison",
    subtitle: "Two data sets compared on the same grid",
    render: (w) => (
      <RadarChart
        dataSet={[
          [80, 60, 90, 50, 70, 85],
          [50, 85, 55, 80, 45, 60],
        ]}
        labels={skills}
        maxValue={100}
        chartSize={Math.min(w - 90, 260)}
        labelConfig={labelStyle}
        polygonConfigArray={[
          { stroke: "#0078F8", fill: "#0078F8", opacity: 0.3 },
          { stroke: "#FF9704", fill: "#FF9704", opacity: 0.3 },
        ]}
        gridConfig={{ stroke: "#555" }}
        asterLinesConfig={{ stroke: "#555" }}
        isAnimated
        labelsPositionOffset={14}
        chartContainerProps={{
          height: Math.min(w - 80, 270),
          width: Math.min(w - 80, 270),
          shiftX: 8,
        }}
      />
    ),
  },
  {
    id: "radar-circular",
    title: "Circular Radar with Values",
    subtitle: "Round grid with data values shown on the polygon",
    render: (w) => (
      <RadarChart
        circular
        data={[70, 90, 40, 65, 80]}
        labels={["HTML", "CSS", "JS", "React", "Node"]}
        maxValue={100}
        chartSize={Math.min(w - 90, 260)}
        labelConfig={labelStyle}
        dataLabels={["70", "90", "40", "65", "80"]}
        dataLabelsConfig={{ fontSize: 10, stroke: "#F2CA02" }}
        polygonConfig={{
          stroke: "#B55AE2",
          fill: "#B55AE2",
          opacity: 0.4,
          showGradient: true,
          gradientColor: "#F22750",
        }}
        gridConfig={{ stroke: "#555" }}
        asterLinesConfig={{ stroke: "#555" }}
        labelsPositionOffset={12}
      />
    ),
  },
  {
    id: "candle-basic",
    title: "Candlestick Chart",
    subtitle: "Open, high, low and close with bullish and bearish colors",
    render: (w) => (
      <CandleStickChart
        data={candles}
        width={pw(w)}
        height={200}
        barWidth={10}
        spacing={8}
        initialSpacing={10}
        bullishColor="#33C83A"
        bearishColor="#F22750"
        yAxisTextStyle={theme.axisText}
        xAxisLabelTextStyle={theme.axisText}
        yAxisThickness={0}
        xAxisColor="#444"
        rulesColor="#333"
        noOfSections={4}
        // yAxisOffset={60}
        maxValue={80}
      />
    ),
  },
  {
    id: "candle-hollow",
    title: "Hollow Candles",
    subtitle: "Outlined candles with rounded bodies",
    render: (w) => (
      <CandleStickChart
        data={candles.slice(0, 12)}
        width={pw(w)}
        height={180}
        barWidth={14}
        spacing={12}
        initialSpacing={10}
        bullishColor="transparent"
        bearishColor="#F2CA02"
        bullishBorderColor="#00ff83"
        bullishBorderWidth={2}
        bullishVerticalLineColor="#00ff83"
        bearishVerticalLineColor="#F2CA02"
        bullishBorderRadius={3}
        bearishBorderRadius={3}
        yAxisTextStyle={theme.axisText}
        xAxisLabelTextStyle={theme.axisText}
        yAxisThickness={0}
        xAxisColor="#444"
        rulesColor="#333"
        noOfSections={4}
        // yAxisOffset={60}
        maxValue={80}
      />
    ),
  },
  {
    id: "bubble-basic",
    title: "Bubble Chart",
    subtitle: "Bubble radius encodes a third dimension",
    render: (w) => (
      <BubbleChart
        data={[
          { y: 30, r: 10, bubbleColor: "#0078F8", label: "A" },
          { y: 60, r: 16, bubbleColor: "#FF9704", label: "B" },
          { y: 40, r: 8, bubbleColor: "#B55AE2", label: "C" },
          { y: 80, r: 20, bubbleColor: "#F22750", label: "D" },
          { y: 55, r: 12, bubbleColor: "#33C83A", label: "E" },
        ]}
        width={pw(w)}
        height={200}
        spacing={(pw(w) - 40) / 5}
        initialSpacing={20}
        opacity={0.8}
        yAxisTextStyle={theme.axisText}
        xAxisLabelTextStyle={theme.axisText}
        yAxisThickness={0}
        xAxisColor="#444"
        rulesColor="#333"
        isAnimated
      />
    ),
  },
  {
    id: "bubble-scatter",
    title: "Scatter Plot",
    subtitle: "X/Y points with a regression line",
    render: (w) => (
      <BubbleChart
        scatterChart
        data={[
          { x: 1, y: 12 },
          { x: 2, y: 18 },
          { x: 3, y: 15 },
          { x: 4, y: 28 },
          { x: 5, y: 33 },
          { x: 6, y: 30 },
          { x: 7, y: 45 },
          { x: 8, y: 52 },
          { x: 9, y: 48 },
        ]}
        width={pw(w)}
        height={200}
        bubblesColor="#00ff83"
        showRegressionLine
        yAxisTextStyle={theme.axisText}
        xAxisLabelTextStyle={theme.axisText}
        yAxisThickness={0}
        xAxisColor="#444"
        rulesColor="#333"
      />
    ),
  },
  {
    id: "pyramid",
    title: "Population Pyramid",
    subtitle: "Mirrored horizontal bars with a labelled middle axis",
    render: () => (
      <PopulationPyramid
        data={[
          { left: 30, right: 40, midAxisLabel: "~5" },
          { left: 40, right: 44, midAxisLabel: "~15" },
          { left: 55, right: 57, midAxisLabel: "~25" },
          { left: 94, right: 87, midAxisLabel: "~35" },
          { left: 90, right: 88, midAxisLabel: "~45" },
          { left: 60, right: 66, midAxisLabel: "~55" },
        ]}
        yAxisLabelTexts={[...ages].reverse()}
        yAxisLabelFontSize={10}
        yAxisLabelColor={'lightgray'}
        xAxisLabelColor={'lightgray'}
        yAxisColor='lightgray'
        xAxisColor='lightgray'
        showMidAxis
        midAxisLabelFontSize={10}
        midAxisLabelColor="gray"
        leftBarLabelColor="#0078F8"
        rightBarLabelColor="#F22750"
        midAxisLeftColor="#0078F8"
        midAxisRightColor="#F22750"
      />
    ),
  },
];
