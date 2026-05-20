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
    <div className="min-h-screen bg-background w-full">
      {/* Navbar */}
      <nav className="border-b border-border bg-card sticky top-0 z-50">
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
      {/* <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
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
      </section> */}
      {/* Product Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-foreground mb-4">
              Built for Modern hostels
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built with role-based dashboards, issue tracking workflows,
              analytics, and room management systems used by hostel administrators.
            </p>
          </div>

          <div className="rounded-3xl border bg-card shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-[260px_1fr] min-h-[650px]">

              {/* Sidebar */}
              <div className="border-r bg-muted/40 p-6">
                <div className="space-y-3">
                  {[
                    'Dashboard',
                    'Complaints',
                    'Room Allocation',
                    'Workers',
                    'Students',
                    'Analytics',
                    'Settings',
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={`rounded-xl px-4 py-3 text-sm font-medium transition ${i === 0
                          ? 'bg-indigo-600 text-white'
                          : 'hover:bg-muted text-muted-foreground'
                        }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-10 rounded-2xl bg-indigo-600 p-5 text-white">
                  <p className="text-sm opacity-80">Monthly Resolution Rate</p>
                  <h3 className="text-3xl font-bold mt-2">92%</h3>
                </div>
              </div>

              {/* Main Content */}
              <div className="p-6 space-y-6">

                {/* Stats */}
                <div className="grid md:grid-cols-4 gap-4">
                  {[
                    ['Active Students', '480'],
                    ['Open Issues', '24'],
                    ['Workers Assigned', '16'],
                    ['Occupancy', '94%'],
                  ].map(([title, value]) => (
                    <Card key={title}>
                      <CardHeader className="pb-2">
                        <CardDescription>{title}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-3xl font-semibold">{value}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Complaint Table */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Complaints</CardTitle>
                    <CardDescription>
                      Live issue tracking with worker assignment
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-4">
                      {[
                        ['Water leakage in Room 203', 'Assigned', 'High'],
                        ['WiFi not working in Block B', 'In Progress', 'Medium'],
                        ['Fan replacement needed', 'Resolved', 'Low'],
                      ].map(([issue, status, priority], i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between rounded-xl border p-4"
                        >
                          <div>
                            <p className="font-medium">{issue}</p>
                            <p className="text-sm text-muted-foreground">
                              Complaint ID #{1024 + i}
                            </p>
                          </div>

                          <div className="flex items-center gap-3">
                            <Badge variant="secondary">{priority}</Badge>

                            <Badge
                              className={
                                status === 'Resolved'
                                  ? 'bg-green-500 text-white'
                                  : status === 'In Progress'
                                    ? 'bg-yellow-500 text-white'
                                    : 'bg-blue-500 text-white'
                              }
                            >
                              {status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Bottom Grid */}
                <div className="grid md:grid-cols-2 gap-6">

                  <Card>
                    <CardHeader>
                      <CardTitle>Room Occupancy</CardTitle>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-4">
                        {[
                          ['Block A', '96%'],
                          ['Block B', '92%'],
                          ['Block C', '88%'],
                        ].map(([block, val]) => (
                          <div key={block}>
                            <div className="flex justify-between mb-2 text-sm">
                              <span>{block}</span>
                              <span>{val}</span>
                            </div>

                            <div className="h-2 rounded-full bg-muted overflow-hidden">
                              <div
                                className="h-full bg-indigo-600 rounded-full"
                                style={{ width: val }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Assigned Workers</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {[
                        ['Rahul Kumar', 'Electrical'],
                        ['Amit Singh', 'Plumbing'],
                        ['Sanjay Das', 'Maintenance'],
                      ].map(([name, dept]) => (
                        <div
                          key={name}
                          className="flex items-center justify-between"
                        >
                          <div>
                            <p className="font-medium">{name}</p>
                            <p className="text-sm text-muted-foreground">{dept}</p>
                          </div>

                          <Badge variant="outline">Active</Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                </div>
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
