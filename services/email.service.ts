import nodemailer from "nodemailer"
import dotenv from "dotenv"
import { MailOptions } from "nodemailer/lib/json-transport"
import fs from "fs/promises"
import { Person } from "../src/models/person.model"
import { jwtService } from "./jwt.service"

dotenv.config()

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.USER_EMAIL!,
        pass: process.env.USER_PASSWORD!
    }
})

async function sendEmail(options: {
    to: string,
    subject: string,
    html: string
}) {
    const mailOptions: MailOptions = {
        from: process.env.USER_EMAIL,
        ...options
    }

    try {
        const info = await transporter.sendMail(mailOptions)
        console.log("email send to:", info.accepted)
    } catch (err) {
        console.log("failed to send email:", err)
    }
}


async function sendEmailVerificationToUser(email: string, token: string) {
    const url = `http://localhost:3000/api/auth/verify/${email}/${token}`

    let emailTemp = await fs.readFile("templates/email.template.html", "utf-8");

    emailTemp=emailTemp.replace("{url}", url)

    await sendEmail({ to: email, subject: "Email Verification", html: emailTemp })
    if(process.env.NODE_ENV=="dev"){
    console.log(url)
    }
}


async function resetVerification(
  user: InstanceType<typeof Person>,
  ex: ms.StringValue | number
) {
  user.isEmailVerified = false;

  const emailToken = jwtService.createToken(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    { expiresIn: ex }
  );

  await sendEmailVerificationToUser(user.email, emailToken);
}

export const emailService = {
    sendEmail,
    sendEmailVerificationToUser,
    resetVerification

}