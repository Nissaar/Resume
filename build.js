const fs = require("fs");
const path = require("path");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ---------------------------------------------------------------------------
// Load JSON data
// ---------------------------------------------------------------------------
const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, "resume.json"), "utf-8")
);

// ---------------------------------------------------------------------------
// HTML builders
// ---------------------------------------------------------------------------
function renderContactInfo(c) {
  const items = [];
  if (c.email)
    items.push(
      `<span class="info-item"><i class="fa-solid fa-at"></i> <a href="mailto:${escapeHtml(c.email)}">${escapeHtml(c.email)}</a></span>`
    );
  if (c.phone)
    items.push(
      `<span class="info-item"><i class="fa-solid fa-phone"></i> <a href="tel:${escapeHtml(c.phone)}">${escapeHtml(c.phone)}</a></span>`
    );
  if (c.address)
    items.push(
      `<span class="info-item"><i class="fa-solid fa-envelope"></i> ${escapeHtml(c.address)}</span>`
    );
  if (c.location)
    items.push(
      `<span class="info-item"><i class="fa-solid fa-map-marker-alt"></i> ${escapeHtml(c.location)}</span>`
    );
  if (c.homepage)
    items.push(
      `<span class="info-item"><i class="fa-solid fa-globe"></i> <a href="${escapeHtml(c.homepage.url)}">${escapeHtml(c.homepage.label)}</a></span>`
    );
  if (c.linkedin)
    items.push(
      `<span class="info-item"><i class="fa-brands fa-linkedin"></i> <a href="${escapeHtml(c.linkedin.url)}">${escapeHtml(c.linkedin.label)}</a></span>`
    );
  if (c.github)
    items.push(
      `<span class="info-item"><i class="fa-brands fa-github"></i> <a href="${escapeHtml(c.github.url)}">${escapeHtml(c.github.label)}</a></span>`
    );
  if (c.credly)
    items.push(
      `<span class="info-item"><a href="${escapeHtml(c.credly.url)}">${escapeHtml(c.credly.label)}</a></span>`
    );
  return items.join("\n");
}

function renderExperience(jobs) {
  return jobs
    .map(
      (job, i) => `
      <div class="cv-event">
        <div class="cv-event-title">${escapeHtml(job.title)}</div>
        <div class="cv-event-subtitle">${escapeHtml(job.company)}</div>
        <div class="cv-event-date"><i class="fa-regular fa-calendar"></i> ${escapeHtml(job.dates)}</div>
        <ul>${job.items.map((it) => `<li>${escapeHtml(it)}</li>`).join("\n")}</ul>
      </div>
      ${i < jobs.length - 1 ? '<div class="divider"></div>' : ""}`
    )
    .join("\n");
}

function renderTechnicalSkills(skills) {
  return `<ul class="tech-skills">${skills
    .map(
      (s) =>
        `<li><span class="skill-category">${escapeHtml(s.category)}</span>: ${escapeHtml(s.items)}</li>`
    )
    .join("\n")}</ul>`;
}

function renderCertifications(certs) {
  return certs
    .map(
      (cert, i) => `
      <div class="cv-event">
        <div class="cv-event-title">${escapeHtml(cert.title)}</div>
        <div class="cv-event-subtitle">${escapeHtml(cert.issueInfo)}</div>
        <div class="cv-event-date"><i class="fa-regular fa-calendar"></i> ${escapeHtml(cert.dates)}</div>
        ${cert.linkUrl ? `<div class="cert-link"><a href="${escapeHtml(cert.linkUrl)}">${escapeHtml(cert.linkLabel)}</a></div>` : ""}
      </div>
      ${i < certs.length - 1 ? '<div class="divider"></div>' : ""}`
    )
    .join("\n");
}

function renderEducation(edu) {
  return edu
    .map(
      (e) => `
      <div class="cv-event">
        <div class="cv-event-title">${escapeHtml(e.title)}</div>
        <div class="cv-event-subtitle">${escapeHtml(e.institution)}</div>
        <div class="cv-event-date"><i class="fa-regular fa-calendar"></i> ${escapeHtml(e.dates)}</div>
        ${e.modules ? `<ul class="edu-modules">${e.modules.map((m) => `<li>${escapeHtml(m)}</li>`).join("\n")}</ul>` : ""}
      </div>`
    )
    .join("\n");
}

