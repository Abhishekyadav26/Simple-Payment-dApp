"use client";
import { useState } from 'react';
import WalletConnection from '@/components/wallet';
import BalanceDisplay from '@/components/balance';


export default function Home() {

  const [publicKey, setPublicKey] = useState<string>('');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 dark:bg-black">
      <WalletConnection onConnect={setPublicKey} onDisconnect={() => setPublicKey('')} />
      <BalanceDisplay publicKey={publicKey} />
    </div>
  );
}
