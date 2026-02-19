"use client";

import { useState } from "react";
import { stellar } from "@/lib/stellar-helper";
import {
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationTriangle,
  FaExternalLinkAlt,
  FaCopy,
} from "react-icons/fa";

interface TransactionProps {
  publicKey: string;
  onTransactionSuccess?: () => void;
}

interface TransactionState {
  status: "idle" | "sending" | "success" | "error";
  hash?: string;
  message?: string;
  error?: string;
}

export default function TransactionComponent({
  publicKey,
  onTransactionSuccess,
}: TransactionProps) {
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [transactionState, setTransactionState] = useState<TransactionState>({
    status: "idle",
  });
  const [copied, setCopied] = useState(false);

  const validateAddress = (address: string): boolean => {
    return address.startsWith("G") && address.length >= 56;
  };

  const validateAmount = (amount: string): boolean => {
    const num = parseFloat(amount);
    return !isNaN(num) && num > 0 && num <= 10000;
  };

  const handleSendTransaction = async () => {
    if (!validateAddress(recipientAddress)) {
      setTransactionState({
        status: "error",
        error: "Invalid recipient address. Please check the Stellar address.",
      });
      return;
    }

    if (!validateAmount(amount)) {
      setTransactionState({
        status: "error",
        error:
          "Invalid amount. Please enter a valid amount between 0.0000001 and 10000 XLM.",
      });
      return;
    }

    try {
      setTransactionState({ status: "sending" });

      const result = await stellar.sendPayment({
        from: publicKey,
        to: recipientAddress,
        amount: amount,
        memo: memo.trim() || undefined,
      });

      if (result.success) {
        setTransactionState({
          status: "success",
          hash: result.hash,
          message: "Transaction sent successfully!",
        });
        setRecipientAddress("");
        setAmount("");
        setMemo("");
        onTransactionSuccess?.();
      } else {
        setTransactionState({
          status: "error",
          error: "Transaction failed. Please try again.",
        });
      }
    } catch (error: unknown) {
      console.error("Transaction error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Transaction failed. Please check your balance and try again.";
      setTransactionState({
        status: "error",
        error: errorMessage,
      });
    }
  };

  const handleCopyHash = async () => {
    if (transactionState.hash) {
      await navigator.clipboard.writeText(transactionState.hash);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getExplorerLink = () => {
    return transactionState.hash
      ? stellar.getExplorerLink(transactionState.hash, "tx")
      : "";
  };

  const resetForm = () => {
    setTransactionState({ status: "idle" });
  };

  return (
    <div className="border border-white/10 rounded-lg p-6 bg-white/5 space-y-4">
      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
        <FaPaperPlane className="text-blue-400" />
        Send XLM
      </h3>

      {transactionState.status === "idle" && (
        <>
          <div className="space-y-4">
            <div>
              <label className="block text-white/60 text-sm mb-2">
                Recipient Address
              </label>
              <input
                type="text"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                placeholder="G..."
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all"
              />
            </div>

            <div>
              <label className="block text-white/60 text-sm mb-2">
                Amount (XLM)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0"
                step="0.0000001"
                min="0.0000001"
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all"
              />
            </div>

            <div>
              <label className="block text-white/60 text-sm mb-2">
                Memo (Optional)
              </label>
              <input
                type="text"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                placeholder="Transaction memo..."
                maxLength={28}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all"
              />
            </div>
          </div>

          <button
            onClick={handleSendTransaction}
            disabled={!recipientAddress || !amount || !publicKey}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2"
          >
            <FaPaperPlane />
            Send XLM
          </button>
        </>
      )}

      {transactionState.status === "sending" && (
        <div className="flex flex-col items-center justify-center py-8 space-y-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-solid border-blue-400 border-r-transparent"></div>
          <p className="text-white/80">Sending transaction...</p>
          <p className="text-white/60 text-sm">Please confirm in your wallet</p>
        </div>
      )}

      {transactionState.status === "success" && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-green-400">
            <FaCheckCircle className="text-xl" />
            <span className="font-medium">Transaction Successful!</span>
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 space-y-3">
            <div>
              <p className="text-white/60 text-sm mb-1">Transaction Hash</p>
              <div className="flex items-center justify-between gap-2">
                <p className="text-white font-mono text-sm break-all">
                  {transactionState.hash}
                </p>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={handleCopyHash}
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                    title={copied ? "Copied!" : "Copy hash"}
                  >
                    {copied ? (
                      <FaCheckCircle className="text-green-400" />
                    ) : (
                      <FaCopy />
                    )}
                  </button>
                  <a
                    href={getExplorerLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                    title="View on explorer"
                  >
                    <FaExternalLinkAlt />
                  </a>
                </div>
              </div>
            </div>

            <div className="text-green-400 text-sm">
              {transactionState.message}
            </div>
          </div>

          <button
            onClick={resetForm}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-all"
          >
            Send Another Transaction
          </button>
        </div>
      )}

      {transactionState.status === "error" && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-red-400">
            <FaExclamationTriangle className="text-xl" />
            <span className="font-medium">Transaction Failed</span>
          </div>

          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <p className="text-red-400 text-sm">{transactionState.error}</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={resetForm}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-all"
            >
              Try Again
            </button>
            <button
              onClick={handleSendTransaction}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all"
            >
              Retry
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
