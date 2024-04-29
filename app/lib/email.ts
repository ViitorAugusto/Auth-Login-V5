import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTwoFactorEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "2FA code",
    html: `
            <h1>Your  2FA code: ${token}</h1>
          
        `,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset Password",
    html: `
            <h1>Confirm your email</h1>
            <p>Click the link below to confirm your email</p>
            <a href="${resetLink}"> to reset password</a>
        `,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `
            <h1>Confirm your email</h1>
            <p>Click the link below to confirm your email</p>
            <a href="${confirmLink}">Confirm Email</a>
        `,
  });
};
