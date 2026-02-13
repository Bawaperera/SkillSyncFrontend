# SkillSync - Complete UX Research & User Flow Documentation

## 📐 UX Design Philosophy

**Core Principle:** "Don't make users think. Guide them naturally through their journey."

**Design Goals:**
1. **Clarity** - Users always know where they are and what to do next
2. **Progressive Disclosure** - Show information when needed, not all at once
3. **Goal-Oriented** - Each page should move users closer to their primary goal
4. **Consistency** - Similar actions look and behave the same across the platform

---

# 🌐 PUBLIC LANDING PAGE (Before Login)

## First Impression Strategy
**User arrives at:** `https://skillsync.lk`
**Goal:** Within 5 seconds, user should understand what SkillSync does and for whom

### Landing Page Structure

#### 1. HERO SECTION (Above the Fold)
**What users see immediately:**

```
┌─────────────────────────────────────────────────────────────┐
│  [SkillSync Logo]                    [Features] [About] [Login] [Sign Up] │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│        Bridge Your Skill Gaps,                                │
│        Land Your Dream Tech Job                               │
│                                                               │
│   AI-powered platform connecting Sri Lankan students          │
│   with tech careers through verified skill analysis           │
│                                                               │
│   [Get Started as Student]  [I'm a Recruiter]                │
│                                                               │
│   🎓 For Students  |  🏢 For Companies  |  🎓 For Universities│
│                                                               │
│         [Hero Image/Animation: Student → Skills → Job]        │
└─────────────────────────────────────────────────────────────┘
```

**Design Notes:**
- Large, clear headline stating the main benefit
- Two prominent CTAs (Student and Recruiter paths are different)
- Visual showing the journey
- Trust indicators: "Used by 1000+ students" "Partnered with top companies"

#### 2. NAVIGATION BAR (Sticky)
**What to include:**
```
┌─────────────────────────────────────────────────────────┐
│ [SkillSync Logo]  [How It Works▼] [Features▼] [About Us] [Contact]    [Login] [Sign Up] │
└─────────────────────────────────────────────────────────┘
```

**Dropdown Menus:**
- **How It Works** → Shows different flows:
  - For Students
  - For Recruiters
  - For Universities
- **Features** → Quick links to feature explanations
- **Login/Sign Up** → Always visible and prominent

**Behavior:** Sticky (follows as user scrolls)

#### 3. VALUE PROPOSITION SECTION (Scroll Down)
**Three Cards Side by Side:**

```
┌──────────────┬──────────────┬──────────────┐
│ 👨‍🎓 Students  │ 🏢 Recruiters │ 🎓 Universities│
│              │              │              │
│ Discover your│ Find verified│ Align your   │
│ skill gaps & │ candidates   │ curriculum   │
│ get job-ready│ faster with  │ with industry│
│              │ AI matching  │ demands      │
│              │              │              │
│ [Learn More] │ [Learn More] │ [Learn More] │
└──────────────┴──────────────┴──────────────┘
```

**Design Decision:** Separate sections because each persona has different needs and language

#### 4. HOW IT WORKS SECTION
**Visual Step-by-Step Flow (Icons + Text):**

**For Students:**
```
1. Sign Up → 2. Upload CV + Connect GitHub → 3. Get Skill Analysis → 
4. See Learning Path → 5. Apply to Matched Jobs
```

**For Recruiters:**
```
1. Create Account → 2. Post Job → 3. Get AI-Matched Candidates → 
4. Review Profiles → 5. Hire Best Fit
```

**Interactive Element:** Toggle between student and recruiter views

#### 5. KEY FEATURES SHOWCASE
**Grid Layout (2x3):**
- AI Skill Gap Analysis (with sample report image)
- GitHub Integration (show GitHub profile analysis)
- Smart CV Builder (show template preview)
- Job Matching (show match score example)
- Learning Pathways (show course recommendations)
- Curriculum Analytics (for universities)

**Design Pattern:** Feature cards with hover effects showing more details

#### 6. SOCIAL PROOF
- Student testimonials with photos
- Company logos that use SkillSync
- University partnerships
- Statistics: "1000+ students placed" "50+ companies hiring"

#### 7. CALL TO ACTION SECTION
```
┌─────────────────────────────────────────────────────┐
│        Ready to Bridge Your Skill Gap?               │
│                                                      │
│   [Start Your Journey - Free]  [Talk to Sales]      │
│                                                      │
│   No credit card required • Get started in 2 minutes│
└─────────────────────────────────────────────────────┘
```

#### 8. FOOTER
- Quick Links (Features, About, Contact, Privacy, Terms)
- Social Media Links
- Contact Information
- Newsletter Signup

---

## Landing Page User Flow Decision Tree

```
User Lands on Homepage
│
├─ Scrolls to Learn More
│  └─ Reads features → Clicks "Sign Up"
│
├─ Clicks "Get Started as Student"
│  └─ Goes directly to Student Registration
│
├─ Clicks "I'm a Recruiter"
│  └─ Goes to Recruiter Registration
│
└─ Already has account → Clicks "Login"
   └─ Goes to Login Page (with role selection)
```

---

# 🔐 AUTHENTICATION FLOW

## Login Page Structure

```
┌─────────────────────────────────────────┐
│          SkillSync Logo                 │
│                                         │
│      Welcome Back!                      │
│                                         │
│   Email: [________________]            │
│                                         │
│   Password: [________________] [👁️]    │
│                                         │
│   [x] Remember me    [Forgot password?]│
│                                         │
│   [        Login        ]              │
│                                         │
│   ─────── Or ────────                  │
│                                         │
│   [Continue with Google]               │
│                                         │
│   Don't have an account? [Sign Up]     │
└─────────────────────────────────────────┘
```

**After Login → Where to redirect?**
- Student → Student Dashboard
- Recruiter → Recruiter Dashboard
- University Staff → University Analytics Dashboard
- Admin → Admin Panel

## Registration Page Structure

**Step 1: Choose Your Role**
```
┌─────────────────────────────────────────┐
│      Join SkillSync Today               │
│                                         │
│   I am a...                            │
│                                         │
│   ┌──────────┐  ┌──────────┐          │
│   │ 👨‍🎓       │  │ 🏢       │          │
│   │ Student  │  │ Recruiter│          │
│   │          │  │          │          │
│   └──────────┘  └──────────┘          │
│                                         │
│   ┌──────────┐                         │
│   │ 🎓       │                         │
│   │University│                         │
│   │ Staff    │                         │
│   └──────────┘                         │
└─────────────────────────────────────────┘
```

**Step 2a: Student Registration**
```
┌─────────────────────────────────────────┐
│   Create Your Student Account          │
│                                         │
│   Full Name: [________________]        │
│   Email: [________________]            │
│   Password: [________________]         │
│   Confirm Password: [________________] │
│                                         │
│   University: [Select University ▼]    │
│   Degree Program: [Select Program ▼]   │
│   Graduation Year: [2024 ▼]           │
│                                         │
│   [x] I agree to Terms and Privacy     │
│                                         │
│   [   Create Account   ]               │
│                                         │
│   Already have account? [Login]        │
└─────────────────────────────────────────┘
```

**After Student Registration → Where do they land?**
**→ ONBOARDING FLOW (Not dashboard immediately!)**

---

# 👨‍🎓 STUDENT ONBOARDING FLOW (First-Time Experience)

## Why Onboarding Matters
**Problem:** If we dump students on the dashboard immediately, they're overwhelmed and don't know what to do.

**Solution:** Guided onboarding that:
1. Collects essential information
2. Teaches them how to use the platform
3. Gets them to their first "aha!" moment quickly

## Onboarding Step Structure

