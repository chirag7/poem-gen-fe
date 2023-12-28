import React from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";

const EmotionChart = ({ data = [] }) => {
  if(!data.length) return null;
  const transformedData = data.map((i) => {
    return {
      label: i.label,
      value: Number.parseFloat(i.score * 100).toFixed(2),
    };
  });
  if (transformedData.length) transformedData.sort((a, b) => b.value - a.value);


  return (
    <div className="emotion-chart w-50">
      <PieChart
        series={[
          {
            arcLabel: (item) => `${item.label}`,
            arcLabelMinAngle: 45,
            data: transformedData,
            highlightScope: { faded: 'global', highlighted: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
            valueFormatter: (item) => `${item.value} %`
          },
        ]}
        slotProps={{
          legend: {
            direction: 'column',
            position: { vertical: 'top', horizontal: 'right' },
            padding: 0,
            hidden: parseInt(window.innerWidth) < 850
          },
        }}
        margin={{ bottom: 80, left: 10, right:10 }}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: "white",
            fontWeight: "bold",
          },
        }}
        height={300}
      />
    </div>
  );
};

export default EmotionChart;
