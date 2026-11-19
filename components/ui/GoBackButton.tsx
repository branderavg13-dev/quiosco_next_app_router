"use client"
import { useRouter } from "next/navigation";
export default function GoBackButton () {
    const router = useRouter()
    return (
           <button
                    onClick={() => router.back()}
                    className='bg-amber-400 w-full lg:w-aunto text-xl px-10 py-3 tex-center font-bold cursor-pointer'
                >Volver</button> 
    )
}