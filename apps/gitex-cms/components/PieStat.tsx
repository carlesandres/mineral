import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

interface PieStatProps {
  total: number;
  completed: number;
  size: number;
}

const PieStat = (props: PieStatProps) => {
  const { total, completed, size } = props;

  const isFull = total === completed;

  const data = [
    {
      name: 'Completed',
      value: completed,
      color: isFull ? 'hsl(120deg 73.44% 74.9%)' : 'hsl(38.82deg 90% 70%)',
    },
    {
      name: 'Remaining',
      value: total - completed,
      color: 'rgba(0, 0, 0, 0.1)',
    },
  ];

  return (
    <PieChart width={size} height={size}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        fill="#8884d8"
        startAngle={90}
        endAngle={-270}
        animationDuration={500}
        animationEasing="ease-in-out"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default PieStat;
