"use client";
import useSWR from "swr";

import React, { useEffect } from "react";
import accountApiRequest from "@/apiRequest/account";
import platsApiRequest from "@/apiRequest/plats";
import { Skeleton } from "@/components/ui/skeleton";

//`/app/${appId}/account?plat_id=${platId}`
const KolView = () => {
  const { data } = useSWR("/user", accountApiRequest.user);
  console.log("🚀 ~ KolView ~ data:", data);

  const appId =
    "be94da783e0ee11bbdb9de2f9c6745f15b1f9bfc3007dab7f77ec2eed2400b05";

  const { data: platsAppData } = useSWR(
    data
      ? `/app/${appId}/account?plat_id=${data?.payload.data.user.plat_id}`
      : null,
    platsApiRequest.appIdAccount
  );

  console.log("🚀 ~ KolView ~ platsAppData:", platsAppData);

  return (
    <div className="w-full flex gap-5">
      <div className="bg-[#060625] max-w-[433px] w-full h-[212px] flex items-center justify-center text-center gradient-border-mask">
        <div className="flex flex-col gap-2">
       
      {
        !platsAppData ? (
          <div className="space-y-2">
          <Skeleton className="h-4 w-[180px] bg-slate-400" />
          <Skeleton className="h-4 w-[150px] bg-slate-400" />
        </div>
        ) : (
<p className="text-[24px] font-bold text-[#3AE7E7]">
            {platsAppData?.payload?.data?.output?.result_trade > 0
              ? "TRADER, "
              : ""}
       
            {platsAppData?.payload?.data?.output?.result_twitter > 0
              ? "KOL, "
              : ""}

            {platsAppData?.payload?.data?.output?.result_whale > 0
              ? "WHALE"
              : ""}
          </p>
        )
      }
    
          
          <p className="text-[17px] text-white">You are recognized as</p>
        </div>
      </div>
      <div className="bg-[#060625] max-w-[433px] w-full h-[212px] flex items-center justify-center text-center gradient-border-mask-box">
        <div className="flex flex-col gap-2">
        {
        !platsAppData ? (
          <div className="space-y-2">
          <Skeleton className="h-4 w-[180px] bg-slate-400" />
          <Skeleton className="h-4 w-[150px] bg-slate-400" />
        </div>
        ) : (
          <p className="text-[24px] font-bold text-[#3AE7E7]">{platsAppData?.payload?.data?.output?.result_score > 0 ? (platsAppData?.payload?.data?.output?.result_score/1000).toFixed(4) : "0.0000"}</p>
        )
      }
        
          <p className="text-[17px] text-white">Your Point</p>
        </div>
      </div>
    </div>
  );
};

export default KolView;
