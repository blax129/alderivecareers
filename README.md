# Alderive Properties Careers

A responsive, buildless hiring website following the TenantFirst hiring reference, with Alderive's supplied logo, imagery, company description, and published contact details.

## Preview

Run `python3 -m http.server 4173 --directory dist` from this folder, then visit http://localhost:4173.

## Netlify deployment

Connect Netlify to `blax129/alderivecareers` and deploy the `main` branch. The root `netlify.toml` sets the publish directory to `dist` with no build command. This places `dist/index.html` at the deployed site root. Git-connected Netlify sites redeploy when changes are pushed to `main`.

For manual drag-and-drop deployments, upload the `dist` folder itself. The application URL is `/#apply`.

## Application delivery

The six-step application validates required fields, supports editing answers, and submits all answers and consent to `https://formspree.io/f/xgaazpka` using a Formspree AJAX POST. Success is shown only after an accepted response. Pending and successful submissions are locked to prevent duplicate clicks; failed requests preserve answers for retry. Applicants can download a plain-text copy. Submission storage and notifications are managed by the endpoint owner in Formspree. Unsubmitted answers remain in page memory and are cleared on reload. Only the light/dark theme preference is saved locally.

The role terms ($500–$800/week depending on workload, accuracy, consistency, and reliability, temporary, daily seven-day availability, immediate start after approval) were confirmed by the project owner. Contact details and company assets come from https://superb-mandazi-0ff0d1.netlify.app/ . The hiring structure follows https://tfmanagementhiring.netlify.app/ . No TenantFirst application endpoints, contact details, or reviewer identity are used.

## Files

- `dist/index.html`: page content
- `dist/styles.css`: responsive Alderive styling
- `dist/app.js`: application steps, review, Formspree submission, image carousel, theme toggle
- `dist/assets/`: local Alderive logos and team photos

