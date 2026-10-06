import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { PieChart, PieChartPro } from 'react-native-gifted-charts';

import { ChartDef } from './ChartScreen';
import { theme } from './theme';

const card = theme.card;

const basic = [
  { value: 54, color: '#177AD5', text: '54%' },
  { value: 40, color: '#79D2DE', text: '40%' },
  { value: 20, color: '#ED6665', text: '20%' },
];

const five = [
  { value: 35, color: '#0078F8', gradientCenterColor: '#0EB2F8', text: '35%' },
  { value: 25, color: '#FF9704', gradientCenterColor: '#FCC601', text: '25%' },
  { value: 20, color: '#B55AE2', gradientCenterColor: '#D485E6', text: '20%' },
  { value: 12, color: '#33C83A', gradientCenterColor: '#30E45A', text: '12%' },
  { value: 8, color: '#F22750', gradientCenterColor: '#FA4880', text: '8%' },
];

const Center = ({ children }: { children: React.ReactNode }) => (
  <View style={{ alignItems: 'center' }}>{children}</View>
);

const Legend = ({ items }: { items: { color: string; label: string }[] }) => (
  <View
    style={{
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginTop: 14,
    }}>
    {items.map(i => (
      <View
        key={i.label}
        style={{ flexDirection: 'row', alignItems: 'center', margin: 6 }}>
        <View
          style={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: i.color,
            marginRight: 6,
          }}
        />
        <Text style={{ color: 'white', fontSize: 12 }}>{i.label}</Text>
      </View>
    ))}
  </View>
);

const radiusFor = (w: number) => Math.min(Math.floor(w / 2) - 10, 120);

const FocusPie = () => {
  const [selected, setSelected] = useState(1);
  return (
    <Center>
      <PieChart
        data={five.map((d, i) => ({ ...d, focused: i === selected }))}
        donut
        radius={110}
        innerRadius={65}
        innerCircleColor={card}
        focusOnPress
        sectionAutoFocus
        onPress={(_: unknown, index: number) => setSelected(index)}
        centerLabelComponent={() => (
          <Center>
            <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>
              {five[selected].value}%
            </Text>
            <Text style={{ color: theme.muted, fontSize: 11 }}>Selected</Text>
          </Center>
        )}
      />
    </Center>
  );
};

