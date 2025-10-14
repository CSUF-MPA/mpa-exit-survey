# CSUF MPA Exit Survey - Deployment Instructions

> **Note**: This is the technical deployment guide. The main **README.md** is the repository homepage that students and visitors will see.

## Overview
This is a self-contained HTML survey form for MPA program capstone students. It includes:
- ✅ Progress bar showing completion status
- ✅ Skip logic (employment questions only show when relevant)
- ✅ **Automatic data collection via Formspree** - responses sent directly to you
- ✅ CSV backup download option
- ✅ Mobile-friendly design
- ✅ Updated DEI+B section based on your framework

## Updated DEI+B Section
The survey now includes 5 focused questions covering:
1. **Diversity** - Exposure to different perspectives
2. **Equity** - Fair access to opportunities and resources
3. **Inclusion** - Active engagement and supportive environment
4. **Belonging** - Feeling comfortable being authentic self
5. **Preparation** - Ready to work with diverse populations in public service

## How to Deploy to GitHub Pages

### Option 1: Quick Deploy (Easiest)
1. Go to your GitHub MPA program repository
2. Click "Add file" → "Upload files"
3. Upload `mpa_exit_survey.html`
4. Go to Settings → Pages
5. Enable GitHub Pages (select main branch)
6. Your survey will be at: `https://[username].github.io/[repo-name]/mpa_exit_survey.html`

### Option 2: Command Line Deploy
```bash
# Clone your repo (or cd into existing repo)
git clone https://github.com/[username]/[repo-name].git
cd [repo-name]

# Copy the survey file
cp mpa_exit_survey.html .

# Commit and push
git add mpa_exit_survey.html
git commit -m "Add MPA exit survey form"
git push origin main

# Enable GitHub Pages in Settings → Pages
```

### Option 3: Create New Repository
1. Create new repo: `mpa-exit-survey`
2. Upload `mpa_exit_survey.html`
3. Rename it to `index.html` (so URL is cleaner)
4. Enable GitHub Pages
5. Share URL: `https://[username].github.io/mpa-exit-survey/`

## How Students Use the Survey

1. **Access**: Send students the GitHub Pages URL
2. **Complete**: They fill out the 8-section survey (15-20 minutes)
3. **Submit**: Click "Submit Survey" at the end
4. **Confirmation**: They see a success message and can optionally download a CSV backup

## Data Collection - Automatic with Formspree! 

### ✨ Responses automatically collect - no emailing needed!

When students submit the survey, their responses are automatically sent to your Formspree account. You'll receive:
- **Email notifications** for each submission (if enabled in Formspree)
- **All responses in your Formspree dashboard** at https://formspree.io/forms/mblzqjjl

### Accessing Your Data

**Option 1: Formspree Dashboard** (Recommended)
1. Log in to Formspree at https://formspree.io
2. Go to your form dashboard
3. View all submissions in one place
4. Export to CSV with one click

**Option 2: Email Notifications**
- Each submission can trigger an email to you
- Configure in Formspree settings
- Includes all response data

**Option 3: Integrations**
Formspree can send data to:
- Google Sheets (automatic spreadsheet updates)
- Slack (notifications)
- Webhooks (custom integrations)

### Backup Option
Students can optionally download their own responses as CSV backup files. This is helpful if:
- Network issues prevent submission
- Student wants a personal copy
- Formspree is temporarily down

### Formspree Free Tier Limits
- **50 submissions/month free**
- For more than 50 students, upgrade to paid plan (~$10/month)
- Or create multiple forms for different cohorts

## Features

### Skip Logic
- Employment status "Other" → shows text input
- Current employment (employed) → shows job details questions
- Current employment (seeking/other) → skips job details
- Various "Other" checkboxes → show specification fields

### Validation
- Required fields marked with red asterisk (*)
- Can't proceed without completing required fields
- Clear error messages

### Mobile Friendly
- Responsive design works on phones/tablets
- Touch-friendly buttons and inputs
- Readable on small screens

## Customization

### To modify the form:
1. Open `mpa_exit_survey.html` in any text editor
2. Edit the HTML sections
3. Save and re-upload to GitHub

### Common edits:
- **Add questions**: Copy existing question HTML block
- **Change colors**: Modify the CSS color codes (#003262 = CSUF blue)
- **Update text**: Edit content in HTML directly

## Support

Questions? Contact:
- Program Director: David P. Adams, Ph.D
- Email: dpadams@fullerton.edu
- Phone: 657-278-4770

---

**File created:** October 2025
**Last updated:** October 2025
