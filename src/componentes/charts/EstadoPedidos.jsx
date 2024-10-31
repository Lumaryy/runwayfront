import ReactECharts from "echarts-for-react";
import usePedidosMetrics from "../hooks/pedidosHook.jsx";

import {useEffect} from "react";

export const EstadoPedidosChart = () => {

    const {data} = usePedidosMetrics();


    const result = Object.keys(data).map(key => ({
        name: key,
        value: data[key],
    }));


    useEffect(() => {
        console.log(data);
    }, [data])


    const option = {
        title: {
            text: "",
            left: "center",
            top: 20,
            textStyle: {
                color: "#333",
                fontSize: 16,
                fontWeight: "bold",
            },
        },
        tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
            orient: "vertical",
            left: "left",
            top: "middle",
        },
        color: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
        series: [
            {
                name: "Data",
                type: "pie",
                radius: ["40%", "70%"],
                center: ["60%", "50%"],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: "#fff",
                    borderWidth: 2,
                },
                label: {
                    show: false,
                    position: "center",
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: "18",
                        fontWeight: "bold",
                    },
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: "rgba(0, 0, 0, 0.5)",
                    },
                },
                labelLine: {
                    show: false,
                },
                data: result,
            },
        ],
    };


    return (<>


        <div className="w-full h-[400px] bg-white rounded-lg shadow-lg p-4">
            <ReactECharts
                option={option}
                style={{height: "100%", width: "100%"}}
                className="react_for_echarts"
            />
        </div>
    </>)
}