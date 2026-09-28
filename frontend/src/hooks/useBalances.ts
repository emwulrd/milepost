import { useCallback, useEffect, useState } from 'react';
import { useWallet } from '../context/useWallet';
import { parseAmount } from '../lib/amount';

export interface BalancesState {
  xlm: bigint | null;
  asset: bigint | null;
  assetCode: string;
  isUnfunded: boolean;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

const HORIZON_TESTNET_URL = 'https://horizon-testnet.stellar.org';

/**
 * Reads native XLM balance (and optional programme asset) for an address.
 * Automatically refreshes when a contract transaction succeeds.
 */
export function useBalances(targetAddress?: string | null): BalancesState {
  const wallet = useWallet();
  const address = targetAddress !== undefined ? targetAddress : wallet.address;

  const [xlm, setXlm] = useState<bigint | null>(null);
  const [asset, setAsset] = useState<bigint | null>(null);
  const [isUnfunded, setIsUnfunded] = useState(false);
  const [loading, setLoading] = useState(Boolean(address));
  const [error, setError] = useState<Error | null>(null);

  const fetchBalances = useCallback(async () => {
    if (!address) {
      setXlm(null);
      setAsset(null);
      setIsUnfunded(false);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${HORIZON_TESTNET_URL}/accounts/${encodeURIComponent(address)}`);
      
      if (response.status === 404) {
        // Account does not exist on testnet -> unfunded
        setIsUnfunded(true);
        setXlm(0n);
        setAsset(0n);
        setLoading(false);
        return;
      }

      if (!response.ok) {
        throw new Error(`Horizon error: ${response.statusText}`);
      }

      const data = await response.json();
      const balances = (data.balances || []) as Array<{ asset_type: string; balance: string }>;
      
      const native = balances.find((b) => b.asset_type === 'native');
      if (native) {
        const stroops = parseAmount(native.balance);
        setXlm(stroops);
        setIsUnfunded(stroops === 0n);
      } else {
        setXlm(0n);
        setIsUnfunded(true);
      }

      setAsset(0n);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      setXlm(null);
      setAsset(null);
    } finally {
      setLoading(false);
    }
  }, [address]);

  useEffect(() => {
    void fetchBalances();
  }, [fetchBalances]);

  useEffect(() => {
    const handleTxSuccess = () => {
      void fetchBalances();
    };

    window.addEventListener('milepost:transaction-success', handleTxSuccess);
    return () => {
      window.removeEventListener('milepost:transaction-success', handleTxSuccess);
    };
  }, [fetchBalances]);

  return {
    xlm,
    asset,
    assetCode: 'XLM',
    isUnfunded,
    loading,
    error,
    refetch: fetchBalances,
  };
}
