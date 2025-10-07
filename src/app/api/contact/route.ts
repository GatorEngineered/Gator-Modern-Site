// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

/* ------------------------- Types & tiny utils ------------------------- */
type InPayload = {
    name?: string;
    email?: string;
    message?: string;
    hasWebsite?: boolean | string;
    website?: string;
    honey?: string;
    meta?: {
        source?: string;
        ts?: string;
        timeSpentMs?: number;
        userAgent?: string;
        page?: string;
    };
};

const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clientIp(req: NextRequest) {
    const fwd = req.headers.get("x-forwarded-for") ?? "";
    const rip = req.headers.get("x-real-ip") ?? "";
    return fwd.split(",")[0]?.trim() || rip || null;
}

/* ----------------------------- Email (SMTP) --------------------------- */
async function sendEmails({
    toOwner,
    toSender,
    ownerSubject,
    ownerHtml,
    senderSubject,
    senderHtml,
}: {
    toOwner: string;
    toSender: string;
    ownerSubject: string;
    ownerHtml: string;
    senderSubject: string;
    senderHtml: string;
}) {
    const host = process.env.MS365_SMTP_HOST || "smtp.office365.com";
    const port = Number(process.env.MS365_SMTP_PORT || "587");
    const user = process.env.MS365_SMTP_USER;
    const pass = process.env.MS365_SMTP_PASS;

    if (!user || !pass) {
        throw new Error("SMTP not configured: MS365_SMTP_USER or MS365_SMTP_PASS is missing.");
    }

    const transporter = nodemailer.createTransport({
        host,
        port,
        secure: false, // STARTTLS (587)
        auth: { user, pass },
    });

    try {
        await transporter.verify(); // tells us immediately if auth/TLS is wrong
    } catch (e: any) {
        throw new Error(`SMTP verify failed: ${e?.message || String(e)}`);
    }

    try {
        await transporter.sendMail({
            from: `"${process.env.MAIL_FROM_NAME || "Gator Engineered"}" <${user}>`,
            to: toOwner,
            subject: ownerSubject,
            html: ownerHtml,
        });
    } catch (e: any) {
        throw new Error(`Owner email failed: ${e?.message || String(e)}`);
    }

    try {
        await transporter.sendMail({
            from: `"${process.env.MAIL_FROM_NAME || "Gator Engineered Technologies"}" <${user}>`,
            to: toSender,
            subject: senderSubject,
            html: senderHtml,
        });
    } catch (e: any) {
        throw new Error(`Sender email failed: ${e?.message || String(e)}`);
    }
}

