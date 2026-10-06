import { ChartScreen } from '@/components/charts/ChartScreen';
import { moreCharts } from '@/components/charts/moreCharts';

export default function Screen() {
  return <ChartScreen heading="More Charts" charts={moreCharts} />;
}
