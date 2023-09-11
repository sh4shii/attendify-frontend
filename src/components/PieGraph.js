import React, { useContext, useEffect } from "react";
import { AttendContext } from "../contexts/AttendContext"; // Context API
import ReactECharts from "echarts-for-react";
import { useNavigate } from "react-router-dom";

const PieGraph = () => {
  const context = useContext(AttendContext);
  const { subs, fetchSubs } = context;
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchSubs();
    } else {
      navigate("/login");
    }
  }, []);

  const pieOptions = {
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        name: "Percentage",
        type: "pie",
        data: [
          {
            value: (
              subs.reduce((acc, curr) => acc + parseFloat(curr.percent), 0) / subs.length
            ).toFixed(2),
            name: "Present",
            itemStyle: { color: "#00A859", opacity: 0.8 },
          },
          {
            value: (
              100 -
              subs.reduce((acc, curr) => acc + parseFloat(curr.percent), 0) / subs.length
            ).toFixed(2),
            name: "Absent",
            itemStyle: { color: "#FF4136", opacity: 0.8 },
          },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        label: {
          show: true,
          formatter: function (params) {
            return params.name + ": " + params.value;
          },
          textStyle: {
            fontSize: 20, 
            color: "#000000",
          },
        },
      },
    ],
  };

  return (
    <ReactECharts
      className="PieGraph"
      option={pieOptions}
      // style={{ width: `${subs.length * 200 + 100}px`, height: "300px", margin:"40px 0" }}
    />
  );
};

export default PieGraph;
