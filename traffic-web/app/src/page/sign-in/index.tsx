import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/api/auth";
import Link from "next/link";

export default function LoginForm() {
  const { signIn: signInMutation, isPending } = useAuth();
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    phoneNumber: "",
    password: "",
  });

  const validate = () => {
    let isValid = true;
    const newErrors = { phoneNumber: "", password: "" };

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required.";
      isValid = false;
    } else if (!/^0\d{9}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber =
        "Enter a valid 10-digit phone number (e.g., 0914723564).";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear errors as user types
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const Auth = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      signInMutation(formData);
    }
  };

  return (
    <>
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your mobile & password below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={Auth}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="phoneNumber">Mobile</Label>
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-lg">
                    <img
                      src="/flag/et.svg"
                      width={24}
                      height={24}
                      alt="Ethiopia"
                    />
                  </div>
                  <Input
                    name="phoneNumber"
                    type="text"
                    placeholder="07XXXXXXXX or 09XXXXXXXX"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={`${
                      errors.phoneNumber && "border-red-500 bg-red-50"
                    }`}
                  />
                </div>
                {errors.phoneNumber && (
                  <p className="text-sm text-red-500">{errors.phoneNumber}</p>
                )}
              </div>
              <div className="grid gap-2 mt-4">
                <div className="flex items-center ">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  name="password"
                  type="password"
                  placeholder="*********"
                  value={formData.password}
                  onChange={handleChange}
                  className={`${errors.password && "border-red-500 bg-red-50"}`}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full mt-4"
                disabled={isPending}
              >
                {isPending ? <>Signing in...</> : <>Sign In</>}
              </Button>
              <div className="text-center text-sm mt-4">
                Don&apos;t have an account?{" "}
                <Link
                  href="/sign-up"
                  className="text-[#E30074] font-medium hover:underline"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
