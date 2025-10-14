# Quick Start Guide - MPA Exit Survey

## 🎉 Your survey is ready with automatic data collection!

### Files Included
- **README.md** - Main repository documentation (what students see)
- **DEPLOYMENT_README.md** - Technical deployment instructions (for you)
- **QUICK_START.md** - This file - quick reference guide
- **mpa_exit_survey.html** - The actual survey form

### What's Changed
✅ **Formspree is now integrated** - student responses automatically submit to your account
✅ No more emailing CSV files back and forth
✅ All data collected in one place

---

## For You (Program Director)

### Accessing Survey Results

**Your Formspree Dashboard:**
https://formspree.io/forms/mblzqjjl

Log in to see:
- All submissions in one place
- Export to CSV anytime
- Email notifications (optional)

### First-Time Setup (Do Once)
1. Log in to Formspree: https://formspree.io
2. Find your form: "mblzqjjl"
3. Optional: Enable email notifications for each submission
4. Optional: Connect to Google Sheets for automatic updates

### Monitoring Submissions
- **Free tier**: 50 submissions/month
- **For larger cohorts**: Upgrade to paid ($10/month) or create multiple forms
- **Check usage**: In your Formspree dashboard

---

## For Students

### How to Complete the Survey

1. **Open the survey** - Follow the link provided by your program
2. **Fill out all sections** - Takes 15-20 minutes
   - Progress bar shows how far you've gotten
   - Required fields marked with *
3. **Click Submit** - Responses automatically sent to program
4. **Get confirmation** - Success message confirms submission
5. **Optional**: Download CSV backup for your records

### If Submission Fails
- Check your internet connection
- Click "Download CSV Backup" button
- Email the CSV file to: dpadams@fullerton.edu

---

## Deployment Steps

### Option 1: Upload to Existing Repo (Easiest)
```bash
1. Go to your GitHub MPA program repo
2. Click "Add file" → "Upload files"
3. Upload mpa_exit_survey.html
4. Settings → Pages → Enable (if not already)
5. Share URL with students
```

### Option 2: New Clean Repo
```bash
1. Create repo: "mpa-exit-survey"
2. Upload mpa_exit_survey.html
3. Rename to index.html (cleaner URL)
4. Settings → Pages → Enable
5. URL: https://[username].github.io/mpa-exit-survey/
```

---

## Data Export

### From Formspree to Excel/Analysis

**Method 1: Download CSV**
1. Go to Formspree dashboard
2. Click "Export" button
3. Open in Excel or Python

**Method 2: Google Sheets Integration**
1. In Formspree, go to Integrations
2. Connect Google Sheets
3. Responses auto-populate spreadsheet
4. No manual export needed!

**Method 3: Python Analysis**
```python
import pandas as pd

# If you downloaded CSV from Formspree
df = pd.read_csv('formspree_responses.csv')

# Analyze
print(df['recommend'].value_counts())
print(df['deib_belonging'].mean())
```

---

## Troubleshooting

### Students Can't Submit
- **Check**: Is GitHub Pages enabled?
- **Check**: Is Formspree form active?
- **Fallback**: Have them download CSV and email

### Not Getting Notifications
- Log in to Formspree
- Check email notification settings
- Verify email address is correct

### Hit 50 Submission Limit
- Upgrade Formspree plan ($10/month unlimited)
- Or create new form for next cohort
- Or use multiple forms per semester

### Need to Change Formspree Endpoint
1. Open mpa_exit_survey.html in text editor
2. Find: `https://formspree.io/f/mblzqjjl`
3. Replace with new endpoint
4. Re-upload to GitHub

---

## Support

**Questions about the survey:**
- Program Director: David P. Adams, Ph.D
- Email: dpadams@fullerton.edu
- Phone: 657-278-4770

**Questions about Formspree:**
- Help docs: https://help.formspree.io
- Support: support@formspree.io

**Questions about GitHub Pages:**
- Docs: https://docs.github.com/pages
- CSUF IT: [Your campus IT contact]

---

## Next Steps

1. ✅ You've got the Formspree-integrated survey
2. ⬜ Upload to GitHub and enable Pages
3. ⬜ Test it yourself (submit a test response)
4. ⬜ Check your Formspree dashboard
5. ⬜ Share link with Fall 2025 capstone students
6. ⬜ Monitor responses as they come in

---

**Survey Created:** October 2025  
**Formspree Integration:** Active  
**Ready to Deploy:** Yes!
