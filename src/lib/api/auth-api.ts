// ============================================================
// API Service Layer — Centralized API calls
// ============================================================
// When the backend is ready, replace mock implementations
// with actual fetch/axios calls to API endpoints.
// ============================================================

import {
  User,
  UserRole,
  SignUpRequest,
  SignUpResponse,
  SignInRequest,
  SignInResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  CVUploadResponse,
  GitHubConnectResponse,
  LinkedInConnectResponse,
  OnboardingStatus,
} from '@/lib/types/user'

// Base URL — will be environment variable in production
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

// ============================================================
// Helper: Generic fetch wrapper
// ============================================================
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = typeof window !== 'undefined'
    ? localStorage.getItem('skillsync_token')
    : null

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...((options.headers as Record<string, string>) || {}),
  }

  // Remove Content-Type for FormData (browser sets it with boundary)
  if (options.body instanceof FormData) {
    delete (headers as Record<string, string>)['Content-Type']
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: 'include', // Send cookies for session management
  })

  const data = await response.json()

  if (!response.ok) {
    throw {
      success: false,
      error: data.error || data.message || 'An unexpected error occurred',
      code: response.status,
      details: data.details || null,
    }
  }

  return data as T
}

// ============================================================
// Mock Helpers — Simulates backend behaviour for development.
// Each function mirrors the API contract exactly.
// Replace the body of each function with a real apiRequest() call.
// ============================================================

