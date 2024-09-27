"use client";

import { useWalletMultiButton } from "@solana/wallet-adapter-base-ui";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { sliceAddressWallet } from "@/lib/helper";
import * as React from "react";
// import { Button } from "@/components/ui/button";
import WalletIcon from "@/assets/WalletIcom";
import { LoadingButton } from "@/components/ui/loading-button";


export default function WalletButton({
  isLoading,
  isConnect,
  currentPublicKey,
  handleGetNonce,
}: {
  isLoading: boolean;
  isConnect: boolean;
  currentPublicKey: any;
  handleGetNonce: () => void;
}) {
  const { setVisible: setModalVisible } = useWalletModal();
 
  const handleLogin = () => {
    try {
      if (!currentPublicKey) {
        setModalVisible(true);
      } else {
        handleGetNonce();
      }
    } catch (error) {}
  };

  return (
    <>
      <LoadingButton
        loading={isLoading }
        disabled={isLoading || !isConnect}
        onClick={handleLogin}
        className="bg-gradient-to-r from-[#8737E9] to-[#3AE7E7]  rounded-xl w-full h-[56px] text-base font-bold flex items-center justify-center gap-2 text-white cursor-pointer"
      >
        {!isLoading && <WalletIcon />}
        {currentPublicKey ? (
          "Verify your wallet" + " " + sliceAddressWallet(currentPublicKey)
        ) : (
          <p>Connect your wallet</p>
        )}
      </LoadingButton>
    </>
  );
  ("");
}
