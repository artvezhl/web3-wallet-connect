import { StorageType } from '@unipasswallet/popup-sdk';

export type Environment = 'test' | 'prod';
export declare type ChainType =
  | 'polygon'
  | 'bsc'
  | 'rangers'
  | 'eth'
  | 'scroll'
  | 'arbitrum';

// UniPass Wallet entry URL
export interface WalletURL {
  domain?: string;
  protocol?: 'https' | 'http';
}

// Basic Theme
export declare enum UniPassTheme {
  LIGHT = 'light',
  DARK = 'dark'
}

// Config before open the popup window
export declare type AppSettings = {
  chain?: ChainType;
  appName?: string;
  appIcon?: string;
  theme?: UniPassTheme;
};

// UniPass Wallet init config
export declare type PopupSDKOption = {
  readonly nodeRPC?: string;
  readonly chainType?: ChainType;
  readonly env?: Environment;
  readonly storageType?: StorageType;
  readonly walletUrl?: WalletURL;
  readonly appSettings?: AppSettings;
  readonly [key: string]: any;
};

export declare type ConnectType = 'both' | 'google' | 'email';
export declare type UPEventListener = (event: any) => void;
export declare type UPConnectOptions = {
  email?: boolean; // request email or not
  connectType?: ConnectType; // Type of login UniPass
  authorize?: boolean; // sign with ethereum if true when connect
  eventListener?: UPEventListener; // event listener during connection
};
export interface UPAccount {
  address: string; // Ethereum address of user
  email?: string | undefined; // Email
  newborn?: boolean | undefined; // Newly registered or not
  message?: string; // sign with ethereum message when authorize is true
  signature?: string; // sign with ethereum signature when authorize is true
}
