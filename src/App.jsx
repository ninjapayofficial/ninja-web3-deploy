import React, { useState } from 'react';
import {
  useAddress,
  useMetamask,
  useConnect,
  useDisconnect,
  useSDK,
} from '@thirdweb-dev/react';

function App() {
  const connectWithMetamask = useMetamask();
  const disconnect = useDisconnect();
  const address = useAddress();
  const sdk = useSDK();

  const [erc20Address, setErc20Address] = useState('');
  const [erc721Address, setErc721Address] = useState('');

  // State variables for ERC20 inputs
  const [erc20Name, setErc20Name] = useState('');
  const [erc20Symbol, setErc20Symbol] = useState('');

  // State variables for ERC721 inputs
  const [erc721Name, setErc721Name] = useState('');
  const [erc721Symbol, setErc721Symbol] = useState('');

  const deployERC20 = async () => {
    if (!erc20Name || !erc20Symbol) {
      alert('Please enter a name and symbol for the ERC20 token.');
      return;
    }
    try {
      const contractAddress = await sdk.deployer.deployBuiltInContract(
        'token',
        {
          name: erc20Name,
          symbol: erc20Symbol,
          primary_sale_recipient: address,
          primary_fee_recipient: address,
          platform_fee_basis_points: 100 // 1%
        },
        "5.0.2", // Specify the version
        {
          gasLimit: 5000000, // Set a higher gas limit
        }
      );
      setErc20Address(contractAddress);
      alert(`ERC20 Contract Deployed at: ${contractAddress}`);
    } catch (error) {
      console.error(error);
      alert('Failed to deploy ERC20 contract');
    }
  };

  const deployERC721 = async () => {
    if (!erc721Name || !erc721Symbol) {
      alert('Please enter a name and symbol for the ERC721 NFT collection.');
      return;
    }
    try {
      const contractAddress = await sdk.deployer.deployBuiltInContract(
        'nft-collection',
        {
          name: erc721Name,
          symbol: erc721Symbol,
          external_link: "https://ninjapay.in",
          image: "https://file.notion.so/f/f/87ea3c95-99bf-4229-adac-65d62c260eae/0e5b8296-c4c0-4613-8f4c-b4aa6fb4cb3f/L2.svg?id=35f3b023-e479-4df2-873e-df95ed9aefd6&table=block&spaceId=87ea3c95-99bf-4229-adac-65d62c260eae&expirationTimestamp=1720180800000&signature=ifgF5uHETmgcPqwsGqinqAOfZbmoqqo-XmLBSUU8hxQ&downloadName=L2.svg",
          description: "This is Nin Token",
          primary_sale_recipient: address,
          primary_fee_recipient: address,
          platform_fee_basis_points: 100 // 1%
        },
        "5.0.2", // Specify the version
        {
          gasLimit: 5000000, // Set a higher gas limit
        }
      );
      setErc721Address(contractAddress);
      alert(`ERC721 Contract Deployed at: ${contractAddress}`);
    } catch (error) {
      console.error(error);
      alert('Failed to deploy ERC721 contract');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      {address ? (
        <>
          <button onClick={disconnect}>Disconnect Wallet</button>
          <p>Connected Wallet Address: {address}</p>

          {/* ERC20 Deployment */}
          <h2>Deploy ERC20 Contract</h2>
          <input
            type="text"
            placeholder="Token Name"
            value={erc20Name}
            onChange={(e) => setErc20Name(e.target.value)}
          />
          <input
            type="text"
            placeholder="Token Symbol"
            value={erc20Symbol}
            onChange={(e) => setErc20Symbol(e.target.value)}
          />
          <button onClick={deployERC20}>Deploy ERC20 Contract</button>
          {erc20Address && <p>ERC20 Contract Address: {erc20Address}</p>}

          {/* ERC721 Deployment */}
          <h2>Deploy ERC721 Contract</h2>
          <input
            type="text"
            placeholder="NFT Collection Name"
            value={erc721Name}
            onChange={(e) => setErc721Name(e.target.value)}
          />
          <input
            type="text"
            placeholder="NFT Collection Symbol"
            value={erc721Symbol}
            onChange={(e) => setErc721Symbol(e.target.value)}
          />
          <button onClick={deployERC721}>Deploy ERC721 Contract</button>
          {erc721Address && <p>ERC721 Contract Address: {erc721Address}</p>}
        </>
      ) : (
        <button onClick={connectWithMetamask}>Connect MetaMask Wallet</button>
      )}
    </div>
  );
}

export default App;