function generateId(): string {
  return `user-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function createDefaultOnboarding(): OnboardingStatus {
  return {
    cvUploaded: false,
    githubConnected: false,
    linkedinConnected: false,
    targetRoleSelected: false,
    onboardingCompleted: false,
  }
}

function computeProfileCompletion(onboarding: OnboardingStatus, emailVerified: boolean): number {
  const weights = {
    emailVerified: 10,
    cvUploaded: 25,
    githubConnected: 25,
    linkedinConnected: 15,
    targetRoleSelected: 25,
  }
  let score = 0
  if (emailVerified) score += weights.emailVerified
  if (onboarding.cvUploaded) score += weights.cvUploaded
  if (onboarding.githubConnected) score += weights.githubConnected
  if (onboarding.linkedinConnected) score += weights.linkedinConnected
  if (onboarding.targetRoleSelected) score += weights.targetRoleSelected
  return score
}

// ============================================================
// AUTH API
// ============================================================

/** POST /api/auth/signup */
export async function signUp(data: SignUpRequest): Promise<SignUpResponse> {
  // TODO: Replace with real API call
  // return apiRequest<SignUpResponse>('/auth/signup', { method: 'POST', body: JSON.stringify(data) })

  await new Promise((r) => setTimeout(r, 1200))

  // Mock: Check for duplicate email
  const existingUsers = JSON.parse(localStorage.getItem('skillsync_all_users') || '[]') as User[]
  if (existingUsers.find((u) => u.email === data.email)) {
    throw { success: false, error: 'An account with this email already exists.', code: 409 }
  }

  const userId = generateId()
  const now = new Date().toISOString()
  const onboarding = createDefaultOnboarding()

  const newUser: User = {
    id: userId,
    fullName: data.fullName,
    email: data.email,
    role: data.role,
    emailVerified: true,
    createdAt: now,
    updatedAt: now,
    university: data.university,
    programme: data.programme,
    graduationYear: data.graduationYear,
    onboarding,
    profileCompletion: computeProfileCompletion(onboarding, true),
  }

  // Persist to mock store
  existingUsers.push(newUser)
  localStorage.setItem('skillsync_all_users', JSON.stringify(existingUsers))

  // Auto-login after signup
  const token = `mock-jwt-${userId}-${Date.now()}`
  localStorage.setItem('skillsync_token', token)
  localStorage.setItem('skillsync_user', JSON.stringify(newUser))

  return {
    success: true,
    message: 'Account created successfully.',
    userId,
    email: data.email,
    verificationEmailSent: false,
  }
}

/** POST /api/auth/signin */
export async function signIn(data: SignInRequest): Promise<SignInResponse> {
  // TODO: Replace with real API call
  // return apiRequest<SignInResponse>('/auth/signin', { method: 'POST', body: JSON.stringify(data) })

  await new Promise((r) => setTimeout(r, 1000))

  const existingUsers = JSON.parse(localStorage.getItem('skillsync_all_users') || '[]') as User[]
  const user = existingUsers.find((u) => u.email === data.email)

  if (!user) {
    throw { success: false, error: 'Invalid email or password.', code: 401 }
  }

  // Mock — in real app, bcrypt.compare on backend
  // Here we just accept any password for existing users

  const token = `mock-jwt-${user.id}-${Date.now()}`

  // Determine redirect based on onboarding state
  let redirect = `/${user.role}/dashboard`
  if (user.role === 'student' && !user.onboarding.onboardingCompleted) {
    redirect = '/onboarding'
  }

  // Persist session
  if (data.rememberMe) {
    localStorage.setItem('skillsync_token', token)
  } else {
    sessionStorage.setItem('skillsync_token', token)
  }
  localStorage.setItem('skillsync_user', JSON.stringify(user))

  return {
    success: true,
    token,
    user,
    redirect,
  }
}

/** POST /api/auth/forgot-password */
export async function forgotPassword(data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
  // TODO: Replace with real API call
  await new Promise((r) => setTimeout(r, 1000))
  return {
    success: true,
    message: 'If an account exists with this email, you will receive a password reset link.',
  }
}

/** POST /api/auth/reset-password */
export async function resetPassword(data: ResetPasswordRequest): Promise<ResetPasswordResponse> {
  // TODO: Replace with real API call
  await new Promise((r) => setTimeout(r, 1000))
  return {
    success: true,
    message: 'Password reset successfully.',
  }
}

/** POST /api/auth/logout */
export async function logoutApi(): Promise<void> {
  // TODO: Replace with real API call
  // await apiRequest('/auth/logout', { method: 'POST' })

  localStorage.removeItem('skillsync_token')
  localStorage.removeItem('skillsync_user')
  sessionStorage.removeItem('skillsync_token')
}

/** GET /api/auth/me — Get current user from token */
export async function getCurrentUser(): Promise<User | null> {
  // TODO: Replace with real API call
  // return apiRequest<User>('/auth/me')

  const token =
    localStorage.getItem('skillsync_token') ||
    sessionStorage.getItem('skillsync_token')

  if (!token) return null

  const userStr = localStorage.getItem('skillsync_user')
  if (!userStr) return null

  try {
    return JSON.parse(userStr) as User
  } catch {
    return null
  }
}

// ============================================================
// ONBOARDING API
// ============================================================

/** POST /api/cv/upload */
export async function uploadCV(file: File, userId: string): Promise<CVUploadResponse> {
  // TODO: Replace with real API call using FormData
  // const formData = new FormData()
  // formData.append('cv', file)
  // return apiRequest<CVUploadResponse>('/cv/upload', { method: 'POST', body: formData })

  await new Promise((r) => setTimeout(r, 2000))

  const response: CVUploadResponse = {
    success: true,
    cvId: `cv-${Date.now()}`,
    fileName: file.name,
    extractedData: {
      skills: ['Python', 'React', 'Node.js', 'TypeScript', 'SQL', 'Git', 'Docker', 'AWS', 'MongoDB', 'REST APIs', 'GraphQL', 'CI/CD'],
      experience: [
        { title: 'Software Engineering Intern', company: 'Tech Corp', duration: '6 months' },
      ],
      education: [
        { degree: 'BSc Computer Science', institution: 'University of Colombo' },
      ],
      projects: [
        { name: 'E-Commerce Platform', description: 'Full-stack web application with React and Node.js' },
        { name: 'ML Sentiment Analyzer', description: 'NLP pipeline for social media sentiment analysis' },
        { name: 'DevOps Dashboard', description: 'Real-time monitoring dashboard with Docker integration' },
      ],
    },
  }

  // Update user in mock store
  updateUserInStore({
    cvId: response.cvId,
    cvFileName: file.name,
    onboarding: { cvUploaded: true } as any,
  })

  return response
}

/** POST /api/auth/github/connect */
export async function connectGitHub(): Promise<GitHubConnectResponse> {
  // TODO: Replace with actual GitHub OAuth flow
  // 1. Open popup: window.open(githubOAuthUrl)
  // 2. Handle callback: apiRequest('/auth/github/callback', ...)

  await new Promise((r) => setTimeout(r, 1500))

  const response: GitHubConnectResponse = {
    success: true,
    githubUsername: 'bawanthap',
    reposCount: 25,
    commitsLast6Months: 287,
    detectedSkills: [
      { skill: 'Python', confidence: 0.95 },
      { skill: 'React', confidence: 0.88 },
      { skill: 'Node.js', confidence: 0.82 },
      { skill: 'TypeScript', confidence: 0.78 },
      { skill: 'Docker', confidence: 0.65 },
      { skill: 'PostgreSQL', confidence: 0.60 },
      { skill: 'GraphQL', confidence: 0.55 },
      { skill: 'AWS', confidence: 0.50 },
    ],
  }

  updateUserInStore({
    githubUsername: response.githubUsername,
    onboarding: { githubConnected: true } as any,
  })

  return response
}

/** POST /api/auth/linkedin/connect */
export async function connectLinkedIn(): Promise<LinkedInConnectResponse> {
  // TODO: Replace with actual LinkedIn OAuth flow

  await new Promise((r) => setTimeout(r, 1500))

  const response: LinkedInConnectResponse = {
    success: true,
    linkedinId: 'john-doe-123',
    importedData: {
      experience: [
        { title: 'Software Engineering Intern', company: 'Tech Corp', duration: '6 months' },
      ],
      certifications: ['AWS Cloud Practitioner', 'Google Analytics Certified'],
    },
  }

  updateUserInStore({
    linkedinId: response.linkedinId,
    onboarding: { linkedinConnected: true } as any,
  })

  return response
}

/** POST /api/user/target-role */
export async function setTargetRole(role: string): Promise<{ success: boolean }> {
  // TODO: Replace with real API call
  await new Promise((r) => setTimeout(r, 500))

  updateUserInStore({
    targetRole: role,
    onboarding: { targetRoleSelected: true } as any,
  })

  return { success: true }
}

/** POST /api/user/complete-onboarding */
export async function completeOnboarding(): Promise<{ success: boolean }> {
  // TODO: Replace with real API call
  await new Promise((r) => setTimeout(r, 300))

  updateUserInStore({
    onboarding: { onboardingCompleted: true } as any,
  })

  return { success: true }
}

/** PATCH /api/user/profile */
export async function updateUserProfile(updates: Partial<User>): Promise<User> {
  // TODO: Replace with real API call
  // return apiRequest<User>('/user/profile', { method: 'PATCH', body: JSON.stringify(updates) })

  await new Promise((r) => setTimeout(r, 500))
  return updateUserInStore(updates)
}

// ============================================================
// Helper: Update user in mock localStorage store
// ============================================================
function updateUserInStore(updates: Partial<User>): User {
  const userStr = localStorage.getItem('skillsync_user')
  if (!userStr) throw { success: false, error: 'Not authenticated', code: 401 }

  const user = JSON.parse(userStr) as User

  // Merge onboarding status specially (partial merge)
  if (updates.onboarding) {
    user.onboarding = { ...user.onboarding, ...updates.onboarding }
    delete updates.onboarding
  }

  Object.assign(user, updates)
  user.updatedAt = new Date().toISOString()
  user.profileCompletion = computeProfileCompletion(user.onboarding, user.emailVerified)

  localStorage.setItem('skillsync_user', JSON.stringify(user))

  // Also update in the all-users list
  const allUsers = JSON.parse(localStorage.getItem('skillsync_all_users') || '[]') as User[]
  const idx = allUsers.findIndex((u) => u.id === user.id)
  if (idx >= 0) {
    allUsers[idx] = user
    localStorage.setItem('skillsync_all_users', JSON.stringify(allUsers))
  }

  return user
}