function renderHobbies(hobbies) {
  return `<ul class="key-skills">${hobbies.map((h) => `<li>${escapeHtml(h)}</li>`).join("\n")}</ul>`;
}

// ---------------------------------------------------------------------------
// Build full HTML
// ---------------------------------------------------------------------------
function buildHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(data.name)} — Resume</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Roboto+Slab:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
<style>
/* ======================================================================
   AltaCV-matching theme
   ====================================================================== */

/* --- Reset / base ---------------------------------------------------- */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --color-name:        #000000;
  --color-tagline:     #8F0D0D;
  --color-heading:     #450808;
  --color-headingrule: #000000;
  --color-accent:      #8F0D0D;
  --color-emphasis:    #2E2E2E;
  --color-body:        #666666;
  --color-divider:     #d4d4d4;

  --font-sans:  'Lato', sans-serif;
  --font-serif: 'Roboto Slab', serif;

  --page-width:   210mm;
  --page-min-height: 297mm;
  --margin-top:    0.5cm;
  --margin-bottom: 0.3cm;
  --margin-left:   0.8cm;
  --margin-right:  0.8cm;
  --col-gap:       0.6cm;
}

@page {
  size: A4;
  margin: 0;
}

html {
  font-size: 7.5pt;
}

body {
  font-family: var(--font-sans);
  color: var(--color-body);
  line-height: 1.2;
  background: #f0f0f0;
}

a { color: var(--color-accent); text-decoration: none; }
a:hover { text-decoration: underline; }

/* --- Page container -------------------------------------------------- */
.page {
  width: var(--page-width);
  min-height: var(--page-min-height);
  margin: 0 auto;
  padding: var(--margin-top) var(--margin-right) var(--margin-bottom) var(--margin-left);
  background: #fff;
  box-shadow: 0 0 10px rgba(0,0,0,.15);
}

/* --- Header ---------------------------------------------------------- */
.header { margin-bottom: 0.15em; }
.header-name {
  font-family: var(--font-serif);
  font-weight: 700;
  font-size: 1.8em;
  color: var(--color-name);
  text-transform: uppercase;
  letter-spacing: 0.02em;
}
.header-tagline {
  font-size: 1em;
  font-weight: 700;
  color: var(--color-tagline);
  margin-top: 0.1em;
}
.header-contact {
  font-size: 0.85em;
  margin-top: 0.2em;
  color: var(--color-body);
  display: flex;
  flex-wrap: wrap;
  gap: 0.05em 1em;
}
.header-contact i { color: var(--color-accent); margin-right: 0.15em; }
.header-contact a { color: var(--color-body); }

/* --- Key skills (inline below header) -------------------------------- */
.header-keyskills {
  margin-top: 0.15em;
  display: flex;
  flex-wrap: wrap;
  gap: 0.05em 1em;
  font-size: 0.85em;
}
.header-keyskills li {
  list-style: none;
}
.header-keyskills li::before {
  content: '▸';
  color: var(--color-heading);
  margin-right: 0.3em;
}

/* --- Two-column layout ----------------------------------------------- */
.columns {
  display: grid;
  grid-template-columns: 55fr 45fr;
  gap: 0 var(--col-gap);
}

/* --- Section --------------------------------------------------------- */
.cv-section {
  margin-top: 0.4em;
}
.cv-section-title {
  font-family: var(--font-serif);
  font-weight: 700;
  font-size: 1.15em;
  color: var(--color-heading);
  text-transform: uppercase;
  border-bottom: 2pt solid var(--color-headingrule);
  padding-bottom: 0.05em;
  margin-bottom: 0.15em;
}

/* --- Event (experience / cert / education) --------------------------- */
.cv-event { margin-bottom: 0.1em; }
.cv-event-title {
  font-size: 1em;
  font-weight: 400;
  color: var(--color-emphasis);
}
.cv-event-subtitle {
  font-weight: 700;
  color: var(--color-accent);
  font-size: 0.9em;
}
.cv-event-date {
  font-size: 0.8em;
  color: var(--color-body);
  margin-bottom: 0.05em;
}
.cv-event-date i { margin-right: 0.2em; }

