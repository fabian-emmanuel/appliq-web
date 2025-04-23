import React, { startTransition } from "react";
import { Logo } from "components/Logo";
import { FeatureCard } from "components/FeatureCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, ClipboardList, TrendingUp, Calendar, BellRing, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";



export default function App() {
  const navigate = useNavigate();

  const handleSignUpClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    startTransition(() => {
      navigate("/signup-page");
    });
  };

  const handleLoginClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    startTransition(() => {
      navigate("/login-page");
    });
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <header className="border-b border-border">
        <div className="container mx-auto flex justify-between items-center py-4 px-4">
          <Logo size="sm" />
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleLoginClick}>Log In</Button>
            <Button size="sm" onClick={handleSignUpClick}>Sign Up</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Navigate your job search with confidence
              </h1>
              <p className="text-xl text-muted-foreground">
                AppliQ helps you organize, track, and optimize your job
                application process all in one professional dashboard.
              </p>
              <div className="flex gap-4 pt-4">
                <Button size="lg">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Button>
                <Button variant="outline" size="lg">Learn More</Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="aspect-video rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-border shadow-xl flex items-center justify-center p-8">
                <Logo size="xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Everything you need to manage your job applications</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              AppliQ provides all the tools you need to stay organized and in control of your job application journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              icon={<ClipboardList className="h-6 w-6" />}
              title="Application Tracking"
              description="Easily add and manage all your job applications in one place with comprehensive details and status tracking."
            />
            <FeatureCard 
              icon={<TrendingUp className="h-6 w-6" />}
              title="Analytics & Insights"
              description="Visualize your application success rates and track your job search progress with intuitive metrics."
            />
            <FeatureCard 
              icon={<Calendar className="h-6 w-6" />}
              title="Interview Management"
              description="Never miss an interview with calendar integration and timeline visualization for each application."
            />
            <FeatureCard 
              icon={<BellRing className="h-6 w-6" />}
              title="Reminders & Alerts"
              description="Set reminders for follow-ups, deadlines, and important dates to stay on top of your opportunities."
            />
            <FeatureCard 
              icon={<FileText className="h-6 w-6" />}
              title="Document Storage"
              description="Keep track of different versions of your resume, cover letters, and other application documents."
            />
            <FeatureCard 
              icon={<ArrowRight className="h-6 w-6" />}
              title="Application Workflow"
              description="Move applications through customizable stages from applied to offer, with detailed notes at each step."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-4">Ready to elevate your job search?</h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of job seekers who have streamlined their application process and landed their dream jobs with AppliQ.
          </p>
          <Button size="lg" className="min-w-[200px]">
            Create Free Account
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            No credit card required. Start tracking your applications today.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Logo size="sm" />
            <div className="mt-4 md:mt-0 text-sm text-muted-foreground">
              © {new Date().getFullYear()} AppliQ. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
