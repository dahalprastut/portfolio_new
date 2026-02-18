import { NextRequest, NextResponse } from "next/server";

// ─── Contact Form API Route ────────────────────────────────────────────────────
//
// To enable real email sending, install nodemailer:
//   npm install nodemailer @types/nodemailer
//
// Then add these to .env.local:
//   SMTP_HOST=smtp.gmail.com
//   SMTP_PORT=587
//   SMTP_USER=your-gmail@gmail.com
//   SMTP_PASS=your-app-password          ← use a Gmail App Password, not your login password
//   CONTACT_EMAIL=dahalprastut@gmail.com
//
// Uncomment the nodemailer block below once configured.
// ─────────────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body as {
      name: string;
      email: string;
      message: string;
    };

    // Basic server-side validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    // ── Email sending via nodemailer (uncomment after setup) ──────────────────
    //
    // import nodemailer from "nodemailer";
    //
    // const transporter = nodemailer.createTransport({
    //   host: process.env.SMTP_HOST,
    //   port: Number(process.env.SMTP_PORT) || 587,
    //   secure: false,
    //   auth: {
    //     user: process.env.SMTP_USER,
    //     pass: process.env.SMTP_PASS,
    //   },
    // });
    //
    // await transporter.sendMail({
    //   from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
    //   to: process.env.CONTACT_EMAIL ?? "dahalprastut@gmail.com",
    //   replyTo: email,
    //   subject: `New message from ${name}`,
    //   html: `
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
    //   `,
    // });
    //
    // ─────────────────────────────────────────────────────────────────────────

    // Log submission until email service is configured
    console.log("[Contact Form]", { name, email, message });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[Contact API]", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
