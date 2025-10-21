import { z } from 'zod'

export const serviceSchema = z.object({
  name: z.string().min(2, 'Service name is required'),
  price: z.number().min(0, 'Price must be positive'),
})

export const onboardingFormSchema = z.object({
  businessName: z.string().min(2, 'Business name is required'),
  contactName: z.string().min(2, 'Contact name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(7, 'Phone is required'),
  address: z.string().min(3, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zip: z.string().min(5, 'ZIP is required'),
  services: z.array(serviceSchema).min(1, 'Select at least one service'),
  availableDays: z.array(z.string()).min(1, 'Select at least one day'),
  hoursStart: z.string().min(4, 'Start time is required'),
  hoursEnd: z.string().min(4, 'End time is required'),
  maxPatientsPerMonth: z.number().min(1, 'Must be at least 1'),
  acceptPolicies: z.boolean().refine((v) => v === true, { message: 'You must accept to continue' }),
})

export type OnboardingFormData = z.infer<typeof onboardingFormSchema>