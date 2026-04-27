# Cloudflare Setup Guide

## Prerequisites
- Cloudflare account with allsquared.io and allsquared.uk added as zones
- Node.js installed (for `wrangler` CLI)
- `npm install -g wrangler` then `wrangler login`

---

## 1. Create the D1 database

```bash
wrangler d1 create allsquared-blog
```

Copy the `database_id` from the output and paste it into `wrangler.toml`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "allsquared-blog"
database_id = "YOUR_DATABASE_ID_HERE"   # ← paste here
```

## 2. Run the schema migration

```bash
wrangler d1 execute allsquared-blog --remote --file=./schema.sql
```

---

## 3. Deploy to Cloudflare Pages

### Option A — Connect via GitHub (recommended)

1. Go to **Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git**
2. Select the `allsquared-website` repo
3. Set **build command**: *(leave blank — no build step)*
4. Set **build output directory**: `/` (or `.`)
5. Click **Save and Deploy**

### Option B — Deploy directly with Wrangler

```bash
wrangler pages deploy . --project-name=allsquared-website
```

---

## 4. Bind the D1 database to your Pages project

1. Go to **Pages project → Settings → Functions → D1 database bindings**
2. Add binding:
   - **Variable name**: `DB`
   - **D1 database**: `allsquared-blog`
3. Save and redeploy

---

## 5. Set the admin password

1. Go to **Pages project → Settings → Environment variables**
2. Add variable (set for both Production and Preview):
   - **Key**: `ADMIN_PASSWORD`
   - **Value**: a strong password of your choice
3. Save and redeploy

Your admin panel will be at `/admin/` — log in with the password you set.

---

## 6. Add custom domains

### allsquared.io

1. **Pages project → Custom domains → Set up a custom domain**
2. Enter `allsquared.io` → confirm
3. Cloudflare will auto-configure DNS (since the domain is already on Cloudflare)
4. Repeat for `www.allsquared.io`

### allsquared.uk

1. Same flow, add `allsquared.uk` and `www.allsquared.uk`
2. If allsquared.uk is on a different Cloudflare account, add a CNAME:
   ```
   CNAME  @  <your-pages-project>.pages.dev
   CNAME  www  <your-pages-project>.pages.dev
   ```

---

## 7. Local development

```bash
# Install dependencies
npm install -g wrangler

# Run locally with D1 (creates a local SQLite copy)
wrangler pages dev . --d1=DB=allsquared-blog

# Set local admin password
# Create a .dev.vars file (gitignored):
echo 'ADMIN_PASSWORD=localpass' > .dev.vars
```

The site will be available at `http://localhost:8788`.

---

## URL structure

| URL | Description |
|-----|-------------|
| `/` | Main site |
| `/blog/` | Blog listing |
| `/blog/<slug>` | Individual post (server-rendered at edge) |
| `/admin/` | Admin panel (password protected) |
| `/api/posts` | GET published posts / POST new post |
| `/api/posts/:id` | GET, PUT, DELETE a post |
| `/api/auth` | POST to get session token |
