// app/api/contact/route.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

/* =========================
   Types
========================= */
type ContactBody = {
  name?: string;
  email?: string;
  message?: string;
  hasWebsite?: boolean | string; // "yes" | "no" | boolean
  website?: string;
  phone?: string;
  honey?: string;   // honeypot
  company?: string; // honeypot
  meta?: {
    page?: string;
    ts?: string;
    userAgent?: string;
    timeSpentMs?: number | string;
    source?: string;
  };
};

/* =========================
   Helpers
========================= */
const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clientIp(req: NextRequest): string | undefined {
  const h = req.headers;
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    h.get("cf-connecting-ip") ||
    undefined
  );
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* =========================
   Microsoft Graph → Excel
========================= */
async function graphToken() {
  const tenant = process.env.MS365_TENANT_ID!;
  const clientId = process.env.MS365_CLIENT_ID!;
  const clientSecret = process.env.MS365_CLIENT_SECRET!;
  if (!tenant || !clientId || !clientSecret) {
    throw new Error("Missing MS365 tenant/client credentials.");
  }
  const form = new URLSearchParams();
  form.set("client_id", clientId);
  form.set("client_secret", clientSecret);
  form.set("scope", "https://graph.microsoft.com/.default");
  form.set("grant_type", "client_credentials");
  const res = await fetch(
    `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`,
    { method: "POST", body: form }
  );
  if (!res.ok) throw new Error(`Graph token error ${res.status}: ${await res.text()}`);
  return (await res.json()).access_token as string;
}

async function excelAddRow(values: (string | number | null)[]) {
  const upn = process.env.MS365_USER_UPN!;
  const filePath = process.env.EXCEL_FILE_PATH!;
  const tableName = process.env.EXCEL_TABLE_NAME || "Table1";
  if (!upn || !filePath) throw new Error("Missing MS365_USER_UPN or EXCEL_FILE_PATH.");
  const token = await graphToken();
  const url = `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(
    upn
  )}/drive/root:/${encodeURIComponent(
    filePath
  )}:/workbook/tables('${encodeURIComponent(tableName)}')/rows/add`;
  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ values: [values] }),
  });
  if (!res.ok) throw new Error(`Excel add row error ${res.status}: ${await res.text()}`);
}

/* =========================
   Nodemailer
========================= */
const FROM_NAME = process.env.MAIL_FROM_NAME || "Gator Engineered";
const FROM_EMAIL = process.env.MS365_SMTP_USER || process.env.SMTP_USER || "";
const FROM = `"${FROM_NAME}" <${FROM_EMAIL}>`;

function makeTransport() {
  const host = process.env.MS365_SMTP_HOST || process.env.SMTP_HOST || "smtp.office365.com";
  const port = Number(process.env.MS365_SMTP_PORT || process.env.SMTP_PORT || 587);
  const user = FROM_EMAIL;
  const pass = process.env.MS365_SMTP_PASS || process.env.SMTP_PASS;
  if (!user || !pass) throw new Error("Missing SMTP credentials.");
  return nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } });
}

/* =========================
   Email HTML (exact look)
========================= */

const palette = {
  // background stack
  appBg: "#0b1220",
  cardBg: "#0f1b33",
  headerBarBg: "#0d172a",
  // text
  text: "#e6eefc",
  textSub: "#c6d5f7",
  textMuted: "#8fa3c6",
  // lines
  border: "#213055",
  // buttons
  btnBg: "#18356d",
  btnText: "#ffffff",
  // chips/boxes
  chipBg: "#0c1730",
  chipBorder: "#29406e",
  // feature cards
  featureBorder: "#213055",
  featureCardBg: "#0f1b33",
  accent: "#9cc6ff",
};

function gradientTitleCssBlock() {
  // Put this <style> inline in the header cell for Apple/iOS Mail; others see fallback color.
  return `
    <style>
      @supports (-webkit-background-clip:text) or (-webkit-text-fill-color:transparent) {
        .gradient-text {
          background: linear-gradient(90deg, #4f9cf9, #7ad1f9);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
        }
      }
    </style>
  `;
}

