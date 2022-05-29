import nodemailer from 'nodemailer'
export const SendMail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.MAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: 'ucsk.mm@gmail.com',
        pass: 'pkbcvtqmafmchxxu',
      },
    })
    await transporter.sendMail({
      from: 'ucsk.mm@gmail.com',
      to: 'devidol.mm@gmail.com',
      subject: `${subject} For ${email}`,
      text: text,
    })
    console.log('Email sent successfully!')
  } catch (error) {
    console.log(`Email couldn't sent!`)
    console.log(error)
  }
}
