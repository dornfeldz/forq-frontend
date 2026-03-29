import StockChart from "./StockChart";

function StockCard({ data }) {
    if (!data) return null;

    const { ticker, predictions, history } = data;

    const currentPrice = history?.actual_day_5;
    const predictedPrice = predictions?.day_5;

    const change = predictedPrice - currentPrice;
    const percent = (change / currentPrice) * 100;

    const isPositive = percent >= 0;

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between hover:border-zinc-700 transition">

            {/* TOP */}
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-lg font-semibold">{ticker}</p>
                    <p className="text-xs text-zinc-500">AI Forecast</p>
                </div>

                <span
                    className={`text-xs px-3 py-1 rounded-full ${
                        isPositive
                            ? "bg-green-500/10 text-green-400"
                            : "bg-red-500/10 text-red-400"
                    }`}
                >
          {isPositive ? "+" : ""}
                    {percent.toFixed(2)}%
        </span>
            </div>

            {/* PRICE */}
            <div className="mb-4">
                <p className="text-3xl font-semibold">
                    ${currentPrice}
                </p>

                <p
                    className={`text-sm ${
                        isPositive ? "text-green-400" : "text-red-400"
                    }`}
                >
                    {isPositive ? "+" : ""}
                    ${change.toFixed(2)}
                </p>
            </div>

            {/* CHART */}
            <div className="h-44 mb-4">
                <StockChart data={data} />
            </div>

            {/* BOTTOM */}
            <div className="flex justify-between items-end text-sm">
                <div>
                    <p className="text-zinc-500 text-xs">AI Prediction</p>
                    <p className="text-green-400 font-medium">
                        {isPositive ? "+" : ""}
                        {percent.toFixed(2)}%
                    </p>
                </div>
            </div>
        </div>
    );
}

export default StockCard;