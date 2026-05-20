"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupInput, ROLES, ROLE_LABELS } from "@/lib/validators/auth.schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Building2, Upload, Eye, EyeOff, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { useSignup } from "@/hooks/useAuth";

export default function SignupForm() {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState<string>("");

    const { mutate, isPending } = useSignup();

    const form = useForm<SignupInput>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            fullName: "",
            hostelNumber: "",
            registrationNumber: "",
            userName: "",
            password: "",
            role: "student",
        },
    });

    const { register, handleSubmit, setValue, watch, formState } = form;
    const { errors } = formState;

    const role = watch("role");

    const onSubmit = (data: SignupInput) => {
        mutate(data);
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
            };

            reader.readAsDataURL(file);
            toast.success("Avatar uploaded successfully");
        }
    };

    //   const handleSignup = (e: React.FormEvent) => {
    //     e.preventDefault();

    //     const { username, fullname, password, mobile, role, hostelNumber } =
    //       formData;

    //     if (!username || !fullname || !password || !mobile || !role || !hostelNumber) {
    //       toast.error("Please fill in all required fields");
    //       return;
    //     }

    //     if (mobile.length !== 10) {
    //       toast.error("Please enter a valid 10-digit mobile number");
    //       return;
    //     }

    //     if (password.length < 6) {
    //       toast.error("Password must be at least 6 characters");
    //       return;
    //     }

    //     // 👉 Replace with API call later
    //     toast.success("Account created successfully!");

    //     router.push("/login");
    //   };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />

            <div className="w-full max-w-2xl relative z-10 my-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white mb-4 shadow-lg">
                        <Building2 className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Create Account
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Join HostelSaathi
                    </p>
                </div>

                <Card className="shadow-xl">
                    <CardHeader>
                        <CardTitle>Sign Up</CardTitle>
                        <CardDescription>
                            Fill in your details to create an account
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {/* Avatar */}
                            <div className="flex flex-col items-center gap-4">
                                <div className="relative">
                                    <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden border">
                                        {avatarPreview ? (
                                            <img
                                                src={avatarPreview}
                                                alt="Avatar"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <Upload className="w-8 h-8 text-gray-400" />
                                        )}
                                    </div>

                                    <label className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center cursor-pointer">
                                        <Upload className="w-4 h-4" />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleAvatarChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* Inputs */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="Enter full name"
                                        {...register("fullName")}
                                        required={true}
                                    />
                                    {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="userName">Username</Label>
                                    <Input
                                        id="userName"
                                        placeholder="Enter username"
                                        {...register("userName")}
                                    />
                                    {errors.userName && <p className="text-red-500 text-sm">{errors.userName.message}</p>}
                                </div>

                                {/* Password */}
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
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

                                <div className="space-y-2">
                                    <Label>Role</Label>
                                    <Select
                                        defaultValue="student"
                                        onValueChange={(val) => setValue("role", val as any)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {
                                                ROLES.map((role) => (
                                                    <SelectItem key={role} value={role}>
                                                        {ROLE_LABELS[role]}
                                                    </SelectItem>
                                                ))
                                            }
                                            {/* <SelectItem value="student">Student</SelectItem>
                                            <SelectItem value="warden">Warden</SelectItem>
                                            <SelectItem value="worker">Worker</SelectItem>
                                            <SelectItem value="superadmin">Super Admin</SelectItem> */}
                                        </SelectContent>
                                    </Select>
                                    {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
                                </div>

                                {role === "student" && (
                                    <>
                                        <div className="space-y-2">
                                            <Label>Hostel Number</Label>
                                            <Input placeholder="Enter hostel number" {...register("hostelNumber")} />
                                            {"hostelNumber" in errors && errors.hostelNumber && (
                                                <p className="text-red-500 text-sm">
                                                    {errors.hostelNumber.message}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Registration Number</Label>
                                            <Input placeholder="Enter registration number" {...register("registrationNumber")} />
                                            {"registrationNumber" in errors && errors.registrationNumber && (
                                                <p className="text-red-500 text-sm">
                                                    {errors.registrationNumber.message}
                                                </p>
                                            )}
                                        </div>
                                    </>
                                )}
                                {role === "warden" && (
                                    <div className="space-y-2">
                                        <Label>Hostel Number</Label>
                                        <Input placeholder="Enter hostel number" {...register("hostelNumber")} />
                                        {"hostelNumber" in errors && errors.hostelNumber && (
                                            <p className="text-red-500 text-sm">
                                                {errors.hostelNumber.message}
                                            </p>
                                        )}
                                    </div>
                                )}

                                {role === "worker" && (
                                    <div className="space-y-2">
                                        <Label>Department</Label>
                                        <Input placeholder="Enter department" {...register("department")} />
                                        {"department" in errors && errors.department && (
                                            <p className="text-red-500 text-sm">
                                                {errors.department.message}
                                            </p>
                                        )}
                                    </div>
                                )}

                                <div>
                                    <Label htmlFor="mobile">Mobile Number</Label>
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
                            </div>



                            <Button type="submit" className="w-full" disabled={isPending}>
                                <UserPlus className="mr-2 h-4 w-4" />
                                {isPending ? "Creating..." : "Create Account"}
                            </Button>
                        </form>

                        <p className="text-center mt-4 text-sm">
                            Already have an account?{" "}
                            <button
                                onClick={() => router.push("/login")}
                                className="text-indigo-600"
                            >
                                Sign in
                            </button>
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function InputField({
    label,
    value,
    onChange,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
}) {
    return (
        <div>
            <Label>{label}</Label>
            <Input value={value} onChange={(e) => onChange(e.target.value)} />
        </div>
    );
}