import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, "../dist");

const routes = [
  {
    path: "/",
    title: "Prowexa Technologies | Software Development Company Pune | Build Fast. Scale Smart.",
    description: "Prowexa Technologies Pvt. Ltd. is a top software development company in Pune, India. We build scalable products, React & Flutter mobile apps, AI solutions, and custom ERP/CRM software.",
    canonical: "https://prowexa.com"
  },
  {
    path: "/portfolio",
    title: "Our Portfolio & Case Projects | Prowexa Technologies Pune",
    description: "Explore Prowexa Technologies' portfolio of web applications, React & Flutter mobile apps, AI solutions, and custom enterprise software built for client success.",
    canonical: "https://prowexa.com/portfolio"
  },
  {
    path: "/case-studies",
    title: "Client Case Studies & Success Stories | Prowexa Technologies",
    description: "Read how Prowexa Technologies delivered high-scale engineering: 70% latency reduction for Fintech, 80% legal AI review efficiency, and zero-downtime EHR cloud migrations.",
    canonical: "https://prowexa.com/case-studies"
  },
  {
    path: "/academy",
    title: "Prowexa Academy | Tech Courses & Software Development Internships Pune",
    description: "Bridge academia and industry with Prowexa Academy. Practical training in Java Full Stack, MERN Stack, React Native, AI & Data Science in Pune.",
    canonical: "https://prowexa.com/academy"
  },
  {
    path: "/testimonials",
    title: "Client Reviews & Student Testimonials | Prowexa Technologies",
    description: "Read genuine reviews and success stories from CTOs, founders, product managers, and academy graduates who worked with Prowexa Technologies.",
    canonical: "https://prowexa.com/testimonials"
  },
  {
    path: "/careers",
    title: "Careers & Open Tech Roles | Prowexa Technologies Pune",
    description: "Join Prowexa Technologies. We are hiring Senior Full Stack Engineers, UI/UX Designers, React/Flutter Developers, and AI Engineers in Pune & Remote.",
    canonical: "https://prowexa.com/careers"
  },
  {
    path: "/contact",
    title: "Contact Us & Get a Quote | Prowexa Technologies Pune",
    description: "Get in touch with Prowexa Technologies in Balewadi, Pune. Schedule a project consultation for web, mobile app, AI, or enterprise software development.",
    canonical: "https://prowexa.com/contact"
  }
];

if (!fs.existsSync(distDir)) {
  console.error("Dist directory does not exist. Run vite build first.");
  process.exit(1);
}

const templatePath = path.join(distDir, "index.html");
const templateHtml = fs.readFileSync(templatePath, "utf-8");

for (const route of routes) {
  if (route.path === "/") continue;

  const routeDir = path.join(distDir, route.path.slice(1));
  if (!fs.existsSync(routeDir)) {
    fs.mkdirSync(routeDir, { recursive: true });
  }

  let routeHtml = templateHtml;

  // Replace Title
  routeHtml = routeHtml.replace(
    /<title>.*?<\/title>/,
    `<title>${route.title}</title>`
  );

  // Replace Description
  routeHtml = routeHtml.replace(
    /<meta name="description" content=".*?" \/>/,
    `<meta name="description" content="${route.description}" />`
  );

  // Replace Canonical
  routeHtml = routeHtml.replace(
    /<link rel="canonical" href=".*?" \/>/,
    `<link rel="canonical" href="${route.canonical}" />`
  );

  // Replace OG Title & Description
  routeHtml = routeHtml.replace(
    /<meta property="og:title" content=".*?" \/>/,
    `<meta property="og:title" content="${route.title}" />`
  );
  routeHtml = routeHtml.replace(
    /<meta property="og:description" content=".*?" \/>/,
    `<meta property="og:description" content="${route.description}" />`
  );
  routeHtml = routeHtml.replace(
    /<meta property="og:url" content=".*?" \/>/,
    `<meta property="og:url" content="${route.canonical}" />`
  );

  // Replace Twitter Title & Description
  routeHtml = routeHtml.replace(
    /<meta name="twitter:title" content=".*?" \/>/,
    `<meta name="twitter:title" content="${route.title}" />`
  );
  routeHtml = routeHtml.replace(
    /<meta name="twitter:description" content=".*?" \/>/,
    `<meta name="twitter:description" content="${route.description}" />`
  );
  routeHtml = routeHtml.replace(
    /<meta name="twitter:url" content=".*?" \/>/,
    `<meta name="twitter:url" content="${route.canonical}" />`
  );

  fs.writeFileSync(path.join(routeDir, "index.html"), routeHtml, "utf-8");
  console.log(`Pre-rendered route: ${route.path} -> dist${route.path}/index.html`);
}

console.log("Static HTML pre-rendering complete for all public routes!");
