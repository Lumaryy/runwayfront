import ReactECharts from "echarts-for-react";


export const EstadoPedidosChart = () => {


    const option = {
        title: {
            text: "hola mi lulu",
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
                data: [{value: 1048, name: 'Search Engine'},
                    {value: 735, name: 'Direct'},
                    {value: 580, name: 'Email'},
                    {value: 484, name: 'Union Ads'},
                    {value: 300, name: 'Video Ads'}],
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