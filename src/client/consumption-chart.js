import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

const ConsumptionChart = (props) => {


    return (
        <div>
            <ResponsiveContainer width="99%" aspect={2}>
                <LineChart
                    width={500}
                    height={300}
                    data={props.data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="hour"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Line type="monotone" dataKey="consumption" stroke="#8884d8" activeDot={{r: 8}}/>
                </LineChart>
            </ResponsiveContainer>
        </div>


    );
}

export default ConsumptionChart;