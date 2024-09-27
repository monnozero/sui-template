import KolView from "@/app/(landing)/KolView";
import Header from "@/components/shared/Header";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");
  return (
    <div>
           <Header/>
           <div className="relative h-[100vh] flex items-center justify-center bg-[url('/BackgroundImage.png')] bg-no-repeat bg-cover bg-center">
          <div className="max-w-screen-sm w-full flex flex-col items-center justify-center gap-20">
            <div className="relative w-[240px] h-[240px]">
              <Image
                alt="logo"
                src={"/Logo.png"}
                sizes="100%"
                fill
                objectFit="contain"
              />
            </div>
     
           
             {
              !accessToken ? (
                <Link
                href={"/login"}
                className="max-w-[546px] w-full py-4 text-base font-bold  flex items-center justify-center gap-2 text-white rounded-xl  cursor-pointer bg-gradient-to-r from-[#8737E9] to-[#3AE7E7]  "
              >
                
                <p> Connect your account</p>
              </Link>
              ) : (
<KolView/>
              )
             }
            
            </div>
          
          </div>
    </div>
    
       
  );
}
