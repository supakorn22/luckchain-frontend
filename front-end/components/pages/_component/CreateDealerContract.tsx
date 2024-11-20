'use client'
import { useRouter } from "next/router";

export default function CreateDealerContract(){
    const router = useRouter();
    const handleNavigation = () => {
        router.push('/tiedlottopage')
    }
    return(
        <>
        <button onClick={handleNavigation} className="m-2 border-[#004fff] text-[#004fff] border-[4px] p-3 justify-center rounded-[10px]">
            TO BE A DEALER CREATE CONTRACT !
        </button>
        </>
    )
}