### Step 1: Welcome Screen
```
┌─────────────────────────────────────────┐
│                                         │
│       Welcome to SkillSync! 🎉          │
│                                         │
│   Let's set up your profile in 3 minutes│
│                                         │
│   We'll help you:                       │
│   ✓ Upload your CV                      │
│   ✓ Connect your GitHub                 │
│   ✓ Find your skill gaps                │
│                                         │
│   ● ○ ○ ○                               │
│   Step 1 of 4                           │
│                                         │
│   [    Let's Go!    ] [Skip for now]   │
└─────────────────────────────────────────┘
```

### Step 2: Upload CV
```
┌─────────────────────────────────────────┐
│   📄 Upload Your CV                     │
│                                         │
│   Upload your latest CV so we can      │
│   extract your skills automatically    │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  Drag & Drop CV here            │  │
│   │  or                             │  │
│   │  [Browse Files]                 │  │
│   │                                 │  │
│   │  Supported: PDF, DOCX (Max 5MB) │  │
│   └─────────────────────────────────┘  │
│                                         │
│   ● ● ○ ○                               │
│   Step 2 of 4                           │
│                                         │
│   [Back]          [Skip]    [Continue] │
└─────────────────────────────────────────┘
```

**After Upload:**
```
┌─────────────────────────────────────────┐
│   ✅ CV Uploaded Successfully!          │
│                                         │
│   We found:                             │
│   • 12 skills                           │
│   • 2 years experience                  │
│   • 3 projects                          │
│                                         │
│   [View Extracted Data]                │
│                                         │
│   [    Continue    ]                   │
└─────────────────────────────────────────┘
```

### Step 3: Connect GitHub
```
┌─────────────────────────────────────────┐
│   🐙 Connect Your GitHub                │
│                                         │
│   Link your GitHub to verify your       │
│   coding skills through real projects   │
│                                         │
│   Benefits:                             │
│   ✓ Automatic skill detection           │
│   ✓ Project showcase                    │
│   ✓ Higher profile credibility          │
│                                         │
│   [🐙 Connect with GitHub]              │
│                                         │
│   ● ● ● ○                               │
│   Step 3 of 4                           │
│                                         │
│   [Back]          [Skip]    [Continue] │
└─────────────────────────────────────────┘
```

### Step 4: Choose Target Role
```
┌─────────────────────────────────────────┐
│   🎯 What's Your Dream Job?             │
│                                         │
│   Select your target role so we can     │
│   show relevant opportunities           │
│                                         │
│   ┌────────────┐ ┌────────────┐        │
│   │ Full-Stack │ │  Frontend  │        │
│   │ Developer  │ │  Developer │        │
│   └────────────┘ └────────────┘        │
│                                         │
│   ┌────────────┐ ┌────────────┐        │
│   │  Backend   │ │    Data    │        │
│   │ Developer  │ │  Analyst   │        │
│   └────────────┘ └────────────┘        │
│                                         │
│   [+ Other]                             │
│                                         │
│   ● ● ● ●                               │
│   Step 4 of 4                           │
│                                         │
│   [Back]              [Finish Setup]   │
└─────────────────────────────────────────┘
```

### Step 5: Completion & First Action
```
┌─────────────────────────────────────────┐
│   🎉 You're All Set!                    │
│                                         │
│   Your profile is ready.                │
│   Let's see how you stack up!           │
│                                         │
│   [🚀 Run My First Skill Analysis]     │
│                                         │
│   This will show you:                   │
│   • Your current skill score            │
│   • What skills you're missing          │
│   • Personalized learning path          │
│                                         │
│   [    Go to Dashboard Instead    ]    │
└─────────────────────────────────────────┘
```

**Design Decision:** First action is NOT to explore, but to get their first insight (skill analysis). This creates immediate value.

---

# 🏠 STUDENT DASHBOARD (Main Hub After Onboarding)

## Dashboard Layout Structure

```
┌──────────────────────────────────────────────────────────────────┐
│ [☰] SkillSync                    🔍 Search    🔔 (3)  👤 Profile │
├────────┬─────────────────────────────────────────────────────────┤
│        │ Dashboard                                               │
│  MENU  │                                                         │
│        │ Welcome back, Bawantha! 👋                             │
│ 🏠 Dash│                                                         │
│        │ ┌─────────────────────────────────────────────────┐   │
│ 📊 My  │ │  ⚠️ ACTION NEEDED (Priority Banner)             │   │
│ Profile│ │  Your profile is 60% complete                   │   │
│        │ │  [Complete Profile to Match with More Jobs]     │   │
│ 📄 My  │ └─────────────────────────────────────────────────┘   │
│ CV     │                                                         │
│        │ ┌──────┬──────┬──────┬──────┐                         │
│ 🎯 Skill││ 📊   │ 💼   │ 📚   │ ⭐    │ (Stats Cards)           │
│ Analysis││ 15   │ 85%  │ 5    │ 3     │                         │
│        │ │Skills│Score │Gaps  │Apps   │                         │
│ 📚 Learn││      │      │      │       │                         │
│ Path   │ └──────┴──────┴──────┴──────┘                         │
│        │                                                         │
│ 💼 Find│ ┌─────────────────────────────────────┐               │
│ Jobs   │ │  📈 Your Progress This Month         │               │
│        │ │  [Progress Chart/Graph]             │               │
│ 📨 Apps│ │                                      │               │
│        │ └─────────────────────────────────────┘               │
│ ⚙️ Set │                                                         │
│        │ ┌──────────────┬──────────────┐                       │
│ 🚪 Logout││ 🎯 Quick     │ 📰 Latest   │                       │
│        │ │   Actions    │    Updates   │                       │
└────────┴─────────────────────────────────────────────────────────┘
```

## Dashboard Content Prioritization

### 1. TOP PRIORITY (Always Visible)
**Progress Banner (If applicable):**
- Profile incomplete? → "Complete your profile"
- No CV uploaded? → "Upload CV to get started"
- No skill analysis? → "Run your first skill analysis"
- Analysis done? → "View your personalized learning path"

**Why:** Every user should have a clear next action

### 2. STATS OVERVIEW (Key Metrics)
```
┌──────────────────────────────────────────────────┐
│  Skills  │  Skill Score  │  Skill Gaps  │  Apps  │
│   15     │     85%       │      5       │   3    │
└──────────────────────────────────────────────────┘
```

**Click Behavior:**
- Click "Skills" → Goes to Profile (Skills section)
- Click "Skill Score" → Goes to Skill Analysis page
- Click "Skill Gaps" → Goes to Skill Analysis (gaps section)
- Click "Apps" → Goes to Applications page

### 3. PROGRESS VISUALIZATION
**Chart showing:**
- Skill score over time
- Learning progress
- Application activity

### 4. QUICK ACTIONS (3-4 Max)
```
┌────────────────────────────────────────┐
│  🎯 Quick Actions                      │
│                                        │
│  [🔍 Find Jobs]  [📚 Continue Learning]│
│  [📄 Update CV]  [📊 View Full Report]│
└────────────────────────────────────────┘
```

### 5. RECENT ACTIVITY / UPDATES
- New jobs matching your skills (3-5 cards)
- Learning path items due soon
- Application status changes
- Skill recommendations

### 6. RECOMMENDED FOR YOU (Personalized)
- Jobs with high match scores
- Courses based on skill gaps
- Similar profiles who got hired

---

## Sidebar Navigation (Student)

### Primary Navigation (Always Visible)
```
┌─────────────────┐
│ 🏠 Dashboard    │ → Main dashboard
│ 📊 My Profile   │ → Profile management
│ 📄 My CV        │ → CV upload/builder
│ 🎯 Skill Analysis│→ Gap analysis
│ 📚 Learning Path│ → Courses/resources
│ 💼 Find Jobs    │ → Job search
│ 📨 Applications │ → Application tracking
│ ⚙️ Settings     │ → Account settings
│ 🚪 Logout       │
└─────────────────┘
```

**Design Decisions:**
- Icons + Text (not icon-only - clearer)
- Active page highlighted with background color
- Collapsible on mobile
- Max 8-9 items (more = overwhelming)

---

