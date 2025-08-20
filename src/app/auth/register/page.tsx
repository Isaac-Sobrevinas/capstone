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
  // const [employeeId, setEmployeeId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  // const [employeeIdError, setEmployeeIdError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    console.log("Registering...");
    email.trim();
    password.trim();
    confirmPassword.trim();
    firstName.trim();
    lastName.trim();

    if (!email || !password || !confirmPassword || !firstName || !lastName) {
      if (!email) setEmailError("Email is required");
      if (!password) setPasswordError("Password is required");
      if (!confirmPassword)
        setConfirmPasswordError("Confirm Password is required");
      // if (!employeeId) setEmployeeIdError("Employee ID is required");
      if (!firstName) setFirstNameError("First Name is required");
      if (!lastName) setLastNameError("Last Name is required");

      if (password) {
        if (password.length < 6) {
          setPasswordError("Password must be at least 6 characters");
          return;
        }
        if (!/[A-Z]/.test(password)) {
          setPasswordError(
            "Password must contain at least one uppercase letter"
          );
          return;
        }
        if (!/[a-z]/.test(password)) {
          setPasswordError(
            "Password must contain at least one lowercase letter"
          );
          return;
        }
        if (!/[0-9]/.test(password)) {
          setPasswordError("Password must contain at least one number");
          return;
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
          setPasswordError(
            "Password must contain at least one special character"
          );
          return;
        }
      }
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    setError("");
    setLoading(true);
    try {
      const res = await authService.register(
        email,
        password,
        firstName,
        lastName
      );

      // Optional: auto-login by saving token
      if (res.token) {
        localStorage.setItem("token", res.token);
      }

      setSuccess("Successfully registered!");
      await new Promise((resolve) => setTimeout(resolve, 3000));
      router.replace("/auth"); // redirect to login page
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
        <div className="flex w-full gap-3">
          <Input
            type="text"
            placeholder="First Name"
            value={firstName}
            error={firstNameError}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setFirstName(e.target.value);
              setFirstNameError("");
            }}
            hasError={!!firstNameError}
            className="mb-3 w-full"
            label="First Name"
          />
          <Input
            type="text"
            placeholder="Last Name"
            value={lastName}
            error={lastNameError}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setLastName(e.target.value);
              setLastNameError("");
            }}
            hasError={!!lastNameError}
            className="mb-3 w-full"
            label="Last Name"
          />
        </div>
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

        {/* <Input
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
        /> */}

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4 font-medium text-center">{success}</p>}

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
