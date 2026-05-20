'use client'
import { useCallback, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Building2, ArrowRight, CheckCircle, } from 'lucide-react';
import { toast } from 'sonner';
import { Progress } from '../ui/progress';
import { usePathname, useRouter } from 'next/navigation';
import OrgForm from './OrgForm';
import HostelForm from './HostelForm';
import WardenForm from './WardenForm';
import { useOnboardingStore } from '@/stores/onboardingStore';

export default function GetStartedFlow() {
  const router = useRouter();
  // const searchParams = useSearchParams()
  const { hasOrg, hasHostel } = useOnboardingStore()

  const [step, setStep] = useState(1);


  useEffect(() => {
    if (step >= 2 && !hasOrg) setStep(1)
    if (step >= 3 && !hasHostel) setStep(2)
  }, [step])

  const progressValue = (Number(step) / 4) * 100;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="w-full max-w-2xl relative z-10">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white mb-4 shadow-lg">
            <Building2 className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-semibold text-foreground mb-2">
            {step === 1 && 'Create Your Organization'}
            {step === 2 && 'Add Hostel'}
            {step === 3 && 'Add Warden'}
            {step === 4 && 'All Set!'}
          </h1>
          <p className="text-muted-foreground">
            {step === 1 && 'Start your journey with HostelSaathi'}
            {step === 2 && 'Optional: Add your first hostel.'}
            {step === 3 && 'Optional: Add your first warden'}
            {step === 4 && 'Your system is ready to use'}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={progressValue} className="h-2" />
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span className={step >= 1 ? 'text-indigo-600 dark:text-indigo-400 font-medium' : ''}>
              Organization
            </span>
            <span className={step >= 2 ? 'text-indigo-600 dark:text-indigo-400 font-medium' : ''}>
              Hostel<br></br>(Optional)
            </span>
            <span className={step >= 3 ? 'text-indigo-600 dark:text-indigo-400 font-medium' : ''}>
              Warden<br></br>(Optional)
            </span>
            <span className={step >= 4 ? 'text-indigo-600 dark:text-indigo-400 font-medium' : ''}>
              Complete
            </span>
          </div>
        </div>

        {/* Step 1: Create Organization */}
        {step === 1 && (
          <OrgForm setStep={setStep} />
        )}

        {/* Step 2: Hostel */}
        {step === 2 && (
          <HostelForm setStep={setStep} />
        )}
        {step === 3 && (
          <WardenForm setStep={setStep} />
        )}

        {/* Step 3: Success */}
        {step === 4 && (
          <Card className="border-border shadow-xl">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-3">
                Your System is Ready!
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                You can now access your dashboard and start managing your hostel operations
              </p>
              <Button
                onClick={() => {
                  toast.success('Welcome to HostelSaathi!');
                  router.push('/superadmin');
                }}
                size="lg"
                className="h-12 px-8 bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Go to Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Helper Text */}
        {step === 1 && (
          <Card className="mt-4 border-border bg-muted/50">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground text-center">
                <strong>Note:</strong> Warden, Worker, and Student accounts can only be created by administrators.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