/* ------------------------ Excel (Graph, app-only) --------------------- */
async function graphToken() {
    const tenant = process.env.MS365_TENANT_ID;
    const clientId = process.env.MS365_CLIENT_ID;
    const clientSecret = process.env.MS365_CLIENT_SECRET;
    if (!tenant || !clientId || !clientSecret) {
        throw new Error("Graph not configured (MS365_TENANT_ID / MS365_CLIENT_ID / MS365_CLIENT_SECRET).");
    }
    const params = new URLSearchParams();
    params.set("client_id", clientId);
    params.set("client_secret", clientSecret);
    params.set("grant_type", "client_credentials");
    params.set("scope", "https://graph.microsoft.com/.default");

    const r = await fetch(`https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
    });
    if (!r.ok) throw new Error(`Graph token failed: ${r.status} ${await r.text()}`);
    const j = (await r.json()) as { access_token: string };
    return j.access_token;
}

async function excelAddRow(values: (string | number | boolean | null)[]) {
    const upn = process.env.MS365_USER_UPN;         // OneDrive owner (e.g. reva@...onmicrosoft.com)
    const filePath = process.env.EXCEL_FILE_PATH;   // e.g. "/ContactSubmissions.xlsx"
    const table = process.env.EXCEL_TABLE_NAME || "Submissions";
    if (!upn || !filePath) throw new Error("Excel target not configured (MS365_USER_UPN / EXCEL_FILE_PATH).");

    const token = await graphToken();
    const url = `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(
        upn
    )}/drive/root:${encodeURI(filePath)}:/workbook/tables('${encodeURIComponent(table)}')/rows/add`;

    const r = await fetch(url, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ values: [values] }),
    });
    if (!r.ok) throw new Error(`Excel add row failed: ${r.status} ${await r.text()}`);
}

/* -------------------------- Email templates --------------------------- */
function ownerEmailHtml(p: InPayload & { ip: string | null; hasWebsite: boolean }) {
    return `
  <h2>New contact submission</h2>
  <p><strong>Name:</strong> ${p.name ?? ""}</p>
  <p><strong>Email:</strong> ${p.email ?? ""}</p>
  <p><strong>Has Website:</strong> ${p.hasWebsite ? "Yes" : "No"}</p>
  <p><strong>Website:</strong> ${p.website ?? ""}</p>
  <p><strong>Message:</strong><br/>${(p.message ?? "").replace(/\n/g, "<br/>")}</p>
  <hr/>
  <p><strong>Source:</strong> ${p.meta?.source ?? ""} &nbsp; <strong>Page:</strong> ${p.meta?.page ?? ""}</p>
  <p><strong>SubmittedAt:</strong> ${p.meta?.ts ?? ""} &nbsp; <strong>TimeSpentMs:</strong> ${p.meta?.timeSpentMs ?? ""}</p>
  <p><strong>UserAgent:</strong> ${p.meta?.userAgent ?? ""}</p>
  <p><strong>IP:</strong> ${p.ip ?? ""}</p>
  `;
}

function senderEmailHtml(p: InPayload) {
    const name = p.name || "there";
    const msg = (p.message ?? "").replace(/\n/g, "<br/>");

    // palette (tuned to your site)
    const C = {
        card: "#0b1430",
        card2: "#0e1a3f",
        text: "#e8f0ff",
        mute: "#a9b7d3",
        border: "#23325b",

        // buttons: dark navy with light text
        btn: "#102a6b",
        btnText: "#e6f0ff",
        btnBorder: "#081c49",

        // gradient text (and fallback color for non-supporting clients)
        gradStart: "#26d0ff",
        gradEnd: "#6c7cff",
        gradFallback: "#5fbaff",
    };

    const LINKS = {
        crypto: "https://gatorengineered.com/services/crypto",
        web: "https://gatorengineered.com/services/web",
        ai: "https://gatorengineered.com/services/ai",
        seo: "https://gatorengineered.com/services/marketing",
        cta: "https://gatorengineered.com/contact",
    };

    // mobile-safe full-width dark-blue button
    const btn = (href: string, label: string) => `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;">
      <tr>
        <td>
          <a href="${href}" style="
              display:block;width:100%;box-sizing:border-box;text-align:center;text-decoration:none;
              font:800 14px/20px Inter,Arial;color:${C.btnText};
              background:${C.btn};
              border:2px solid ${C.btnBorder};
              border-radius:12px;padding:14px 16px;">
            ${label}
          </a>
        </td>
      </tr>
    </table>`;

    // service card
    const card = (title: string, body: string, href: string, label: string) => `
    <td style="vertical-align:top;background:${C.card};
            border:1px solid ${C.border};border-radius:12px;padding:16px;">
      <div style="font:800 14px/20px Inter,Arial;color:${C.gradFallback};margin-bottom:6px;">${title}</div>
      <div style="font:14px/22px Inter,Arial;color:${C.mute};">${body}</div>
      ${btn(href, label)}
    </td>`;

    // gradient text helper with Outlook/Gmail fallback
    const grad = (text: string) => `
    <!--[if mso]><span style="color:${C.gradFallback};font-weight:800;">${text}</span><![endif]-->
    <!--[if !mso]><!-- -->
      <span style="
        background:linear-gradient(90deg, ${C.gradStart}, ${C.gradEnd});
        -webkit-background-clip:text;
        -webkit-text-fill-color:transparent;
        color:${C.gradFallback};
        font-weight:800;">
        ${text}
      </span>
    <!--<![endif]-->`;

    return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:0;margin:0;">
    <tr>
      <td align="center" style="padding:24px 14px;">
        <table role="presentation" width="100%" style="max-width:640px;background:${C.card};
               border-radius:18px;overflow:hidden;border:1px solid ${C.border};">

          <!-- Header (solid; matches card) -->
          <tr>
            <td style="padding:24px 24px 16px;background:${C.card2};">
              <div style="font:900 22px/28px Inter,Arial;color:${C.text};letter-spacing:.2px;">
                Gator Engineered Technologies
              </div>
              <div style="font:600 13px/20px Inter,Arial;color:${C.mute};margin-top:6px;">
                The next evolution of websites — real-time, AI-powered, blockchain-ready.
              </div>
            </td>
          </tr>

          <!-- Intro -->
        <tr>
            <td style="padding:20px 24px 0;">
        <p style="margin:0 0 8px;font:900 18px/26px Inter,Arial;color:${C.text};">Hi ${name},</p>
        <p style="margin:0 0 14px;font:15px/24px Inter,Arial;color:#a9b7d3;">
    Thanks for reaching out — you just unlocked a build process that treats your website like a
    <strong style="color:#e8f0ff;">living product</strong>, not a static brochure.
    We combine <strong style="color:#5fbaff;">Web2 + Web3</strong>,
    <strong style="color:#5fbaff;">AI automation</strong>, and
    <strong style="color:#5fbaff;">Answer-Engine SEO (AEO)</strong>
    so your brand shows up in search <em>and</em> AI results — and keeps customers coming back.
</p>

            </td>
        </tr>

          <!-- Their message -->
          <tr>
            <td style="padding:0 24px 8px;">
              <div style="background:${C.card2};border:1px dashed ${C.border};border-radius:12px;
                          padding:12px 14px;color:${C.text};font:14px/22px Inter,Arial;">
                <div style="opacity:.65;margin:0 0 4px;">What you sent:</div>
                <div>${msg}</div>
              </div>
            </td>
          </tr>

          <!-- Services -->
          <tr><td style="padding:8px 24px 0;">
            <p style="margin:0 0 8px;font:900 16px/24px Inter,Arial;color:${C.text};">What we can build for you</p>
          </td></tr>

          <tr>
            <td style="padding:0 16px 8px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;border-spacing:8px;">
                <tr>
                ${card(
        "Blockchain & Crypto",
        "Loyalty points as tokens, branded coins, wallet login, and gated experiences.",
        LINKS.crypto,
        "Explore Crypto"
    )}
                ${card(
        "Websites (Web2 + Web3)",
        "Creator-grade React/Next builds with optional wallet connect & on-chain perks.",
        LINKS.web,
        "See Web Builds"
    )}
                </tr>
                <tr>
                ${card(
        "AI Chatbots & Automation",
        "Answer customers 24/7 and automate ops from lead → CRM → follow-up.",
        LINKS.ai,
        "Automate With AI"
    )}
                ${card(
        "SEO + AEO Growth",
        "Technical SEO + Answer-Engine Optimization to win Google and AI answers.",
        LINKS.seo,
        "Grow Traffic"
    )}
                </tr>
            </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:10px 24px 20px;text-align:center;">
            ${btn(LINKS.cta, "Book a 15-min call")}
              <div style="margin-top:10px;font:13px/20px Inter,Arial;color:${C.mute};">
                Prefer email? Reply to this message — I read everything personally.
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:14px 24px;border-top:1px solid ${C.border};">
              <div style="font:12px/18px Inter,Arial;color:${C.mute};">
                — Reva, Software Engineer · Gator Engineered Technologies
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>`;
}



