import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Logo } from "components/Logo";
import { AlertCircle, Check, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { startTransition } from "react";
import { useAuthService } from "@/services/auth-service";
import { UserRequest } from "types/User";



const SignUpPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    // const authService = useAuthService();

    const handleLoginClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        startTransition(() => {
            navigate("/login-page");
        });
    };


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<UserRequest>({
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            confirmPassword: "",
            acceptTerms: true
        }
    });

    const password = watch("password");

    // Password strength checker
    const checkPasswordStrength = (password: string) => {
        let score = 0;

        if (!password) {
            setPasswordStrength(0);
            return;
        }

        // Length check
        if (password.length > 5) score += 20;
        if (password.length > 8) score += 10;

        // Complexity checks
        if (/[A-Z]/.test(password)) score += 20; // Has uppercase
        if (/[a-z]/.test(password)) score += 15; // Has lowercase
        if (/[0-9]/.test(password)) score += 20; // Has number
        if (/[^A-Za-z0-9]/.test(password)) score += 15; // Has special char

        setPasswordStrength(Math.min(100, score));
    };

    // Check password strength on change
    React.useEffect(() => {
        checkPasswordStrength(password);
    }, [password]);

    const getPasswordStrengthLabel = () => {
        if (passwordStrength === 0) return "";
        if (passwordStrength < 40) return "Weak";
        if (passwordStrength < 70) return "Fair";
        if (passwordStrength < 90) return "Good";
        return "Strong";
    };

    const getPasswordStrengthColor = () => {
        if (passwordStrength < 40) return "bg-red-500";
        if (passwordStrength < 70) return "bg-yellow-500";
        if (passwordStrength < 90) return "bg-blue-500";
        return "bg-green-500";
    };

    // const onSubmit = async (data: FormData) => {
    //     setIsLoading(true);
    //     setError(null);

    //     // Password match check (could be done in the form validation too)
    //     if (data.password !== data.confirmPassword) {
    //         setError("Passwords do not match");
    //         setIsLoading(false);
    //         return;
    //     }

        // try {
        //     // Simulate API call
        //     await new Promise(resolve => setTimeout(resolve, 1500));
        //     console.log("Sign-Up Data:", data);

        //     // Redirect to a welcome/onboarding page or dashboard
        //     navigate("/dashboard");
        // } catch (err) {
        //     setError("There was a problem creating your account. Please try again.");
        // } finally {
        //     setIsLoading(false);
        // }

        const onSubmit = async (data: UserRequest) => {
            setIsLoading(true);
            setError(null);
        
            if (data.password !== data.confirmPassword) {
                setError("Passwords do not match");
                setIsLoading(false);
                return;
            }
            if (!data.acceptTerms) {
                setError("You must accept the Terms and Conditions to create an account.")
                setIsLoading(false);
                return;
            }
        
            try {
                const resp = await useAuthService.register(data);
                
                // if (!resp) {
                //     throw new Error('Failed to register');
                // }
        
                console.log("Registration Successful:", resp);        
                navigate("/login-page");
            } catch (err: any) {
                console.error("Error during registration:", err);
                setError(err.message || "There was a problem creating your account. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };
        

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900">
            {/* Left side with signup form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
                <Card className="w-full max-w-md shadow-lg border-0">
                    <CardHeader className="space-y-2 text-center pb-6">
                        <div className="flex justify-center mb-2 lg:hidden">
                            <Logo size="md" />
                        </div>
                        <h2 className="text-2xl font-semibold">Create your account</h2>
                        <p className="text-sm text-muted-foreground">
                            Enter your information to get started with Career Compass
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
                                <Label htmlFor="first_name">First name</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        id="first_name"
                                        className="pl-10"
                                        placeholder="John"
                                        {...register("first_name", {
                                            required: "First name is required"
                                        })}
                                        aria-invalid={errors.first_name ? "true" : "false"}
                                    />
                                </div>
                                {errors.first_name && (
                                    <p className="text-sm text-red-500 mt-1">{errors.first_name.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="last_name">Last name</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        id="last_name"
                                        className="pl-10"
                                        placeholder="Doe"
                                        {...register("last_name", {
                                            required: "Last name is required"
                                        })}
                                        aria-invalid={errors.last_name ? "true" : "false"}
                                    />
                                </div>
                                {errors.last_name && (
                                    <p className="text-sm text-red-500 mt-1">{errors.last_name.message}</p>
                                )}
                            </div>


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
                                <Label htmlFor="password">
                                    Password
                                    {passwordStrength > 0 && (
                                        <span className={`ml-2 text-xs font-medium ${
                                            passwordStrength < 40 ? 'text-red-500' :
                                                passwordStrength < 70 ? 'text-yellow-500' :
                                                    passwordStrength < 90 ? 'text-blue-500' : 'text-green-500'
                                        }`}>
                      {getPasswordStrengthLabel()}
                    </span>
                                    )}
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        className="pl-10 pr-10"
                                        placeholder="••••••••"
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: {
                                                value: 8,
                                                message: "Password must be at least 8 characters"
                                            }
                                        })}
                                        aria-invalid={errors.password ? "true" : "false"}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-2.5 text-muted-foreground"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                                {passwordStrength > 0 && (
                                    <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
                                        <div
                                            className={`h-1.5 rounded-full ${getPasswordStrengthColor()}`}
                                            style={{ width: `${passwordStrength}%` }}
                                        ></div>
                                    </div>
                                )}
                                {errors.password && (
                                    <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                                )}
                                {password && !errors.password && (
                                    <ul className="space-y-1 mt-2">
                                        <li className={`text-xs flex items-center ${password.length >= 8 ? 'text-green-500' : 'text-muted-foreground'}`}>
                                            <Check className={`h-3 w-3 mr-1 ${password.length >= 8 ? 'opacity-100' : 'opacity-50'}`} />
                                            At least 8 characters
                                        </li>
                                        <li className={`text-xs flex items-center ${/[A-Z]/.test(password) ? 'text-green-500' : 'text-muted-foreground'}`}>
                                            <Check className={`h-3 w-3 mr-1 ${/[A-Z]/.test(password) ? 'opacity-100' : 'opacity-50'}`} />
                                            Contains uppercase letter
                                        </li>
                                        <li className={`text-xs flex items-center ${/[0-9]/.test(password) ? 'text-green-500' : 'text-muted-foreground'}`}>
                                            <Check className={`h-3 w-3 mr-1 ${/[0-9]/.test(password) ? 'opacity-100' : 'opacity-50'}`} />
                                            Contains number
                                        </li>
                                    </ul>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        id="confirmPassword"
                                        type={showPassword ? "text" : "password"}
                                        className="pl-10"
                                        placeholder="••••••••"
                                        {...register("confirmPassword", {
                                            required: "Please confirm your password",
                                            validate: value => value === password || "Passwords do not match"
                                        })}
                                        aria-invalid={errors.confirmPassword ? "true" : "false"}
                                    />
                                </div>
                                {errors.confirmPassword && (
                                    <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>
                                )}
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="acceptTerms"
                                    {...register("acceptTerms", {
                                        required: "You must accept the terms to continue"
                                    })}
                                />
                                <Label htmlFor="acceptTerms" className="text-sm font-normal">
                                    I agree to the{" "}
                                    <Link to="/terms" className="text-primary hover:underline">
                                        Terms of Service
                                    </Link>{" "}
                                    and{" "}
                                    <Link to="/privacy" className="text-primary hover:underline">
                                        Privacy Policy
                                    </Link>
                                </Label>
                            </div>
                            {errors.acceptTerms && (
                                <p className="text-sm text-red-500 mt-1">{errors.acceptTerms.message}</p>
                            )}
                        </CardContent>

                        <CardFooter className="flex flex-col space-y-4">
                            <Button
                                type="submit"
                                className="w-full"
                                size="lg"
                                disabled={isLoading}
                            >
                                {isLoading ? "Creating account..." : "Create account"}
                            </Button>

                            <div className="text-sm text-center text-muted-foreground">
                                Already have an account?{" "}
                                <button
                                    onClick={handleLoginClick}
                                    className="text-primary font-medium hover:underline"
                                >
                                    Log in
                                </button>
                            </div>
                        </CardFooter>
                    </form>
                </Card>
            </div>

            {/* Right side with background and content */}
            <div className="hidden lg:flex lg:w-1/2 bg-linear-to-r from-indigo-600 to-blue-500 flex-col justify-center items-center p-12 text-white">
                <div className="max-w-md">
                    <Logo size="lg" className="mb-8" />
                    <h1 className="text-4xl font-bold mb-6">Start your career journey</h1>
                    <p className="text-lg opacity-90 mb-8">
                        Create an account to track your job applications, manage interviews, and get insights to help you land your dream job.
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/10 p-4 rounded-lg backdrop-blur-xs">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-3">
                                <Check className="w-6 h-6" />
                            </div>
                            <h3 className="font-medium mb-1">Application Tracking</h3>
                            <p className="text-sm opacity-80">Keep all your applications organized in one place</p>
                        </div>

                        <div className="bg-white/10 p-4 rounded-lg backdrop-blur-xs">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-3">
                                <Check className="w-6 h-6" />
                            </div>
                            <h3 className="font-medium mb-1">Interview Prep</h3>
                            <p className="text-sm opacity-80">Practice with industry-specific questions</p>
                        </div>

                        <div className="bg-white/10 p-4 rounded-lg backdrop-blur-xs">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-3">
                                <Check className="w-6 h-6" />
                            </div>
                            <h3 className="font-medium mb-1">Career Insights</h3>
                            <p className="text-sm opacity-80">Get personalized recommendations</p>
                        </div>

                        <div className="bg-white/10 p-4 rounded-lg backdrop-blur-xs">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-3">
                                <Check className="w-6 h-6" />
                            </div>
                            <h3 className="font-medium mb-1">Resume Builder</h3>
                            <p className="text-sm opacity-80">Create and manage professional resumes</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;