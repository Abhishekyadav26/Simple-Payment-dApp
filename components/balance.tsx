'use client';

import { useState, useEffect } from 'react';
import { stellar } from '@/lib/stellar-helper';
import { FiRefreshCw } from 'react-icons/fi';

interface BalanceDisplayProps {
  publicKey: string;
}

export default function BalanceDisplay({ publicKey }: BalanceDisplayProps) {
  const [xlm, setXlm] = useState('0');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (publicKey) {
      loadBalance();
    }
  }, [publicKey]);

  const loadBalance = async () => {
    try {
      setLoading(true);
      setError('');
      const balanceData = await stellar.getBalance(publicKey);
      setXlm(balanceData.xlm);
    } catch (err: any) {
      setError(err.message || 'Failed to load balance');
    } finally {
      setLoading(false);
    }
  };

  const formatBalance = (bal: string): string => {
    const num = parseFloat(bal);
    return num.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 7,
    });
  };

  return (
    <div className="border border-white/10 rounded-lg p-6 bg-white/5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Balance</h3>
        <button
          onClick={loadBalance}
          disabled={loading}
          className="p-2 rounded hover:bg-white/10 disabled:opacity-50"
        >
          <FiRefreshCw className={`w-4 h-4 text-gray-400 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {error && (
        <div className="mb-4 bg-red-500/10 border border-red-500/50 rounded p-2 text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="text-3xl font-bold text-white">
        {formatBalance(xlm)} <span className="text-xl text-gray-400">XLM</span>
      </div>
    </div>
  );
}