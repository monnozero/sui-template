
export const sliceAddressWallet = (publicKey: any) => {
  const base58 = publicKey.toBase58();
  const address = base58.slice(0, 2) + ".." + base58.slice(-4);
  return address;
};