# 📊 MY PROFILE PAGE (Student)

## Page Layout & Information Architecture

```
┌──────────────────────────────────────────────────────────┐
│ [← Back to Dashboard]      My Profile      [Preview as Recruiter]│
├──────────────────────────────────────────────────────────┤
│                                                            │
│ ┌────────┐                                                │
│ │ Photo  │  Bawantha Perera                              │
│ │        │  Full-Stack Developer                          │
│ └────────┘  📍 Colombo, Sri Lanka                        │
│             [Edit Profile Picture]                        │
│                                                            │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                            │
│ TABS: [Personal Info] [Education] [Experience] [Skills] [Projects]│
│                                                            │
│ ┌────────────────────────────────────────────────────┐  │
│ │ Personal Information                         [Edit]│  │
│ │                                                    │  │
│ │ Full Name: Bawantha Perera                         │  │
│ │ Email: bawantha@email.com                          │  │
│ │ Phone: +94 77 123 4567                            │  │
│ │ LinkedIn: linkedin.com/in/bawantha                 │  │
│ │ GitHub: github.com/bawantha                        │  │
│ │ Portfolio: bawantha.dev                            │  │
│ │                                                    │  │
│ │ Bio:                                               │  │
│ │ Passionate full-stack developer with experience... │  │
│ │                                                    │  │
│ └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

## Tab Content Structure

### Tab 1: Personal Info
- Contact details
- Bio
- Social links
- Location preferences
- Availability (Immediate, 1 month notice, etc.)

### Tab 2: Education
```
┌────────────────────────────────────────┐
│ Education                       [+ Add]│
│                                        │
│ ┌──────────────────────────────────┐  │
│ │ BSc in Computer Science          │  │
│ │ University of Colombo            │  │
│ │ 2021 - 2025 | GPA: 3.8/4.0      │  │
│ │                           [Edit] │  │
│ └──────────────────────────────────┘  │
│                                        │
│ ┌──────────────────────────────────┐  │
│ │ A-Levels                         │  │
│ │ Royal College                    │  │
│ │ 2019 - 2020 | A A B             │  │
│ │                           [Edit] │  │
│ └──────────────────────────────────┘  │
└────────────────────────────────────────┘
```

### Tab 3: Experience
```
┌────────────────────────────────────────┐
│ Work Experience                 [+ Add]│
│                                        │
│ ┌──────────────────────────────────┐  │
│ │ Software Engineering Intern      │  │
│ │ Tech Company Ltd                 │  │
│ │ Jan 2024 - Jun 2024 (6 months)  │  │
│ │                                  │  │
│ │ • Developed REST APIs using...   │  │
│ │ • Collaborated with team of...   │  │
│ │                                  │  │
│ │ Skills: Python, Django, React    │  │
│ │                           [Edit] │  │
│ └──────────────────────────────────┘  │
└────────────────────────────────────────┘
```

### Tab 4: Skills (Most Important!)
```
┌────────────────────────────────────────────────────┐
│ Skills                                             │
│                                                    │
│ [All Skills] [From CV] [From GitHub] [Manual]     │
│                                                    │
│ Programming Languages                              │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐             │
│ │Python   │ │JavaScript│ │Java     │             │
│ │⭐⭐⭐⭐⭐│ │⭐⭐⭐⭐   │ │⭐⭐⭐     │             │
│ │✓ CV     │ │✓ CV      │ │✓ GitHub │             │
│ │✓ GitHub │ │✓ GitHub  │ │         │             │
│ └─────────┘ └─────────┘ └─────────┘             │
│                                                    │
│ Frameworks & Libraries                             │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐             │
│ │React    │ │Django   │ │Node.js  │             │
│ │⭐⭐⭐⭐   │ │⭐⭐⭐⭐⭐│ │⭐⭐⭐     │             │
│ └─────────┘ └─────────┘ └─────────┘             │
│                                                    │
│ [+ Add Skill Manually]                            │
└────────────────────────────────────────────────────┘
```

**Visual Design Notes:**
- Skills show star rating (AI-calculated score)
- Badge showing source (CV, GitHub, Manual)
- Verified skills have ✓ checkmark
- Can expand to see evidence (which projects used this skill)

### Tab 5: Projects
```
┌────────────────────────────────────────┐
│ Projects                        [+ Add]│
│                                        │
│ ┌──────────────────────────────────┐  │
│ │ [Project Image]                  │  │
│ │                                  │  │
│ │ E-commerce Platform              │  │
│ │ Full-stack web application...    │  │
│ │                                  │  │
│ │ 🔧 React • Node.js • MongoDB    │  │
│ │ 🔗 github.com/...  🌐 Live Demo │  │
│ │                           [Edit] │  │
│ └──────────────────────────────────┘  │
└────────────────────────────────────────┘
```

---

# 📄 MY CV PAGE

## Two Sub-Sections

### Section A: CV Upload & Management
```
┌─────────────────────────────────────────────┐
│ My CV                                       │
│                                             │
│ ┌─────────────────────────────────────┐   │
│ │ 📄 Current CV                        │   │
│ │                                      │   │
│ │ Resume_Bawantha_2025.pdf             │   │
│ │ Uploaded: 2 days ago                 │   │
│ │ Status: ✓ Parsed Successfully        │   │
│ │                                      │   │
│ │ Extracted:                           │   │
│ │ • 15 skills                          │   │
│ │ • 2 work experiences                 │   │
│ │ • 3 projects                         │   │
│ │                                      │   │
│ │ [View Extracted Data]  [Download]   │   │
│ │ [Upload New Version]   [Delete]     │   │
│ └─────────────────────────────────────┘   │
│                                             │
│ ┌─────────────────────────────────────┐   │
│ │ 📊 CV Score: 85/100                  │   │
│ │                                      │   │
│ │ ✓ Contact info present               │   │
│ │ ✓ Skills clearly listed              │   │
│ │ ⚠️ Missing: LinkedIn URL             │   │
│ │ ⚠️ Missing: Portfolio link           │   │
│ │                                      │   │
│ │ [Improve CV]                         │   │
│ └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

### Section B: CV Builder (If they don't have CV)
```
┌─────────────────────────────────────────────┐
│ Smart CV Builder                            │
│                                             │
│ Create ATS-friendly CV in minutes           │
│                                             │
│ ┌───────┐ ┌───────┐ ┌───────┐             │
│ │Modern │ │Classic│ │Tech   │             │
│ │       │ │       │ │       │             │
│ └───────┘ └───────┘ └───────┘             │
│                                             │
│ [Start Building]                            │
│                                             │
│ Or                                          │
│ [Import from LinkedIn]                      │
└─────────────────────────────────────────────┘
```

---

# 🎯 SKILL ANALYSIS PAGE (Most Important!)

## Why This Page is Critical
This is where students get their "aha!" moment - they see exactly what they need to learn.

## Page Structure

