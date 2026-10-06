import { ChartScreen } from '@/components/charts/ChartScreen';
import { lineCharts } from '@/components/charts/lineCharts';

export default function Screen() {
  return <ChartScreen heading="Line Charts" charts={lineCharts} />;
}
