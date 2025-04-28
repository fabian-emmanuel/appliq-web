import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Logo} from "components/Logo";
import {Button} from "@/components/ui/button";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {useTheme} from "@/components/hooks/use-theme";
import {Home, Briefcase, Settings, LogOut, Menu, Sun, Moon, Laptop} from "lucide-react";
import {useAuthContext} from '@/contexts/AuthContext';
import {getInitials} from "utils/StringUtil.ts";
import {LoadingSpinner} from "components/SuspenseWrapper.tsx";

interface Props {
    children: React.ReactNode;
}

// Define navigation items
const navItems = [
    {name: "Overview", href: "/dashboard", icon: Home},
    {name: "Applications", href: "/applications", icon: Briefcase},
    {name: "Settings", href: "/settings", icon: Settings},
];

export function DashboardLayout({children}: Props) {
    const navigate = useNavigate();
    const {theme, setTheme} = useTheme();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const {user, logout, isLoading} = useAuthContext();

    // Check if user data is loaded
    useEffect(() => {
        if (!user && !isLoading) {
            navigate("/login-page");
            return;
        }

    }, [user, isLoading, navigate]);

    // If still loading or no user data, show loading spinner
    if (isLoading || !user) {
        return (<LoadingSpinner/>);
    }


    const handleLogout = () => {
        // Placeholder for logout logic
        console.log("Logout clicked");
        logout();
        navigate("/login-page");
    };

    const ThemeToggleButton = () => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Sun
                        className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
                    <Moon
                        className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme('light')}>
                    <Sun className="mr-2 h-4 w-4"/>
                    <span>Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                    <Moon className="mr-2 h-4 w-4"/>
                    <span>Dark</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>
                    <Laptop className="mr-2 h-4 w-4"/>
                    <span>System</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );

    interface SidebarProps {
        navigate: ReturnType<typeof useNavigate>;
    }

    const SidebarContent = ({navigate}: SidebarProps) => (
        <div className="flex h-full flex-col">
            <div className="flex h-16 items-center border-b px-4 shrink-0">
                <Logo size="sm"/>
            </div>
            <nav className="flex-1 overflow-y-auto py-4 space-y-1 px-2">
                {navItems.map((item) => (
                    <Button
                        key={item.name}
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => {
                            navigate(item.href);
                            setMobileMenuOpen(false); // Close mobile menu on navigation
                        }}
                    >
                        <item.icon className="mr-3 h-5 w-5"/>
                        {item.name}
                    </Button>
                ))}
            </nav>
            <div className="mt-auto border-t p-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="w-full justify-start px-2">
                            <Avatar className="h-8 w-8 mr-2">
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
                                <AvatarFallback>{getInitials(`${user.first_name} ${user.last_name}`)}</AvatarFallback> {/* Placeholder Initials */}
                            </Avatar>
                            <span
                                className="truncate">{user.first_name} {user.last_name}</span> {/* Placeholder Name */}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 mb-2" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">{user.first_name} {user.last_name}</p>
                                <p className="text-xs leading-none text-muted-foreground">
                                    {user.email} {/* Placeholder Email */}
                                </p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem onClick={() => navigate('/settings')}>
                            <Settings className="mr-2 h-4 w-4"/>
                            <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem onClick={handleLogout}>
                            <LogOut className="mr-2 h-4 w-4"/>
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );


    return (
        <div className="flex min-h-screen w-full">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block lg:w-64 border-r bg-background">
                <SidebarContent navigate={navigate}/>
            </aside>

            {/* Mobile Menu & Main Content */}
            <div className="flex flex-1 flex-col">
                <header
                    className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-4 lg:justify-end">
                    {/* Mobile Menu Button */}
                    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                        <SheetTrigger asChild className="lg:hidden">
                            <Button variant="outline" size="icon">
                                <Menu className="h-6 w-6"/>
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-64 p-0">
                            <SidebarContent navigate={navigate}/>
                        </SheetContent>
                    </Sheet>

                    {/* Header Right Side (Theme Toggle) */}
                    <ThemeToggleButton/>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
