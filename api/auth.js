export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false });
  }

  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ success: false });
  }

  if (password === process.env.SITE_PASSWORD) {
    return res.json({ success: true, message: "Access granted ❤️" });
  }

  return res.status(401).json({ success: false, message: "Wrong password ❌" });
}