.cv-event ul {
  margin: 0.05em 0 0.02em 1.1em;
  padding: 0;
  font-size: 0.9em;
  color: var(--color-body);
}
.cv-event ul li {
  margin-bottom: 0.02em;
}
.cert-link {
  font-size: 0.85em;
  margin-top: 0.1em;
}

/* --- Divider --------------------------------------------------------- */
.divider {
  border: none;
  border-top: 0.6pt dashed var(--color-divider);
  margin: 0.15em 0;
}

/* --- Technical skills ------------------------------------------------ */
.tech-skills {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 0.85em;
  columns: 2;
  column-gap: var(--col-gap);
}
.tech-skills li {
  margin-bottom: 0.03em;
  break-inside: avoid;
}
.skill-category {
  font-weight: 700;
  color: var(--color-accent);
}

/* --- Key skills / hobbies (multi-column bullets) --------------------- */
.key-skills {
  list-style: none;
  padding: 0;
  margin: 0;
  columns: 2;
  column-gap: 0.8em;
  font-size: 0.88em;
}
.key-skills li::before {
  content: '▸';
  color: var(--color-heading);
  margin-right: 0.4em;
}
.key-skills li {
  break-inside: avoid;
  margin-bottom: 0.05em;
}

/* --- Education modules ----------------------------------------------- */
.edu-modules {
  list-style: none;
  padding: 0;
  margin: 0.05em 0 0 0;
  font-size: 0.88em;
}
.edu-modules li::before {
  content: '▸';
  color: var(--color-heading);
  margin-right: 0.4em;
}
.edu-modules li { margin-bottom: 0.05em; }

/* --- Print / PDF ----------------------------------------------------- */
@media print {
  html { font-size: 7.5pt; }
  body { background: #fff; }
  .page {
    box-shadow: none;
    margin: 0;
    padding: var(--margin-top) var(--margin-right) var(--margin-bottom) var(--margin-left);
    width: 100%;
    min-height: auto;
  }
}
</style>
</head>
<body>

<div class="page" id="resume-page">
  <div class="header">
    <div class="header-name">${escapeHtml(data.name)}</div>
    <div class="header-tagline">${escapeHtml(data.tagline)}</div>
    <div class="header-contact">
      ${renderContactInfo(data.contact)}
    </div>
    <div class="cv-section-title">Key Skills</div>
    <ul class="header-keyskills">
      ${data.keySkills.map((s) => `<li>${escapeHtml(s)}</li>`).join("\n      ")}
    </ul>
  </div>

  <div class="columns">
    <!-- Left column -->
    <div class="col-left">
      <div class="cv-section">
        <div class="cv-section-title">Experience</div>
        ${renderExperience(data.experience)}
      </div>
    </div>

    <!-- Right column -->
    <div class="col-right">
      <div class="cv-section">
        <div class="cv-section-title">Certification</div>
        ${renderCertifications(data.certifications)}
      </div>

      <div class="cv-section">
        <div class="cv-section-title">Education</div>
        ${renderEducation(data.education)}
      </div>

      <div class="cv-section">
        <div class="cv-section-title">Hobbies</div>
        ${renderHobbies(data.hobbies)}
      </div>
    </div>
  </div>

  <div class="cv-section">
    <div class="cv-section-title">Technical Skills</div>
    ${renderTechnicalSkills(data.technicalSkills)}
  </div>
</div>

</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Build GitHub Pages index.html (wrapper with download button + resume view)
// ---------------------------------------------------------------------------
function buildPagesIndex() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(data.name)} — Resume</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Roboto+Slab:wght@400;700&display=swap" rel="stylesheet">
<style>
body {
  font-family: 'Lato', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(120deg, #8F0D0D 0%, #450808 100%);
  margin: 0;
  padding: 20px;
  color: #fff;
}
h1 {
  font-family: 'Roboto Slab', serif;
  margin: 20px 0;
  font-size: 2em;
  letter-spacing: 0.02em;
}
.actions {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}
.actions a {
  color: #fff;
  text-decoration: none;
  background: #8F0D0D;
  padding: 10px 24px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0,0,0,.2);
  transition: background .3s;
  font-weight: 700;
}
.actions a:hover { background: #450808; }
.resume-frame {
  width: 100%;
  max-width: 900px;
  flex: 1;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0,0,0,.25);
  overflow: hidden;
  min-height: 80vh;
}
.resume-frame iframe {
  width: 100%;
  height: 100%;
  min-height: 80vh;
  border: none;
}
</style>
</head>
<body>
<h1>${escapeHtml(data.name)}</h1>
<div class="actions">
  <a href="resume.pdf" download="${escapeHtml(data.name.replace(/ /g, "_"))}_Resume.pdf">Download PDF</a>
  <a href="resume.html" target="_blank">View Full HTML</a>