export const pieCharts: ChartDef[] = [
  {
    id: 'pie-simple',
    title: 'Simple Pie',
    subtitle: 'Classic pie with percentage labels',
    render: w => (
      <Center>
        <PieChart
          data={basic}
          radius={radiusFor(w)}
          showText
          textColor="black"
          textSize={14}
          showValuesAsLabels
        />
        <Legend
          items={[
            { color: '#177AD5', label: 'Direct' },
            { color: '#79D2DE', label: 'Social' },
            { color: '#ED6665', label: 'Referral' },
          ]}
        />
      </Center>
    ),
  },
  {
    id: 'pie-donut',
    title: 'Donut with Center Label',
    subtitle: 'Gradient donut with a total in the middle',
    render: w => (
      <Center>
        <PieChart
          data={five}
          donut
          showGradient
          sectionAutoFocus
          radius={radiusFor(w)}
          innerRadius={radiusFor(w) * 0.65}
          innerCircleColor={card}
          strokeColor={card}
          strokeWidth={4}
          centerLabelComponent={() => (
            <Center>
              <Text style={{ color: 'white', fontSize: 26, fontWeight: 'bold' }}>
                47%
              </Text>
              <Text style={{ color: theme.muted, fontSize: 12 }}>Excellent</Text>
            </Center>
          )}
        />
        <Legend
          items={five.map((d, i) => ({
            color: d.color,
            label: ['Rent', 'Food', 'Travel', 'Fun', 'Other'][i],
          }))}
        />
      </Center>
    ),
  },
  {
    id: 'pie-progress',
    title: 'Progress Ring',
    subtitle: 'Single value rendered as a donut progress indicator',
    render: w => (
      <Center>
        <PieChart
          donut
          radius={Math.min(radiusFor(w), 90)}
          innerRadius={Math.min(radiusFor(w), 90) - 18}
          innerCircleColor={card}
          data={[
            { value: 72, color: '#33C83A' },
            { value: 28, color: '#3a383d' },
          ]}
          centerLabelComponent={() => (
            <Text style={{ color: 'white', fontSize: 28, fontWeight: 'bold' }}>
              72%
            </Text>
          )}
        />
      </Center>
    ),
  },
  {
    id: 'pie-semi',
    title: 'Semi-Circle Gauge',
    subtitle: 'Half donut often used for gauges and budgets',
    render: w => (
      <Center>
        <PieChart
          semiCircle
          donut
          radius={radiusFor(w)}
          innerRadius={radiusFor(w) - 30}
          innerCircleColor={card}
          data={[
            { value: 40, color: '#33C83A' },
            { value: 30, color: '#F2CA02' },
            { value: 30, color: '#F22750' },
          ]}
          centerLabelComponent={() => (
            <View style={{ marginTop: -20, alignItems: 'center' }}>
              <Text style={{ color: 'white', fontSize: 26, fontWeight: 'bold' }}>
                68
              </Text>
              <Text style={{ color: theme.muted, fontSize: 11 }}>Credit score</Text>
            </View>
          )}
        />
      </Center>
    ),
  },
  {
    id: 'pie-3d',
    title: '3D Donut',
    subtitle: 'Donut with depth, shadow and value badges',
    render: w => (
      <Center>
        <PieChart
          donut
          isThreeD
          shadow
          showText
          showValuesAsLabels
          showTextBackground
          textBackgroundRadius={20}
          textColor="black"
          textSize={14}
          innerCircleBorderWidth={5}
          innerCircleBorderColor="lightgray"
          shiftInnerCenterX={-8}
          shiftInnerCenterY={-12}
          radius={Math.min(radiusFor(w), 110)}
          data={basic}
        />
      </Center>
    ),
  },
  {
    id: 'pie-split',
    title: 'Exploded Slice',
    subtitle: 'A slice shifted away from the center for emphasis',
    render: w => (
      <Center>
        <PieChart
          radius={radiusFor(w) - 12}
          data={[
            { value: 54, color: '#177AD5' },
            { value: 40, color: '#79D2DE' },
            { value: 20, color: '#ED6665', shiftX: -10, shiftY: -18 },
          ]}
        />
      </Center>
    ),
  },
  {
    id: 'pie-focus',
    title: 'Interactive Focus',
    subtitle: 'Tap a slice to expand it and update the center label',
    render: () => <FocusPie />,
  },
  {
    id: 'pie-inward',
    title: 'Inward Focus Donut',
    subtitle: 'Focused slice grows towards the center',
    render: w => (
      <Center>
        <PieChart
          donut
          showText
          textColor="black"
          radius={Math.min(radiusFor(w), 110)}
          innerRadius={60}
          innerCircleColor={card}
          showTextBackground
          textBackgroundColor="white"
          textBackgroundRadius={20}
          data={[
            { value: 54, color: '#177AD5', text: '54%' },
            { value: 30, color: '#79D2DE', text: '30%', focused: true },
            { value: 26, color: '#ED6665', text: '26%' },
          ]}
          focusOnPress
          inwardExtraLengthForFocused={30}
          extraRadius={0}
        />
      </Center>
    ),
  },
//   {
//     id: 'pie-pro',
//     title: 'Pie Chart Pro',
//     subtitle: 'Smooth animated pie with rounded section edges',
//     render: w => (
//       <Center>
//         <PieChartPro
//           data={five}
//           radius={radiusFor(w)}
//           innerRadius={radiusFor(w) * 0.55}
//           donut
//           isAnimated
//           strokeWidth={3}
//           strokeColor={card}
//         />
//       </Center>
//     ),
//   },
];
