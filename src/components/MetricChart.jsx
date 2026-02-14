import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useState, useEffect } from "react";
import useDashboardStore from "../store/dashboardStore";

function MetricChart() {
  const metric = useDashboardStore((state) => state.metric);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData((prev) => {
      const updated = [...prev, { time: Date.now(), value: metric }];
      return updated.slice(-20);
    });
  }, [metric]);

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="time" hide />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MetricChart;
