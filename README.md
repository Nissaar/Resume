# JSON Resume Builder

A data-driven resume system. Edit **only** `resume.json` to update your content — the theme, layout, and styling are handled by the build script. Outputs both **HTML** and **PDF** matching the AltaCV LaTeX design.

## Prerequisites

- **Node.js** ≥ 18 ([download](https://nodejs.org/))

## Quick Start

```bash
# 1. Enter the json-resume directory
cd json-resume

# 2. Install dependencies (one time)
npm install

# 3. Build both HTML and PDF
npm run build
```

Output files appear in `output/`:
- `output/resume.html`
- `output/resume.pdf`

## Build Commands

| Command              | Output            |
|----------------------|-------------------|
| `npm run build`      | HTML + PDF        |
| `npm run build:html` | HTML only         |
| `npm run build:pdf`  | PDF only          |

## Editing Your Resume

Open `resume.json` in any editor. The file is self-explanatory — every section maps directly to the resume:

| JSON key           | Resume section       |
|--------------------|----------------------|
| `name`             | Header name          |
| `tagline`          | Header tagline       |
| `contact`          | Contact info row     |
| `experience[]`     | Experience section   |
| `technicalSkills[]`| Technical Skills     |
| `keySkills[]`      | Key Skills           |
| `certifications[]` | Certifications       |
| `education[]`      | Education            |
| `hobbies[]`        | Hobbies              |

### Adding a new experience entry

Add an object to the `experience` array:

```json
{
  "title": "Senior DevOps Engineer",
  "company": "ACME Corp",
  "dates": "01/2026 -- Ongoing",
  "items": [
    "First bullet point",
    "Second bullet point"
  ]
}
```

### Adding a new certification

```json
{
  "title": "AWS Solutions Architect Associate",
  "issueInfo": "Issued: March 2026",
  "dates": "March 2026 - March 2029",
  "linkLabel": "Link to certificate",
  "linkUrl": "https://example.com/cert"
}
```

### Adding a technical skill category

```json
{ "category": "AI/ML", "items": "TensorFlow, PyTorch, scikit-learn" }
```

After editing, run `npm run build` again to regenerate both files.

## Design Details

The theme replicates the AltaCV LaTeX class:

- **Fonts**: Lato (body), Roboto Slab (headings/name)
- **Colors**: `#450808` headings, `#8F0D0D` accent, `#2E2E2E` emphasis, `#666666` body
- **Layout**: 60/40 two-column, A4 page size
- **Icons**: Font Awesome 6 (loaded via CDN)

## Troubleshooting

**Puppeteer fails to launch on WSL/Linux:**
```bash
# Install required system libraries for Chromium
sudo apt-get install -y libnss3 libatk1.0-0 libatk-bridge2.0-0 \
  libcups2 libxcomposite1 libxdamage1 libxrandr2 libgbm1 \
  libpango-1.0-0 libcairo2 libasound2
```

**Fonts look different in PDF:**
Make sure you have an internet connection on first build (Google Fonts are loaded from CDN). For offline use, download and install the Lato and Roboto Slab font families locally.
