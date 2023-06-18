import React from 'react';
import { Button, useAppStore } from '../../../shared';
import { EWallet } from '../../../shared/model/appStore';

export const MetamaskButton = () => {
  const [connect, metamask] = useAppStore((state) => [
    state.connectWallet,
    state.metamask
  ]);

  return (
    <div className="flex justify-center flex-col">
      {metamask?.connected && (
        <p className="text-xs">Accounts: {metamask?.accounts.join(', ')}</p>
      )}
      <Button
        loading={!!metamask?.loading}
        onClick={() => connect(EWallet.METAMASK)}
      >
        {!metamask?.connected ? 'Connect Metamask' : 'Disconnect MetaMask'}
      </Button>
    </div>
  );
};
