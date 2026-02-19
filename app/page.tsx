"use client";
import { useState } from "react";
import WalletConnection from "@/components/wallet";
import BalanceDisplay from "@/components/balance";
import TransactionComponent from "@/components/transaction";
import TransactionHistory from "@/components/transaction-history";

export default function Home() {
  const [publicKey, setPublicKey] = useState<string>("");
  const [transactionKey, setTransactionKey] = useState(0);

  const handleTransactionSuccess = () => {
    setTransactionKey((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 dark:bg-black space-y-6 p-4">
      <div className="w-full max-w-md space-y-6">
        <WalletConnection
          onConnect={setPublicKey}
          onDisconnect={() => setPublicKey("")}
        />
        <BalanceDisplay publicKey={publicKey} />
        <TransactionComponent
          key={transactionKey}
          publicKey={publicKey}
          onTransactionSuccess={handleTransactionSuccess}
        />
        <TransactionHistory publicKey={publicKey} />
      </div>
    </div>
  );
}
