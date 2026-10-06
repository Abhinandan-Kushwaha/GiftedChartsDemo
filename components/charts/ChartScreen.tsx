import React, { ReactNode, useRef } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import { theme } from './theme';

export type ChartDef = {
  id: string;
  title: string;
  subtitle: string;
  // Receives the usable inner width of the card.
  render: (width: number) => ReactNode;
};

type Props = {
  heading: string;
  charts: ChartDef[];
};

export function ChartScreen({ heading, charts }: Props) {
  const { width } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);
  const offsets = useRef<Record<string, number>>({});
  const innerWidth = width - 2 * theme.screenPadding - 2 * theme.cardPadding;

  const scrollTo = (id: string) => {
    scrollRef.current?.scrollTo({ y: offsets.current[id] ?? 0, animated: true });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{heading}</Text>
      <View style={styles.chipsWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {charts.map((c, i) => (
            <TouchableOpacity
              key={c.id}
              style={styles.chip}
              onPress={() => scrollTo(c.id)}>
              <Text style={styles.chipText}>{`${i + 1}. ${c.title}`}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        {charts.map((c, i) => (
          <View
            key={c.id}
            style={styles.card}
            onLayout={e => {
              offsets.current[c.id] = e.nativeEvent.layout.y - 4;
            }}>
            <Text style={styles.cardIndex}>{`CHART ${i + 1} / ${charts.length}`}</Text>
            <Text style={styles.cardTitle}>{c.title}</Text>
            <Text style={styles.cardSubtitle}>{c.subtitle}</Text>
            <View style={styles.chartArea}>{c.render(innerWidth)}</View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingHorizontal: theme.screenPadding,
    paddingTop: 14,
  },
  heading: { fontSize: 26, color: 'white', marginBottom: 12 },
  chipsWrapper: { height: 36, marginBottom: 6 },
  chip: {
    height: 30,
    paddingHorizontal: 12,
    borderRadius: 15,
    backgroundColor: theme.card,
    justifyContent: 'center',
    marginRight: 8,
  },
  chipText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
  content: { paddingBottom: 120 },
  card: {
    backgroundColor: theme.card,
    borderRadius: 10,
    marginTop: 16,
    padding: theme.cardPadding,
  },
  cardIndex: { color: theme.link, fontSize: 11 },
  cardTitle: { color: 'white', fontSize: 18, marginTop: 4 },
  cardSubtitle: { color: theme.muted, fontSize: 12, marginTop: 2 },
  chartArea: { marginTop: 16, overflow: 'hidden' },
});
