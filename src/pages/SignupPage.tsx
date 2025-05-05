import React, {useEffect, useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import {Button} from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Checkbox} from "@/components/ui/checkbox";
import {Logo} from "components/Logo";
import {
    AlertCircle,
    Check,
    Eye,
    EyeOff,
    Lock,
    Mail,
    User,
} from "lucide-react";
import {useForm} from "react-hook-form";
import {startTransition} from "react";
import {useAuthService} from "@/services/auth-service";
import {UserRequest} from "types/User";
import {getPasswordStrength, getPasswordStrengthColor, getPasswordStrengthLabel} from "utils/StringUtil.ts";
import {passwordRequirements} from "utils/RegexUtil.ts";
import {FaGithub as Github, FaGoogle as Google, FaLinkedinIn as LinkedIn} from 'react-icons/fa';


const SignUpPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);

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
        setValue,
        formState: {errors},
    } = useForm<UserRequest>({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            acceptTerms: false,
        },
    });

    const password = watch("password");

    // Check password strength on change
    React.useEffect(() => {
        setPasswordStrength(getPasswordStrength(password));
    }, [password]);


    useEffect(() => {
        register("acceptTerms", {
            required: "You must accept the terms to continue",
        });
    }, [register]);

    const onSubmit = async (data: UserRequest) => {
        setIsLoading(true);
        setError(null);

        if (data.password !== data.confirmPassword) {
            setError("Passwords do not match");
            setIsLoading(false);
            return;
        }
        if (!data.acceptTerms) {
            setError(
                "You must accept the Terms and Privacy Policy to create an account."
            );
            setIsLoading(false);
            return;
        } else {
            data.acceptTerms = true;
        }

        try {
            const resp = await useAuthService.register(data);

            console.log("Registration Successful:", resp);
            navigate("/login-page");
        } catch (err: any) {
            console.error("Error during registration:", err);
            setError(
                err.message ||
                "There was a problem creating your account. Please try again."
            );
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
                            <Logo size="md"/>
                        </div>
                        <h2 className="text-2xl font-semibold">Create your account</h2>
                        <p className="text-sm text-muted-foreground">
                            Enter your information to get started with Career Compass
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
                                <Label htmlFor="firstName">First name</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground"/>
                                    <Input
                                        id="firstName"
                                        className="pl-10"
                                        placeholder="John"
                                        {...register("firstName", {
                                            required: "First name is required",
                                        })}
                                        aria-invalid={errors.firstName ? "true" : "false"}
                                    />
                                </div>
                                {errors.firstName && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.firstName.message}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last name</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground"/>
                                    <Input
                                        id="lastName"
                                        className="pl-10"
                                        placeholder="Doe"
                                        {...register("lastName", {
                                            required: "Last name is required",
                                        })}
                                        aria-invalid={errors.lastName ? "true" : "false"}
                                    />
                                </div>
                                {errors.lastName && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.lastName.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email address</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground"/>
                                    <Input
                                        id="email"
                                        className="pl-10"
                                        placeholder="johndoe@email.com"
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address",
                                            },
                                        })}
                                        aria-invalid={errors.email ? "true" : "false"}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">
                                    Password
                                    {passwordStrength > 0 && (
                                        <span
                                            className={`ml-2 text-xs font-medium ${
                                                passwordStrength < 40
                                                    ? "text-red-500"
                                                    : passwordStrength < 70
                                                        ? "text-yellow-500"
                                                        : passwordStrength < 90
                                                            ? "text-blue-500"
                                                            : "text-green-500"
                                            }`}
                                        >
                      {getPasswordStrengthLabel(password)}
                    </span>
                                    )}
                                </Label>
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
                                                value: 8,
                                                message: "Password must be at least 8 characters",
                                            },
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
                                {passwordStrength > 0 && (
                                    <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
                                        <div
                                            className={`h-1.5 rounded-full ${getPasswordStrengthColor(password)}`}
                                            style={{width: `${passwordStrength}%`}}
                                        ></div>
                                    </div>
                                )}
                                {errors.password && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.password.message}
                                    </p>
                                )}
                                {password && !errors.password && passwordRequirements.map((requirement, index) => {
                                    const isMet = requirement.test(password);
                                    return (
                                        <li
                                            key={index}
                                            className={`text-xs flex items-center ${
                                                isMet ? "text-green-500" : "text-muted-foreground"
                                            }`}
                                        >
                                            <Check
                                                className={`h-3 w-3 mr-1 ${
                                                    isMet ? "opacity-100" : "opacity-50"
                                                }`}
                                            />
                                            {requirement.text}
                                        </li>
                                    );
                                })
                                }
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground"/>
                                    <Input
                                        id="confirmPassword"
                                        type={showPassword ? "text" : "password"}
                                        className="pl-10"
                                        placeholder="••••••••"
                                        {...register("confirmPassword", {
                                            required: "Please confirm your password",
                                            validate: (value) =>
                                                value === password || "Passwords do not match",
                                        })}
                                        aria-invalid={errors.confirmPassword ? "true" : "false"}
                                    />
                                </div>
                                {errors.confirmPassword && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.confirmPassword.message}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="acceptTerms"
                                    checked={watch("acceptTerms")}
                                    onCheckedChange={(checked) => {
                                        setValue("acceptTerms", checked == true, {
                                            shouldValidate: true,
                                        });
                                    }}
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
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.acceptTerms.message}
                                </p>
                            )}

                            <Button
                                type="submit"
                                className="w-full hover:cursor-pointer"
                                size="lg"
                                disabled={isLoading}
                            >
                                {isLoading ? "Creating account..." : "Create account"}
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

                                <div className="mt-6 grid grid-cols-3 gap-4">
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

                                    <Button
                                        variant="outline"
                                        className="border-gray-700 bg-[#333333] hover:bg-gray-700 hover:cursor-pointer"
                                    >
                                        <LinkedIn className="mr-2 h-4 w-4"/>

                                        LinkedIn
                                    </Button>
                                </div>
                            </div>

                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4">

                            <div className="text-sm text-center text-muted-foreground">
                                Already have an account?{" "}
                                <button
                                    onClick={handleLoginClick}
                                    className="text-primary font-medium hover:underline hover:cursor-pointer"
                                >
                                    Sign in
                                </button>
                            </div>
                        </CardFooter>

                    </form>
                </Card>
            </div>

            {/* Right side with background and content */}
            <div
                className="hidden lg:flex lg:w-1/2 bg-linear-to-r from-indigo-600 to-blue-500 flex-col justify-center items-center p-12 text-white">
                <div className="max-w-md">
                    <Logo size="lg" className="mb-8"/>
                    <h1 className="text-4xl font-bold mb-6">Start your career journey</h1>
                    <p className="text-lg opacity-90 mb-8">
                        Create an account to track your job applications, manage interviews,
                        and get insights to help you land your dream job.
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/10 p-4 rounded-lg backdrop-blur-xs">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-3">
                                <Check className="w-6 h-6"/>
                            </div>
                            <h3 className="font-medium mb-1">Application Tracking</h3>
                            <p className="text-sm opacity-80">
                                Keep all your applications organized in one place
                            </p>
                        </div>

                        <div className="bg-white/10 p-4 rounded-lg backdrop-blur-xs">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-3">
                                <Check className="w-6 h-6"/>
                            </div>
                            <h3 className="font-medium mb-1">Interview Prep</h3>
                            <p className="text-sm opacity-80">
                                Practice with industry-specific questions
                            </p>
                        </div>

                        <div className="bg-white/10 p-4 rounded-lg backdrop-blur-xs">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-3">
                                <Check className="w-6 h-6"/>
                            </div>
                            <h3 className="font-medium mb-1">Career Insights</h3>
                            <p className="text-sm opacity-80">
                                Get personalized recommendations
                            </p>
                        </div>

                        <div className="bg-white/10 p-4 rounded-lg backdrop-blur-xs">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-3">
                                <Check className="w-6 h-6"/>
                            </div>
                            <h3 className="font-medium mb-1">Resume Builder</h3>
                            <p className="text-sm opacity-80">
                                Create and manage professional resumes
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
