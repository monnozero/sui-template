import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
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
     
           
              <Link
                href={"/login"}
                className="max-w-[546px] w-full py-4 text-base font-bold  flex items-center justify-center gap-2 text-white rounded-xl  cursor-pointer bg-gradient-to-r from-[#8737E9] to-[#3AE7E7]  "
              >
                
                <p> Connect your account</p>
              </Link>
              {/* <div className="w-full flex gap-5">
                  <div className="bg-[#060625] max-w-[433px] w-full h-[212px] flex items-center justify-center text-center gradient-border-mask">
                        <div className="flex flex-col gap-2">
                          <p className="text-[40px] font-bold text-[#3AE7E7]">KOL</p>
                          <p className="text-[17px] text-white">You are recognized as</p>
                        </div>
                  </div>
                  <div className="bg-[#060625] max-w-[433px] w-full h-[212px] flex items-center justify-center text-center gradient-border-mask-box">
                        <div className="flex flex-col gap-2">
                          <p className="text-[40px] font-bold text-[#3AE7E7]">12,576</p>
                          <p className="text-[17px] text-white">Your Point</p>
                        </div>
                  </div>
              </div> */}
            </div>
          
          </div>
       
  );
}
