import publicIp from 'public-ip'
import sgMail from '@sendgrid/mail'

const apiKey = process.env.SENDGRID_API_KEY
const to = process.env.TO_EMAIL
const from = process.env.FROM_EMAIL

if (apiKey && to && from) {
  ; (async () => {
    const myIp = await publicIp.v4()

    // Send email using Sendgrid
    sgMail.setApiKey(apiKey)
    const msg = {
      to: to, // Recipient
      from: from, // Verified sender
      subject: 'Sending latest IP',
      text: `IP: ${myIp}`,
      html: `IP ${myIp}`
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log(`Email sent with IP ${myIp}`)
      })
      .catch((error) => {
        console.error(error)
      })
  })()
} else {
  throw new Error('Missing variables')
}
