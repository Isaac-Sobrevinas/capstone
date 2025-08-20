"use client";

import Container from "@/components/containers/container";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RegisterPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      setEmailError("Email is required");
      setPasswordError("Password is required");
      setConfirmPasswordError("Confirm Password is required");
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
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
        <h1 className="mb-6 text-center">REGISTER</h1>
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
        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm Password"
          className="mb-3"
          value={confirmPassword}
          error={confirmPasswordError}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setConfirmPassword(e.target.value);
            setConfirmPasswordError("");
          }}
          hasError={!!confirmPasswordError}
        />

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <Button
          className="w-full mt-3"
          disabled={loading}
          onClick={handleRegister}
        >
          Register
        </Button>
        <div className="text-center mt-3">
          <Link href="/auth">
            Go Back
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default RegisterPage;
