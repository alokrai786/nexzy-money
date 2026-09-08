"use client";
import { useMemo, useState } from "react";
import { inr, calculateGST } from "@/lib/finance";

export function GSTCalculator() {
  const [amount, setAmount] = useState(10000);
  const [gstRate, setGstRate] = useState(18);
  const [mode, setMode] = useState<'add' | 'remove'>('add');
  const [taxType, setTaxType] = useState<'cgst_sgst' | 'igst'>('cgst_sgst');

  const result = useMemo(() => {
    if (!amount || amount < 0 || !gstRate || gstRate < 0) {
      return null;
    }
    return calculateGST(Math.max(0, amount), Math.max(0, gstRate), mode, taxType);
  }, [amount, gstRate, mode, taxType]);

  const gstPresets = [0, 5, 12, 18, 28];

  return (
    <div className="card p-6">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <div>
            <label className="label">Mode</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setMode('add')}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  mode === 'add'
                    ? 'bg-blue-700 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Add GST
              </button>
              <button
                onClick={() => setMode('remove')}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  mode === 'remove'
                    ? 'bg-blue-700 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Remove GST
              </button>
            </div>
          </div>

          <div>
            <label className="label">
              {mode === 'add' ? 'Base Amount' : 'Total Amount'} (₹)
            </label>
            <input
              className="input"
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              min="0"
              step="100"
            />
          </div>

          <div>
            <label className="label">GST Rate (%)</label>
            <div className="grid grid-cols-5 gap-2 mb-3">
              {gstPresets.map((preset) => (
                <button
                  key={preset}
                  onClick={() => setGstRate(preset)}
                  className={`px-2 py-1 rounded text-sm font-semibold transition ${
                    gstRate === preset
                      ? 'bg-blue-700 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {preset}%
                </button>
              ))}
            </div>
            <input
              className="input"
              type="number"
              value={gstRate}
              onChange={(e) => setGstRate(parseFloat(e.target.value) || 0)}
              min="0"
              step="0.5"
              placeholder="Custom rate"
            />
            <p className="text-xs text-slate-500 mt-2">
              Note: The applicable GST rate depends on goods/services classification. Verify with current official rules.
            </p>
          </div>

          <div>
            <label className="label">Tax Breakdown</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setTaxType('cgst_sgst')}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                  taxType === 'cgst_sgst'
                    ? 'bg-blue-700 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                CGST + SGST
              </button>
              <button
                onClick={() => setTaxType('igst')}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                  taxType === 'igst'
                    ? 'bg-blue-700 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                IGST
              </button>
            </div>
          </div>

          <button
            onClick={() => {
              setAmount(10000);
              setGstRate(18);
              setMode('add');
              setTaxType('cgst_sgst');
            }}
            className="btn btn-secondary w-full"
          >
            Reset
          </button>
        </div>

        <div>
          {result && (
            <div className="space-y-4">
              <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-700">
                <div className="text-xs muted font-bold">BASE AMOUNT</div>
                <div className="text-2xl font-black mt-1">{inr(result.baseAmount)}</div>
              </div>

              <div className="bg-orange-50 p-5 rounded-lg border-l-4 border-orange-700">
                <div className="text-xs muted font-bold">GST AMOUNT ({gstRate}%)</div>
                <div className="text-2xl font-black mt-1">{inr(result.gstAmount)}</div>
              </div>

              {taxType === 'cgst_sgst' && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <div className="text-xs muted font-bold">CGST</div>
                    <div className="text-xl font-black mt-1">{inr(result.cgst)}</div>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <div className="text-xs muted font-bold">SGST</div>
                    <div className="text-xl font-black mt-1">{inr(result.sgst)}</div>
                  </div>
                </div>
              )}

              {taxType === 'igst' && (
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                  <div className="text-xs muted font-bold">IGST</div>
                  <div className="text-xl font-black mt-1">{inr(result.igst)}</div>
                </div>
              )}

              <div className="bg-gradient-to-br from-green-50 to-teal-50 p-5 rounded-lg border-l-4 border-green-700">
                <div className="text-xs muted font-bold">
                  {mode === 'add' ? 'TOTAL AMOUNT' : 'TOTAL (INCLUSIVE)'}
                </div>
                <div className="text-2xl font-black mt-1 text-green-700">
                  {inr(result.totalAmount)}
                </div>
              </div>

              <div className="text-xs text-slate-500 leading-6 bg-slate-50 p-3 rounded">
                <strong>Note:</strong> GST applicability and rates should be verified against current official rules for your specific goods/services category.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
