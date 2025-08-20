"use client";

import Container from "@/components/containers/container";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import authService from "@/features/auth/api/authService";

const RegisterPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [employeeIdError, setEmployeeIdError] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword || !employeeId) {
      if (!email) setEmailError("Email is required");
      if (!password) setPasswordError("Password is required");
      if (!confirmPassword) setConfirmPasswordError("Confirm Password is required");
      if (!employeeId) setEmployeeIdError("Employee ID is required");
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await authService.register(email, password, employeeId);

      // Optional: auto-login by saving token
      if (res.token) {
        localStorage.setItem("token", res.token);
      }

      router.push("/auth"); // redirect to login page
    } catch (err: any) {
      setError(err.message || "Something went wrong");
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

        <Input
          label="Employee ID"
          type="text"
          placeholder="Employee ID"
          className="mb-3"
          value={employeeId}
          error={employeeIdError}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEmployeeId(e.target.value);
            setEmployeeIdError("");
          }}
          hasError={!!employeeIdError}
        />

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <Button
          className="w-full mt-3"
          disabled={loading}
          onClick={handleRegister}
        >
          {loading ? "Registering..." : "Register"}
        </Button>

        <div className="text-center mt-3">
          <Link href="/auth">Go Back</Link>
        </div>
      </div>
    </Container>
  );
};

export default RegisterPage;
