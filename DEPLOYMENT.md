# 🚀 SkillSync Deployment Guide - Vercel + GitHub

This guide will walk you through deploying your SkillSync Next.js application to Vercel using GitHub.

## Prerequisites

- A GitHub account
- A Vercel account (sign up at [vercel.com](https://vercel.com))
- Your SkillSync project ready to deploy

---

## Step 1: Push Your Code to GitHub

### 1.1 Initialize Git (if not already done)

```bash
cd /Users/malik/Desktop/SkilSyncFrontend
git init
```

### 1.2 Create a `.gitignore` file (if not exists)

Make sure you have a `.gitignore` file with:

```
# Dependencies
node_modules/
/.pnp
.pnp.js

# Testing
/coverage

# Next.js
/.next/
/out/

# Production
/build

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env*.local
.env

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts
```

### 1.3 Create a GitHub Repository

1. Go to [GitHub](https://github.com) and click **"New repository"**
2. Name it: `skillsync-frontend` (or any name you prefer)
3. Choose **Public** or **Private**
4. **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click **"Create repository"**

### 1.4 Push Your Code

```bash
# Add all files
git add .

# Commit
git commit -m "Initial commit: SkillSync frontend"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/skillsync-frontend.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy to Vercel

### 2.1 Sign Up / Log In to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"** or **"Log In"**
3. Choose **"Continue with GitHub"** to connect your GitHub account

### 2.2 Import Your Project

1. Once logged in, click **"Add New..."** → **"Project"**
2. You'll see a list of your GitHub repositories
3. Find `skillsync-frontend` and click **"Import"**

### 2.3 Configure Project Settings

Vercel will auto-detect Next.js settings. Verify:

- **Framework Preset**: Next.js
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build` (or `next build`)
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install` (default)

### 2.4 Environment Variables (if needed)

If you have any environment variables:

1. Click **"Environment Variables"**
2. Add each variable:
   - **Name**: `NEXT_PUBLIC_API_URL` (example)
   - **Value**: `https://api.example.com`
   - **Environment**: Production, Preview, Development (select all)
3. Click **"Add"**

For now, you don't need any environment variables since we're using mock data.

### 2.5 Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes for the build to complete
3. Once done, you'll see:
   - ✅ **"Congratulations! Your project has been deployed"**
   - A live URL like: `https://skillsync-frontend.vercel.app`

---

## Step 3: Verify Deployment

1. Click the **"Visit"** button or open the URL in your browser
2. Test the application:
   - Landing page loads
   - Navigation works
   - Login/Signup pages work
   - Dashboards are accessible (after login)

---

## Step 4: Custom Domain (Optional)

### 4.1 Add Custom Domain

1. Go to your project dashboard on Vercel
2. Click **"Settings"** → **"Domains"**
3. Enter your domain: `skillsync.com` (or subdomain)
4. Follow Vercel's DNS configuration instructions

### 4.2 Configure DNS

Add these DNS records to your domain provider:

- **Type**: `A`
- **Name**: `@`
- **Value**: `76.76.21.21`

Or use CNAME:

- **Type**: `CNAME`
- **Name**: `www`
- **Value**: `cname.vercel-dns.com`

---

## Step 5: Continuous Deployment

### 5.1 Automatic Deployments

Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every push to other branches (creates preview URLs)

### 5.2 Making Updates

1. Make changes locally
2. Commit and push:
   ```bash
   git add .
   git commit -m "Update feature X"
   git push origin main
   ```
3. Vercel will automatically:
   - Detect the push
   - Build the project
   - Deploy to production
   - Update your live site

---

## Step 6: Monitoring & Analytics

### 6.1 View Deployments

- Go to your project dashboard
- Click **"Deployments"** tab
- See all deployment history

### 6.2 View Logs

- Click on any deployment
- Click **"View Function Logs"** to see build/runtime logs

### 6.3 Analytics (Optional)

- Go to **"Analytics"** tab
- Enable Vercel Analytics for:
  - Page views
  - Performance metrics
  - Web Vitals

---

## Troubleshooting

### Build Fails

1. Check build logs in Vercel dashboard
2. Common issues:
   - Missing dependencies → Add to `package.json`
   - TypeScript errors → Fix type errors
   - Environment variables → Add in Vercel settings

### Runtime Errors

1. Check function logs
2. Verify all API routes work
3. Check browser console for client errors

### Environment Variables Not Working

1. Make sure variables are prefixed with `NEXT_PUBLIC_` for client-side
2. Redeploy after adding variables
3. Check variable names match exactly

---

## Quick Commands Reference

```bash
# Local development
npm run dev

# Build locally
npm run build

# Start production server locally
npm start

# Push to GitHub
git add .
git commit -m "Your message"
git push origin main
```

---

## Project Structure Reminder

```
SkilSyncFrontend/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   ├── lib/              # Utilities, auth, data
│   └── ...
├── public/               # Static assets
├── package.json          # Dependencies
├── tailwind.config.ts    # Tailwind config
└── next.config.js        # Next.js config
```

---

## Next Steps After Deployment

1. ✅ Test all user flows (login, signup, dashboards)
2. ✅ Set up error monitoring (Sentry, LogRocket)
3. ✅ Configure analytics (Google Analytics, Vercel Analytics)
4. ✅ Set up CI/CD workflows (GitHub Actions)
5. ✅ Add SEO metadata
6. ✅ Set up staging environment

---

## Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **GitHub Issues**: Create an issue in your repo

---

**🎉 Congratulations! Your SkillSync app is now live!**

Your live URL: `https://skillsync-frontend.vercel.app` (or your custom domain)
