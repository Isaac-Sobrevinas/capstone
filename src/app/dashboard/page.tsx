'use client';

import { Button } from "@/components/ui/button"
import authService from "@/features/auth/api/authService"
import { useEffect } from "react"

/* react js */



const DashboardPage = () => {

    const activate = async () => {
        let message = await authService.test();
        console.log(message);
    }

    useEffect(() => {
        activate();
    }, [])

    return (
        <Button>hello</Button>
    )
}



export default DashboardPage