```
┌──────────────────────────────────────────────────────────┐
│ [← Back]        AI-Powered Skill Gap Analysis            │
├──────────────────────────────────────────────────────────┤
│                                                            │
│ ┌────────────────────────────────────────────────────┐  │
│ │ 🎯 Your Target Role: Full-Stack Developer          │  │
│ │ [Change Role]                                      │  │
│ └────────────────────────────────────────────────────┘  │
│                                                            │
│ ┌────────────────────────────────────────────────────┐  │
│ │         YOUR SKILL GAP SCORE                       │  │
│ │                                                     │  │
│ │              [Circular Progress]                   │  │
│ │                   78/100                           │  │
│ │                                                     │  │
│ │            🎉 Good Match!                          │  │
│ │   You're ready for many opportunities             │  │
│ │   Close 5 key gaps to reach 90%                   │  │
│ └────────────────────────────────────────────────────┘  │
│                                                            │
│ TABS: [Overview] [Skill Gaps] [Matches] [Recommendations] │
│                                                            │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                            │
│ Tab 1: OVERVIEW                                           │
│                                                            │
│ ┌──────────────┬──────────────┐                          │
│ │ ✅ You Have  │ ❌ You Need  │                          │
│ │              │              │                          │
│ │ • Python     │ • Docker     │                          │
│ │ • React      │ • Kubernetes │                          │
│ │ • Node.js    │ • AWS        │                          │
│ │ • MongoDB    │ • Testing    │                          │
│ │ • Git        │ • CI/CD      │                          │
│ │              │              │                          │
│ │ 15 skills    │ 5 gaps       │                          │
│ └──────────────┴──────────────┘                          │
│                                                            │
│ ┌────────────────────────────────────────────────────┐  │
│ │ 📊 Skill Distribution                              │  │
│ │ [Radar Chart showing skill categories]             │  │
│ └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

## Tab 2: Skill Gaps (Detailed Breakdown)
```
┌──────────────────────────────────────────────────────┐
│ Critical Gaps (Learn These First!)                   │
│                                                       │
│ ┌─────────────────────────────────────────────────┐ │
│ │ 🔴 Docker                         Priority: High│ │
│ │                                                 │ │
│ │ Why you need it:                                │ │
│ │ • Required in 78% of Full-Stack jobs            │ │
│ │ • Containerization is industry standard         │ │
│ │                                                 │ │
│ │ Current level: None                             │ │
│ │ Target level: ⭐⭐⭐⭐                           │ │
│ │                                                 │ │
│ │ Estimated learning time: 2-3 weeks              │ │
│ │                                                 │ │
│ │ [📚 See Learning Resources]   [✓ Mark as Known]│ │
│ └─────────────────────────────────────────────────┘ │
│                                                       │
│ ┌─────────────────────────────────────────────────┐ │
│ │ 🟡 Kubernetes                     Priority: Med │ │
│ │ ... similar structure ...                       │ │
│ └─────────────────────────────────────────────────┘ │
│                                                       │
│ Minor Gaps (Nice to Have)                            │
│ ┌─────────────────────────────────────────────────┐ │
│ │ 🟢 GraphQL                         Priority: Low│ │
│ │ ... similar structure ...                       │ │
│ └─────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────┘
```

## Tab 3: Job Matches
```
┌──────────────────────────────────────────────────────┐
│ Jobs Matching Your Skills (23 found)                 │
│                                                       │
│ Sort by: [Best Match ▼]  Filter: [Location ▼]       │
│                                                       │
│ ┌─────────────────────────────────────────────────┐ │
│ │ Full-Stack Developer - Tech Corp      Match: 92%│ │
│ │ 📍 Colombo | 💰 LKR 80k-120k | 🏢 50-100        │ │
│ │                                                 │ │
│ │ ✅ Matching Skills (12/15):                     │ │
│ │ Python • React • Node.js • MongoDB...           │ │
│ │                                                 │ │
│ │ ❌ Missing Skills (3/15):                       │ │
│ │ Docker • Kubernetes • AWS                       │ │
│ │                                                 │ │
│ │ [View Job Details]        [Apply Now]          │ │
│ └─────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────┘
```

## Tab 4: Recommendations
```
┌──────────────────────────────────────────────────────┐
│ Your Personalized Learning Path                      │
│                                                       │
│ Complete these to reach 90% match score              │
│ Estimated time: 6-8 weeks                            │
│                                                       │
│ ┌─────────────────────────────────────────────────┐ │
│ │ Week 1-2: Docker Fundamentals                   │ │
│ │                                                 │ │
│ │ 📹 Docker for Beginners (Udemy)                 │ │
│ │    ⏱️ 4 hours | ⭐ 4.7 | 💰 LKR 2,500          │ │
│ │    [Enroll]                                     │ │
│ │                                                 │ │
│ │ 📹 Docker Tutorial (YouTube - FREE)             │ │
│ │    ⏱️ 2 hours | ⭐ 4.9                          │ │
│ │    [Watch Now]                                  │ │
│ │                                                 │ │
│ │ 🛠️ Practice Project: Dockerize Your Portfolio  │ │
│ │    [Start Project]                              │ │
│ └─────────────────────────────────────────────────┘ │
│                                                       │
│ [💾 Save Learning Path]  [📧 Email to Me]          │
└──────────────────────────────────────────────────────┘
```

---

# 📚 LEARNING PATH PAGE

## Page Layout
```
┌──────────────────────────────────────────────────────┐
│ My Learning Path                                     │
│                                                       │
│ ┌────────────────────────────────────┐              │
│ │ 📊 Your Progress                   │              │
│ │                                    │              │
│ │ [Progress Bar: 30% Complete]      │              │
│ │                                    │              │
│ │ 3/10 courses completed             │              │
│ │ 2 in progress | 5 not started      │              │
│ └────────────────────────────────────┘              │
│                                                       │
│ Filter: [All] [In Progress] [Completed] [Saved]     │
│                                                       │
│ ┌─────────────────────────────────────────────────┐ │
│ │ 🎯 Critical Skills (Close Your Gaps)            │ │
│ │                                                 │ │
│ │ ┌──────────────────────────────────────────┐  │ │
│ │ │ [✓] Docker Fundamentals      COMPLETED   │  │ │
│ │ │     Udemy | 4 hours | Completed: 2 days ago│││
│ │ │     [View Certificate]                    │  │ │
│ │ └──────────────────────────────────────────┘  │ │
│ │                                                 │ │
│ │ ┌──────────────────────────────────────────┐  │ │
│ │ │ [▶️] Kubernetes Basics       IN PROGRESS │  │ │
│ │ │     Coursera | 6 hours | 40% complete    │  │ │
│ │ │     [█████░░░░░]                         │  │ │
│ │ │     [Continue Learning]                   │  │ │
│ │ └──────────────────────────────────────────┘  │ │
│ │                                                 │ │
│ │ ┌──────────────────────────────────────────┐  │ │
│ │ │ [○] AWS Fundamentals         NOT STARTED │  │ │
│ │ │     freeCodeCamp | 8 hours | FREE        │  │ │
│ │ │     [Start Course]                        │  │ │
│ │ └──────────────────────────────────────────┘  │ │
│ └─────────────────────────────────────────────────┘ │
│                                                       │
│ ┌─────────────────────────────────────────────────┐ │
│ │ 📖 Recommended for You                          │ │
│ │ (Based on jobs you saved)                       │ │
│ │ ... similar course cards ...                    │ │
│ └─────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────┘
```

---

# 💼 FIND JOBS PAGE

## Page Layout
```
┌──────────────────────────────────────────────────────────┐
│ Find Your Perfect Job                                    │
│                                                           │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ 🔍 [Search: Job title, company, or skill...]       │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                           │
│ ┌─────────┬─────────────────────────────────────────┐  │
│ │ FILTERS │ RESULTS (127 jobs found)                │  │
│ │         │                                         │  │
│ │ Match % │ Sort by: [Best Match ▼]                │  │
│ │ [x] 80+ │                                         │  │
│ │ [ ] 60+ │ ┌──────────────────────────────────┐  │  │
│ │ [ ] All │ │ 🏢 Full-Stack Developer          │  │  │
│ │         │ │ Tech Innovations (Pvt) Ltd       │  │  │
│ │ Location│ │ 📍 Colombo | 💰 80k-120k | 🕐 1d ago││
│ │ [ ] Col │ │                                  │  │  │
│ │ [ ] Kan │ │ Match Score: 92% ████████▒░      │  │  │
│ │ [x] Rem │ │                                  │  │  │
│ │         │ │ ✅ 12/15 skills match            │  │  │
│ │ Job Type│ │ ❌ Missing: Docker, Kubernetes   │  │  │
│ │ [x] FT  │ │                                  │  │  │
│ │ [ ] PT  │ │ [💾 Save] [View Details] [Apply]│  │  │
│ │ [ ] Int │ └──────────────────────────────────┘  │  │
│ │         │                                         │  │
│ │ Exp Lev │ ┌──────────────────────────────────┐  │  │
│ │ [x] Ent │ │ 🏢 Backend Developer             │  │  │
│ │ [ ] Mid │ │ Digital Solutions Ltd            │  │  │
│ │ [ ] Sen │ │ 📍 Remote | 💰 60k-90k | 🕐 2d ago ││
│ │         │ │                                  │  │  │
│ │ Salary  │ │ Match Score: 85% ████████░░      │  │  │
│ │ 0──────100k│                                  │  │  │
│ │ [50k───90k]│ ✅ 10/13 skills match            │  │  │
│ │         │ │ ❌ Missing: PostgreSQL, Redis    │  │  │
│ │ [Reset] │ │                                  │  │  │
│ │         │ │ [💾 Save] [View Details] [Apply]│  │  │
│ │         │ └──────────────────────────────────┘  │  │
│ └─────────┴─────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

