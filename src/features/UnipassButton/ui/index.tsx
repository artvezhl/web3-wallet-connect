import { Button, useAppStore } from '../../../shared';
import React from 'react';
import { EWallet } from '../../../shared/model/appStore';

export const UnipassButton = () => {
  const [connect, uniPass] = useAppStore((state) => [
    state.connectWallet,
    state.uniPass
  ]);

  return (
    <div className="flex justify-center flex-col">
      {uniPass?.connected && (
        <p className="text-xs">Accounts: {uniPass?.accounts.join(', ')}</p>
      )}
      <Button
        loading={!!uniPass?.loading}
        onClick={() => connect(EWallet.UNI_PASS)}
      >
        {!uniPass?.connected ? 'Connect UniPass' : 'Disconnect UniPass'}
      </Button>
    </div>
  );
};
