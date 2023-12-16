
exports.transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAILSENDER,
        pass: process.env.EMAILPASS,
    },
    tls: {
        rejectUnauthorized: false
    }
});