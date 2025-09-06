import React from 'react';
import type { Todo } from '../../lib/api';
import { Pie, Column } from '@ant-design/plots';

export const StatsCharts: React.FC<{ data: Todo[] }>= ({ data }) => {
  const done = data.filter((d) => d.completed).length;
  const active = data.length - done;
  const pieData = [
    { type: '完了', value: done },
    { type: '未完了', value: active },
  ];
  const byPriority: Record<string, number> = { high: 0, medium: 0, low: 0 } as any;
  data.forEach((d) => {
    if (d.priority) byPriority[d.priority]++;
  });
  const barData = [
    { type: '高', value: byPriority.high || 0 },
    { type: '中', value: byPriority.medium || 0 },
    { type: '低', value: byPriority.low || 0 },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      <div>
        <Pie
          data={pieData}
          angleField="value"
          colorField="type"
          radius={0.9}
          label={{ type: 'outer', content: '{name} {percentage}' }}
          legend={{ position: 'bottom' }}
          height={260}
        />
      </div>
      <div>
        <Column data={barData} xField="type" yField="value" label={{ position: 'top' }} height={260} />
      </div>
    </div>
  );
};
