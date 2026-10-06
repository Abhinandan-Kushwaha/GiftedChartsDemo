import { ChartScreen } from '@/components/charts/ChartScreen';
import { barCharts } from '@/components/charts/barCharts';

export default function Screen() {
  return <ChartScreen heading="Bar Charts" charts={barCharts} />;
}
