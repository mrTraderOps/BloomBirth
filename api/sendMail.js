export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message, subject } = req.body;

  try {
    const response = await fetch("https://smtp.maileroo.com/api/v2/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.MAILEROO_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: {
          address: "test@b9231233c8650c7e.maileroo.org",
          display_name: "BloomBirth",
        },
        to: {
          address: "earlbandiola0403@gmail.com",
        },
        subject: subject || "Contact Form Submission",
        text: `${message}\n\nFrom: ${name}, ${email}`,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res
        .status(500)
        .json({ error: data.error || "Failed to send email" });
    }

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send email" });
  }
}