function headerBlock() {
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${palette.headerBarBg};border-radius:16px 16px 0 0;">
    <tr>
      <td style="padding:20px 24px;">
        ${gradientTitleCssBlock()}
        <h1 class="gradient-text" style="margin:0;font-family:Inter,Segoe UI,Arial,sans-serif;font-size:24px;line-height:1.2;font-weight:800;letter-spacing:.3px;color:#7ab5ff;">
          Gator Engineered Technologies
        </h1>
        <p style="margin:6px 0 0;font-size:13px;line-height:1.45;color:${palette.textSub};font-family:Inter,Segoe UI,Arial,sans-serif;">
          The next evolution of websites — real-time, AI-powered, blockchain-ready.
        </p>
      </td>
    </tr>
  </table>
  `;
}

function shell(inner: string) {
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${palette.btnText};padding:24px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="700" cellpadding="0" cellspacing="0" style="background:${palette.cardBg};border-radius:20px;color:${palette.text};font-family:Inter,Segoe UI,Arial,sans-serif;">
          ${headerBlock()}
          <tr>
            <td style="padding:24px 24px 6px;">
              ${inner}
            </td>
          </tr>
          <tr>
            <td style="padding:0 24px 20px;">
              <p style="margin:0;color:${palette.textMuted};font-size:12px;">— Reva, Software Engineer · Gator Engineered Technologies</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>`;
}

function featureCard(title: string, body: string, cta: string, href?: string) {
  return `
  <td width="50%" style="padding:10px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${palette.featureCardBg};border:1px solid ${palette.featureBorder};border-radius:12px;">
      <tr><td style="padding:16px;">
        <p style="margin:0 0 8px;font-weight:800;color:${palette.accent};font-size:15px;">${title}</p>
        <p style="margin:0 0 14px;color:${palette.textSub};font-size:14px;line-height:1.45;">${body}</p>
        <table role="presentation" cellpadding="0" cellspacing="0">
          <tr>
            <td bgcolor="${palette.btnBg}" style="border-radius:10px;">
              <a href="${href ?? process.env.BOOKING_LINK ?? "#"}" target="_blank"
                 style="display:inline-block;padding:12px 18px;font-weight:700;font-size:14px;color:${palette.btnText};text-decoration:none;border-radius:10px;">
                 ${cta}
              </a>
            </td>
          </tr>
        </table>
      </td></tr>
    </table>
  </td>
  `;
}


function primaryButton(label: string, href: string) {
  return `
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-top:10px;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" width="92%">
          <tr>
            <td bgcolor="${palette.btnBg}" style="border-radius:12px;">
              <a href="${href}" target="_blank"
                 style="display:block;padding:16px 22px;color:${palette.btnText};text-decoration:none;font-weight:700;text-align:center;border-radius:12px;">
                 ${label}
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>`;
}

