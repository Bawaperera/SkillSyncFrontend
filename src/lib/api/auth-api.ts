// ============================================================
// Auth API — Authentication & Onboarding endpoints
// ============================================================

import { api, setToken, clearToken, getToken } from './client'
import {
  User,
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
} from '@/types/user'

// ============================================================
// AUTH
// ============================================================

/** POST /auth/signup */
export async function signUp(data: SignUpRequest): Promise<SignUpResponse> {
  return api.post<SignUpResponse>('/auth/signup', data)
}

/** POST /auth/signin */
export async function signIn(data: SignInRequest): Promise<SignInResponse> {
  const response = await api.post<SignInResponse>('/auth/signin', data)
  setToken(response.token, data.rememberMe)
  return response
}

/** POST /auth/forgot-password */
export async function forgotPassword(data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
  return api.post<ForgotPasswordResponse>('/auth/forgot-password', data)
}

/** POST /auth/reset-password */
export async function resetPassword(data: ResetPasswordRequest): Promise<ResetPasswordResponse> {
  return api.post<ResetPasswordResponse>('/auth/reset-password', data)
}

/** POST /auth/logout */
export async function logoutApi(): Promise<void> {
  try {
    await api.post('/auth/logout')
  } catch {
    // Always clear local tokens even if the API call fails
  } finally {
    clearToken()
  }
}

/** GET /auth/me — Get current user from token */
export async function getCurrentUser(): Promise<User | null> {
  const token = getToken()
  if (!token) return null
  try {
    return await api.get<User>('/auth/me')
  } catch {
    clearToken()
    return null
  }
}

// ============================================================
// ONBOARDING
// ============================================================

/** POST /cv/upload (multipart/form-data) */
export async function uploadCV(file: File, userId: string): Promise<CVUploadResponse> {
  const formData = new FormData()
  formData.append('cv', file)
  formData.append('userId', userId)
  return api.upload<CVUploadResponse>('/cv/upload', formData)
}

/** POST /auth/github/connect */
export async function connectGitHub(): Promise<GitHubConnectResponse> {
  return api.post<GitHubConnectResponse>('/auth/github/connect')
}

/** POST /auth/linkedin/connect */
export async function connectLinkedIn(): Promise<LinkedInConnectResponse> {
  return api.post<LinkedInConnectResponse>('/auth/linkedin/connect')
}

/** POST /user/target-role */
export async function setTargetRole(role: string): Promise<{ success: boolean }> {
  return api.post<{ success: boolean }>('/user/target-role', { role })
}

/** POST /user/complete-onboarding */
export async function completeOnboarding(): Promise<{ success: boolean }> {
  return api.post<{ success: boolean }>('/user/complete-onboarding')
}

/** PATCH /user/profile */
export async function updateUserProfile(updates: Partial<User>): Promise<User> {
  return api.patch<User>('/user/profile', updates)
}
