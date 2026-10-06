import { ChartScreen } from '@/components/charts/ChartScreen';
import { pieCharts } from '@/components/charts/pieCharts';

export default function Screen() {
  return <ChartScreen heading="Pie Charts" charts={pieCharts} />;
}
