import StockChart from "./StockChart.jsx";
import {useEffect, useState} from "react";
import {useAuth} from "@clerk/clerk-react";
import StockPicker from "./StockPicker.jsx";
import StockCard from "./StockCard.jsx";

function Dashboard() {
    const [data, setData] = useState(null)
    const [isPremium , setIsPremium] = useState(false);
    const [stocks, setStocks] = useState([]);
    const [marketData, setMarketData] = useState([])
    const [marketLoading, setMarketLoading] = useState(true)
    const { getToken } = useAuth();
    const { userId } = useAuth()

    const handleCheckout = async (userId) => {
        const res = await fetch(`${import.meta.env.VITE_NODE_API_URL}/stripe/create-checkout-session`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ clerkId: userId })
        })

        const data = await res.json()
        window.location.href = data.url
    }

    const handleCancel = async () => {
        const confirmed = window.confirm('Are you sure you want to cancel your subscription?')
        if (!confirmed) return

        const res = await fetch(`${import.meta.env.VITE_NODE_API_URL}/stripe/cancel-subscription`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ clerkId: userId })
        })

        const data = await res.json()
        if (data.success) {
            alert('Subscription cancelled. You will retain access until the end of your billing period.')
            window.location.reload()
        }
    }

    useEffect(() => {
        const fetchMarket = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_NODE_API_URL}/market`)
                const data = await res.json()
                setMarketData(data)
            } catch (err) {
                console.error(err)
            } finally {
                setMarketLoading(false)
            }
        }
        fetchMarket()
    }, [])

    useEffect(() => {
        const fetchUser = async () => {
            const token = await getToken()
            const res = await fetch(`${import.meta.env.VITE_NODE_API_URL}/user/me`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            const data = await res.json()
            setIsPremium(data.is_premium)
            setStocks(data.stocks)
        }
        fetchUser()
    }, [])

    useEffect(() => {
        if (stocks.length === 0) return

        const fetchData = async () => {
            const token = await getToken()
            const res = await fetch(`${import.meta.env.VITE_NODE_API_URL}/predictions?tickers=${stocks.join(',')}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            const data = await res.json()
            setData(data)

            if(data.error) console.error(data.error)
        }
        fetchData()
    }, [stocks]) // reruns whenever stocks change

    return (
        <div className="space-y-8">
            <div>
                <div className="flex items-baseline justify-between">
                <h2 className="text-sm text-zinc-400 mb-4 tracking-wide">
                    MARKET OVERVIEW
                </h2>
                    {!isPremium ?
                        <>
                            <div></div>
                            <button className="flex ml-auto items-center gap-2 px-4 py-2 rounded-lg
             bg-green-500/10 text-green-400 border border-green-500/20
             hover:bg-green-500/20 hover:border-green-500/40
             hover:shadow-[0_0_15px_rgba(34,197,94,0.15)]
             transition text-sm font-medium" onClick={() => handleCheckout(userId)}>Upgrade to Premium</button>
                        </> :
                        <>
                            <div></div>
                            <button className="flex ml-auto items-center gap-2 px-4 py-2 rounded-lg
             bg-red-500/10 text-red-400 border border-red-500/20
             hover:bg-red-500/20 hover:border-red-500/40
             transition text-sm font-medium" onClick={handleCancel}>Cancel Subscription</button>
                        </>
                    }
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {marketLoading ? (
                        [1,2,3,4].map(i => (
                            <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 h-24 animate-pulse" />
                        ))
                    ) : (
                        marketData.map((item, i) => (
                        <div
                            key={i}
                            className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col gap-2"
                        >
                            <p className="text-zinc-400 text-sm">{item.name}</p>

                            <div className="flex items-center justify-between">
                                <p className="text-xl font-semibold">{item.value}</p>

                                {item.change && (
                                    <span
                                        className={`text-xs px-2 py-1 rounded-full ${
                                            item.positive
                                                ? "bg-green-500/10 text-green-400"
                                                : "bg-red-500/10 text-red-400"
                                        }`}
                                    >
                  {item.change}
                </span>
                                )}
                            </div>
                        </div>
                    )))}
                </div>
            </div>

            {/* STOCK SECTION */}
            <div className="space-y-4">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                    <h2 className="text-sm text-zinc-400 tracking-wide">
                        STOCK PREDICTIONS
                    </h2>

                    <p className="text-xs text-zinc-500">
                        Powered by AI · Updated every 15 min
                    </p>
                </div>

                {/* STOCK PICKER */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                    <StockPicker
                        isPremium={isPremium}
                        selectedStocks={stocks}
                        onStocksChange={setStocks}
                    />
                </div>

                {/* CARDS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {data?.map((item, index) => (
                        <StockCard key={index} data={item} />
                    ))}
                </div>
            </div>
        </div>
    );
}


export default Dashboard;