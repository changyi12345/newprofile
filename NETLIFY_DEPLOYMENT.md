# Netlify Deployment Guide

## Required Environment Variables

You need to set these environment variables in your Netlify dashboard:

1. **DATABASE_URL**
   - Your MongoDB connection string
   - Example: `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority`

2. **NEXTAUTH_SECRET**
   - A random secret string for NextAuth
   - Generate one using: `openssl rand -base64 32`
   - Or use an online generator

3. **NEXTAUTH_URL**
   - Your Netlify site URL
   - Example: `https://your-site-name.netlify.app`
   - Netlify will provide this after first deployment

## Deployment Steps

1. **Install Netlify CLI** (optional, for local testing):
   ```bash
   npm install -g netlify-cli
   ```

2. **Build the project locally** to test:
   ```bash
   npm install
   npm run build
   ```

3. **Deploy to Netlify**:
   - Option A: Connect your GitHub repository to Netlify
     - Go to https://app.netlify.com
     - Click "Add new site" → "Import an existing project"
     - Connect your GitHub repository
     - Netlify will automatically detect the settings from `netlify.toml`
   
   - Option B: Deploy via Netlify CLI:
     ```bash
     netlify login
     netlify deploy --prod
     ```

4. **Set Environment Variables**:
   - Go to Site settings → Environment variables
   - Add all three variables mentioned above
   - Make sure to set `NEXTAUTH_URL` to your actual Netlify URL

5. **Redeploy** after setting environment variables:
   - Go to Deploys tab
   - Click "Trigger deploy" → "Clear cache and deploy site"

## Important Notes

- The `postinstall` script will automatically generate Prisma client during build
- Make sure your MongoDB database is accessible from the internet (not localhost)
- The backend API routes will work automatically with Next.js API routes on Netlify
- File uploads are stored in the `public/uploads` directory (consider using cloud storage for production)

## Troubleshooting

### Build Fails with Node Version Error
- Make sure Node version is set to 20 in Netlify settings
- The `.nvmrc` file specifies Node 20
- Check that `package.json` has engines field set to Node 20

### Build Fails with Yarn/Incompatible Dependencies
- If you see errors about Yarn or incompatible modules (like @nuxt/kit):
  1. Make sure there's NO `yarn.lock` file in your repository
  2. Delete `yarn.lock` if it exists: `git rm yarn.lock`
  3. The `netlify.toml` is configured to use npm, not Yarn
  4. Make sure `package-lock.json` is committed to git

### Other Issues
- If build fails, check that all environment variables are set
- If database connection fails, verify your MongoDB connection string
- If authentication doesn't work, check that `NEXTAUTH_URL` matches your site URL exactly

