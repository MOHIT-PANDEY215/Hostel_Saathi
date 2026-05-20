'use client'
import React, { FC, SetStateAction, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { useCreateWarden } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateWardenInput, createWardenSchema, defaultWardenValues } from "@/lib/validators/auth.schema";
import { useOnboardingStore } from "@/stores/onboardingStore";

interface WardenProps {
  setStep: (value: SetStateAction<number>) => void,
}

const WardenForm: FC<WardenProps> = ({
  setStep

}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { orgId, hostelId, completeWarden } = useOnboardingStore()
  if (!orgId || !hostelId) return null;
  const { mutate: initWarden, isPending: loading } = useCreateWarden((res) => {
    completeWarden()
    setStep(4);

  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateWardenInput>({
    resolver: zodResolver(createWardenSchema),
    defaultValues: defaultWardenValues,
  });

  const onSubmit = (data: CreateWardenInput) => {
    initWarden(({ ...data, organisationId: orgId, hostelId: hostelId }));
    // setStep(4);
  };
  return (
    <>
      <Card className="border-border shadow-xl">
        <CardHeader>
          <CardTitle>Add First Warden (Optional)</CardTitle>
          <CardDescription>
            You can skip this step and add wardens later from the dashboard
          </CardDescription>
        </CardHeader>
        <CardContent >
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>


            <div className="space-y-2">
              <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
              <Input
                id="wardenFullName"
                placeholder="Enter warden full name"
                {...register("wardenFullName")}
                required={true}
              />
              {errors.wardenFullName && <p className="text-red-500 text-sm">{errors.wardenFullName.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="wardenUserName">Username <span className="text-red-500">*</span></Label>
              <Input
                id="wardenUserName"
                placeholder="Enter warden username"
                {...register("wardenUserName")}
              />
              {errors.wardenUserName && <p className="text-red-500 text-sm">{errors.wardenUserName.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="wardenMobileNumber">Mobile Number <span className="text-red-500">*</span></Label>
              <Input
                id="wardenMobileNumber"
                placeholder="Enter warden mobile number"
                {...register("wardenMobileNumber")}
              />
              {"wardenMobileNumber" in errors && errors.wardenMobileNumber && (
                <p className="text-red-500 text-sm">
                  {errors.wardenMobileNumber.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="wardenPassword">Password <span className="text-red-500">*</span></Label>
              <div className="relative">
                <Input
                  id="wardenPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter warden password"
                  {...register("wardenPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.wardenPassword && <p className="text-red-500 text-sm">{errors.wardenPassword.message}</p>}
            </div>


            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                type='button'
                disabled={loading}
                onClick={() => setStep(4)}
                className="flex-1 h-11"
              >
                Skip for Now
              </Button>
              <Button
                type='submit'
                disabled={loading}
                className="flex-1 h-11 bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                {loading ? "Adding..." : "Add Warden"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  )
}

export default WardenForm;