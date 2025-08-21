<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Fair Meeting Roulette

A fair and balanced way to choose your next meeting facilitator. The longer someone waits, the higher their chances of being selected!

This contains everything you need to run your app locally or deploy it to GitHub Pages.

View your app in AI Studio: https://ai.studio/apps/drive/1Og4fz_EfnOMt9QuGltdkFstXar-Vkrfd

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key (optional)
3. Run the app:
   `npm run dev`

## Deployment

The app is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

- **Live URL:** https://psykzz.github.io/fair-roulette/
- **Deployment:** Automatic via GitHub Actions
- **Build Command:** `npm run build`

### Manual Deployment

To manually deploy:

1. Build the project: `npm run build`
2. The built files will be in the `dist/` directory
3. Deploy the `dist/` folder to any static hosting service
