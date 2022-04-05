import {getConsumptionOfDevice} from "./apis/devices-api";
import {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ConsumptionChart from "./consumption-chart";
import moment from 'moment';
import {useHistory} from "react-router-dom";

const ConsumptionHistory = (props) => {
    const generateEmptyChart = () => {
        let emptyData = []
        for (let hour = 0; hour < 24; hour++) {
            let emptyEntry = {
                hour: hour,
                consumption: 0
            }
            emptyData.push(emptyEntry);
        }
        return emptyData;
    }

    const emptyDailyChart = generateEmptyChart();
    const [history, setHistory] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [chartData, setChartData] = useState(emptyDailyChart);
    const historyHook = useHistory();


    useEffect(() => {
        fetchConsumptionHistory(props.device)
    }, [])

    const fetchConsumptionHistory = (device) => {
        getConsumptionOfDevice(device.id, ((result, status, error) => {
            if ((status === 200) && (result != null)) {
                console.log(result);
                setHistory(result);
            } else if (status === 401) {
                alert("Your session has expired, you will be redirected to the login page");
                localStorage.clear();
                historyHook.push('/');
            } else {
                alert(error.message);
            }
        }));
    }

    const getIndividualDays = () => {
        let daysArray = history.map((historicalValue) => {
            return historicalValue.timeStamp.split('T')[0]
        });
        return new Set(daysArray);
    }


    const getChartDataForDay = (day) => {
        const dailyData = history.filter(dailyData => dailyData.timeStamp.split('T')[0] === day);
        const dailyConsumption = [];
        for (let day of dailyData) {
            dailyConsumption.push({
                hour: day.timeStamp.split('T')[1].split('.')[0],
                consumption: day.consumption
            })
        }
        return dailyConsumption;
    }

    const handleChange = (event) => {
        setStartDate(event);
        const daysSet = getIndividualDays();
        console.log(daysSet)
        if (daysSet.has(moment(event).format("YYYY-MM-DD"))) {
            setChartData(getChartDataForDay(moment(event).format("YYYY-MM-DD")));
            console.log("c")
        } else {
            setChartData(emptyDailyChart);
        }
        console.log(chartData)
    }

    return (
        <div>
            <DatePicker
                onChange={handleChange}
                selected={startDate}
            />
            <ConsumptionChart data={chartData}/>
        </div>
    );
}

export default ConsumptionHistory;