## Job Detail Page (When clicking "View Details")
```
┌──────────────────────────────────────────────────────────┐
│ [← Back to Jobs]                    [💾 Save] [📤 Share]│
│                                                           │
│ Full-Stack Developer                                     │
│ Tech Innovations (Pvt) Ltd                               │
│                                                           │
│ 📍 Colombo, Sri Lanka    💰 LKR 80,000 - 120,000        │
│ 🕐 Posted 1 day ago      👥 50-100 employees            │
│ 🏢 Software Development  ⏱️ Full-time                    │
│                                                           │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                           │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ 🎯 YOUR MATCH SCORE: 92%                            │ │
│ │                                                     │ │
│ │ You're a great fit for this role!                  │ │
│ │                                                     │ │
│ │ ✅ Matching Skills (12/15):                        │ │
│ │ Python • React • Node.js • Express • MongoDB •     │ │
│ │ Git • RESTful APIs • HTML/CSS • JavaScript •       │ │
│ │ Agile • Problem Solving • Communication            │ │
│ │                                                     │ │
│ │ ❌ Skills You're Missing (3/15):                   │ │
│ │ Docker • Kubernetes • AWS                          │ │
│ │                                                     │ │
│ │ [📚 Learn These Skills]                            │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                           │
│ TABS: [Description] [Requirements] [Benefits] [Company]  │
│                                                           │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                           │
│ Job Description                                          │
│                                                           │
│ We are seeking a talented Full-Stack Developer...       │
│ [Full job description text]                              │
│                                                           │
│ Requirements                                              │
│ • Bachelor's degree in Computer Science                  │
│ • 1-2 years of experience                                │
│ • Strong knowledge of React and Node.js                  │
│ ...                                                       │
│                                                           │
│ Benefits                                                  │
│ • Competitive salary                                     │
│ • Health insurance                                       │
│ • Flexible working hours                                 │
│ ...                                                       │
│                                                           │
│ ┌───────────────────────────────────────────────────┐   │
│ │ Ready to Apply?                                   │   │
│ │                                                   │   │
│ │ [✅ Apply with SkillSync CV]                     │   │
│ │ [📄 Apply with Different CV]                     │   │
│ └───────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────┘
```

---

# 📨 APPLICATIONS PAGE

## Page Layout
```
┌──────────────────────────────────────────────────────────┐
│ My Applications                                          │
│                                                           │
│ ┌──────────────────────────────────────────────────────┐│
│ │ 📊 Application Stats                                 ││
│ │                                                      ││
│ │ Total: 12  |  Under Review: 5  |  Interviews: 2     ││
│ │ Rejected: 3  |  Offers: 1                           ││
│ └──────────────────────────────────────────────────────┘│
│                                                           │
│ Filter: [All] [Active] [Archived]                        │
│                                                           │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ 🎉 Full-Stack Developer - Tech Corp  OFFER RECEIVED││ │
│ │ Applied: 5 days ago | Last update: 1 hour ago      │ │
│ │                                                     │ │
│ │ Status Timeline:                                    │ │
│ │ ✓ Applied → ✓ Under Review → ✓ Interview → ● Offer│ │
│ │                                                     │ │
│ │ [View Offer Details]  [Accept]  [Decline]         │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                           │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ 🔄 Backend Developer - Digital Ltd   UNDER REVIEW  │ │
│ │ Applied: 3 days ago | Last update: 1 day ago       │ │
│ │                                                     │ │
│ │ Status Timeline:                                    │ │
│ │ ✓ Applied → ● Under Review → ○ Interview → ○ Offer │ │
│ │                                                     │ │
│ │ Notes: Interview scheduled for Monday 9 AM         │ │
│ │                                                     │ │
│ │ [View Application]  [Withdraw]  [Add Note]        │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                           │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ ❌ Frontend Developer - Web Agency  REJECTED       │ │
│ │ Applied: 10 days ago | Closed: 2 days ago          │ │
│ │                                                     │ │
│ │ Feedback: Looking for more experience with...      │ │
│ │                                                     │ │
│ │ [📚 Learn Required Skills]  [Archive]              │ │
│ └─────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

---

# ⚙️ SETTINGS PAGE

## Tab Structure
```
┌──────────────────────────────────────────────────────────┐
│ Settings                                                 │
│                                                           │
│ TABS: [Account] [Privacy] [Notifications] [Security]     │
│                                                           │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                           │
│ Account Settings                                          │
│                                                           │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Basic Information                                   │ │
│ │                                                     │ │
│ │ Email: bawantha@email.com          [Change Email]  │ │
│ │ Password: ••••••••                 [Change Password]││
│ │ Phone: +94 77 123 4567             [Edit]         │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                           │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Connected Accounts                                  │ │
│ │                                                     │ │
│ │ GitHub: ✓ Connected (bawantha)     [Disconnect]    │ │
│ │ LinkedIn: ✗ Not connected          [Connect]       │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                           │
│ Privacy Settings                                          │
│                                                           │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Profile Visibility                                  │ │
│ │                                                     │ │
│ │ [x] Make my profile visible to recruiters          │ │
│ │ [ ] Hide my university from recruiters             │ │
│ │ [x] Allow anonymous data for university analytics  │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                           │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Data Management                                     │ │
│ │                                                     │ │
│ │ [Download My Data]  [Delete Account]              │ │
│ └─────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

---

# 🏢 RECRUITER USER FLOW

## Recruiter Landing After Login

```
RECRUITER DASHBOARD
┌──────────────────────────────────────────────────────────┐
│ [☰] SkillSync - Recruiter        🔍 Search  🔔 (5)  👤  │
├────────┬─────────────────────────────────────────────────┤
│ MENU   │ Welcome back, Sarah! (Tech Innovations Ltd)    │
│        │                                                 │
│ 🏠 Dash│ ┌──────┬──────┬──────┬──────┐                 │
│        │ │ 🎯   │ 👥   │ 📩   │ ⭐    │                 │
│ 💼 Jobs││ 5    │ 127  │ 23   │ 85%   │                 │
│        │ │Active│Cands │Apps  │Avg   │                 │
│ 🔍 Find││Jobs  │      │      │Match │                 │
│ Talent │ └──────┴──────┴──────┴──────┘                 │
│        │                                                 │
│ 📩 Apps│ ┌─────────────────────────────────────────┐   │
│        │ │ ⚠️ ACTION NEEDED                        │   │
│ 💬 Msg │ │ 5 new applications require review       │   │
│        │ │ [Review Now]                            │   │
│ 📊 Anal│ └─────────────────────────────────────────┘   │
│        │                                                 │
│ 🏢 Co  │ ┌─────────────────────────────────────────┐   │
│ Profile│ │ Your Active Job Postings                │   │
│        │ │                                         │   │
│ ⚙️ Set │ │ • Full-Stack Developer (15 applicants)  │   │
│        │ │ • Backend Developer (8 applicants)      │   │
│ 🚪 Out │ │ • Frontend Intern (23 applicants)       │   │
│        │ │                                         │   │
│        │ │ [View All Jobs]  [Post New Job]        │   │
│        │ └─────────────────────────────────────────┘   │
└────────┴─────────────────────────────────────────────────┘
```

