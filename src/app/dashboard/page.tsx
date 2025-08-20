'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import authService from "@/features/auth/api/authService";

const DashboardPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/auth/"); // no token → redirect
        return;
      }

      try {
        // call protected backend route with token
        await authService.test(token);
        setLoading(false); // token valid → show dashboard
      } catch (err) {
        console.error("Token invalid or expired:", err);
        localStorage.removeItem("token"); // remove bad token
        router.push("/auth/"); // redirect to login
      }
    };

    verifyToken();
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome to the Dashboard!</h1>
      <Button>hello</Button>
    </div>
  );
};

export default DashboardPage;
