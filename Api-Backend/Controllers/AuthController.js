const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const promisePool = require("../config/db"); // Your MySQL connection pool
const nodemailer = require("nodemailer");

const JWT_SECRETKEY = "jwt_token"
const FRONTEND_URL = `http://localhost:4200`; // Update with your frontend URL


exports.register = async (req, res) => {
    try {
        // Check if the email already exists
        const [userRows] = await promisePool.query(
            "SELECT * FROM users WHERE email = ?",
            [req.body.email]
        );

        if (userRows.length > 0) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Generate password hash
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        // Insert new user into the database
        const [result] = await promisePool.query(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            [req.body.username, req.body.email, hashPassword]
        );

        return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({ message: "Something went wrong during registration" });
    }
};




exports.login = async (req, res) => {
    try {
        // Fetch user from DB by email or username
        const [userRows] = await promisePool.query(
            "SELECT * FROM users WHERE email = ?",
            [req.body.email]
        );

        if (userRows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = userRows[0];

        // Check if the password matches
        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
            },
            JWT_SECRETKEY,
            { expiresIn: "1h" }
        );

        res
            .cookie("access_token", token, { httpOnly: true })
            .status(200)
            .json({
                status: 200,
                message: "Login Success!",
                data: {
                    _id: user.id,
                    username: user.username,
                    email: user.email,
                    token: token,
                },
                token: token,
            });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Internal server error during login" });
    }
};




// 📨 1️⃣ Request Password Reset (Send Email with Reset Link)
exports.requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if user exists
        const [userRows] = await promisePool.query("SELECT * FROM users WHERE email = ?", [email]);

        if (userRows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = userRows[0];

        // Generate Reset Token (Valid for 15 mins)
        const resetToken = jwt.sign({ email: user.email }, JWT_SECRETKEY, { expiresIn: "15m" });

        // Email Transporter (Using Gmail SMTP)
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "ganurag624outlook@gmail.com", // Use your Gmail
                pass: "gcmulzwcsssestwe",  // Generate an App Password in Gmail settings
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // Email Content
        const mailOptions = {
            from: "ganurag624outlook@gmail.com",
            to: email,
            subject: "Campus Connect - Reset Your Password",
            html: `
                <p>Hello ${user.username},</p>
                <p>Click the link below to reset your password:</p>
                <a href="${FRONTEND_URL}/reset-password/${resetToken}">
                  <button style="background-color: #4CAF50; color:white; padding: 14px 20px; border: none; cursor:pointer; border-radius: 4px;">Reset Password</button></a>
                <p>This link will expire in 15 minutes.</p>
            `,
        };

        // Send Email
        await transporter.sendMail(mailOptions);

        return res.json({ message: "Password reset link sent to your email!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

// 🔑 2️⃣ Reset Password (Verify Token & Update Password)
exports.resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        // Verify Token
        jwt.verify(token, JWT_SECRETKEY, async (err, decoded) => {
            if (err) {
                return res.status(400).json({ message: "Invalid or expired token" });
            }

            // Check if user exists
            const [userRows] = await promisePool.query("SELECT * FROM users WHERE email = ?", [decoded.email]);

            if (userRows.length === 0) {
                return res.status(404).json({ message: "User not found" });
            }

            // Hash the new password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);

            // Update Password
            await promisePool.query("UPDATE users SET password = ? WHERE email = ?", [hashedPassword, decoded.email]);

            return res.json({ message: "Password reset successfully!" });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
