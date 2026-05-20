'use client'
import React, { FC, SetStateAction } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { useCreateHostel } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateHostelInput, createHostelSchema, defaultHostelValues, } from "@/lib/validators/auth.schema";
import { useOnboardingStore } from "@/stores/onboardingStore";



interface HostelProps {
    setStep: (value: SetStateAction<number>) => void,
}

const HostelForm: FC<HostelProps> = ({
     setStep

}) => {
    const router = useRouter();
    const pathname = usePathname()
    const {setHostel, orgId} = useOnboardingStore()
    if(!orgId) return null;
    const { mutate: initHostel, isPending: isHostelLoading } = useCreateHostel((res) => {
        console.log("helllll", res)
        setHostel(res.hostel._id);
        setStep(3);

    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateHostelInput>({
        resolver: zodResolver(createHostelSchema),
        defaultValues: defaultHostelValues,
    });
    console.log("erorrrs", errors)
    const onSubmit = (data: CreateHostelInput) => {
        console.log('here')
        initHostel({ ...data, organisationId: orgId });
        // setStep(3);
    };
    return (
        <>
            <Card className="border-border shadow-xl">
                <CardHeader>
                    <CardTitle>Add First Hostel (Optional)</CardTitle>
                    <CardDescription>
                        You can skip this step and add hostels later from the dashboard
                    </CardDescription>
                </CardHeader>
                <CardContent >
                    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} >
                        <div className="space-y-2">
                            <Label htmlFor="hostelName">Hostel Name <span className="text-red-500">*</span></Label>
                            <Input
                                id="hostelName"
                                placeholder="e.g., Sunrise Boys Hostel"
                                {...register("hostelName")}
                                className="h-11"
                            />
                            {errors.hostelName && <p className="text-red-500 text-sm">{errors.hostelName.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="hostelNumber">Hostel Number <span className="text-red-500">*</span></Label>
                            <Input
                                id="hostelNumber"
                                placeholder="e.g., 14"
                                {...register("hostelNumber")}
                                className="h-11"
                            />
                            {errors.hostelNumber && <p className="text-red-500 text-sm">{errors.hostelNumber.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="hostelAddress">Address <span className="text-red-500">*</span></Label>
                            <Input
                                id="hostelAddress"
                                placeholder="e.g., Opp. Main Playground"
                                {...register("hostelAddress")}
                                className="h-11"
                            />
                            {errors.hostelAddress && <p className="text-red-500 text-sm">{errors.hostelAddress.message}</p>}
                        </div>
                        <div className="flex gap-3 pt-4">
                            <Button
                                variant="outline"
                                type='button'
                                disabled={isHostelLoading}
                                onClick={() => setStep(4)}
                                className="flex-1 h-11"
                            >
                                Skip for Now
                            </Button>
                            <Button
                                type='submit'
                                disabled={isHostelLoading}
                                className="flex-1 h-11 bg-indigo-600 hover:bg-indigo-700 text-white"
                            >
                                {isHostelLoading ? "Adding..." : "Add Hostel"}
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    </form>


                </CardContent>
            </Card>
        </>
    )
}

export default HostelForm;