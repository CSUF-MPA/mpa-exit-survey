# File Manifest - MPA Exit Survey Package

## What You're Getting

This package contains everything you need to deploy the MPA Exit Survey to your GitHub repository.

---

## Files Overview

### 1. **mpa_exit_survey.html** (REQUIRED)
**Purpose**: The actual survey form  
**Size**: ~65 KB  
**Upload to**: Root of your repository  
**Students access this**: Yes, via GitHub Pages URL

**What it does**:
- 8-section survey with progress bar
- Skip logic for conditional questions
- Formspree integration for automatic submission
- Mobile-responsive design
- CSV backup download option

---

### 2. **README.md** (REQUIRED)
**Purpose**: Main repository homepage (what everyone sees on GitHub)  
**Size**: ~6 KB  
**Upload to**: Root of your repository  
**Students see this**: Yes, on GitHub repo homepage

**What it contains**:
- Survey overview and purpose
- Instructions for students
- Link to the survey
- Program information
- Contact details
- Technical support info

**Important**: 
- This becomes your repository's main page
- Public-facing - keep it professional
- Update the survey URL placeholder after deployment

---

### 3. **DEPLOYMENT_README.md** (RECOMMENDED)
**Purpose**: Technical deployment guide (for you and program staff)  
**Size**: ~4 KB  
**Upload to**: Root of your repository  
**Students see this**: Optional - they can if they browse files

**What it contains**:
- Step-by-step deployment instructions
- GitHub Pages setup
- Formspree configuration
- Customization guide
- Technical details

---

### 4. **QUICK_START.md** (RECOMMENDED)
**Purpose**: Quick reference guide (for you)  
**Size**: ~4 KB  
**Upload to**: Root of your repository  
**Students see this**: Optional

**What it contains**:
- Fast checklist for deployment
- Formspree dashboard access
- Common troubleshooting
- Testing instructions

---

## Deployment Order

### Step 1: Create/Navigate to Repository
```bash
# Option A: New repository
Go to GitHub → New Repository → Name it "mpa-exit-survey"

# Option B: Existing repository
Go to your existing MPA program repo
```

### Step 2: Upload Files
Upload in this order:
1. **mpa_exit_survey.html** (required - the survey itself)
2. **README.md** (required - repository homepage)
3. **DEPLOYMENT_README.md** (recommended - technical docs)
4. **QUICK_START.md** (recommended - quick reference)

### Step 3: Configure
1. Go to Settings → Pages
2. Select Source: Deploy from branch
3. Select Branch: main (or master)
4. Click Save
5. Wait 1-2 minutes for deployment

### Step 4: Update README.md
1. Copy your GitHub Pages URL
2. Edit README.md on GitHub
3. Replace `[YOUR-GITHUB-USERNAME].github.io/[REPO-NAME]` with actual URL
4. Commit changes

### Step 5: Test
1. Visit your GitHub Pages URL
2. Complete the survey as a test
3. Check Formspree dashboard for test submission
4. Delete test submission if needed

### Step 6: Share with Students
Send students the GitHub Pages URL:
- Clean URL if renamed to index.html: `https://username.github.io/repo-name/`
- Standard URL: `https://username.github.io/repo-name/mpa_exit_survey.html`

---

## File Relationships

```
mpa-exit-survey/
│
├── mpa_exit_survey.html ← Main survey (students complete this)
│   └── Submits to → Formspree (https://formspree.io/f/mblzqjjl)
│
├── README.md ← Repository homepage (students read this)
│   └── Links to → mpa_exit_survey.html
│
├── DEPLOYMENT_README.md ← Technical guide (you read this)
│   └── References → All files
│
└── QUICK_START.md ← Quick reference (you use this)
    └── References → All files
```

---

## Customization Notes

### Must Update Before Deployment:
- [ ] Survey URL in README.md (after GitHub Pages is enabled)
- [ ] Program website links in README.md (optional)
- [ ] NASPAA accreditation status in README.md (if needed)

### Optional Updates:
- [ ] Contact information (already has dpadams@fullerton.edu)
- [ ] Survey questions in mpa_exit_survey.html
- [ ] Color scheme in CSS (currently CSUF blue #003262)
- [ ] Additional documentation

---

## Formspree Configuration

**Your Form Endpoint**: https://formspree.io/f/mblzqjjl

**Access Dashboard**: https://formspree.io/forms/mblzqjjl

**What you can do**:
- View all submissions
- Export to CSV
- Enable email notifications
- Connect to Google Sheets
- See submission analytics

**Free Tier Limit**: 50 submissions/month  
**For larger cohorts**: Upgrade to paid plan (~$10/month)

---

## Support

### If Students Have Issues:
1. Check GitHub Pages is enabled
2. Verify survey URL is correct
3. Test in different browser
4. Check Formspree form is active
5. Use CSV backup + email option

### If You Have Questions:
- **Deployment**: See DEPLOYMENT_README.md
- **Quick answers**: See QUICK_START.md
- **Survey modification**: Edit mpa_exit_survey.html
- **Program contact**: dpadams@fullerton.edu

---

## Next Actions Checklist

- [ ] Choose repository (new or existing)
- [ ] Upload all 4 files to GitHub
- [ ] Enable GitHub Pages
- [ ] Update survey URL in README.md
- [ ] Test the survey yourself
- [ ] Check Formspree dashboard for test submission
- [ ] Share URL with capstone students
- [ ] Monitor submissions during survey period
- [ ] Export data from Formspree when complete
- [ ] Analyze results for program improvement

---

**Package Created**: October 2025  
**Formspree Integration**: Active and ready  
**Ready to Deploy**: ✅ Yes!

All files are in your `/mnt/user-data/outputs/` directory.
