import React, { useState } from 'react';

export default function Result({ roadmap }) {
    const [activeYear, setActiveYear] = useState(1);

    if (!roadmap) return null;

    return (
        <div className="max-w-4xl mx-auto">
            <header className="mb-6 text-center">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">📘 {roadmap.role} Roadmap</h1>
                <p className="text-slate-500 mt-1">Prepared for {roadmap.name}</p>
            </header>

            {/* Year Toggle */}
            <div className="flex justify-center gap-4 mb-8">
                {roadmap.years.map((y) => (
                    <button 
                        key={y.year} 
                        onClick={() => setActiveYear(y.year)}
                        className={`px-5 py-2.5 rounded-xl font-bold transition ${activeYear === y.year ? 'bg-indigo-600 text-white shadow' : 'bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50'}`}
                    >
                        Year {y.year}
                    </button>
                ))}
            </div>

            {/* Phases */}
            <div className="space-y-6">
                {roadmap.years.find((y) => y.year === activeYear)?.phases.map((phase, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow transition">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-slate-800">{phase.title}</h3>
                            <span className="bg-indigo-50 text-indigo-600 text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider">
                                Months {phase.months}
                            </span>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6 mt-4">
                            <div>
                                <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">📚 Core Topics</h4>
                                <ul className="space-y-1.5 text-slate-600 text-sm">
                                    {phase.topics.map((t, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className="text-indigo-400 font-bold">&bull;</span> {t}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">🛠️ Hands-on Projects</h4>
                                <div className="space-y-2">
                                    {phase.projects.map((p, i) => (
                                        <label key={i} className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-100 rounded-xl cursor-pointer hover:bg-indigo-50/40 transition">
                                            <input type="checkbox" className="w-4 h-4 accent-indigo-600 cursor-pointer rounded mt-0.5" />
                                            <span className="text-sm text-slate-700 font-medium select-none">{p}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}