## Recruiter Sidebar Navigation
```
┌─────────────────────┐
│ 🏠 Dashboard        │
│ 💼 My Jobs          │
│ 🔍 Find Candidates  │ ← Proactive search
│ 📩 Applications     │
│ 💬 Messages         │
│ 📊 Analytics        │
│ 🏢 Company Profile  │
│ ⚙️ Settings         │
│ 🚪 Logout           │
└─────────────────────┘
```

---

# 💼 POST A JOB PAGE (Recruiter)

## Multi-Step Form

### Step 1: Job Basics
```
┌─────────────────────────────────────────────────────┐
│ Post a New Job - Step 1 of 4                       │
│                                                     │
│ Job Basics                                          │
│                                                     │
│ Job Title *                                         │
│ [Full-Stack Developer________________]             │
│                                                     │
│ Employment Type *                                   │
│ ( ) Full-time  ( ) Part-time  ( ) Contract         │
│ ( ) Internship                                      │
│                                                     │
│ Experience Level *                                  │
│ ( ) Entry (0-2 years)                              │
│ (●) Mid (2-5 years)                                │
│ ( ) Senior (5+ years)                              │
│                                                     │
│ Location *                                          │
│ ( ) Office  ( ) Remote  (●) Hybrid                │
│                                                     │
│ If Office/Hybrid:                                   │
│ [Colombo________________]                          │
│                                                     │
│ [    Cancel    ]              [Next: Requirements →]│
└─────────────────────────────────────────────────────┘
```

### Step 2: Job Requirements
```
┌─────────────────────────────────────────────────────┐
│ Post a New Job - Step 2 of 4                       │
│                                                     │
│ Required Skills *                                   │
│ [Type to add skills________________] [+ Add]       │
│                                                     │
│ Selected Skills:                                    │
│ [Python ×] [React ×] [Node.js ×] [MongoDB ×]      │
│ [Git ×] [REST APIs ×]                              │
│                                                     │
│ 💡 AI Suggestions based on "Full-Stack Developer": │
│ [+ Docker] [+ AWS] [+ TypeScript] [+ PostgreSQL]   │
│                                                     │
│ Education Requirements                              │
│ [ ] Bachelor's in Computer Science or related      │
│ [ ] Any Bachelor's degree                          │
│ [ ] No degree requirement                          │
│                                                     │
│ Nice-to-Have Skills                                 │
│ [Type skills that are beneficial but not required]│
│                                                     │
│ [← Back]                          [Next: Details →]│
└─────────────────────────────────────────────────────┘
```

### Step 3: Job Details
```
┌─────────────────────────────────────────────────────┐
│ Post a New Job - Step 3 of 4                       │
│                                                     │
│ Job Description *                                   │
│ ┌─────────────────────────────────────────────────┐│
│ │ We are seeking a talented Full-Stack...        ││
│ │                                                 ││
│ │ [Rich text editor with formatting]             ││
│ │                                                 ││
│ └─────────────────────────────────────────────────┘│
│                                                     │
│ Responsibilities                                    │
│ ┌─────────────────────────────────────────────────┐│
│ │ • Design and develop web applications          ││
│ │ • Collaborate with cross-functional teams      ││
│ │ •                                              ││
│ └─────────────────────────────────────────────────┘│
│                                                     │
│ Salary Range (Optional)                             │
│ Min: [80,000___] Max: [120,000___] LKR/month      │
│                                                     │
│ [ ] Show salary to candidates                      │
│                                                     │
│ [← Back]                [Next: Benefits & Review →]│
└─────────────────────────────────────────────────────┘
```

### Step 4: Benefits & Review
```
┌─────────────────────────────────────────────────────┐
│ Post a New Job - Step 4 of 4                       │
│                                                     │
│ Benefits & Perks                                    │
│ [x] Health Insurance                                │
│ [x] Flexible Working Hours                          │
│ [ ] Work from Home                                  │
│ [x] Training & Development                          │
│ [ ] Free Meals                                      │
│ [ ] Gym Membership                                  │
│                                                     │
│ Custom Benefits:                                    │
│ [Add custom benefit_____________] [+ Add]          │
│                                                     │
│ Application Deadline (Optional)                     │
│ [2025-03-15______] [📅]                            │
│                                                     │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                     │
│ Review & Publish                                    │
│                                                     │
│ [Preview how job appears to candidates]            │
│                                                     │
│ [← Back to Edit]    [Save as Draft]  [Publish Job]│
└─────────────────────────────────────────────────────┘
```

---

# 🔍 FIND CANDIDATES PAGE (Recruiter Proactive Search)

```
┌──────────────────────────────────────────────────────────┐
│ Find Candidates                                          │
│                                                           │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ 🔍 Search by skills, university, or criteria...     │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                           │
│ ┌─────────┬─────────────────────────────────────────┐  │
│ │ FILTERS │ CANDIDATES (89 found)                  │  │
│ │         │                                         │  │
│ │ Skills  │ Sort by: [Best Match ▼]                │  │
│ │ Required│                                         │  │
│ │ [Python]│ ┌──────────────────────────────────┐  │  │
│ │ [React] │ │ 👤 Bawantha Perera                │  │  │
│ │ [+]     │ │ BSc CS, University of Colombo    │  │  │
│ │         │ │ Graduating: 2025 | 📍 Colombo    │  │  │
│ │ Univers │ │                                  │  │  │
│ │ [ ] UoC │ │ Match Score: 92% ████████▒░      │  │  │
│ │ [ ] UoM │ │                                  │  │  │
│ │ [ ] SL  │ │ Top Skills:                      │  │  │
│ │         │ │ Python ⭐⭐⭐⭐⭐ | React ⭐⭐⭐⭐    │  │  │
│ │ Grad Yr │ │ Node.js ⭐⭐⭐⭐ | MongoDB ⭐⭐⭐⭐   │  │  │
│ │ [ ] 2024│ │                                  │  │  │
│ │ [x] 2025│ │ 🐙 GitHub: 25 repos | 150+ commits│ │  │
│ │ [ ] 2026│ │                                  │  │  │
│ │         │ │ [View Profile] [💾 Save] [📧 Message]││
│ │ GitHub  │ └──────────────────────────────────┘  │  │
│ │ [x] Act │                                         │  │
│ │ [ ] All │ ┌──────────────────────────────────┐  │  │
│ │         │ │ 👤 Kasun Silva                   │  │  │
│ │ Availab │ │ BEng Software, SLIIT             │  │  │
│ │ [x] Imm │ │ Graduating: 2025 | 📍 Remote     │  │  │
│ │ [ ] 1mo │ │                                  │  │  │
│ │         │ │ Match Score: 88% ████████░░      │  │  │
│ │ [Reset] │ │ ... similar structure ...        │  │  │
│ │         │ └──────────────────────────────────┘  │  │
│ └─────────┴─────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

---

# 📩 APPLICATIONS MANAGEMENT (Recruiter)

```
┌──────────────────────────────────────────────────────────┐
│ Applications                                             │
│                                                           │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Select Job: [Full-Stack Developer ▼]               │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                           │
│ ┌──────────────────────────────────────────────────────┐│
│ │ 📊 Application Pipeline                              ││
│ │                                                      ││
│ │ New (5) → Under Review (8) → Shortlisted (3) →      ││
│ │ Interview (2) → Offered (1) → Hired (0)             ││
│ └──────────────────────────────────────────────────────┘│
│                                                           │
│ Filter: [All] [New] [Shortlisted] [Interview]           │
│ Sort by: [Best Match ▼]                                  │
│                                                           │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ ✨ Bawantha Perera                   Match: 92% NEW││ │
│ │ BSc CS, University of Colombo | Graduating 2025    │ │
│ │ Applied: 2 hours ago                                │ │
│ │                                                     │ │
│ │ ✅ Strong Match:                                    │ │
│ │ • Has 12/15 required skills                        │ │
│ │ • GitHub: Very active (150+ commits)               │ │
│ │ • 2 relevant projects                              │ │
│ │                                                     │ │
│ │ ❌ Missing: Docker, Kubernetes, AWS                │ │
│ │                                                     │ │
│ │ [View Full Profile] [Shortlist] [Schedule Interview]││
│ │ [Reject] [Add Note]                                │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                           │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ 📌 Kasun Silva                   Match: 88% REVIEW ││ │
│ │ BEng Software, SLIIT | Graduating 2025             │ │
│ │ Applied: 1 day ago | Status changed: 3 hours ago   │ │
│ │                                                     │ │
│ │ ✅ Good Match:                                      │ │
│ │ • Has 10/15 required skills                        │ │
│ │ • Previous internship experience                   │ │
│ │                                                     │ │
│ │ Notes (by you, 3h ago):                            │ │
│ │ "Strong candidate, schedule for technical round"   │ │
│ │                                                     │ │
│ │ [View Profile] [Move to Shortlist] [Add Note]     │ │
│ └─────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

