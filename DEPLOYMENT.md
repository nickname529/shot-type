# ShotType Deployment

## Fastest public URL

Use Vercel first if you only need a public URL for partner review.

1. Create a GitHub repository and upload this project.
2. Go to Vercel and choose **Add New Project**.
3. Import the GitHub repository.
4. Keep the defaults:
   - Framework: Next.js
   - Install command: `npm install`
   - Build command: `npm run build`
5. Deploy.
6. Copy the public URL, for example `https://shot-type.vercel.app`.
7. In Vercel Project Settings, add:
   - `NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app`
8. Redeploy once so metadata, `robots.txt`, and `sitemap.xml` use the real URL.

## Partner review checklist

Before submitting the URL to an affiliate platform, confirm these pages work:

- `/`
- `/cameras`
- `/lenses`
- `/films`
- `/shops`
- `/privacy`
- `/terms`
- `/disclaimer`
- `/api/health`
- `/sitemap.xml`
- `/robots.txt`

## Important plan note

Free hosting plans can change. Vercel is the smoothest Next.js deployment path, but check its current Hobby/Pro rules before adding revenue-generating affiliate links. If the platform treats affiliate revenue as commercial use, upgrade or use a provider/plan that permits commercial traffic.

## Local production check

```bash
npm install
npm run build
npm run start
```

Then open `http://localhost:3000`.

## Affiliate setup after approval

Do not add bank account or payout credentials to this repo.

1. Register payout details only inside each affiliate platform dashboard.
2. Copy `.env.example` to `.env.local`.
3. Fill only approved affiliate IDs, templates, or query params.
4. Restart the app or redeploy.
