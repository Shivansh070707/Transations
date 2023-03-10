import React from 'react';

function TransactionDetails(props) {
  const {
    hash,
    type,
    blockHash,
    blockNumber,
    transactionIndex,
    confirmations,
    from,
    to,
    value,
    nonce,
    data,
    chainId,
  } = props.transaction;

  return (
    <div>
      <h2>Transaction Details</h2>
      <p>
        <strong>Hash:</strong> {hash}
      </p>
      <p>
        <strong>Type:</strong> {type}
      </p>
      <p>
        <strong>Block Hash:</strong> {blockHash}
      </p>
      <p>
        <strong>Block Number:</strong> {blockNumber}
      </p>
      <p>
        <strong>Transaction Index:</strong> {transactionIndex}
      </p>
      <p>
        <strong>Confirmations:</strong> {confirmations}
      </p>
      <p>
        <strong>From:</strong> {from}
      </p>
      <p>
        <strong>To:</strong> {to}
      </p>
      <p>
        <strong>Value:</strong> {value.toString()}
      </p>
      <p>
        <strong>Nonce:</strong> {nonce}
      </p>
      <p>
        <strong>Data:</strong> {data}
      </p>
      <p>
        <strong>Chain ID:</strong> {chainId}
      </p>
    </div>
  );
}

export default TransactionDetails;
