// ============================================================
// Student API — All student dashboard endpoints
// ============================================================

import { api } from './client'
import { JobPosting, JobMatchAndAnalysis } from '@/types/jobs'
import { Application } from '@/types/applications'
import { Conversation } from '@/types/messages'
import { StudentProfile } from '@/types/profile'
import { LearningPath } from '@/types/learning-path'
import { SkillData, SkillGap, JobMatch, Recommendation } from '@/types/analysis'
import { CVProfile, CVAnalysis } from '@/types/cv'

// ── Dashboard ──────────────────────────────────────────────

export interface StudentDashboardData {
  matchScore: number
  appliedCount: number
  interviewCount: number
  profileStrength: number
  recentApplications: Application[]
  upcomingInterviews: { id: string; company: string; role: string; date: string; type: string }[]
  suggestedJobs: JobPosting[]
}

export function getStudentDashboard() {
  return api.get<StudentDashboardData>('/student/dashboard')
}

// ── Jobs ───────────────────────────────────────────────────

export interface JobSearchParams {
  q?: string
  type?: string
  location?: string
  sort?: string
  page?: number
  limit?: number
}

export interface JobSearchResponse {
  jobs: JobPosting[]
  total: number
  page: number
  totalPages: number
}

export function searchJobs(params?: JobSearchParams) {
  const query = params ? '?' + new URLSearchParams(
    Object.entries(params)
      .filter(([, v]) => v !== undefined && v !== '')
      .map(([k, v]) => [k, String(v)])
  ).toString() : ''
  return api.get<JobSearchResponse>(`/student/jobs${query}`)
}

export function getJobDetail(jobId: string) {
  return api.get<JobPosting>(`/student/jobs/${jobId}`)
}

export function getJobAnalysis(jobId: string) {
  return api.get<JobMatchAndAnalysis>(`/student/jobs/${jobId}/analysis`)
}

export function applyToJob(jobId: string, data?: { coverLetter?: string }) {
  return api.post<{ success: boolean }>(`/student/jobs/${jobId}/apply`, data)
}

export function saveJob(jobId: string) {
  return api.post<{ success: boolean }>(`/student/jobs/${jobId}/save`)
}

export function unsaveJob(jobId: string) {
  return api.delete<{ success: boolean }>(`/student/jobs/${jobId}/save`)
}

// ── Applications ───────────────────────────────────────────

export interface ApplicationsResponse {
  applications: Application[]
  stats: {
    total: number
    active: number
    interviews: number
    offers: number
    rejected: number
  }
}

export function getApplications(status?: string) {
  const query = status ? `?status=${status}` : ''
  return api.get<ApplicationsResponse>(`/student/applications${query}`)
}

export function getApplicationDetail(applicationId: string) {
  return api.get<Application>(`/student/applications/${applicationId}`)
}

export function withdrawApplication(applicationId: string) {
  return api.delete<{ success: boolean }>(`/student/applications/${applicationId}`)
}

// ── Messages ───────────────────────────────────────────────

export function getConversations() {
  return api.get<Conversation[]>('/student/messages')
}

export function getConversation(conversationId: string) {
  return api.get<Conversation>(`/student/messages/${conversationId}`)
}

export function sendMessage(conversationId: string, text: string) {
  return api.post<{ success: boolean }>(`/student/messages/${conversationId}`, { text })
}

export function markConversationRead(conversationId: string) {
  return api.patch<{ success: boolean }>(`/student/messages/${conversationId}/read`)
}

// ── Profile ────────────────────────────────────────────────

export function getStudentProfile() {
  return api.get<StudentProfile>('/student/profile')
}

export function updateStudentProfile(updates: Partial<StudentProfile>) {
  return api.patch<StudentProfile>('/student/profile', updates)
}

export function uploadAvatar(file: File) {
  const formData = new FormData()
  formData.append('avatar', file)
  return api.upload<{ avatarUrl: string }>('/student/profile/avatar', formData)
}

// ── Learning Path ──────────────────────────────────────────

export function getLearningPaths() {
  return api.get<LearningPath[]>('/student/learning-paths')
}

export function getLearningPath(pathId: string) {
  return api.get<LearningPath>(`/student/learning-paths/${pathId}`)
}

export function updateNodeProgress(pathId: string, nodeId: string, progress: number) {
  return api.patch<{ success: boolean }>(`/student/learning-paths/${pathId}/nodes/${nodeId}`, { progress })
}

// ── Analysis ───────────────────────────────────────────────

export interface AnalysisOverview {
  radarData: SkillData[]
  gaps: SkillGap[]
  matchedJobs: JobMatch[]
  recommendations: Recommendation[]
}

export function getAnalysisOverview() {
  return api.get<AnalysisOverview>('/student/analysis')
}

export function getSkillGaps() {
  return api.get<SkillGap[]>('/student/analysis/gaps')
}

export function getJobMatches() {
  return api.get<JobMatch[]>('/student/analysis/job-matches')
}

export function getRecommendations() {
  return api.get<Recommendation[]>('/student/analysis/recommendations')
}

// ── CV ─────────────────────────────────────────────────────

export function getCVProfile() {
  return api.get<CVProfile>('/student/cv')
}

export function updateCVProfile(updates: Partial<CVProfile>) {
  return api.put<CVProfile>('/student/cv', updates)
}

export function getCVAnalysis() {
  return api.get<CVAnalysis>('/student/cv/analysis')
}

export function downloadCV(template: string) {
  return api.get<Blob>(`/student/cv/download?template=${template}`)
}

// ── Settings ───────────────────────────────────────────────

export interface StudentSettings {
  email: string
  notifications: {
    jobAlerts: boolean
    applicationUpdates: boolean
    messages: boolean
    weeklyDigest: boolean
  }
  privacy: {
    profileVisible: boolean
    showGitHub: boolean
    showEmail: boolean
  }
}

export function getStudentSettings() {
  return api.get<StudentSettings>('/student/settings')
}

export function updateStudentSettings(updates: Partial<StudentSettings>) {
  return api.put<StudentSettings>('/student/settings', updates)
}

export function changePassword(data: { currentPassword: string; newPassword: string }) {
  return api.post<{ success: boolean }>('/student/settings/change-password', data)
}

export function deleteAccount() {
  return api.delete<{ success: boolean }>('/student/settings/account')
}
