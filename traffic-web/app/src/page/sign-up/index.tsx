"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { userManipulation } from "@/hooks/api/users";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUp() {
  const { createUser, isCreating } = userManipulation();
  const router = useRouter();

  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
    roleId: "0f8850e9-9b1a-4356-8e3e-fb663349e1c5",
  });

  const [errors, setErrors] = useState({
    phoneNumber: "",
    password: "",
  });

  const validate = () => {
    let isValid = true;
    const newErrors = {
      phoneNumber: "",
      password: "",
    };

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
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
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
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      await createUser({
        id: "",
        phoneNumber: formData.phoneNumber,
        password: formData.password,
        roleId: formData.roleId,
      });
      router.push("/sign-in");
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="text-2xl">Sign-Up</CardTitle>
        <CardDescription>
          Enter your mobile number & create a password to sign up
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="phoneNumber">Mobile</Label>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-lg">
                <img src="/flag/et.svg" width={24} height={24} alt="Ethiopia" />
              </div>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                placeholder="07XXXXXXXX or 09XXXXXXXX"
                value={formData.phoneNumber}
                className={errors.phoneNumber && "border-red-500 bg-red-50"}
                onChange={handleChange}
              />
            </div>
            {errors.phoneNumber && (
              <span className="text-red-500 text-sm">{errors.phoneNumber}</span>
            )}
          </div>

          <div className="grid gap-2 mt-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              className={errors.password && "border-red-500 bg-red-50"}
              onChange={handleChange}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password}</span>
            )}
          </div>

          <Button type="submit" className="w-full mt-4" disabled={isCreating}>
            {isCreating ? "Registering..." : "Register"}
          </Button>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-[#E30074] font-medium hover:underline"
            >
              Sign in
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
