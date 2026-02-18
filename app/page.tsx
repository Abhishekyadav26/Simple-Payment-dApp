"use client";
import { useState } from 'react';
import WalletConnection from '@/components/wallet';


export default function Home() {

  const [publicKey, setPublicKey] = useState<string>('');

  const handleConnect = async () => {
    // Connection is handled inside <WalletConnection />; keep a stub here if you plan to reuse it.
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <WalletConnection onConnect={setPublicKey} onDisconnect={() => setPublicKey('')} />
    </div>
  );
}
