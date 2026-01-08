# 🚨 URGENT: Fix NEXTAUTH_URL Error

## Error Message
```
Plugin "@netlify/plugin-nextjs" internal error
TypeError: Cannot read properties of undefined (reading 'NEXTAUTH_URL')
```

## Root Cause
The `@netlify/plugin-nextjs` plugin tries to read `NEXTAUTH_URL` during the `onBuild` event, but it's not finding the environment variable even though it's set in `netlify.toml`.

## Solution: Set NEXTAUTH_URL in Netlify UI

**You MUST set `NEXTAUTH_URL` in Netlify UI for the build to succeed.**

### Step-by-Step Instructions:

1. **Go to Netlify Dashboard**
   - Visit: https://app.netlify.com
   - Click on your site (profilechan)

2. **Navigate to Environment Variables**
   - Click **Site settings** (gear icon)
   - Go to **Build & deploy** → **Environment**
   - Scroll to **Environment variables** section

3. **Add NEXTAUTH_URL**
   - Click **"Add a variable"** button
   - **Key**: `NEXTAUTH_URL`
   - **Value**: Your actual Netlify site URL
     - Example: `https://profilechan.netlify.app`
     - Or: `https://your-site-name.netlify.app`
   - **Scopes**: Check ✅ **Builds** and ✅ **Runtime** (or **All scopes**)
   - Click **Save**

4. **Verify Other Required Variables**
   Make sure these are also set:
   - ✅ `DATABASE_URL` - Your MongoDB connection string
   - ✅ `NEXTAUTH_SECRET` - Random secret (generate: `openssl rand -base64 32`)
   - ✅ `NODE_VERSION` - Should be `20.19.0` (already in netlify.toml)

5. **Redeploy**
   - Go to **Deploys** tab
   - Click **"Trigger deploy"** → **"Clear cache and deploy site"**

## Why This Is Required

The `@netlify/plugin-nextjs` plugin runs during the `onBuild` event, which happens **before** the build command executes. The plugin needs `NEXTAUTH_URL` to be available in the environment at that time.

Even though `netlify.toml` has a placeholder value, the plugin requires the actual value to be set in Netlify UI's environment variables for it to work correctly.

## Expected Result

After setting `NEXTAUTH_URL` in Netlify UI:
- ✅ Build completes successfully
- ✅ Plugin processes without errors
- ✅ Site deploys successfully
- ✅ Your portfolio is live! 🎉

## Quick Checklist

- [ ] Opened Netlify dashboard
- [ ] Went to Site settings → Build & deploy → Environment
- [ ] Added `NEXTAUTH_URL` = Your actual Netlify site URL
- [ ] Verified `DATABASE_URL` is set
- [ ] Verified `NEXTAUTH_SECRET` is set
- [ ] Cleared cache and redeployed
- [ ] Build succeeded!

## Alternative: If You Don't Use NextAuth

If you're not actually using NextAuth in your application, you can:
1. Remove `next-auth` from dependencies
2. Remove the `@netlify/plugin-nextjs` plugin (if not needed)
3. Or set a dummy value in Netlify UI

But if you're using NextAuth, you MUST set the correct URL.

