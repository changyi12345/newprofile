# 🚨 URGENT FIX - Do These Steps NOW!

## The Problem
- Netlify is using **Yarn** (because yarn.lock exists in GitHub)
- Netlify is using **Node v22** (because NODE_VERSION is not set in UI)
- This causes @nuxt/kit compatibility error

## ✅ SOLUTION - 2 Critical Steps:

### Step 1: Delete yarn.lock from GitHub ⚠️ DO THIS FIRST!

**This is THE MOST IMPORTANT step!**

**Method 1: GitHub Web Interface (Easiest)**
1. Go to: https://github.com/changyi12345/profile
2. Look at the file list - find `yarn.lock`
3. Click on `yarn.lock`
4. Click the **trash icon** (🗑️) in the top right
5. Write commit message: `Remove yarn.lock`
6. Click **"Commit changes"**

**Method 2: Command Line**
```bash
git pull origin main
git rm yarn.lock
git commit -m "Remove yarn.lock to force npm usage"
git push origin main
```

### Step 2: Set NODE_VERSION in Netlify UI ⚠️ REQUIRED!

**You MUST do this in Netlify UI - netlify.toml is not enough!**

1. Go to: https://app.netlify.com
2. Click on your site
3. Click: **Site settings** (⚙️ gear icon)
4. Click: **Build & deploy** (left sidebar)
5. Scroll down to: **Environment**
6. Click: **Environment variables**
7. Click: **Add a variable** button
8. Fill in:
   - **Key**: `NODE_VERSION`
   - **Value**: `20` (or `20.18.0`)
   - **Scopes**: Check ✅ **Builds**
9. Click: **Save**

### Step 3: Verify Files Are Correct

Make sure these files exist and are correct:

✅ `.nvmrc` should contain: `20.18.0`
✅ `package.json` should have: `"engines": { "node": "20.x" }`
✅ `netlify.toml` should have: `NODE_VERSION = "20.18.0"`

### Step 4: Push Current Changes

```bash
git add .
git commit -m "Configure Node 20 for Netlify"
git push origin main
```

### Step 5: Clear Cache and Redeploy

1. In Netlify dashboard
2. Go to **Deploys** tab
3. Click **"Trigger deploy"** dropdown
4. Click **"Clear cache and deploy site"**

### Step 6: Verify Build Logs

After deployment, check logs. You should see:
- ✅ "Now using node v20.x.x" (NOT v22!)
- ✅ "Installing npm packages using npm" (NOT Yarn!)
- ✅ Build succeeds!

## Why This Happens

1. **yarn.lock exists** → Netlify auto-detects and uses Yarn
2. **NODE_VERSION not in UI** → Netlify uses default (v22)
3. **Build command runs AFTER install** → Too late to fix

## What We've Already Configured

✅ `.nvmrc` = `20.18.0`
✅ `.node-version` = `20.18.0`
✅ `package.json` engines.node = `20.x`
✅ `package.json` packageManager = `npm@10.9.4`
✅ `netlify.toml` NODE_VERSION = `20.18.0`

**But Netlify ignores these if:**
- yarn.lock exists in GitHub
- NODE_VERSION is not set in UI

## Verification Checklist

After doing steps 1 & 2:
- [ ] yarn.lock is NOT visible in GitHub repository
- [ ] NODE_VERSION=20 is in Netlify UI Environment variables
- [ ] Build logs show "node v20.x.x"
- [ ] Build logs show "Installing npm packages using npm"
- [ ] Build succeeds!

## If Still Failing

1. **Double-check yarn.lock is deleted** - Refresh GitHub page and verify it's gone
2. **Verify NODE_VERSION in UI** - Go to Environment variables and confirm it's there
3. **Check build logs** - What Node version does it actually show?
4. **Clear cache** - Make sure you cleared cache before redeploying
5. **Wait a minute** - Sometimes Netlify needs a moment to pick up changes

## About @nuxt/kit Error

The `@nuxt/kit` error happens because:
- Yarn is being used (should be npm)
- Node v22 is being used (should be v20)
- Once you delete yarn.lock and set NODE_VERSION=20, npm will be used and the error will disappear

Your project doesn't actually use Nuxt - this is a false error from Yarn detecting incompatible dependencies.

