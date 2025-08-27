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
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <h1 className="text-5xl font-bold text-gray-800 text-center">
        Welcome to the Dashboard!
      </h1>
    </div>
  );
};

export default DashboardPage;
