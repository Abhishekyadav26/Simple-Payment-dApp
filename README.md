# Simple Payment dApp

A modern web application for interacting with the Stellar blockchain, built with Next.js, TypeScript, and Tailwind CSS. This demo app provides a complete interface for wallet connection, balance checking, sending XLM transactions, and viewing transaction history on the Stellar testnet.

## 🚀 Features

### Wallet Integration
<img width="1008" height="747" alt="Screenshot from 2026-02-19 15-32-49" src="https://github.com/user-attachments/assets/e0c96bc7-6d32-41b2-9689-b5d2c67aaa17" />

- **Connect Wallet**: Connect to Stellar wallets using Stellar Wallets Kit
- **Support for Freighter**: Seamless integration with Freighter wallet
- **Address Display**: Shows connected wallet address with copy functionality
- **Connection Status**: Visual indicators for connection state

### Balance Management
<img width="475" height="368" alt="Screenshot from 2026-02-19 15-35-00" src="https://github.com/user-attachments/assets/44483aab-6121-4fa9-b5ce-70c55feb722f" />


- **Real-time Balance**: Display XLM balance with automatic updates
- **Manual Refresh**: Refresh button to update balance manually
- **Error Handling**: Graceful error display for balance fetch failures

### Transaction Features
- **Send XLM**: Complete transaction flow for sending XLM on testnet
- **Transaction Form**: 
  - Recipient address validation
  - Amount input with proper validation
  - Optional memo field
- **Transaction Feedback**:
  - Success state with transaction hash
  - Failure state with error messages
  - Loading state during transaction processing
- **Explorer Integration**: Direct links to view transactions on Stellar explorer

### Transaction History
- **Recent Transactions**: Display last 10 transactions
- **Transaction Details**:
  - Sent/Received status with color indicators
  - Transaction amounts and dates
  - Counterparty addresses (formatted)
  - Complete transaction hashes
- **Hash Management**:
  - Copy transaction hashes to clipboard
  - Direct explorer links for each transaction
- **Auto-refresh**: Automatically updates after new transactions

## 🛠️ Tech Stack

- **Frontend**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Stellar Integration**: 
  - @stellar/stellar-sdk
  - @creit.tech/stellar-wallets-kit
- **Icons**: React Icons
- **Build Tool**: Turbopack

## 📋 Prerequisites

- Node.js 18+ installed
- Freighter wallet browser extension installed
- Basic understanding of Stellar blockchain

## 🚀 Getting Started

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd stellar-demo
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   # or
   pnpm dev
   # or
   yarn dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Usage

### Connecting Your Wallet
1. Click "Connect Wallet" button
2. Select Freighter from the wallet options
3. Approve the connection request in Freighter
4. Your wallet address will be displayed once connected

### Sending XLM
1. Ensure your wallet is connected
2. Enter the recipient's Stellar address (starts with 'G')
3. Enter the amount of XLM to send
4. Optionally add a memo (max 28 characters)
5. Click "Send XLM"
6. Confirm the transaction in your wallet
7. View the transaction result with hash and explorer link

### Viewing Transaction History
1. Connect your wallet to see transaction history
2. Browse recent transactions with details
3. Click the copy button to copy transaction hashes
4. Click the explorer link to view full transaction details

## 🌐 Network Configuration

The app is configured to use the **Stellar Testnet** by default. This includes:
- Testnet horizon server: `https://horizon-testnet.stellar.org`
- Testnet network passphrase
- Testnet explorer links

## 🏗️ Project Structure

```
├── app/
│   └── page.tsx              # Main application page
├── components/
│   ├── wallet.tsx            # Wallet connection component
│   ├── balance.tsx           # Balance display component
│   ├── transaction.tsx      # Transaction sending component
│   └── transaction-history.tsx # Transaction history component
├── lib/
│   └── stellar-helper.ts     # Stellar blockchain integration
└── public/                   # Static assets
```

## 🔐 Security Notes

- This is a demo application running on testnet
- Never share your private keys or recovery phrases
- Always verify transaction details before signing
- Use testnet tokens for testing purposes only

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 Development Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🌟 Features Implemented

- ✅ Wallet connection with Freighter
- ✅ Balance display and refresh
- ✅ XLM transaction sending
- ✅ Transaction success/failure feedback
- ✅ Transaction hash display and copying
- ✅ Explorer integration
- ✅ Transaction history with full details
- ✅ Responsive design
- ✅ Error handling and validation
- ✅ TypeScript support
- ✅ Modern UI with Tailwind CSS

## 📚 Learn More

- [Stellar Documentation](https://developers.stellar.org/)
- [Stellar SDK](https://github.com/stellar/js-stellar-sdk)
- [Stellar Wallets Kit](https://github.com/creit-tech/stellar-wallets-kit)
- [Freighter Wallet](https://freighter.app/)
- [Next.js Documentation](https://nextjs.org/docs)

## 🚀 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
