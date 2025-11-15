const pool = require('../config/db');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Kullanıcıyı veritabanında arıyoruz
        const [rows] = await pool.query(
            "SELECT * FROM users WHERE username = ?",
            [username]
        );

        if (rows.length === 0) {
            return res.status(400).json({ message: "Kullanıcı bulunamadı" });
        }

        const user = rows[0];

        // Şifre doğrulama
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Şifre hatalı" });
        }

        // Session'a kullanıcıyı kaydet
        req.session.user = {
            id: user.id,
            username: user.username,
            email: user.email
        };

        res.json({ message: "Giriş başarılı", user: req.session.user });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Sunucu hatası" });
    }
};
exports.me = (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "Giriş yapılmamış" });
    }
    res.json({ user: req.session.user });
};

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.json({ message: "Çıkış yapıldı" });
    });
};
// register kullanıcı kaydı ve e-posta doğrulama kodu gönderme
exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    // kontrol: kullanıcı mevcut mu
    const [existing] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existing.length > 0) {
        return res.status(400).json({ message: "Bu e-posta zaten kayıtlı" });
    }

    // rastgele 6 haneli doğrulama kodu
    const code = Math.floor(100000 + Math.random() * 900000);

    // e-posta gönder (emailSender.js)
    await sendEmail({
        to: email,
        subject: "Doğrulama Kodu",
        text: `Doğrulama kodunuz: ${code}`
    });

    // doğrulama kodunu geçici olarak memory'de saklayalım
    verificationCodes[email] = code;

    res.json({ message: "Doğrulama kodu e-posta ile gönderildi" });
};

// verify kodu kontrol edip kullanıcıyı kaydetme
exports.verify = async (req, res) => {
    const { email, code, username, password } = req.body;

    if (verificationCodes[email] != code) {
        return res.status(400).json({ message: "Kod yanlış" });
    }

    const hashed = await bcrypt.hash(password, 10);
    await pool.query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [username, email, hashed]);

    delete verificationCodes[email]; // kodu sil

    res.json({ message: "Kayıt başarılı, giriş yapabilirsiniz" });
};


