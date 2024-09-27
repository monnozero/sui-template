import React, { useEffect, useState } from 'react'
import { toast } from "@/hooks/use-toast";
import { useWallet } from '@solana/wallet-adapter-react';
import { decodeUTF8 } from "tweetnacl-util";

import getProviderPhantom from '@/hooks/getProviderPhantom';
import authApiRequest from '@/apiRequest/auth';
import { useRouter } from 'next/navigation';
import { PublicKey } from '@solana/web3.js';

const useLogin = () => {
    const { publicKey } = useWallet();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [authenToken, setAuthenToken] = useState<string>("");
    const [isConnect, setIsConnect] = useState<boolean>(false);
    const [currentPublicKey, setCurrentPublicKey] = useState<any>(null);
  
  
    const phantomProvider = getProviderPhantom(); // see "Detecting the Provider"
  
    const handleGetNonce = async () => {
        try {
          setIsLoading(true);
          if (!currentPublicKey) return;
          // Get nonce
          const publicKeyWallet = Buffer.from(currentPublicKey.toBytes()).toString(
            "base64"
          );
          console.log("publickey get Nonce", publicKeyWallet);
          const responseNonce = await authApiRequest.nonce(
            encodeURIComponent(publicKeyWallet)
          );
    
          // Sign message
          if (responseNonce) {
            handleGetSignature(responseNonce.payload.data.nonce);
          }
        } catch (error) {
          setIsLoading(false);
    
          toast({
            variant: "destructive",
            className: "z-50 text-white",
            description: "Connect wallet failed",
          });
        }
      };
    
      const handleGetSignature = async (nonce: string) => {
        try {
          if (!phantomProvider) return;
          const encodedMessage = decodeUTF8(nonce);
          const signedMessage = await phantomProvider.signMessage(
            encodedMessage,
            "utf8"
          );
    
          // verify
          if (signedMessage) {
            handleVerifySignature(signedMessage.signature);
          }
        } catch (error) {
          setIsLoading(false);
    
          toast({
            variant: "destructive",
            className: "z-50 ",
            description: "Connect wallet failed",
          });
        }
      };
    
      const handleVerifySignature = async (signature: string) => {
        try {
          if (!currentPublicKey) return;
    
          const data = {
            public_key: Buffer.from(currentPublicKey.toBytes()).toString("base64"),
            signature: Buffer.from(signature).toString("base64"),
          };
    
          const responseVerify = await authApiRequest.verify(data);
    
          toast({
            className: "z-50 ",
            description: responseVerify.payload.msg,
          });
          if (responseVerify) {
            const responseLogin = await authApiRequest.login(
              responseVerify.payload.data.authen_token
            );
    
            if (responseLogin && responseLogin?.payload.code !== 400) {
              await authApiRequest.auth({
                accessToken: responseLogin.payload.data.access_token,
              });
              toast({
                className: "z-50 ",
                description: "Login successful",
              });
              router.push("/");
              router.refresh();
            } else {
              toast({
                className: "z-50 ",
                description: "Your account is not register",
              });
              // setAuthenToken(responseVerify.payload.data.authen_token);
            }
          }
        } catch (error) {
          console.log("🚀 ~ handleVerifySignature ~ error:", error);
          setIsLoading(false);
    
          toast({
            variant: "destructive",
            className: "z-50 text-white",
            description: "Connect wallet failed",
          });
        }
      };
    
    useEffect(() => {
      if (publicKey) {
        setCurrentPublicKey(publicKey); // Convert publicKey to string (base58)
      } else {
        setCurrentPublicKey(null); // Xử lý khi không có publicKey (chưa connect)
      }
    }, [publicKey]); // Chạy lại khi giá trị publicKey thay đổi
  
    useEffect(() => {
      const provider = window.solana;
  
      if (provider && provider.isPhantom) {
        provider.on("accountChanged", (newPublickey: PublicKey) => {
          console.log("New wallet public key:", newPublickey?.toBase58());
          // Handle the new wallet address
          setCurrentPublicKey(newPublickey);
        });
      }
  
      return () => {
        if (provider && provider.isPhantom) {
          provider.disconnect();
        }
      };
    }, []);
    return {
      isLoading,
      isConnect,
      handleGetNonce,
      authenToken,
      setIsConnect,
      currentPublicKey
    };
  };


export default useLogin