export type UserRole = 'student' | 'recruiter' | 'university'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  githubConnected?: boolean
  githubUsername?: string
  companyId?: string
  universityId?: string
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}
