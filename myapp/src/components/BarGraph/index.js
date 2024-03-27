
import {
    BarChart,
    Bar,
    XAxis,
    Tooltip,
    YAxis,
    Legend,
    ResponsiveContainer,
  } from "recharts";

const BarGraph = (props) => {
 
    const {populationData} = props

  const DataFormatter = (number) => {
    if (number > 100000) {
      return `${(number / 100000).toString()}k`;
    }
    return number.toString();
  };

  return (
    <ResponsiveContainer  asset={3} width="95%" height="100%">
      <BarChart data={populationData} margin={{ top: 8 }}>
        <XAxis dataKey="year" tick={{ stroke: "black", strokeWidth: 0.1}} />
        <YAxis tickFormatter={DataFormatter} tick={{ stroke: "black", strokeWidth: 0.1 }} />
        <Legend
          wrapperStyle={{
            padding: 10,
          }}
        />
        <Tooltip />
        <Bar dataKey="population" name="year" fill="#2D9596" barSize="20%" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarGraph;
