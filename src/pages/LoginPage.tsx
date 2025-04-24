import React, {startTransition, useEffect, useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Logo } from "components/Logo";
import { AlertCircle, Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";

type FormData = {
    email: string;
    password: string;
    rememberMe: boolean;
};

const LoginPage = () => {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const handleSignUpClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        startTransition(() => {
            navigate("/signup-page");
        });
    };

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false
        }
    });

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        setError(null);

        try {
            // Simulating API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log("Login Data:", data);

            // If login successful, redirect to dashboard
            navigate("/dashboard");
        } catch (err) {
            setError("Invalid email or password. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900">
            {/* Left side with background and branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-linear-to-r from-blue-500 to-indigo-600 flex-col justify-center items-center p-12 text-white">
                <div className="max-w-md">
                    <Logo size="lg" className="mb-8" />
                    <h1 className="text-4xl font-bold mb-6">Welcome back!</h1>
                    <p className="text-lg opacity-90 mb-8">
                        Log in to access your AppliQ dashboard and continue tracking your job applications.
                    </p>
                    <div className="bg-white/10 p-6 rounded-lg backdrop-blur-xs">
                        <p className="italic text-sm mb-4">"AppliQ has helped me organize my job applications and help manage interviews for my dream companies."</p>
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-white/20 mr-3"></div>
                            <div>
                                <p className="font-medium">Sarah Johnson</p>
                                <p className="text-xs opacity-80">Software Engineer @ Google</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side with login form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
                <Card className="w-full max-w-md shadow-lg border-0">
                    <CardHeader className="space-y-2 text-center pb-6">
                        <div className="flex justify-center mb-2 lg:hidden">
                            <Logo size="md" />
                        </div>
                        <h2 className="text-2xl font-semibold">Log in to your account</h2>
                        <p className="text-sm text-muted-foreground">
                            Enter your email and password to access your dashboard
                        </p>
                    </CardHeader>

                    {error && (
                        <div className="mx-6 mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md flex items-center text-sm">
                            <AlertCircle className="h-4 w-4 mr-2" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email address</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        className="pl-10"
                                        placeholder="name@example.com"
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address"
                                            }
                                        })}
                                        aria-invalid={errors.email ? "true" : "false"}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Password</Label>
                                    <Link
                                        to="/forgot-password"
                                        className="text-xs text-primary hover:underline"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        type="password"
                                        className="pl-10"
                                        placeholder="••••••••"
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: {
                                                value: 6,
                                                message: "Password must be at least 6 characters"
                                            }
                                        })}
                                        aria-invalid={errors.password ? "true" : "false"}
                                    />
                                </div>
                                {errors.password && (
                                    <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                                )}
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox id="rememberMe" {...register("rememberMe")} />
                                <Label htmlFor="rememberMe" className="text-sm font-normal">
                                    Remember me for 30 days
                                </Label>
                            </div>
                        </CardContent>

                        <CardFooter className="flex flex-col space-y-4">
                            <Button
                                type="submit"
                                className="w-full"
                                size="lg"
                                disabled={isLoading}
                            >
                                {isLoading ? "Signing in..." : "Sign in"}
                            </Button>

                            <div className="text-sm text-center text-muted-foreground">
                                Don't have an account?{" "}
                                <button onClick={handleSignUpClick} className="text-primary font-medium hover:underline">
                                    Create an account
                                </button>
                            </div>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default LoginPage;