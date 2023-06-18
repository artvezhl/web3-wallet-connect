import { Button, useAppStore } from '../../../shared';
import React from 'react';
import { EWallet } from '../../../shared/model/appStore';

export const TrustWalletButton = () => {
  const [connect, trustWallet] = useAppStore((state) => [
    state.connectWallet,
    state.trustWallet
  ]);

  return (
    <div className="flex justify-center flex-col">
      {trustWallet?.connected && (
        <p className="text-xs">Accounts: {trustWallet?.accounts.join(', ')}</p>
      )}
      <Button
        loading={!!trustWallet?.loading}
        onClick={() => connect(EWallet.TRUST_WALLET)}
      >
        {!trustWallet?.connected
          ? 'Connect Trust Wallet'
          : 'Disconnect Trust Wallet'}
      </Button>
    </div>
  );
};