</div>
<div class="resume-frame">
  <iframe src="resume.html" title="Resume"></iframe>
</div>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const args = process.argv.slice(2);
  const htmlOnly = args.includes("--html-only");
  const pdfOnly = args.includes("--pdf-only");
  const withPages = args.includes("--pages");

  const outDir = path.join(__dirname, "output");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

  const html = buildHtml();
  const htmlPath = path.join(outDir, "resume.html");

  if (!pdfOnly) {
    fs.writeFileSync(htmlPath, html, "utf-8");
    console.log("✔  HTML written to output/resume.html");
  }

  if (!htmlOnly) {
    // Write a temp HTML for Puppeteer even if --pdf-only
    const tempHtml = pdfOnly ? path.join(outDir, "_temp.html") : htmlPath;
    if (pdfOnly) fs.writeFileSync(tempHtml, html, "utf-8");

    const puppeteer = require("puppeteer");
    const launchArgs = [];
    if (process.env.CI === "true" || process.env.GITHUB_ACTIONS === "true") {
      launchArgs.push("--no-sandbox", "--disable-setuid-sandbox");
    }
    const browser = await puppeteer.launch({
      headless: true,
      args: launchArgs,
    });
    const page = await browser.newPage();
    await page.goto("file://" + tempHtml.replace(/\\/g, "/"), {
      waitUntil: "networkidle0",
    });

    // Adaptive font sizing: binary-search for the largest font size
    // that keeps content within one A4 page (297mm tall).
    const A4_HEIGHT_PX = 297 * (96 / 25.4); // ~1122.5px
    let lo = 6, hi = 14;
    while (hi - lo > 0.1) {
      const mid = (lo + hi) / 2;
      await page.evaluate((sz) => {
        document.documentElement.style.fontSize = sz + "pt";
      }, mid);
      // Remove min-height so scrollHeight reflects actual content
      const contentHeight = await page.evaluate(() => {
        const el = document.getElementById("resume-page");
        const orig = el.style.minHeight;
        el.style.minHeight = "0";
        const h = el.scrollHeight;
        el.style.minHeight = orig;
        return h;
      });
      if (contentHeight <= A4_HEIGHT_PX) {
        lo = mid;
      } else {
        hi = mid;
      }
    }
    // Apply the largest fitting size
    await page.evaluate((sz) => {
      document.documentElement.style.fontSize = sz + "pt";
    }, lo);
    console.log(`   Font size adapted to ${lo.toFixed(1)}pt`);

    // Also update the HTML file with the chosen font size
    if (!pdfOnly) {
      const adaptedHtml = html
        .replace(/html\s*\{\s*font-size:\s*[\d.]+pt;/, `html { font-size: ${lo.toFixed(1)}pt;`)
        .replace(/@media print\s*\{[^}]*font-size:\s*[\d.]+pt;/, (m) =>
          m.replace(/font-size:\s*[\d.]+pt;/, `font-size: ${lo.toFixed(1)}pt;`)
        );
      fs.writeFileSync(htmlPath, adaptedHtml, "utf-8");
    }

    await page.pdf({
      path: path.join(outDir, "resume.pdf"),
      format: "A4",
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });
    await browser.close();

    if (pdfOnly && fs.existsSync(tempHtml)) fs.unlinkSync(tempHtml);
    console.log("✔  PDF  written to output/resume.pdf");
  }

  if (withPages) {
    fs.writeFileSync(path.join(outDir, "index.html"), buildPagesIndex(), "utf-8");
    console.log("✔  Pages index written to output/index.html");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
