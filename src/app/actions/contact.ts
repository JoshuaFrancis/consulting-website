"use server";

import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().optional(),
  projectType: z.string().optional(),
  message: z.string().min(10, "Please provide more detail about your project"),
  honeypot: z.string().max(0, "Bot detected"),
});

export async function sendContactEmail(formData: z.infer<typeof contactSchema>) {
  const parsed = contactSchema.safeParse(formData);

  if (!parsed.success) {
    return { success: false, error: "Invalid form data" };
  }

  // Honeypot check — if filled, silently succeed
  if (parsed.data.honeypot) {
    return { success: true };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const contactEmail = process.env.CONTACT_EMAIL;

  if (!apiKey || !contactEmail) {
    console.error("Missing env vars: RESEND_API_KEY or CONTACT_EMAIL");
    return { success: false, error: "Contact form is not configured." };
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: contactEmail,
      replyTo: parsed.data.email,
      subject: `New inquiry from ${parsed.data.name}${parsed.data.company ? ` (${parsed.data.company})` : ""}`,
      text: [
        `Name: ${parsed.data.name}`,
        `Email: ${parsed.data.email}`,
        parsed.data.company ? `Company: ${parsed.data.company}` : null,
        parsed.data.projectType ? `Project Type: ${parsed.data.projectType}` : null,
        "",
        "Message:",
        parsed.data.message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    if (error) {
      console.error("Resend error:", JSON.stringify(error));
      return { success: false, error: "Failed to send message. Please try again." };
    }

    return { success: true };
  } catch (err) {
    console.error("Resend exception:", err);
    return { success: false, error: "Failed to send message. Please try again." };
  }
}
