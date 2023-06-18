import { create } from 'zustand';
import Web3 from 'web3';
import MetaMaskSDK from '@metamask/sdk';
import { UniPassPopupSDK } from '@unipasswallet/popup-sdk';
import { UniPassTheme } from '../config';

export enum EWallet {
  METAMASK = 'metamask',
  TRUST_WALLET = 'trustWallet',
  UNI_PASS = 'uniPass'
}

export type TWallet = {
  connected: boolean;
  loading: boolean;
  accounts: string[];
};

type AppStoreState = {
  web3: Web3 | null;
  activeWallet: EWallet | null;
  metamask: TWallet | null;
  trustWallet: TWallet | null;
  uniPass: TWallet | null;
};
type AppStoreActions = {
  init: () => void;
  connectWallet: (type: EWallet) => Promise<void>;
  disconnectWallets: () => void;
};
type AppStore = AppStoreState & AppStoreActions;

const initialStoreState = {
  web3: null,
  activeWallet: null,
  metamask: null,
  trustWallet: null,
  uniPass: null
};
export const useAppStore = create<AppStore>()((set, get) => ({
  ...initialStoreState,
  init: () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      set({ web3 });
    }
  },
  connectWallet: async (type) => {
    const web3 = get().web3;
    if (web3) {
      const initialWalletStatus: TWallet = {
        connected: false,
        loading: true,
        accounts: []
      };
      try {
        // Запрос разрешения на подключение к кошельку
        if (type === EWallet.METAMASK) {
          set({
            metamask: initialWalletStatus
          });
          await window.ethereum?.request({
            method: 'eth_requestAccounts'
          });
        }
        if (type === EWallet.TRUST_WALLET) {
          set({
            trustWallet: initialWalletStatus
          });
          await window.ethereum?.send('eth_requestAccounts');
        }
        if (type === EWallet.UNI_PASS) {
          const upWallet = new UniPassPopupSDK({
            env: 'test',
            // for polygon mumbai
            chainType: 'polygon',
            // choose localStorage if you want to cache user account permanent
            storageType: 'sessionStorage',
            appSettings: {
              // theme: 'light',
              appName: 'UniPass Wallet Demo',
              appIcon: ''
            }
          });
          try {
            const account = await upWallet.login({
              email: true,
              eventListener: (event: any) => {
                console.log('event', event);
                const { type, body } = event;
                // if (type === UPEventType.REGISTER) {
                console.log('account', body);
                // ElMessage.success('a user register');
                // }
              },
              connectType: 'both'
            });
            const { address, email } = account;
            console.log('account', address, email);
          } catch (err) {
            console.log('connect err', err);
          }
        }
        // Получение аккаунтов
        const accounts = await web3.eth.getAccounts();
        const finalWalletStatus: TWallet = {
          connected: true,
          loading: false,
          accounts
        };

        if (type === EWallet.METAMASK)
          set({
            metamask: finalWalletStatus
          });
        if (type === EWallet.TRUST_WALLET)
          set({
            trustWallet: finalWalletStatus
          });
      } catch (error) {
        const errorWalletStatus: TWallet = {
          connected: false,
          loading: false,
          accounts: []
        };
        if (type === EWallet.METAMASK)
          set({
            metamask: errorWalletStatus
          });
        if (type === EWallet.TRUST_WALLET)
          set({
            trustWallet: errorWalletStatus
          });
        console.error(error);
      }
    } else {
      console.log('Web3 is not available');
    }
  },
  disconnectWallets: () => set({ ...initialStoreState })
}));
