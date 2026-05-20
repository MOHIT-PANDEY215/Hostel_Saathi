'use client'
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Building2, CheckCircle, Users, ClipboardList, TrendingUp, Shield, Bell, Calendar, FileText, Zap, Clock, Lock } from 'lucide-react';

export default function FeaturesPage() {
  const router = useRouter();

  const features = [
    {
      icon: ClipboardList,
      title: 'Complete Issue Tracking',
      description: 'Track issues from reporting to resolution with 9-state workflow system',
      benefits: [
        'Real-time status updates',
        'Visual workflow stepper',
        'Timeline of all actions',
        'Priority-based routing',
      ],
    },
    {
      icon: Users,
      title: 'Smart Room Management',
      description: 'Efficient bed allocation with drag-and-drop interface',
      benefits: [
        'Visual occupancy tracking',
        'Drag & drop assignment',
        'Bed-level management',
        'Vacancy indicators',
      ],
    },
    {
      icon: TrendingUp,
      title: 'Analytics & Dashboards',
      description: 'Comprehensive data visualization with charts and KPIs',
      benefits: [
        'Real-time metrics',
        'Custom reports',
        'Trend analysis',
        'Performance tracking',
      ],
    },
    {
      icon: Shield,
      title: 'Role-Based Access Control',
      description: 'Secure access for Students, Wardens, Workers, and Admins',
      benefits: [
        'Granular permissions',
        'Multi-level hierarchy',
        'Secure authentication',
        'Activity logging',
      ],
    },
    {
      icon: Bell,
      title: 'Smart Notifications',
      description: 'Stay updated with real-time notifications',
      benefits: [
        'Email notifications',
        'Push alerts',
        'Status updates',
        'Custom preferences',
      ],
    },
    {
      icon: Calendar,
      title: 'Task Management',
      description: 'Organize and track maintenance tasks efficiently',
      benefits: [
        'Worker assignment',
        'Deadline tracking',
        'Progress monitoring',
        'Proof of completion',
      ],
    },
    {
      icon: FileText,
      title: 'Detailed Reports',
      description: 'Generate comprehensive reports for analysis',
      benefits: [
        'Custom date ranges',
        'Export functionality',
        'Multiple formats',
        'Automated reports',
      ],
    },
    {
      icon: Zap,
      title: 'Fast & Responsive',
      description: 'Lightning-fast performance on all devices',
      benefits: [
        'Mobile optimized',
        'Quick load times',
        'Smooth animations',
        'Offline support',
      ],
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Access your system anytime, anywhere',
      benefits: [
        'Cloud-based',
        'High uptime',
        'Auto backups',
        'Data recovery',
      ],
    },
    {
      icon: Lock,
      title: 'Enterprise Security',
      description: 'Bank-level security for your data',
      benefits: [
        'Data encryption',
        'Secure storage',
        'Regular audits',
        'Compliance ready',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-semibold text-foreground mb-6">
            Powerful Features for<br />Modern Hostels
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Everything you need to manage your hostel efficiently, all in one place
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-border hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <Card className="border-border bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-semibold text-foreground mb-4">
                Ready to Transform Your Hostel Management?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Get started today and experience the difference
              </p>
              <div className="flex items-center justify-center gap-4">
                <Button
                  size="lg"
                  onClick={() => router.push('/get-started')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white h-12 px-8"
                >
                  Get Started Free
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => router.push('/contact')}
                  className="h-12 px-8"
                >
                  Contact Sales
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
                Modern hostel management platform
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
