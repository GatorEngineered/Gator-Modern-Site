// src/app/api/contact/route.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import nodemailer, { Transporter } from "nodemailer";

/**
 * === Required environment variables ===
 * MAIL_TO_OWNER=you@yourdomain.com
 * MAIL_FROM_NAME=Gator Engineered
 * MS365_SMTP_USER=...
 * MS365_SMP_PASS=...
 * MS365_SMTP_HOST=smtp.office365.com
 * MS365_SMTP_PORT=587
 * BOOKING_LINK=https://book.ms/...
 *
 * WEB_URL_CRYPTO=https://yourdomain.com/crypto
 * WEB_URL_WEBSITES=https://yourdomain.com/web
 * WEB_URL_AI=https://yourdomain.com/automation
 * WEB_URL_SEO=https://yourdomain.com/seo-aeo
 */

//
// ---------- Types ----------
//
interface ContactMeta {
  page?: string;
  ts?: string; // ISO
  userAgent?: string;
  timeSpentMs?: number;
}

interface ContactBody {
  name: string;
  email: string;
  message?: string;
  hasWebsite?: boolean | "yes" | "no";
  website?: string;
  phone?: string;
  honey?: string;
  company?: string;
  meta?: ContactMeta;
}

interface UserFacing {
  name: string;
  email: string;
  message: string;
}

interface OwnerEmailData {
  name: string;
  email: string;
  hasWebsite: boolean;
  website?: string;
  message?: string;
  meta: {
    page: string;
    ts: string;
    userAgent: string;
    ip: string;
    timeSpentMs?: number;
  };
}

//
// ---------- Small helpers ----------
//
const WEB_URLS = {
  crypto: process.env.WEB_URL_CRYPTO ?? "https://gatorengineered.com/crypto",
  web: process.env.WEB_URL_WEBSITES ?? "https://gatorengineered.com/web",
  ai: process.env.WEB_URL_AI ?? "https://gatorengineered.com/ai",
  seo: process.env.WEB_URL_SEO ?? "https://gatorengineered.com/marketing",
};

function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function readIp(req: NextRequest): string {
  const f = req.headers.get("x-forwarded-for");
  if (f) return f.split(",")[0].trim();
  const r = req.headers.get("x-real-ip");
  if (r) return r;
  return "";
}

function boolFromYN(v: boolean | "yes" | "no" | undefined): boolean {
  if (v === true || v === "yes") return true;
  if (v === false || v === "no") return false;
  return false;
}

function errMsg(e: unknown): string {
  if (e instanceof Error) return e.message;
  try {
    return JSON.stringify(e);
  } catch {
    return String(e);
  }
}

