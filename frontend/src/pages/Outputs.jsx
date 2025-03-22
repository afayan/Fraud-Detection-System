import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

function Outputs({ fraudData }) {
  // Transform data for the chart
  const chartData = fraudData?.predictions?.map((transaction, index) => ({
    id: index,
    amount: transaction.amount,
    isFraud: transaction.predicted_isFraud === 1 ? "Fraudulent" : "Legitimate"
  })) || [];

  return (
    <div className="chartsdiv" style={{backgroundColor: 'rgba(62, 62, 62, 0.25)'}}>
      <h2>Transaction Analysis</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="id" label={{ value: 'Transaction ID', position: 'bottom' }} />
          <YAxis label={{ value: 'Amount', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="var(--primary-color)"
            strokeWidth={2}
            dot={{ fill: '#fff', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Outputs;
