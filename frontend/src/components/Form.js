import React, { useState } from 'react';

export default function Form({ onSubmit, loading }) {
    const [formData, setFormData] = useState({ name: '', ambition: '', years: '2' });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">Generate Your Path</h2>
            <div className="grid md:grid-cols-3 gap-4">
                <input 
                    className="border border-slate-300 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition" 
                    placeholder="Full Name" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})} 
                    required 
                />
                <input 
                    className="border border-slate-300 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition" 
                    placeholder="Ambition (e.g. Cloud Architect)" 
                    value={formData.ambition}
                    onChange={e => setFormData({...formData, ambition: e.target.value})} 
                    required 
                />
                <button 
                    type="submit" 
                    disabled={loading}
                    className="bg-indigo-600 text-white p-3 rounded-xl font-bold hover:bg-indigo-700 disabled:bg-indigo-300 transition shadow-sm"
                >
                    {loading ? "Generating..." : "Build Roadmap"}
                </button>
            </div>
        </form>
    );
}