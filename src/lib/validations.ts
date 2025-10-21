import { z } from "zod"

const phoneRegex = /^(\+1\s?)?(\(?\d{3}\)?)[\s.-]?\d{3}[\s.-]?\d{4}$/

export const onboardingFormSchema = z.object({
  step1: z.object({
    businessName: z.string().min(2, "Business name is required"),
    contactName: z.string().min(2, "Contact name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().regex(phoneRegex, "Invalid phone number"),
    address: z.string().min(5, "Address is required"),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State is required"),
    zip: z.string().min(5, "Invalid ZIP").max(10, "Invalid ZIP"),
  }),
  step2: z.object({
    services: z
      .array(
        z.object({
          name: z.string().min(2, "Service name is required"),
          description: z.string().optional(),
          price: z.number().nonnegative().optional(),
        })
      )
      .min(1, "Select at least one service"),
  }),
  step3: z.object({
    availableDays: z
      .array(z.enum(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]))
      .min(1, "Select at least one day"),
    hours: z.object({
      start: z.string().regex(/^\d{2}:\d{2}$/, "Invalid start time"),
      end: z.string().regex(/^\d{2}:\d{2}$/, "Invalid end time"),
    }),
    maxPatientsPerMonth: z.number().int().positive("Must be a positive number"),
  }),
  step4: z.object({
    confirmation: z.literal(true),
  }),
})

export const bookingFormSchema = z.object({
  patientName: z.string().min(2, "Patient name is required"),
  patientEmail: z.string().email("Invalid email"),
  patientPhone: z.string().regex(phoneRegex, "Invalid phone number"),
  appointmentDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date"),
  appointmentTime: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Consent is required" }),
  }),
})

export const rescheduleFormSchema = z.object({
  bookingId: z.string().min(1, "Booking ID is required"),
  newDateTime: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, "Invalid date/time"),
  reason: z.string().min(3, "Provide a short reason").optional(),
})

export type OnboardingFormData = z.infer<typeof onboardingFormSchema>
export type BookingFormData = z.infer<typeof bookingFormSchema>
export type RescheduleFormData = z.infer<typeof rescheduleFormSchema>
export const validations = {};