"use client";
import React, { useState } from "react";
import Link from "next/link";
import toastr from "toastr";
import { redirect } from "next/navigation";
import { signInWithGoogle, signIn } from "@/lib/auth";
import Image from "next/image";
import { email, z, ZodError } from "zod/v4";
import { UserRole } from "@/enum/user.enum";
import { userLogin } from "@/services/user.service";
import { useAuth } from "@/context/AuthContext";
import Input from "@/components/FormInput";
import Button from "@/components/CustomBotton";

//import { adminLogin } from '../services/auth.service'
type errorType = {
  email?: string;
  password?: string;
};
const Page = () => {
  const User = z.object({
    email: z.string().min(1, { message: "Email is required" }).email(),
    password: z
      .string()
      .min(8)
      .regex(/[A-Z]/, "Must include an uppercase letter")
      .regex(/[a-z]/, "Must include a lowercase letter")
      .regex(/[0-9]/, "Must include a number"),
  });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<errorType>({});
  const { login } = useAuth();

  const handleSubmit = async () => {
    try {
      User.parse(formData);
      const response = await signIn(formData.email, formData.password);
      console.log(response.email);
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        setErrors(error.flatten().fieldErrors);
        return false;
      }
    }

    // const response = await userLogin({
    //   email: formData.email,
    //   password: formData.password,
    // });

    // if (response.error) {
    //   const showErrorToast = () => {
    //     toastr.error(response.error.message, "", {
    //       closeButton: true,
    //       debug: false,
    //       newestOnTop: false,
    //       progressBar: true,
    //       positionClass: "toast-top-right",
    //       preventDuplicates: false,
    //       showDuration: 300,
    //       hideDuration: 1000,
    //       timeOut: 5000,
    //       extendedTimeOut: 1000,
    //       showEasing: "swing",
    //       hideEasing: "linear",
    //       showMethod: "fadeIn",
    //       hideMethod: "fadeOut",
    //     });
    //   };
    //   showErrorToast();
    //   setErrors(response.error.message);
    // }
    // if (response.status === 201) {
    //   login(response.user as any);
    //   toastr.success("Login successful! Redirecting to dashboard... ", "", {
    //     closeButton: true,
    //     debug: false,
    //     newestOnTop: false,
    //     progressBar: true,
    //     positionClass: "toast-top-right",
    //     preventDuplicates: false,
    //     showDuration: 300,
    //     hideDuration: 1000,
    //     timeOut: 5000,
    //     extendedTimeOut: 1000,
    //     showEasing: "swing",
    //     hideEasing: "linear",
    //     showMethod: "fadeIn",
    //     hideMethod: "fadeOut",
    //   });
    //   redirect("/admin");
    // }

    // login({
    //   name: response?.name as string,
    //   id: response?.id as number,
    //   token: response?.token as string,
    //   role: response?.role as string,
    // });
    setTimeout(() => {
      //redirect("/");
    }, 500);
  };
  const handleGoogleLogin = async () => {
    const res = await signInWithGoogle();
    function getInitial () {
        if (!res.displayName || typeof res.displayName !== "string") return "";

        const nameParts = res.displayName.trim().split(/\s+/);
        if (nameParts.length === 0) return "";

        const firstName = nameParts[0];
        const lastNameInitial = nameParts[1]?.[0] || "";

        return `${firstName}${lastNameInitial.toUpperCase()}`;
      }
    
    const user = {
      email: res.email ?? "",
      uid: res.uid,
      accessToken: await res.getIdToken(),
      role: UserRole.USER,
      username: getInitial(),
      refreshToken: res.refreshToken,
      
    };
    console.log(user);
    const loggedUser = await userLogin(user);
    if ("status" in loggedUser && loggedUser.status === 201) {
      login((loggedUser?.data));
    }
    console.log("loggedUser", loggedUser);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex justify-center items-center w-full">
        <div className="block w-[50px] h-[50px]">
          <Image
            src="/imgs/logo/logo.png"
            alt=""
            width={50}
            height={50}
            style={{ width: "50px", height: "50px" }}
          />
        </div>
        <span className="text-5xl font-bold text-primary font-playfair">
          TicketPort
        </span>
      </div>
      <div className="w-full max-w-md p-6 mt-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h1 className="mb-6 text-2xl font-bold text-center text-gray-800 dark:text-white">
          Sign in to Ticket Port
        </h1>
        <form className="mt-4">
          <div className="mb-4">
            <Input
              type="email"
              label="Email"
              placeholder="Enter your email"
              name="email"
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
              value={formData.email}
              error={
                errors.email
                  ? Array.isArray(errors.email)
                    ? errors.email
                    : [errors.email]
                  : undefined
              }
              className=""
            />
          </div>
          <div className="mb-4">
            <Input
              type="password"
              label="Password"
              placeholder="Enter your password"
              name="password"
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
              value={formData.password}
              error={
                errors.password
                  ? Array.isArray(errors.password)
                    ? errors.password
                    : [errors.password]
                  : undefined
              }
            />
          </div>
          <Link
            href="/forgot-password"
            className="text-primary hover:text-hoverEffects-gold font-bold"
          >
            Forgot password?
          </Link>
          <Button
            label="Login"
            onClick={handleSubmit}
            className="w-full bg-primary text-white hover:bg-accent hover:text-white mt-4"
          />
        </form>
        <div className="text-text-light mt-3">
          Don&apos;t have an account?
          <Link href="/register" className="text-accent hover:text-primary ">
            {" "}
            Register
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-6 w-full">
        <div className="flex items-center justify-center w-3/12 my-4">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500 font-semibold">or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <Button label={"Sign in with Google"} onClick={handleGoogleLogin} />
      </div>
    </div>
  );
};

export default Page;
