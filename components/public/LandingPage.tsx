'use client'
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Building2, Users, CheckCircle, ClipboardList, TrendingUp, Shield, ArrowRight, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  const features = [
    {
      icon: ClipboardList,
      title: 'Issue Tracking',
      description: 'Complete lifecycle management from reporting to resolution with real-time status updates',
    },
    {
      icon: Users,
      title: 'Room Management',
      description: 'Efficient bed allocation with drag-and-drop interface and visual occupancy tracking',
    },
    {
      icon: TrendingUp,
      title: 'Analytics & Reports',
      description: 'Comprehensive dashboards with charts and KPIs for data-driven decisions',
    },
    {
      icon: Shield,
      title: 'Role-Based Access',
      description: 'Secure access control for Students, Wardens, Workers, and Administrators',
    },
  ];

  const steps = [
    {
      number: '1',
      title: 'Create Organization',
      description: 'Sign up as Super Admin and set up your hostel organization',
    },
    {
      number: '2',
      title: 'Add Wardens',
      description: 'Create warden accounts to manage hostel operations',
    },
    {
      number: '3',
      title: 'Manage Students & Workers',
      description: 'Onboard students and assign workers to maintain facilities',
    },
    {
      number: '4',
      title: 'Track Issues',
      description: 'Monitor and resolve issues with complete workflow visibility',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-semibold text-foreground">HostelSaathi</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => router.push('/features')}>
                Features
              </Button>
              <Button variant="ghost" onClick={() => router.push('/about')}>
                About
              </Button>
              <Button variant="ghost" onClick={() => router.push('/contact')}>
                Contact
              </Button>
              <Button variant="outline" onClick={() => router.push('/login')}>
                Login
              </Button>
              <Button onClick={() => router.push('/get-started')} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-4 bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400">
            <Sparkles className="w-3 h-3 mr-1" />
            Modern Hostel Management
          </Badge>
          <h1 className="text-5xl font-semibold text-foreground mb-6">
            Hostel Management<br />Made Simple
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Complete role-based workflow for hostel administration. From issue tracking to room allocation, manage everything in one place.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => router.push('/get-started')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white h-12 px-8"
            >
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => router.push('/login')}
              className="h-12 px-8"
            >
              Login
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Already have credentials? <button onClick={() => router.push('/login')} className="text-indigo-600 dark:text-indigo-400 hover:underline">Sign in here</button>
          </p>
        </div>
      </section>

      {/* Product Preview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-foreground mb-4">
              Built for Modern Hostels
            </h2>
            <p className="text-lg text-muted-foreground">
              Clean, intuitive interface designed for efficiency
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-2 shadow-xl">
            <div className="aspect-video bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-xl flex items-center justify-center">
              <div className="grid grid-cols-3 gap-4 w-full max-w-4xl p-8">
                <Card className="border-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Total Issues</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-semibold">24</p>
                  </CardContent>
                </Card>
                <Card className="border-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Occupancy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-semibold">94%</p>
                  </CardContent>
                </Card>
                <Card className="border-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Active Tasks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-semibold">12</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Get started in four simple steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <Card key={index} className="border-border">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center mb-4">
                    <span className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400">
                      {step.number}
                    </span>
                  </div>
                  <CardTitle>{step.title}</CardTitle>
                  <CardDescription>{step.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-foreground mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive features for complete hostel management
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-border">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Card className="border-border bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-semibold text-foreground mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join organizations using HostelSaathi to streamline their hostel operations
              </p>
              <div className="flex items-center justify-center gap-4">
                <Button
                  size="lg"
                  onClick={() => router.push('/get-started')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white h-12 px-8"
                >
                  Create Organization
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => router.push('/login')}
                  className="h-12 px-8"
                >
                  Sign In
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold text-foreground">HostelSaathi</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Modern hostel management platform for educational institutions
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => router.push('/features')} className="text-sm text-muted-foreground hover:text-foreground">
                    Features
                  </button>
                </li>
                <li>
                  <button onClick={() => router.push('/about')} className="text-sm text-muted-foreground hover:text-foreground">
                    About
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => router.push('/contact')} className="text-sm text-muted-foreground hover:text-foreground">
                    Contact
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <button className="text-sm text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button className="text-sm text-muted-foreground hover:text-foreground">
                    Terms of Service
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © 2026 HostelSaathi. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
