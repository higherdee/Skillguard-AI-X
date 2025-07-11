import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const { email, name } = await req.json()

  try {
    await resend.emails.send({
      from: 'SkillGuard AI <no-reply@skillguard.app>',
      to: [email],
      subject: 'Welcome to SkillGuard AI',
      html: `<strong>Hello ${name},</strong><br />Thanks for joining SkillGuard AI X. Let's secure your skills! 🚀`,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