function ownerEmailHtml(payload: ContactBody & { ip?: string; hasWebsiteBool?: boolean }) {
  const { name = "", email = "", message = "", website = "", hasWebsiteBool = false, ip } = payload;

  const hi = `
  <h2 style="margin:0 0 14px;color:${palette.text};font-size:20px;">Hi ${escapeHtml(
    name || "there"
  )},</h2>
  <p style="margin:0 0 10px;color:${palette.textSub};font-size:14px;line-height:1.6;">
    Thanks for reaching out — you just unlocked a build process that treats your website like a
    <strong style="color:${palette.text};">living product</strong>, not a static brochure.
    We combine <strong style="color:${palette.accent};">Web2 + Web3</strong>, <strong style="color:${palette.text};">AI automation</strong>,
    and <strong style="color:${palette.accent};">Answer-Engine SEO (AEO)</strong> so your brand shows up in search <em>and</em> AI results — and keeps customers coming back.
  </p>
  `;

  const youSent = `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
         style="margin:14px 0 18px;background:${palette.chipBg};border:1px dashed ${palette.chipBorder};border-radius:12px;">
    <tr>
      <td style="padding:12px 14px;">
        <p style="margin:0 0 6px;color:${palette.textSub};font-size:13px;">What you sent:</p>
        <pre style="margin:0;white-space:pre-wrap;color:${palette.text};font-size:14px;line-height:1.5;">${escapeHtml(
          message || ""
        )}</pre>
      </td>
    </tr>
  </table>
  `;

  const featuresHeader = `
  <p style="margin:0 0 10px;color:${palette.accent};font-weight:800;">What we can build for you</p>
  `;

const links = {
  crypto: process.env.BOOK_LINK_CRYPTO,
  web:    process.env.BOOK_LINK_WEB,
  ai:     process.env.BOOK_LINK_AI,
  seo:    process.env.BOOK_LINK_SEO,
};

const featuresGrid = `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
  <tr>
    ${featureCard(
      "Blockchain & Crypto",
      "Loyalty points as tokens, branded coins, wallet login, and gated experiences.",
      "Explore Crypto",
      links.crypto
    )}
    ${featureCard(
      "Websites (Web2 + Web3)",
      "Creator-grade React/Next builds with optional wallet connect & on-chain perks.",
      "See Web Builds",
      links.web
    )}
  </tr>
  <tr>
    ${featureCard(
      "AI Chatbots & Automation",
      "Answer customers 24/7 and automate ops from lead → CRM → follow-up.",
      "Automate With AI",
      links.ai
    )}
    ${featureCard(
      "SEO + AEO Growth",
      "Technical SEO + Answer-Engine Optimization to win Google and AI answers.",
      "Grow Traffic",
      links.seo
    )}
  </tr>
</table>
`;


  const infoList = `
  <table role="presentation" cellpadding="0" cellspacing="0" style="margin:6px 0 0;color:${palette.textSub};font-size:13px;">
    <tr><td style="padding:2px 0;"><strong style="color:${palette.text};">Email:</strong> ${escapeHtml(email)}</td></tr>
    <tr><td style="padding:2px 0;"><strong style="color:${palette.text};">Has website:</strong> ${hasWebsiteBool ? "Yes" : "No"}</td></tr>
    ${hasWebsiteBool && website ? `<tr><td style="padding:2px 0;"><strong style="color:${palette.text};">Website:</strong> ${escapeHtml(website)}</td></tr>` : ""}
    ${ip ? `<tr><td style="padding:2px 0;"><strong style="color:${palette.text};">IP:</strong> ${escapeHtml(ip)}</td></tr>` : ""}
  </table>
  `;

  const cta = primaryButton("Book a 15-min call", process.env.BOOKING_LINK ?? "#");

  const inner = `
    ${hi}
    ${youSent}
    ${featuresHeader}
    ${featuresGrid}
    ${cta}
    <p style="margin:12px 0 0;color:${palette.textMuted};font-size:13px;">Prefer email? Reply to this message — I read everything personally.</p>
  `;

  return shell(inner);
}

function senderEmailHtml(payload: ContactBody) {
  const { name = "", message = "" } = payload;

  const intro = `
  <h2 style="margin:0 0 14px;color:${palette.text};font-size:20px;">Hi ${escapeHtml(name || "there")},</h2>
  <p style="margin:0 0 10px;color:${palette.textSub};font-size:14px;line-height:1.6;">
    Thanks for reaching out — you just unlocked a build process that treats your website like a
    <strong style="color:${palette.text};">living product</strong>, not a static brochure.
    We combine <strong style="color:${palette.accent};">Web2 + Web3</strong>,
    <strong style="color:${palette.accent};"> AI automation</strong>, and
    <strong style="color:${palette.accent};"> Answer-Engine SEO (AEO)</strong>
    so your brand shows up in search <em>and</em> AI results — and keeps customers coming back.
  </p>
`;


  const youSent = `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
         style="margin:14px 0 18px;background:${palette.chipBg};border:1px dashed ${palette.chipBorder};border-radius:12px;">
    <tr>
      <td style="padding:12px 14px;">
        <p style="margin:0 0 6px;color:${palette.textSub};font-size:13px;">What you sent:</p>
        <pre style="margin:0;white-space:pre-wrap;color:${palette.text};font-size:14px;line-height:1.5;">${escapeHtml(
          message || ""
        )}</pre>
      </td>
    </tr>
  </table>
  `;

  const featuresHeader = `<p style="margin:0 0 10px;color:${palette.text};font-weight:800;">What we can build for you</p>`;

  const links = {
  crypto: process.env.BOOK_LINK_CRYPTO,
  web:    process.env.BOOK_LINK_WEB,
  ai:     process.env.BOOK_LINK_AI,
  seo:    process.env.BOOK_LINK_SEO,
};

const featuresGrid = `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
  <tr>
    ${featureCard(
      "Blockchain & Crypto",
      "Loyalty points as tokens, branded coins, wallet login, and gated experiences.",
      "Explore Crypto",
      links.crypto
    )}
    ${featureCard(
      "Websites (Web2 + Web3)",
      "Creator-grade React/Next builds with optional wallet connect & on-chain perks.",
      "See Web Builds",
      links.web
    )}
  </tr>
  <tr>
    ${featureCard(
      "AI Chatbots & Automation",
      "Answer customers 24/7 and automate ops from lead → CRM → follow-up.",
      "Automate With AI",
      links.ai
    )}
    ${featureCard(
      "SEO + AEO Growth",
      "Technical SEO + Answer-Engine Optimization to win Google and AI answers.",
      "Grow Traffic",
      links.seo
    )}
  </tr>
</table>
`;


  const cta = primaryButton("Book a 15-min call", process.env.BOOKING_LINK ?? "#");

  const inner = `
    ${intro}
    ${youSent}
    ${featuresHeader}
    ${featuresGrid}
    ${cta}
    <p style="margin:12px 0 0;color:${palette.textMuted};font-size:13px;">Prefer email? Reply to this message — I read everything personally.</p>
  `;

  return shell(inner);
}

