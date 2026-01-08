# 🔴 CRITICAL: Fix Netlify Build - Must Do These Steps!

## Problem
Netlify is using Yarn instead of npm and Node v22 instead of v20 because:
1. `yarn.lock` still exists in your GitHub repository
2. `NODE_VERSION` environment variable is not set in Netlify UI

## ✅ Solution - Do These Steps NOW:

### Step 1: Delete yarn.lock from GitHub (MOST IMPORTANT!)

**You MUST do this first!**

1. Go to: https://github.com/changyi12345/profile
2. Click on the `yarn.lock` file (if it exists in the root)
3. Click the **trash/delete icon** 
4. Click **"Commit changes"**
5. Type commit message: `Remove yarn.lock to force npm usage`
6. Click **"Commit changes"**

**OR use command line:**
```bash
git rm yarn.lock
git commit -m "Remove yarn.lock to force npm usage"
git push origin main
```

### Step 2: Set NODE_VERSION in Netlify UI (REQUIRED!)

**This is CRITICAL - netlify.toml alone won't work!**

1. Go to: https://app.netlify.com
2. Select your site
3. Go to: **Site settings** → **Build & deploy** → **Environment**
4. Scroll to **"Environment variables"** section
5. Click **"Add a variable"**
6. Set:
   - **Key**: `NODE_VERSION`
   - **Value**: `20`
   - **Scopes**: Check "All scopes" or "Builds"
7. Click **"Save"**

### Step 3: Push Current Changes

```bash
git add .
git commit -m "Add force-npm plugin and update config"
git push origin main
```

### Step 4: Clear Cache and Redeploy

1. In Netlify dashboard
2. Go to **Deploys** tab
3. Click **"Trigger deploy"** → **"Clear cache and deploy site"**

### Step 5: Verify

Check build logs. You should see:
- ✅ "Installing npm packages using npm" (NOT Yarn!)
- ✅ "Now using node v20.x.x" (NOT v22!)
- ✅ Build succeeds

## Why This Is Needed

Netlify runs dependency installation **BEFORE** your build command. It automatically detects `yarn.lock` and uses Yarn. Even though we have `netlify.toml`, the install phase happens first.

The `NODE_VERSION` in `netlify.toml` might not always work, so you MUST set it in the Netlify UI as well.

## Files Created

- ✅ `netlify/plugins/force-npm.js` - Plugin to delete yarn.lock if it exists
- ✅ Updated `netlify.toml` - Includes the force-npm plugin

**But you still need to:**
1. Delete yarn.lock from GitHub (if it exists)
2. Set NODE_VERSION=20 in Netlify UI

## Still Not Working?

If after doing all the above it still fails:
1. Double-check yarn.lock is deleted from GitHub (refresh the page)
2. Verify NODE_VERSION=20 is in Netlify UI Environment variables
3. Check build logs for what Node version is actually being used
4. Make sure you cleared the build cache before redeploying

