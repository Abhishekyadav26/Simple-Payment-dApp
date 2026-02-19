"use client";

import { useState, useEffect, useCallback } from "react";
import { stellar } from "@/lib/stellar-helper";
import { FaHistory, FaExternalLinkAlt, FaCopy } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";

interface TransactionHistoryProps {
  publicKey: string;
}

interface Transaction {
  id: string;
  type: string;
  amount?: string;
  asset?: string;
  from?: string;
  to?: string;
  createdAt: string;
  hash: string;
}

export default function TransactionHistory({
  publicKey,
}: TransactionHistoryProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");

  const loadTransactions = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const txHistory = await stellar.getRecentTransactions(publicKey, 10);
      setTransactions(txHistory);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load transactions";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [publicKey]);

  useEffect(() => {
    if (publicKey) {
      loadTransactions();
    }
  }, [publicKey, loadTransactions]);

  const handleCopyHash = async (hash: string) => {
    await navigator.clipboard.writeText(hash);
    setCopied(hash);
    setTimeout(() => setCopied(""), 2000);
  };

  const getExplorerLink = (hash: string) => {
    return stellar.getExplorerLink(hash, "tx");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const formatAmount = (amount?: string) => {
    if (!amount) return "0";
    const num = parseFloat(amount);
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 7,
    });
  };

  const isSentTransaction = (tx: Transaction) => {
    return tx.from === publicKey;
  };

  if (!publicKey) {
    return null;
  }

  return (
    <div className="border border-white/10 rounded-lg p-6 bg-white/5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <FaHistory className="text-blue-400" />
          Transaction History
        </h3>
        <button
          onClick={loadTransactions}
          disabled={loading}
          className="p-2 rounded hover:bg-white/10 disabled:opacity-50 transition-colors"
          title="Refresh transactions"
        >
          <FiRefreshCw
            className={`w-4 h-4 text-gray-400 ${loading ? "animate-spin" : ""}`}
          />
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 rounded p-3 text-red-400 text-sm">
          {error}
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-solid border-blue-400 border-r-transparent"></div>
        </div>
      )}

      {!loading && !error && transactions.length === 0 && (
        <div className="text-center py-8 text-white/60">
          <FaHistory className="text-3xl mx-auto mb-3 opacity-50" />
          <p>No transactions found</p>
          <p className="text-sm mt-1">
            Your transaction history will appear here
          </p>
        </div>
      )}

      {!loading && !error && transactions.length > 0 && (
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      isSentTransaction(tx) ? "bg-red-400" : "bg-green-400"
                    }`}
                  ></div>
                  <span className="text-white font-medium text-sm">
                    {isSentTransaction(tx) ? "Sent" : "Received"}
                  </span>
                  <span className="text-white/60 text-xs">
                    {tx.asset || "XLM"}
                  </span>
                </div>
                <span className="text-white/60 text-xs">
                  {formatDate(tx.createdAt)}
                </span>
              </div>

              <div className="flex items-center justify-between mb-2">
                <div className="text-white font-semibold">
                  {isSentTransaction(tx) ? "-" : "+"}
                  {formatAmount(tx.amount)} {tx.asset || "XLM"}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-white/60 text-xs font-mono truncate flex-1 mr-2">
                  {isSentTransaction(tx)
                    ? `To: ${stellar.formatAddress(tx.to || "")}`
                    : `From: ${stellar.formatAddress(tx.from || "")}`}
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => handleCopyHash(tx.hash)}
                    className="text-blue-400 hover:text-blue-300 transition-colors p-1"
                    title={
                      copied === tx.hash ? "Copied!" : "Copy transaction hash"
                    }
                  >
                    {copied === tx.hash ? (
                      <FaCopy className="text-green-400" />
                    ) : (
                      <FaCopy />
                    )}
                  </button>
                  <a
                    href={getExplorerLink(tx.hash)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors p-1"
                    title="View on explorer"
                  >
                    <FaExternalLinkAlt />
                  </a>
                </div>
              </div>

              <div className="mt-2 pt-2 border-t border-white/10">
                <p className="text-white/40 text-xs font-mono break-all">
                  Hash: {tx.hash}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
