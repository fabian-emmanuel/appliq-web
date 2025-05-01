import React, {startTransition, useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Checkbox} from "@/components/ui/checkbox";
import {Logo} from "components/Logo";
import {AlertCircle, Eye, EyeOff, Lock, Mail} from "lucide-react";
import {useForm} from "react-hook-form";
import {useAuthContext} from '@/contexts/AuthContext';
import {LoginForm} from "@/types/Auth.ts";
import {useAuthService} from "@/services/auth-service.ts";
import {FaGithub as Github, FaGoogle as Google} from 'react-icons/fa';


const LoginPage = () => {

    const {setToken} = useAuthContext();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const handleSignUpClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        startTransition(() => {
            navigate("/signup-page");
        });
    };

    const {register, handleSubmit, formState: {errors}} = useForm<LoginForm>({
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false
        }
    });

    const onSubmit = async (data: LoginForm) => {
        setIsLoading(true);
        setError(null);

        try {
            console.log("Calling login API...");
            const response = await useAuthService.login(data);
            console.log("Login API response:", response);

            if (response && response.accessToken) {
                const userData = await setToken(response.accessToken);

                if (userData) {
                    navigate("/dashboard");
                } else {
                    setError("Failed to load user data. Please try again.");
                }
            } else {
                console.error("Missing access token in response:", response);
                setError("Invalid response from server. Please try again.");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("Invalid email or password. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900">
            {/* Left side with background and branding */}
            <div
                className="hidden lg:flex lg:w-1/2 bg-linear-to-r from-blue-500 to-indigo-600 flex-col justify-center items-center p-12 text-white">
                <div className="max-w-md">
                    <Logo size="lg" className="mb-8"/>
                    <h1 className="text-4xl font-bold mb-6">Welcome back!</h1>
                    <p className="text-lg opacity-90 mb-8">
                        Log in to access your AppliQ dashboard and continue managing your job applications.
                    </p>
                    <div className="bg-white/10 p-6 rounded-lg backdrop-blur-xs">
                        <p className="italic text-sm mb-4">"AppliQ has helped me organize my job applications and help
                            manage interviews for my dream companies."</p>
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
                            <Logo size="md"/>
                        </div>
                        <h2 className="text-2xl font-semibold">Log in to your account</h2>
                        <p className="text-sm text-muted-foreground">
                            Enter your email and password to access your dashboard
                        </p>
                    </CardHeader>

                    {error && (
                        <div
                            className="mx-6 mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md flex items-center text-sm">
                            <AlertCircle className="h-4 w-4 mr-2"/>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email address</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground"/>
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
                                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground"/>
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        className="pl-10 pr-10"
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
                                    <button
                                        type="button"
                                        className="absolute right-3 top-2.5 text-muted-foreground hover:cursor-pointer"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5"/>
                                        ) : (
                                            <Eye className="h-5 w-5"/>
                                        )}
                                    </button>
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
                            <Button
                                type="submit"
                                className="w-full hover:cursor-pointer"
                                size="lg"
                                disabled={isLoading}
                            >
                                {isLoading ? "Signing in..." : "Sign in"}
                            </Button>

                            <div className="mt-6">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-700"></div>
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="dark:bg-slate-950 px-2 text-gray-400">Or continue with</span>
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-2 gap-4">
                                    <Button
                                        variant="outline"
                                        className="border-gray-700 bg-[#333333] hover:bg-gray-700 hover:cursor-pointer"
                                    >
                                        <Github className="mr-2 h-4 w-4"/>
                                        GitHub
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="border-gray-700 bg-[#333333] hover:bg-gray-700 hover:cursor-pointer"
                                    >
                                        <Google className="mr-2 h-4 w-4"/>

                                        Google
                                    </Button>
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter className="flex flex-col space-y-4">

                            <div className="text-sm text-center text-muted-foreground">
                                Don't have an account?{" "}
                                <button onClick={handleSignUpClick}
                                        className="text-primary font-medium hover:underline hover:cursor-pointer">
                                    Sign up
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