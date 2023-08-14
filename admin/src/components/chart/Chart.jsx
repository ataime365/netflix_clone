import "./chart.css"
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


export default function Chart( {title, data, dataKey, grid} ) {


  return (
    <div className="chart">
        <h3 className="chartTitle">{title}</h3>
        {/* aspect is width : height ratio */}
        <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart
          data={data} margin={{top: 5, right: 30, left: 20, bottom: 5,}}
        >
          <XAxis dataKey="name" stroke="#5550bd" />
          {/* <YAxis /> */}
          <Tooltip />
          {/* <Legend /> */}
          {grid && <CartesianGrid strokeDasharray="5 5" stroke="#e0dfdf" />}
          <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
