import { z } from "zod";

export const ROLES = [
  "student",
  "warden",
  "worker",
  "superadmin",
] as const;

export const ROLE_LABELS: Record<typeof ROLES[number], string> = {
  student: "Student",
  warden: "Warden",
  worker: "Worker",
  superadmin: "Super Admin",
};

export const baseSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  userName: z.string().min(3, "Username must be at least 3 characters"),
  mobileNumber: z.string()
    .min(10, "Mobile number must be at least 10 digits")
    .max(15, "Mobile number must be at most 15 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(ROLES),
});

const studentSchema = z.object({
  role: z.literal("student"),
  hostelNumber: z.string().min(1, "Hostel is required"),
  registrationNumber: z.string().min(1, "Registration number required"),
});

const wardenSchema = z.object({
  role: z.literal("warden"),
  hostelNumber: z.string().min(1, "Hostel number is required"),
});

const workerSchema = z.object({
  role: z.literal("worker"),
  department: z.string().min(1, "Department is required"),
});

const superAdminSchema = z.object({
  role: z.literal("superadmin"),
});

export const signupSchema = z.discriminatedUnion("role", [
  baseSchema.merge(studentSchema),
  baseSchema.merge(wardenSchema),
  baseSchema.merge(workerSchema),
  baseSchema.merge(superAdminSchema),
]);

export const loginSchema = z.object({
  userName: z.string().min(3, "Username required"),
  password: z.string().min(6, "Password required"),
});
export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export const defaultLoginValues: LoginInput = {
  userName: "",
  password: "",
};


/* =========================
   STEP 1 → INIT SUPER ADMIN
========================= */
export const initSuperAdminSchema = z.object({
  organisationName: z
    .string()
    .min(3, "Organization name must be at least 3 characters"),

  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters"),

  userName: z
    .string()
    .min(3, "Username must be at least 3 characters"),

  mobileNumber: z
    .string()
    .min(10, "Mobile number must be at least 10 digits")
    .max(15, "Mobile number must be at most 15 digits"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

/* =========================
   STEP 2 → HOSTEL CREATION
========================= */
export const createHostelSchema = z.object({
  // organisationId: z.string().min(1, "Organization ID is required"),

  hostelName: z
    .string()
    .min(2, "Hostel name must be at least 2 characters"),

  hostelNumber: z
    .string()
    .min(1, "Hostel number is required"),

  hostelAddress: z
    .string()
    .min(5, "Hostel address must be at least 5 characters"),
});
export const createHostelServerSchema = z.object({
  ...createHostelSchema.shape,
  organisationId: z.string().min(1, "Organization ID is required"),
});

/* =========================
   STEP 3 → WARDEN CREATION
========================= */
export const createWardenSchema = z.object({

  wardenFullName: z
    .string()
    .min(3, "Warden name must be at least 3 characters"),

  wardenUserName: z
    .string()
    .min(3, "Username must be at least 3 characters"),

  wardenMobileNumber: z
    .string()
    .min(10, "Mobile number must be at least 10 digits")
    .max(15, "Mobile number must be at most 15 digits"),

  wardenPassword: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});
export const createWardenServerSchema = z.object({
  ...createWardenSchema.shape,
  organisationId: z.string().min(1, "Organization ID is required"),

  hostelId: z.string().min(1, "Hostel ID is required"),
});

/* =========================
   TYPES
========================= */
export type InitSuperAdminInput = z.infer<typeof initSuperAdminSchema>;
export type CreateHostelInput = z.infer<typeof createHostelSchema>;
export type CreateHostelServerInput = z.infer<typeof createHostelServerSchema>;
export type CreateWardenInput = z.infer<typeof createWardenSchema>;
export type CreateWardenServerInput = z.infer<typeof createWardenServerSchema>;

/* =========================
   DEFAULT VALUES
========================= */
export const defaultInitValues: InitSuperAdminInput = {
  organisationName: "",
  fullName: "",
  userName: "",
  mobileNumber: "",
  password: "",
};

export const defaultHostelValues: CreateHostelInput = {
  hostelName: "",
  hostelNumber: "",
  hostelAddress: "",
};
export const defaultHostelServerValues: CreateHostelServerInput = {
  ...defaultHostelValues,
  organisationId: "",
};

export const defaultWardenValues: CreateWardenInput = {
  wardenFullName: "",
  wardenUserName: "",
  wardenMobileNumber: "",
  wardenPassword: "",
};
export const defaultWardenServerValues: CreateWardenServerInput = {
  ...defaultWardenValues,
  organisationId: "",
  hostelId: "",
};