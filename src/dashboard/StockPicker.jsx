import { useState } from 'react'
import { useAuth } from '@clerk/clerk-react'

const ALL_STOCKS = ['AAPL', 'MSFT', 'NVDA', 'AMZN', 'GOOG', 'META']

function StockPicker({ isPremium, selectedStocks = [], onStocksChange }) {
    const [error, setError] = useState(null)

    const { getToken } = useAuth();

    const handleAdd = async (symbol) => {
        setError(null)
        const token =  await getToken()
        const res = await fetch(`${import.meta.env.VITE_NODE_API_URL}/user/stocks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ symbol })
        })
        const data = await res.json()
        if (!res.ok) return setError(data.error)
        onStocksChange([...selectedStocks, symbol])
    }

    const handleRemove = async (symbol) => {
        setError(null)
        const token = await getToken()
        const res = await fetch(`${import.meta.env.VITE_NODE_API_URL}/user/stocks`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ symbol })
        })
        const data = await res.json()
        if (!res.ok) return setError(data.error)
        onStocksChange(selectedStocks.filter(s => s !== symbol))
    }

    return (
        <div>
            <div className="flex items-center gap-2 flex-wrap">
                 <span className="text-xs text-zinc-500">
        {!isPremium && `(${selectedStocks.length}/1 free)`}
                </span>
            </div>

            <div className="flex flex-wrap gap-2">
                <span className="text-sm text-zinc-400 content-center">Tracking:</span>
                {ALL_STOCKS.map((symbol) => {
                    const isSelected = selectedStocks.includes(symbol);

                    return (
                        <button
                            key={symbol}
                            onClick={() =>
                                isSelected
                                    ? handleRemove(symbol)
                                    : handleAdd(symbol)
                            }
                            className={`px-3 py-1 rounded-lg text-sm border transition ${
                                isSelected
                                    ? "bg-green-500/10 text-green-400 border-green-500/30"
                                    : "bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700"
                            }`}
                        >
                            {symbol}
                        </button>
                    );
                })}
            </div>

            {error && (
                <p className="text-red-400 text-sm">{error}</p>
            )}
        </div>
    );
}

export default StockPicker