## Candidate Profile View (Recruiter Perspective)

```
┌──────────────────────────────────────────────────────────┐
│ [← Back to Applications]                    [📧 Message] │
│                                                           │
│ ┌────────┐                                               │
│ │ Photo  │  Bawantha Perera                             │
│ │        │  Full-Stack Developer                         │
│ └────────┘  📍 Colombo, Sri Lanka                       │
│             🎓 University of Colombo | Graduating 2025   │
│                                                           │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ 🎯 Match Score for Your Job: 92%                   │ │
│ │                                                     │ │
│ │ ✅ Matching Skills (12/15):                        │ │
│ │ Python ⭐⭐⭐⭐⭐ | React ⭐⭐⭐⭐ | Node.js ⭐⭐⭐⭐        │ │
│ │ + 9 more...                                        │ │
│ │                                                     │ │
│ │ ❌ Missing Skills (3/15):                          │ │
│ │ Docker • Kubernetes • AWS                          │ │
│ │                                                     │ │
│ │ 💡 Learning Status:                                │ │
│ │ Currently learning Docker (40% complete)           │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                           │
│ TABS: [Skills] [Projects] [GitHub] [Experience] [CV]    │
│                                                           │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                           │
│ GitHub Profile Analysis                                  │
│                                                           │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ 🐙 github.com/bawantha                              │ │
│ │                                                     │ │
│ │ Activity Level: 🔥🔥🔥🔥 Very Active                │ │
│ │                                                     │ │
│ │ • 25 public repositories                           │ │
│ │ • 150+ commits in last 6 months                    │ │
│ │ • 10 followers | 15 following                      │ │
│ │                                                     │ │
│ │ Top Languages:                                      │ │
│ │ ▓▓▓▓▓▓▓▓░░ Python (45%)                           │ │
│ │ ▓▓▓▓▓▓░░░░ JavaScript (35%)                       │ │
│ │ ▓▓▓░░░░░░░ Java (15%)                             │ │
│ │ ▓░░░░░░░░░ Other (5%)                             │ │
│ │                                                     │ │
│ │ Featured Projects:                                  │ │
│ │ 1. E-commerce Platform (⭐ 15 stars)               │ │
│ │    Stack: React, Node.js, MongoDB                  │ │
│ │    [View on GitHub]                                │ │
│ │                                                     │ │
│ │ 2. Task Management App (⭐ 8 stars)                │ │
│ │    Stack: Python, Django, PostgreSQL               │ │
│ │    [View on GitHub]                                │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                           │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ 📁 Download CV                                      │ │
│ │ Resume_Bawantha_2025.pdf (Updated: 2 days ago)    │ │
│ │ [📥 Download]                                       │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                           │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Actions                                             │ │
│ │                                                     │ │
│ │ Status: [New ▼]                                    │ │
│ │                                                     │ │
│ │ [Shortlist]  [Schedule Interview]  [Reject]       │ │
│ │ [💾 Save to Talent Pool]  [📧 Send Message]       │ │
│ │                                                     │ │
│ │ Internal Notes:                                     │ │
│ │ ┌─────────────────────────────────────────────────┐││
│ │ │ [Add notes visible only to your team...]       │││
│ │ └─────────────────────────────────────────────────┘││
│ │ [Save Note]                                        │ │
│ └─────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

---

# 🎓 UNIVERSITY STAFF USER FLOW

## University Dashboard

```
┌──────────────────────────────────────────────────────────┐
│ SkillSync Analytics - University of Colombo             │
│                                                           │
│ ┌──────────────────────────────────────────────────────┐│
│ │ 📊 Student Engagement Overview                       ││
│ │                                                      ││
│ │ Students | Active | CV Upload | GitHub | Analysis   ││
│ │  1,247   |  856   |    689    |  412   |   534      ││
│ └──────────────────────────────────────────────────────┘│
│                                                           │
│ ┌──────────────────────────────────────────────────────┐│
│ │ 🎯 Average Skill Gap Score: 72%                     ││
│ │                                                      ││
│ │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░                               ││
│ │                                                      ││
│ │ Trend: ↑ 5% from last semester                      ││
│ └──────────────────────────────────────────────────────┘│
│                                                           │
│ ┌──────────────────────────────────────────────────────┐│
│ │ ⚠️ TOP CURRICULUM GAPS                               ││
│ │                                                      ││
│ │ 1. Docker & Containerization (68% of students lack) ││
│ │ 2. Cloud Computing (AWS/Azure) (61% lack)           ││
│ │ 3. CI/CD Practices (55% lack)                       ││
│ │ 4. Microservices Architecture (52% lack)            ││
│ │ 5. Testing Frameworks (48% lack)                    ││
│ │                                                      ││
│ │ [View Detailed Report]                              ││
│ └──────────────────────────────────────────────────────┘│
│                                                           │
│ ┌────────────────────┬───────────────────────────────┐  │
│ │ 📈 Placement Rate  │ 🏆 Top Hiring Companies      │  │
│ │                    │                               │  │
│ │     78%            │ 1. Tech Innovations Ltd (42)  │  │
│ │ ↑ 12% vs last year │ 2. Digital Solutions (38)     │  │
│ │                    │ 3. Software House (31)        │  │
│ │ [View Details]     │ [View All]                    │  │
│ └────────────────────┴───────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

## University Sidebar Navigation
```
┌──────────────────────┐
│ 🏠 Dashboard         │
│ 📊 Curriculum Gaps   │ ← Most important
│ 👥 Student Analytics │
│ 💼 Industry Trends   │
│ 🎯 Placement Tracking│
│ 📈 Benchmarking      │
│ 📄 Reports           │
│ ⚙️ Settings          │
└──────────────────────┘
```

## Curriculum Gaps Page (Detailed Analysis)

