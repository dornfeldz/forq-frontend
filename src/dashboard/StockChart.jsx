import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
} from "chart.js";

ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip
);

function addDays(dateStr, days) {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + days);
    return date.toISOString().split("T")[0];
}

function StockChart({ data }) {
    if (!data) return null;

    const { predicted_at, predictions, history } = data;

    const historyLabels = [
        addDays(predicted_at, -4),
        addDays(predicted_at, -3),
        addDays(predicted_at, -2),
        addDays(predicted_at, -1),
        predicted_at,
    ];

    const historyPrices = [
        history.actual_day_1,
        history.actual_day_2,
        history.actual_day_3,
        history.actual_day_4,
        history.actual_day_5,
    ];

    const predictionLabels = [
        addDays(predicted_at, 1),
        addDays(predicted_at, 2),
        addDays(predicted_at, 3),
        addDays(predicted_at, 4),
        addDays(predicted_at, 5),
    ];

    const predictionPrices = [
        predictions.day_1,
        predictions.day_2,
        predictions.day_3,
        predictions.day_4,
        predictions.day_5,
    ];

    const labels = [...historyLabels, ...predictionLabels];

    const chartData = {
        labels,
        datasets: [
            // HISTORY
            {
                data: [...historyPrices, ...Array(5).fill(null)],
                borderColor: "#22d3ee", // cyan
                backgroundColor: "rgba(34,211,238,0.15)",
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 0,
            },

            // PREDICTION
            {
                data: [
                    ...Array(4).fill(null),
                    historyPrices[historyPrices.length - 1],
                    ...predictionPrices,
                ],
                borderColor: "#4ade80", // green
                backgroundColor: "rgba(74,222,128,0.15)",
                borderDash: [5, 5],
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 3,
                pointBackgroundColor: "#4ade80",
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: "#18181b",
                borderColor: "#27272a",
                borderWidth: 1,
                titleColor: "#fff",
                bodyColor: "#aaa",
                padding: 10,
                displayColors: false,
            },
        },

        scales: {
            x: {
                ticks: {
                    color: "#52525b",
                    maxTicksLimit: 4,
                },
                grid: {
                    display: false, // 🔥 remove vertical lines
                },
            },
            y: {
                ticks: {
                    color: "#52525b",
                },
                grid: {
                    color: "rgba(255,255,255,0.03)", // 🔥 very subtle
                },
            },
        },
    };

    return <Line data={chartData} options={options} />;
}

export default StockChart;