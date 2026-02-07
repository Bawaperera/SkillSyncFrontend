import { User, UserRole } from '@/lib/types/user'

const STORAGE_KEY = 'skillsync_user'
const STORAGE_ROLE_KEY = 'skillsync_user_role'

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(STORAGE_KEY) !== null
}

export function getUserRole(): UserRole | null {
  if (typeof window === 'undefined') return null
  const role = localStorage.getItem(STORAGE_ROLE_KEY)
  return role as UserRole | null
}

export function getUser(): User | null {
  if (typeof window === 'undefined') return null
  const userStr = localStorage.getItem(STORAGE_KEY)
  if (!userStr) return null
  try {
    return JSON.parse(userStr) as User
  } catch {
    return null
  }
}

export function setUser(user: User | null): void {
  if (typeof window === 'undefined') return
  if (user) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    localStorage.setItem(STORAGE_ROLE_KEY, user.role)
  } else {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(STORAGE_ROLE_KEY)
  }
}

export async function mockLogin(
  email: string,
  password: string,
  role: UserRole
): Promise<User> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock validation
  if (!email || !password) {
    throw new Error('Email and password are required')
  }

  // Generate mock user based on role
  const user: User = {
    id: `user-${Date.now()}`,
    name: email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
    email,
    role,
    avatar: undefined,
    githubConnected: false,
  }

  if (role === 'recruiter') {
    user.companyId = 'company-1'
  } else if (role === 'university') {
    user.universityId = 'university-1'
  }

  setUser(user)
  return user
}

export async function mockSignup(userData: {
  name: string
  email: string
  password: string
  role: UserRole
  [key: string]: any
}): Promise<User> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  const user: User = {
    id: `user-${Date.now()}`,
    name: userData.name,
    email: userData.email,
    role: userData.role,
    avatar: undefined,
    githubConnected: false,
  }

  if (userData.role === 'recruiter') {
    user.companyId = userData.companyId || 'company-1'
  } else if (userData.role === 'university') {
    user.universityId = userData.universityId || 'university-1'
  }

  setUser(user)
  return user
}

export function logout(): void {
  setUser(null)
}

export function requireAuth(role?: UserRole): boolean {
  const user = getUser()
  if (!user) return false
  if (role && user.role !== role) return false
  return true
}
