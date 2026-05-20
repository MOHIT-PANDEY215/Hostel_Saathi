import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface OnboardingState {
  orgId: string | null
  hostelId: string | null

  hasOrg: boolean
  hasHostel: boolean
  hasWarden: boolean

  setOrg: (orgId: string) => void
  setHostel: (hostelId: string) => void
  completeWarden: () => void

  reset: () => void
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      orgId: null,
      hostelId: null,

      hasOrg: false,
      hasHostel: false,
      hasWarden: false,

      setOrg: (orgId) =>
        set({
          orgId,
          hasOrg: true,
        }),

      setHostel: (hostelId) =>
        set({
          hostelId,
          hasHostel: true,
        }),

      completeWarden: () =>
        set({
          hasWarden: true,
        }),

      reset: () =>
        set({
          orgId: null,
          hostelId: null,
          hasOrg: false,
          hasHostel: false,
          hasWarden: false,
        }),
    }),
    {
      name: 'onboarding-storage',
    }
  )
)