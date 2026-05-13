"use client";

import Link from "next/link";
import {
    Button,
    Card,
    Description,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
} from "@heroui/react";

import { Check } from "@gravity-ui/icons";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import toast from "react-hot-toast";

function LogInForm() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const router = useRouter()
    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const formData = new FormData(e.currentTarget);
        const userDAta = Object.fromEntries(formData.entries())
        console.log(userDAta)
        const { data, error } = await authClient.signIn.email({
            email: userDAta.email, // required
            password: userDAta.password, // required
            rememberMe: true,
        });

        if (data) {
            router.push('/')
            toast.success("Log in success")
            setLoading(false)
            router.refresh()
        }

        if (error) {
            setError(error.message)
            setLoading(false)
        }
    };

    const handleGoogleLogin = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
        });
        if (data) {
            router.push('/')
            toast.success("Log in success")
            setLoading(false)
        }
    };

    return (
        <div className="min-h-screen  flex items-center justify-center px-4">
            <Card className="w-full max-w-md backdrop-blur-md border border-white/10 shadow-2xl rounded-3xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <p className=" text-red-400">{error}</p>
                    <h1 className="text-3xl font-bold ">
                        Welcome Back
                    </h1>

                    <p className="text-slate-400 mt-2">
                        Login to continue your journey
                    </p>
                </div>

                {/* Google Login */}
                <Button
                    onPress={handleGoogleLogin}
                    className="w-full h-12   font-semibold rounded-xl mb-6"
                >
                    <FcGoogle size={22} />
                    Continue with Google
                </Button>

                {/* Divider */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="h-[1px] flex-1 bg-slate-700"></div>
                    <span className="text-sm text-slate-400">OR</span>
                    <div className="h-[1px] flex-1 bg-slate-700"></div>
                </div>

                {/* Form */}
                <Form
                    className="flex flex-col gap-5"
                    onSubmit={onSubmit}
                >
                    {/* Email */}
                    <TextField
                        isRequired

                        type="email"
                        validate={(value) => {
                            if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                    value
                                )
                            ) {
                                return "Please enter a valid email address";
                            }

                            return null;
                        }}
                    >
                        <Label className="">
                            Email Address
                        </Label>

                        <Input
                            name="email"
                            placeholder="john@example.com"
                        />

                        <FieldError />
                    </TextField>

                    {/* Password */}
                    <TextField
                        isRequired
                        minLength={8}

                        type="password"
                        validate={(value) => {
                            if (value.length < 8) {
                                return "Password must be at least 8 characters";
                            }

                            if (!/[A-Z]/.test(value)) {
                                return "Password must contain at least one uppercase letter";
                            }

                            if (!/[0-9]/.test(value)) {
                                return "Password must contain at least one number";
                            }

                            return null;
                        }}
                    >
                        <div className="flex items-center justify-between">
                            <Label className="">
                                Password
                            </Label>

                            <button
                                type="button"
                                className="text-sm text-cyan-400 hover:text-cyan-300"
                            >
                                Forgot Password?
                            </button>
                        </div>

                        <Input
                            name="password"
                            placeholder="Enter your password"
                        />

                        <Description className="text-slate-400 text-xs">
                            Must be at least 8 characters with 1 uppercase
                            and 1 number
                        </Description>

                        <FieldError />
                    </TextField>

                    {/* Submit */}
                    <Button
                        type="submit"
                        className="w-full h-12 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl mt-2"
                    >
                        {
                            loading ? <FaSpinner className=" animate-spin" /> : <Check />
                        }
                        {
                            loading ? 'Singing' : 'Sing in'
                        }
                    </Button>
                </Form>

                {/* Register */}
                <p className="text-center text-slate-400 text-sm mt-6">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/register"
                        className="text-cyan-400 hover:text-cyan-300 font-semibold"
                    >
                        Register
                    </Link>
                </p>
            </Card>
        </div>
    );
}

export default LogInForm;