/* ------------------------------- Handler ------------------------------ */
export async function POST(req: NextRequest) {
    try {
        const body = (await req.json()) as InPayload;

        // Honeypot
        if (body?.honey) return NextResponse.json({ ok: true });

        const email = (body?.email ?? "").trim();
        if (!EMAIL_RX.test(email)) return NextResponse.json({ error: "Invalid email" }, { status: 400 });

        const hasWebsite =
            typeof body?.hasWebsite === "boolean"
                ? body.hasWebsite
                : String(body?.hasWebsite ?? "").toLowerCase() === "yes";

        const ip = clientIp(req);

        /* ---------- Excel logging (TEMP: bubble errors so we can fix fast) ---------- */
        try {
            const submittedAt = body?.meta?.ts || new Date().toISOString();
            await excelAddRow([
                body?.name ?? "",
                email,
                body?.message ?? "",
                hasWebsite ? "Yes" : "No",
                body?.website ?? "",
                submittedAt,
                body?.meta?.source ?? "",
                body?.meta?.timeSpentMs ?? "",
                body?.meta?.userAgent ?? "",
                body?.meta?.page ?? "",
                ip ?? "",
            ]);
        } catch (e: any) {
            console.error("[contact] Excel append failed:", e?.message || e);
            // While finishing setup, surface the exact reason:
            return NextResponse.json({ error: "Excel failed", detail: e?.message || String(e) }, { status: 502 });
            // After it's fixed, switch to non-blocking:
            // console.error("[contact] Excel append failed:", e); // and continue to emails
        }

        /* --------------------------------- Emails ---------------------------------- */
        const toOwner = process.env.MAIL_TO_OWNER || process.env.MS365_SMTP_USER;
        if (!toOwner) {
            return NextResponse.json(
                { error: "Email failed", detail: "MAIL_TO_OWNER or MS365_SMTP_USER is not set" },
                { status: 502 }
            );
        }

        try {
            await sendEmails({
                toOwner,
                toSender: email,
                ownerSubject: `New contact — ${body?.name ?? ""} (${email})`,
                ownerHtml: ownerEmailHtml({ ...body, ip, hasWebsite }),
                senderSubject: "🔥 Your Business Deserves the Future — Let’s Build It Together",
                senderHtml: senderEmailHtml(body),
            });
        } catch (e: any) {
            console.error("[contact] email error:", e?.message || e);
            return NextResponse.json({ error: "Email failed", detail: e?.message || String(e) }, { status: 502 });
        }

        return NextResponse.json({ ok: true });
    } catch (e: any) {
        console.error("[contact] fatal:", e?.message || e);
        return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }
}
