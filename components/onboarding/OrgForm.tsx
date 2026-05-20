'use client'
import React, { FC, SetStateAction, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { useInitSuperAdmin } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { defaultInitValues, InitSuperAdminInput, initSuperAdminSchema } from "@/lib/validators/auth.schema";
import { useOnboardingStore } from "@/stores/onboardingStore";

interface OrgProps {
    setStep: (value: SetStateAction<number>) => void,
}

const OrgForm: FC<OrgProps> = ({
    setStep

}) => {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const {setOrg} = useOnboardingStore()
    const { mutate: initSuperAdmin, isPending: loading } = useInitSuperAdmin((res) => {
        setOrg(res.user.organisationId);
        setStep(2);
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<InitSuperAdminInput>({
        resolver: zodResolver(initSuperAdminSchema),
        defaultValues: defaultInitValues,
    });

    const onSubmit = (data: InitSuperAdminInput) => {
        initSuperAdmin(data);
        // setStep(2);
    };
    return (
        <>
            <Card className="border-border shadow-xl">
                <CardHeader>
                    <CardTitle>Organization Details</CardTitle>
                    <CardDescription>
                        Enter your organization information to get started
                    </CardDescription>
                </CardHeader>
                <CardContent >
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">


                        <div className="space-y-2">
                            <Label htmlFor="organisationName">
                                Organization Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="organisationName"
                                placeholder="e.g., Oberoi & Sons"
                                {...register("organisationName")}
                                className="h-11"
                            />
                            {errors.organisationName && (
                                <p className="text-red-500 text-sm">
                                    {errors.organisationName.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name <span className="text-red-500">*</span></Label>
                            <Input
                                id="fullName"
                                placeholder="Enter full name"
                                {...register("fullName")}
                                required={true}
                            />
                            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="userName">Username <span className="text-red-500">*</span></Label>
                            <Input
                                id="userName"
                                placeholder="Enter username"
                                {...register("userName")}
                            />
                            {errors.userName && <p className="text-red-500 text-sm">{errors.userName.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="mobile">Mobile Number <span className="text-red-500">*</span></Label>
                            <Input
                                id="mobile"
                                placeholder="Enter mobile number"
                                {...register("mobileNumber")}
                            />
                            {"mobileNumber" in errors && errors.mobileNumber && (
                                <p className="text-red-500 text-sm">
                                    {errors.mobileNumber.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter password"
                                    {...register("password")}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-2"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                        </div>

                        {/* <div className="flex items-start gap-2 pt-2">
                        <input
                          type="checkbox"
                          id="terms"
                          required
                          className="w-4 h-4 mt-1 rounded border-input text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor="terms" className="text-sm text-muted-foreground">
                          I agree to the{' '}
                          <button type="button" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                            Terms of Service
                          </button>{' '}
                          and{' '}
                          <button type="button" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                            Privacy Policy
                          </button>
                        </label>
                      </div> */}

                        <Button
                            type='submit'
                            disabled={loading}
                            className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                            {loading ? "Adding..." : "Create Organization"}

                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </form>
                    <div className="text-center pt-4">
                        <p className="text-sm text-muted-foreground">
                            Already have an account?{' '}
                            <button
                                onClick={() => router.push('/login')}
                                className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                            >
                                Sign in
                            </button>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default OrgForm;