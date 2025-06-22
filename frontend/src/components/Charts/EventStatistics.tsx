import React, { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { NaturalEvent } from '../../types';
import { countEventsByCategory } from '../../utils/eventHelpers';
import { CHART_COLORS } from '../../constants';
import styles from './EventStatistics.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

interface EventStatisticsProps {
  events: NaturalEvent[];
}

const EventStatistics: React.FC<EventStatisticsProps> = ({ events }) => {
  const chartData = useMemo(() => {
    const counts = countEventsByCategory(events);
    const labels = Object.keys(counts);
    const data = Object.values(counts);
    const backgroundColor = labels.map(label => CHART_COLORS[label as keyof typeof CHART_COLORS]);

    return {
      labels,
      datasets: [
        {
          label: 'Event Count',
          data,
          backgroundColor,
          borderColor: backgroundColor.map(color => color + '99'),
          borderWidth: 2,
          hoverOffset: 4
        }
      ]
    };
  }, [events]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          font: {
            size: 14
          }
        }
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  };

  const totalEvents = events.length;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Last 30 Days Event Distribution</h2>
      <p className={styles.subtitle}>Total Events: {totalEvents}</p>
      <div className={styles.chartWrapper}>
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
};

export default EventStatistics;