function makeTransport(): Transporter {
  const user = process.env.MS365_SMTP_USER ?? "";
  const pass = process.env.MS365_SMP_PASS ?? process.env.MS365_SMTP_PASS ?? "";
  const host = process.env.MS365_SMTP_HOST ?? "smtp.office365.com";
  const port = Number(process.env.MS365_SMTP_PORT ?? 587);

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

//
// ---------- Owner summary email (matches your screenshot) ----------
//
function ownerEmailHtml(d: OwnerEmailData): string {
  const yesNo = d.hasWebsite ? "Yes" : "No";

  return `
<div style="font:15px/1.5 -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0b1220;">
  <h1 style="font-size:26px;margin:0 0 18px;">New contact submission</h1>

  <p style="margin:8px 0;"><strong>Name:</strong> ${escapeHtml(d.name)}</p>
  <p style="margin:8px 0;"><strong>Email:</strong> ${escapeHtml(d.email)}</p>
  <p style="margin:8px 0;"><strong>Has Website:</strong> ${yesNo}</p>
  <p style="margin:8px 0;"><strong>Website:</strong> ${escapeHtml(d.website ?? "")}</p>
  <p style="margin:8px 0;"><strong>Message:</strong><br/>${escapeHtml(d.message ?? "")}</p>

  <hr style="border:none;border-top:1px solid #dde3ea;margin:18px 0;" />

  <p style="margin:6px 0;">
    <strong>Source:</strong> &nbsp; <strong>Page:</strong> ${escapeHtml(d.meta.page)}
  </p>
  <p style="margin:6px 0;">
    <strong>SubmittedAt:</strong> ${escapeHtml(d.meta.ts)}
    ${typeof d.meta.timeSpentMs === "number" ? `&nbsp;&nbsp;<strong>TimeSpentMs:</strong> ${d.meta.timeSpentMs}` : ""}
  </p>
  <p style="margin:6px 0;"><strong>UserAgent:</strong> ${escapeHtml(d.meta.userAgent)}</p>
  <p style="margin:6px 0;"><strong>IP:</strong> ${escapeHtml(d.meta.ip)}</p>
</div>`;
}

//
// ---------- User autoresponder (keeps your design) ----------
//
const palette = {
  bg: "#0b1c33",
  card: "#0f2542",
  border: "#1e3a5f",
  blue: "#8bbcff",
  text: "#c6d3e1",
  btn: "#244b7a",
  btnText: "#ffffff",
  headerBg: "#0e2240",
};

function featureCard(title: string, body: string, cta: string, href: string): string {
  return `
<td width="50%" style="padding:10px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
    style="background:${palette.card};border:1px solid ${palette.border};border-radius:12px;">
    <tr><td style="padding:16px;">
      <p style="margin:0 0 8px;font-weight:800;color:${palette.blue};font-size:15px;">${title}</p>
      <p style="margin:0 0 14px;color:${palette.text};font-size:14px;line-height:1.45;">${body}</p>
      <table role="presentation" cellpadding="0" cellspacing="0">
        <tr>
          <td bgcolor="${palette.btn}" style="border-radius:10px;">
            <a href="${href}" target="_blank"
              style="display:inline-block;padding:12px 18px;font-weight:700;font-size:14px;color:${palette.btnText};text-decoration:none;border-radius:10px;">
              ${cta}
            </a>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</td>`;
}

function primaryButton(label: string, href: string): string {
  return `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
  <tr>
    <td align="center" style="padding:8px 0;">
      <a href="${href}" target="_blank"
        style="display:inline-block;background:${palette.btn};color:${palette.btnText};
               padding:14px 22px;border-radius:10px;font-weight:800;text-decoration:none;">
        ${label}
      </a>
    </td>
  </tr>
</table>`;
}

function userEmailHtml(u: UserFacing): string {
  const intro = `
  <tr>
    <td style="padding:18px 18px 0 18px;">
      <p style="margin:0 0 12px;color:#ffffff;font-size:18px;font-weight:800;">
        Hi ${escapeHtml(u.name)},
      </p>
      <p style="margin:0 0 12px;color:${palette.text};font-size:15px;line-height:1.6;">
        Thanks for reaching out — you just unlocked a build process that treats your website like a
        <strong style="color:#ffffff;">living product</strong>, not a static brochure. We combine
        <strong style="color:#ffffff;">Web2 + Web3</strong>,
        <strong style="color:#ffffff;"> AI automation</strong>, and
        <strong style="color:#ffffff;"> Answer-Engine SEO (AEO)</strong>
        so your brand shows up in search <em>and</em> AI results — and keeps customers coming back.
      </p>
    </td>
  </tr>`;

  const yourMsg = `
  <tr>
    <td style="padding:0 18px 10px 18px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
        style="background:${palette.card};border:1px dashed ${palette.border};border-radius:10px;">
        <tr>
          <td style="padding:12px 14px;color:${palette.text};font-size:14px;">
            <div style="opacity:.8;margin-bottom:6px;">What you sent:</div>
            <div style="white-space:pre-wrap;color:#ffffff;">${escapeHtml(u.message)}</div>
          </td>
        </tr>
      </table>
    </td>
  </tr>`;

  const grid = `
  <tr>
    <td style="padding:8px 18px 12px 18px;color:${palette.text};font-size:14px;font-weight:700;">
      What we can build for you
    </td>
  </tr>
  <tr>
    <td style="padding:0 8px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          ${featureCard(
            "Blockchain & Crypto",
            "Loyalty points as tokens, branded coins, wallet login, and gated experiences.",
            "Explore Crypto",
            WEB_URLS.crypto
          )}
          ${featureCard(
            "Websites (Web2 + Web3)",
            "Creator-grade React/Next builds with optional wallet connect & on-chain perks.",
            "See Web Builds",
            WEB_URLS.web
          )}
        </tr>
        <tr>
          ${featureCard(
            "AI Chatbots & Automation",
            "Answer customers 24/7 and automate ops from lead → CRM → follow-up.",
            "Automate With AI",
            WEB_URLS.ai
          )}
          ${featureCard(
            "SEO + AEO Growth",
            "Technical SEO + Answer-Engine Optimization to win Google and AI answers.",
            "Grow Traffic",
            WEB_URLS.seo
          )}
        </tr>
      </table>
    </td>
  </tr>`;

  const booking = primaryButton("Book a 15-min call", process.env.BOOKING_LINK ?? "#");

  const footer = `
  <tr>
    <td style="padding:10px 18px 18px 18px;color:${palette.text};font-size:12px;">
      Prefer email? Reply to this message — I read everything personally.
      <br/><br/>
      <span style="opacity:.7;">— Reva, Software Engineer · Gator Engineered Technologies</span>
    </td>
  </tr>`;

  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
    style="background:${palette.bg};padding:22px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="640" cellpadding="0" cellspacing="0"
          style="background:${palette.card};border-radius:14px;overflow:hidden;">
          <tr>
            <td style="background:${palette.headerBg};padding:16px 18px;border-bottom:1px solid ${palette.border}">
              <div style="font-weight:900;font-size:22px;color:#9dc5ff;">
                Gator Engineered Technologies
              </div>
              <div style="color:${palette.text};opacity:.85;font-size:12px;margin-top:4px;">
                The next evolution of websites — real-time, AI-powered, blockchain-ready.
              </div>
            </td>
          </tr>
          ${intro}
          ${yourMsg}
          ${grid}
          <tr><td style="padding:8px 18px 16px 18px;">${booking}</td></tr>
          ${footer}
        </table>
      </td>
    </tr>
  </table>`;
}

//
// ---------- POST handler ----------
//
export async function POST(req: NextRequest) {
  try {
    const nowIso = new Date().toISOString();
    const ua = req.headers.get("user-agent") ?? "";
    const ip = readIp(req);

    const parsed = (await req.json()) as ContactBody;

    // honeypot
    if (parsed.honey && parsed.honey.trim().length > 0) {
      return NextResponse.json({ ok: true, skipped: true });
    }

    // normalize booleans + message/name/email safe defaults
    const hasWebsite = boolFromYN(parsed.hasWebsite);
    const name = (parsed.name ?? "").trim() || "Friend";
    const email = (parsed.email ?? "").trim();
    const message = (parsed.message ?? "").trim();

    // Build meta
    const meta: OwnerEmailData["meta"] = {
      page: parsed.meta?.page ?? "",
      ts: parsed.meta?.ts ?? nowIso,
      userAgent: parsed.meta?.userAgent ?? ua,
      ip,
      timeSpentMs: parsed.meta?.timeSpentMs,
    };

    const transporter = makeTransport();

    // --- Owner email (plain summary) ---
    const ownerHtml = ownerEmailHtml({
      name,
      email,
      hasWebsite,
      website: parsed.website,
      message,
      meta,
    });

    await transporter.sendMail({
      from: `"${process.env.MAIL_FROM_NAME ?? "Gator Engineered"}" <${process.env.MS365_SMTP_USER}>`,
      to: process.env.MAIL_TO_OWNER ?? "",
      subject: "New contact submission",
      html: ownerHtml,
    });

    // --- User autoresponder (styled) ---
    if (email) {
      const userHtml = userEmailHtml({ name, email, message });
      await transporter.sendMail({
        from: `"${process.env.MAIL_FROM_NAME ?? "Gator Engineered"}" <${process.env.MS365_SMTP_USER}>`,
        to: email,
        subject: "Thanks for reaching out — let’s build it",
        html: userHtml,
      });
    }

    return NextResponse.json({ ok: true, emailOk: true });
  } catch (e: unknown) {
    console.error("contact POST error:", e);
    return NextResponse.json(
      { ok: false, emailOk: false, error: errMsg(e) },
      { status: 500 }
    );
  }
}
