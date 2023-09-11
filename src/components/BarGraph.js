import React, { useContext, useEffect } from "react";
import { AttendContext } from "../contexts/AttendContext"; // Context API
import ReactECharts from "echarts-for-react";
import { useNavigate } from "react-router-dom";

const BarGraph = ({goal}) => {
  const context = useContext(AttendContext);
  const { subs, fetchSubs } = context;
  let navigate = useNavigate();

  const percs = [0, 20, 40, 60, 80, 100];

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchSubs();
    } else {
      navigate("/login");
    }
  }, []);

  const barOptions = {
    xAxis: {
      type: "category",
      data: subs.map((sub) => {
        return {
          value: sub.subject,
          textStyle: {
            color: sub.percent >= goal ? "#00A859" : "#FF4136",
            fontWeight: 500,
            fontSize: 16,
          },
        };
      }),
    },
    yAxis: {
      type: "value",
      axisLabel: {
        textStyle: {
          fontSize: 20,
          color: "#000000",
        },
      },
    },
    grid: {
      width: subs.length * 140,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    series: [
      {
        data: subs.map((sub) => {
          return {
            value: sub.percent,
            itemStyle: {
              color: sub.percent >= goal ? "#00A859" : "#FF4136",
              opacity: 0.8,
            },
          };
        }),
        type: "bar",
        barWidth: 60,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  return (
    <div className="BarGraph">
    <ReactECharts
      option={barOptions}
      style={{ width: `${(subs.length+2) * 140}px`, height: "500px", transform: "translate(100px,0)" }}
    />
    </div>
  );
};

export default BarGraph;
