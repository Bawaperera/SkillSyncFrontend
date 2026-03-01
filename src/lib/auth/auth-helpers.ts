// ============================================================
// Auth Helpers — Thin utility layer
// Heavy logic is in @/lib/api/auth-api.ts
// ============================================================

import { User, UserRole } from '@/lib/types/user'

const TOKEN_KEY = 'skillsync_token'
const USER_KEY = 'skillsync_user'

/** Check if user has an active session */
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  return !!(localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY))
}

/** Get stored user role */
export function getUserRole(): UserRole | null {
  if (typeof window === 'undefined') return null
  const user = getUser()
  return user?.role ?? null
}

/** Read user from localStorage */
export function getUser(): User | null {
  if (typeof window === 'undefined') return null
  const userStr = localStorage.getItem(USER_KEY)
  if (!userStr) return null
  try {
    return JSON.parse(userStr) as User
  } catch {
    return null
  }
}

/** Check if a user needs onboarding (pass user directly or read from storage) */
export function needsOnboarding(user?: User | null): boolean {
  const u = user ?? getUser()
  if (!u) return false
  if (u.role !== 'student') return false
  return !u.onboarding.onboardingCompleted
}

/** Get redirect path based on user state */
export function getAuthRedirect(user: User): string {
  if (user.role === 'student') {
    if (!user.onboarding.onboardingCompleted) {
      return '/onboarding'
    }
    return '/student/dashboard'
  }
  if (user.role === 'recruiter') return '/recruiter/dashboard'
  if (user.role === 'university') return '/university/dashboard'
  return '/'
}

/** Password strength checker: returns 0-4 score */
export function checkPasswordStrength(password: string): {
  score: number
  level: 'weak' | 'fair' | 'good' | 'strong'
  color: string
} {
  if (!password) return { score: 0, level: 'weak', color: 'gray' }

  let score = 0
  if (password.length >= 8) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  if (score <= 1) return { score, level: 'weak', color: 'red' }
  if (score === 2) return { score, level: 'fair', color: 'orange' }
  if (score === 3) return { score, level: 'good', color: 'yellow' }
  return { score, level: 'strong', color: 'green' }
}
