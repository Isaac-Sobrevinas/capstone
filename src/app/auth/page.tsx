"use client";

import Container from "@/components/containers/container";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setEmailError("Email is required");
      setPasswordError("Password is required");
      return;
    }

    setError("");
    setLoading(true);

    try {
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="w-1/3 mx-auto mt-20 p-6 bg-white rounded-lg">
        <h1 className="mb-6 text-center">LOGIN</h1>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          error={emailError}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
            setEmailError("");
          }}
          hasError={!!emailError}
          className="mb-3"
          label="Email"
        />
        <Input
          label="Password"
          type="password"
          placeholder="Password"
          className="mb-3"
          value={password}
          error={passwordError}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
            setPasswordError("");
          }}
          hasError={!!passwordError}
        />

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <Button
          className="w-full mt-3"
          variant="default"
          onClick={handleLogin}
          disabled={loading}
        >
          Login
        </Button>
        <Button
          className="w-full mt-3"
          variant="outline"
          disabled={loading}
          onClick={() => router.push("/auth/register")}
        >
          Register
        </Button>
      </div>
    </Container>
  );
};

export default LoginPage;
