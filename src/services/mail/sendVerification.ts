import sgMail from "@sendgrid/mail"
import { MailUser } from "../../interfaces"
import generateToken from "./token"
import dotenv from "dotenv"

dotenv.config()

interface VerificationInput {
  email: string
  username: string
  host: string
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

async function VerificationEmail({
  email,
  username,
  host,
}: VerificationInput): Promise<void> {
  const token = await generateToken({ email })
  const link = `http://${host}/api/authentication/verify/${token}`
  const msg: MailUser = {
    to: email,
    from: process.env.SG_EMAIL,
    subject: "Account Verification",
    html: `
        <html>
          <head></head>
          <body>
            Hello ${username},
            <br>
            <p>
              Please click on the following link : <a href="${link}">to verify your account</a>
            </p>
          </body>
        </html>`,
  }

  try {
    await sgMail.send(msg)
  } catch (e) {
    console.error(e)

    if (e.response) {
      console.error(e.response.body)
    }
    throw new Error(e)
  }
}

export default VerificationEmail