```
┌──────────────────────────────────────────────────────────┐
│ Curriculum Gap Analysis                                  │
│                                                           │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Filters:                                            │ │
│ │ Department: [All ▼] | Year: [2024-25 ▼] | Program│  │
│ └─────────────────────────────────────────────────────┘ │
│                                                           │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ 🔴 CRITICAL GAPS (Industry Demand vs. Student Skills)│││
│ │                                                     │ │
│ │ ┌───────────────────────────────────────────────┐ │ │
│ │ │ Docker & Containerization                     │ │ │
│ │ │                                               │ │ │
│ │ │ Students with skill:  32% ▓▓▓░░░░░░░░░░░░   │ │ │
│ │ │ Industry demand:      85% ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   │ │ │
│ │ │ Gap:                  53% ❌❌❌❌❌❌        │ │ │
│ │ │                                               │ │ │
│ │ │ Appears in: 85% of Full-Stack job postings   │ │ │
│ │ │ Students lacking: 847/1247 (68%)             │ │ │
│ │ │                                               │ │ │
│ │ │ 💡 Recommendation:                            │ │ │
│ │ │ Add "DevOps Fundamentals" course to          │ │ │
│ │ │3rd year curriculum                           │ │ │
│ │ │                                               │ │ │
│ │ │ Similar universities addressing this:         │ │ │
│ │ │ • University of Moratuwa: Added in Year 3    │ │ │
│ │ │ • SLIIT: Integrated into Software Eng course │ │ │
│ │ └───────────────────────────────────────────────┘ │ │
│ │                                                     │ │
│ │ ┌───────────────────────────────────────────────┐ │ │
│ │ │ Cloud Computing (AWS/Azure)                   │ │ │
│ │ │ ... similar breakdown ...                     │ │ │
│ │ └───────────────────────────────────────────────┘ │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                           │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ 🟡 MODERATE GAPS                                    │ │
│ │ ... similar structure ...                           │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                           │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ 🟢 STRENGTHS (Well-Covered in Curriculum)           │ │
│ │                                                     │ │
│ │ • Data Structures & Algorithms (95% coverage)      │ │
│ │ • Object-Oriented Programming (92% coverage)       │ │
│ │ • Database Design (88% coverage)                   │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                           │
│ [📥 Download Full Report] [📧 Email to Faculty]         │
└──────────────────────────────────────────────────────────┘
```

---

# 🎨 DESIGN SYSTEM & VISUAL HIERARCHY

## Color System
```
Primary Actions: Blue (#3B82F6)
Success/Positive: Green (#10B981)
Warning: Yellow/Orange (#F59E0B)
Error/Critical: Red (#EF4444)
Neutral: Gray (#6B7280)

Backgrounds:
- Page Background: #F9FAFB (very light gray)
- Card Background: #FFFFFF (white)
- Hover States: #F3F4F6 (light gray)
```

## Typography Hierarchy
```
H1 (Page Title): 32px, Bold
H2 (Section Title): 24px, Semi-Bold
H3 (Card Title): 18px, Semi-Bold
Body Text: 16px, Regular
Small Text: 14px, Regular
Caption: 12px, Regular
```

## Spacing System
```
xs: 4px   (tight spacing)
sm: 8px   (compact spacing)
md: 16px  (default spacing)
lg: 24px  (comfortable spacing)
xl: 32px  (section breaks)
2xl: 48px (major sections)
```

## Component States
```
Default → Hover → Active → Disabled

Button Example:
Default: Blue background
Hover: Darker blue + slight shadow
Active: Even darker + inset shadow
Disabled: Gray + 50% opacity + no pointer
```

---

# 📱 RESPONSIVE DESIGN BREAKPOINTS

```
Mobile:     < 640px   (Stack everything vertically)
Tablet:     640-1024px (2-column layouts)
Desktop:    > 1024px   (Full multi-column layouts)

Mobile-First Approach:
- Navigation becomes hamburger menu
- Sidebar becomes bottom navigation or drawer
- Tables become cards
- Hide less important info
- Larger touch targets (minimum 44x44px)
```

---

# ⚡ INTERACTION PATTERNS

## Loading States
```
Page Load: Full-page skeleton
Data Fetch: Spinner or skeleton cards
Button Action: Button shows spinner + disabled
Long Operations: Progress bar with percentage
```

## Empty States
```
No Data:
┌─────────────────────────────────┐
│     [Illustration/Icon]         │
│                                 │
│   No jobs found matching        │
│   your criteria                 │
│                                 │
│   Try adjusting your filters    │
│   or broadening your search     │
│                                 │
│   [Clear Filters]               │
└─────────────────────────────────┘
```

## Error States
```
Error:
┌─────────────────────────────────┐
│     ⚠️                          │
│                                 │
│   Something went wrong          │
│                                 │
│   We couldn't load your data.   │
│   Please try again.             │
│                                 │
│   [Try Again] [Contact Support] │
└─────────────────────────────────┘
```

## Success States
```
Success (Toast Notification):
┌─────────────────────────────────┐
│ ✅ CV uploaded successfully!    │
│ Your skills have been extracted │
└─────────────────────────────────┘
Auto-dismiss after 3 seconds
```

---

# 🔔 NOTIFICATION SYSTEM

## Notification Types

### 1. Toast Notifications (Temporary)
- Success actions
- Error messages
- Warning alerts
- Position: Top-right corner
- Auto-dismiss: 3-5 seconds
- Can be dismissed manually

### 2. In-App Notifications
- New job matches
- Application status changes
- Messages from recruiters
- Icon: Bell in header
- Badge showing count
- Dropdown panel with list

### 3. Email Notifications
- Important updates
- Weekly summaries
- Job alerts
- Application updates
- Configurable in settings

---

# 🎯 KEY UX PRINCIPLES APPLIED

## 1. Progressive Disclosure
Don't show everything at once. Reveal information as needed.

**Example:** 
- Dashboard shows summary stats
- Click for detailed breakdowns
- "Show more" buttons for long lists

## 2. Clear Affordances
Users should instantly know what's clickable and what actions are possible.

**Example:**
- Buttons have clear labels and hover states
- Links are underlined or colored
- Interactive elements have cursor changes

## 3. Consistent Navigation
Same navigation pattern throughout the app.

**Example:**
- Sidebar always in same position
- Active page always highlighted
- Breadcrumbs for deep navigation

## 4. Immediate Feedback
Every action gets instant feedback.

**Example:**
- Button shows loading spinner
- Form shows validation errors
- Success toasts for completed actions

## 5. Forgiving Design
Allow users to recover from mistakes.

**Example:**
- Confirmation dialogs for destructive actions
- Undo options where possible
- Clear error messages with solutions

## 6. Prioritized Content
Most important information first.

**Example:**
- Action-needed banners at top
- Key metrics prominently displayed
- Secondary info in collapsed sections

---

# 📋 COMPLETE PAGE INVENTORY

## Student Pages (14 pages)
1. ✅ Landing Page (Public)
2. ✅ Login Page
3. ✅ Registration Page
4. ✅ Onboarding Flow (4 steps)
5. ✅ Dashboard
6. ✅ My Profile (5 tabs)
7. ✅ My CV
8. ✅ CV Builder
9. ✅ Skill Analysis (4 tabs)
10. ✅ Learning Path
11. ✅ Find Jobs
12. ✅ Job Details
13. ✅ Applications
14. ✅ Settings (4 tabs)

## Recruiter Pages (10 pages)
1. ✅ Recruiter Dashboard
2. ✅ Post Job (4 steps)
3. ✅ My Jobs
4. ✅ Find Candidates
5. ✅ Candidate Profile View
6. ✅ Applications Management
7. ✅ Messages
8. ✅ Analytics Dashboard
9. ✅ Company Profile
10. ✅ Settings

## University Pages (7 pages)
1. ✅ University Dashboard
2. ✅ Curriculum Gaps Analysis
3. ✅ Student Analytics
4. ✅ Industry Trends
5. ✅ Placement Tracking
6. ✅ Benchmarking
7. ✅ Reports Generator

**Total Pages: 31 unique pages**

---

# 📊 USER FLOW SUMMARY

## Student Journey
```
Landing → Sign Up → Onboarding (CV + GitHub) → 
Run Skill Analysis → See Gaps → View Learning Path → 
Browse Jobs → Apply → Track Applications → Get Hired
```

## Recruiter Journey
```
Landing → Sign Up → Dashboard → Post Job → 
Get AI-Matched Candidates → Review Profiles → 
Shortlist → Interview → Hire
```

## University Journey
```
Dashboard → View Curriculum Gaps → 
Analyze Industry Trends → Generate Reports → 
Share with Faculty → Improve Curriculum
```

---

This comprehensive UX documentation should give you everything you need to design a cohesive, user-friendly interface. Each page has a clear purpose, logical flow, and consistent patterns. Use this as your blueprint! 🎨
