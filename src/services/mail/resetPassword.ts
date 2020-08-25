import User from "../../models/User"
import sgMail from "@sendgrid/mail"
import { MailUser } from "../../interfaces"
import generateToken from "./token"

import dotenv from "dotenv"

dotenv.config()

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

interface ResetPasswordType {
  email: string
  host: string
}

async function ResetPassword({
  email,
  host,
}: ResetPasswordType): Promise<void> {
  const found = await User.exists({ email })
  if (!found) throw new Error("Cannot find email")
  const token = await generateToken({ email })
  const link = `http://${host}/api/authentication/changepassword/${token}`
  const msg: MailUser = {
    to: email,
    from: process.env.SG_EMAIL,
    subject: "Reset Password Confirmation",
    html: `
        <html>
          <head></head>
          <body>
            <p>
              Please use this Link : <a href="${link}">for reset your password</a>
            </p>
          </body>
        </html>`,
  }
  try {
    await sgMail.send(msg)
  } catch (e) {
    throw new Error(e)
  }
}

export default ResetPassword