/* =========================
   Route handler
========================= */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ContactBody;

    // Honeypots
    if (body?.honey || body?.company) {
      return NextResponse.json({ ok: true, skipped: "honeypot" });
    }

    // Basic validation
    const name = (body?.name ?? "").trim();
    const email = (body?.email ?? "").trim();
    const message = (body?.message ?? "").trim();
    if (!name || !email || !EMAIL_RX.test(email) || !message) {
      return NextResponse.json({ error: "Invalid or missing fields" }, { status: 400 });
    }

    const hasWebsiteBool =
      typeof body?.hasWebsite === "boolean"
        ? body.hasWebsite
        : String(body?.hasWebsite ?? "").toLowerCase() === "yes";

    const website = (body?.website ?? "").trim();
    const ip = clientIp(req);

    /* ---- Excel logging ---- */
    let excelOk = false;
    let excelError: string | undefined;
    try {
      const submittedAt = body?.meta?.ts || new Date().toISOString();
      await excelAddRow([
        name,
        email,
        message,
        hasWebsiteBool ? "Yes" : "No",
        website,
        submittedAt,
        body?.meta?.source ?? "",
        body?.meta?.timeSpentMs ?? "",
        body?.meta?.userAgent ?? "",
        body?.meta?.page ?? "",
        ip ?? "",
      ]);
      excelOk = true;
    } catch (e: any) {
      excelError = e?.message || String(e);
      console.error("[contact] Excel append failed:", excelError);
    }

    /* ---- Emails ---- */
    let emailOk = false;
    let emailError: string | undefined;

    try {
      const transporter = makeTransport();
      const toOwner = process.env.MAIL_TO_OWNER || FROM_EMAIL;
      if (!toOwner) throw new Error("MAIL_TO_OWNER or SMTP_USER not set.");

      // Owner
      await transporter.sendMail({
        from: FROM, // shows as “Gator Engineered”
        to: toOwner,
        replyTo: `${name} <${email}>`,
        subject: `New contact — ${name} (${email})`,
        html: ownerEmailHtml({ ...body, ip: ip ?? undefined, hasWebsiteBool }),
      });

      // Autoresponder
      await transporter.sendMail({
        from: FROM,
        to: email,
        subject: "🔥 Your Business Deserves the Future — Let’s Build It Together",
        html: senderEmailHtml(body),
      });

      emailOk = true;
    } catch (e: any) {
      emailError = e?.message || String(e);
      console.error("[contact] email error:", emailError);
    }

    if (excelOk || emailOk) {
      return NextResponse.json({ ok: true, excelOk, emailOk, excelError, emailError });
    }
    return NextResponse.json(
      { error: "Logging and email both failed", excelError, emailError },
      { status: 502 }
    );
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || String(e) }, { status: 500 });
  }
}
