import { SignInButton, SignUpButton, useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

function LandingPage() {
    const { isSignedIn } = useAuth()

    if (isSignedIn) return <Navigate to="/dashboard" />;

    return (
        <div className="min-h-screen bg-zinc-950 text-white flex flex-col">

            {/* NAVBAR */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-zinc-800">
                <h1 className="text-lg font-semibold">StockAI</h1>

                <div className="flex gap-3">
                    <SignInButton mode="modal">
                        <button className="text-sm text-zinc-400 hover:text-white transition">
                            Sign In
                        </button>
                    </SignInButton>

                    <SignUpButton mode="modal">
                        <button className="px-4 py-2 rounded-lg bg-green-500 text-black font-medium hover:bg-green-400 transition">
                            Get Started
                        </button>
                    </SignUpButton>
                </div>
            </div>

            {/* HERO */}
            <div className="flex flex-col items-center justify-center text-center px-6 py-20 flex-1">

                <h1 className="text-4xl md:text-5xl font-semibold max-w-3xl leading-tight">
                    AI-Powered Stock Predictions
                    <span className="text-green-400"> for Smarter Investing</span>
                </h1>

                <p className="mt-4 text-zinc-400 max-w-xl">
                    Get short-term stock forecasts powered by neural networks.
                    Track your favorite stocks and make data-driven decisions.
                </p>

                <div className="mt-8 flex gap-4">
                    <SignUpButton mode="modal">
                        <button className="px-6 py-3 rounded-lg bg-green-500 text-black font-semibold hover:bg-green-400 transition">
                            Start Free
                        </button>
                    </SignUpButton>

                    <SignInButton mode="modal">
                        <button className="px-6 py-3 rounded-lg border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white transition">
                            Sign In
                        </button>
                    </SignInButton>
                </div>
            </div>

            {/* FEATURES */}
            <div className="px-6 pb-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto w-full">

                {[
                    {
                        title: "AI Predictions",
                        desc: "Advanced neural networks predict short-term price movements.",
                    },
                    {
                        title: "Track Stocks",
                        desc: "Monitor your favorite stocks in one clean dashboard.",
                    },
                    {
                        title: "Premium Insights",
                        desc: "Unlock more predictions and deeper analytics.",
                    },
                ].map((f, i) => (
                    <div
                        key={i}
                        className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition"
                    >
                        <h3 className="font-semibold mb-2">{f.title}</h3>
                        <p className="text-sm text-zinc-400">{f.desc}</p>
                    </div>
                ))}
            </div>

            {/* CTA */}
            <div className="border-t border-zinc-800 py-10 text-center">
                <p className="text-zinc-400 mb-4">
                    Start using AI to improve your investing today.
                </p>

                <SignUpButton mode="modal">
                    <button className="px-6 py-3 rounded-lg bg-green-500 text-black font-semibold hover:bg-green-400 transition">
                        Get Started
                    </button>
                </SignUpButton>
            </div>
        </div>
    );
}

export default LandingPage;