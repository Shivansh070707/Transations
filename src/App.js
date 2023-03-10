import React, { useState } from 'react';
import { ethers } from 'ethers';
import TransactionDetails from './TransationDetails';
const defaultprovider = new ethers.providers.JsonRpcProvider(
  'https://mainnet.infura.io/v3/e51b40ab2c9247b9aa1e79cb42aa130c'
);

function App() {
  const [inputValue, setInputValue] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [Address, setAddress] = useState(null);
  const [provider, setProvider] = useState(defaultprovider);
  const [Connection, setconnection] = useState('Connect Wallet');

  const connection = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      setAddress(await signer.getAddress());
      setProvider(provider);
      setconnection('');
    } else {
      console.log('No ethereum provider found');
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const blockNumberOrTxHash = inputValue.trim();
      let result;
      if (blockNumberOrTxHash.length === 66) {
        result = await provider.getTransaction(blockNumberOrTxHash);
        setSelectedTransaction(result);
      } else {
        const blockNumber = parseInt(blockNumberOrTxHash, 10);
        result = await provider.getBlockWithTransactions(blockNumber);
        setTransactions(result.transactions);
        setSelectedTransaction(null);
      }
    } catch (error) {
      alert('invalid hash');
      console.log(error);
    }
  };

  return (
    <div>
      <button onClick={connection}>
        {Address} {Connection}
      </button>
      <h1>Ethereum Transactions</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter block number or transaction hash:
          <input type='text' value={inputValue} onChange={handleInputChange} />
        </label>
        <button type='submit'>Search</button>
      </form>
      {selectedTransaction ? (
        <TransactionDetails transaction={selectedTransaction} />
      ) : (
        <ul>
          {transactions.map((tx) => (
            <li key={tx.hash}>
              <u
                onClick={async () => {
                  const selectedTx = await provider.getTransaction(tx.hash);
                  setSelectedTransaction(selectedTx);
                }}
              >
                {tx.hash}
              </u>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
