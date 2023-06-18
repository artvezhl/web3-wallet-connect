import React from 'react';
import './App.css';
import { MetamaskButton, TrustWalletButton, UnipassButton } from '../features';
import { useAppStore } from '../shared';
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider
} from '@web3modal/ethereum';
import { Web3Button, Web3Modal } from '@web3modal/react';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { arbitrum, mainnet, polygon } from 'wagmi/chains';

const chains = [arbitrum, mainnet, polygon];
const projectId = 'YOUR_PROJECT_ID';

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  publicClient
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

function App() {
  const init = useAppStore((state) => state.init);
  React.useEffect(() => {
    init();
  }, []);

  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <div className="App">
          <header className="App-header space-y-2">
            <MetamaskButton />
            <TrustWalletButton />
            <UnipassButton />
            <Web3Button />
          </header>
        </div>
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}

export default App;
