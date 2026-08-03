# Desktop Pet Studio Official Site

This folder is a standalone, dependency-free static website for the public Desktop Pet Studio product pages and future Google OAuth verification.

## Local preview

Run the following from this folder:

```powershell
python -m http.server 4173
```

Then open `http://localhost:4173`.

## Before publishing

1. This repository publishes to `https://aycs56.github.io/DesktopPetStudioApp/`. Do not add OAuth secrets, client configuration JSON, access tokens, or any private credentials to this repository.
2. Push `main`; the Pages workflow validates and deploys automatically. In the repository, set **Settings > Pages > Build and deployment > GitHub Actions** if GitHub has not already enabled it.
3. GitHub Issues is the initial public support route. Before Google OAuth verification, set a real support email and an owned custom domain in `site.config.js`, then update `robots.txt` and `sitemap.xml` to that domain.
4. Add the custom domain in GitHub Pages, enable HTTPS, then verify the domain in Google Search Console.
5. Set the deployed homepage, privacy policy, terms, support email, and verified authorized domain in Google Cloud before submitting OAuth verification.

## Validation

```powershell
python scripts/validate_site.py
python scripts/validate_site.py --require-publish-config
python scripts/validate_site.py --require-oauth-config
```

The first command validates the site. The second is the GitHub Pages release gate. The final command is the stricter Google OAuth verification gate.

## Content sources

The copy describes the current local Google Calendar integration: optional read-only event sync through the system browser, local reminder creation, and a token protected on Windows with DPAPI. Review the content against the released application before every public deployment.
