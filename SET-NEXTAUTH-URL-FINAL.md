# ✅ Final Step: Set NEXTAUTH_URL in Netlify UI

## Current Status
- ✅ Build completes successfully
- ✅ TypeScript passes
- ✅ Static pages generated
- ⚠️ Plugin error: `NEXTAUTH_URL` needs to be set in Netlify UI

## IMPORTANT: You Must Set NEXTAUTH_URL in Netlify UI

The `netlify.toml` has a placeholder value, but you **MUST** set the actual value in Netlify UI:

### Step 1: Get Your Netlify Site URL

1. Go to: https://app.netlify.com
2. Click on your site
3. Find your site URL (e.g., `https://your-site-name.netlify.app`)
4. Copy this URL

### Step 2: Set NEXTAUTH_URL in Netlify UI

1. In Netlify dashboard: **Site settings** → **Build & deploy** → **Environment**
2. Scroll to **Environment variables**
3. Find `NEXTAUTH_URL` in the list (if it exists) or click **"Add a variable"**
4. Set:
   - **Key**: `NEXTAUTH_URL`
   - **Value**: Your actual Netlify site URL (e.g., `https://your-site-name.netlify.app`)
   - **Scopes**: ✅ **Builds** and ✅ **Runtime** (or **All scopes**)
5. Click **Save**

### Step 3: Verify All Required Environment Variables

Make sure these are all set in Netlify UI:

1. ✅ **NEXTAUTH_URL** = Your Netlify site URL
2. ✅ **DATABASE_URL** = Your MongoDB connection string
3. ✅ **NEXTAUTH_SECRET** = Random secret (generate: `openssl rand -base64 32`)
4. ✅ **NODE_VERSION** = `20.19.0`

### Step 4: Redeploy

1. Go to **Deploys** tab
2. Click **"Trigger deploy"** → **"Clear cache and deploy site"**

## Expected Result

After setting `NEXTAUTH_URL` correctly:
- ✅ Build completes successfully
- ✅ Plugin processes without errors
- ✅ Site deploys successfully
- ✅ Your portfolio is live! 🎉

## Why This Is Needed

The `@netlify/plugin-nextjs` plugin reads `NEXTAUTH_URL` during the build phase. Even though we set a placeholder in `netlify.toml`, you need to set the actual site URL in Netlify UI for:
1. The plugin to work correctly
2. NextAuth to work in production
3. Authentication to function properly

## Quick Checklist

- [ ] Opened Netlify dashboard
- [ ] Went to Site settings → Environment variables
- [ ] Set `NEXTAUTH_URL` = Your actual Netlify site URL
- [ ] Verified `DATABASE_URL` is set
- [ ] Verified `NEXTAUTH_SECRET` is set
- [ ] Cleared cache and redeployed
- [ ] Build succeeded!

