const authService = require("../services/authService");

const register = async (req, res) => {
    try {
        const { name, dob, email, password, address } = req.body;
        if (!name || !email || !password)
            return res.status(400).json({
                message: "Please provide name, email and password",
            });
        await authService.register({ name, dob, email, password, address });
        return res.json({
            message: "OTP has been sent to your email",
        });
    } catch (err) {
        return res.status(err.status || 500).json({ message: err.message });
    }
};

const verifyRegister = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp)
            return res
                .status(400)
                .json({ message: "Please provide email and OTP" });
        const result = await authService.verifyRegister({ email, otp });
        return res.status(201).json(result);
    } catch (err) {
        return res.status(err.status || 500).json({ message: err.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res
                .status(400)
                .json({ message: "Please provide email and password" });
        const result = await authService.login({ email, password });
        return res.json(result);
    } catch (err) {
        return res.status(err.status || 500).json({ message: err.message });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email)
            return res.status(400).json({ message: "Email is required" });
        await authService.forgotPassword({ email });
        return res.json({
            message: "OTP has been sent to your email",
        });
    } catch (err) {
        return res.status(err.status || 500).json({ message: err.message });
    }
};

const verifyResetOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp)
            return res
                .status(400)
                .json({ message: "Please provide email and OTP" });
        await authService.verifyResetOtp({ email, otp });
        return res.json({ message: "OTP is valid" });
    } catch (err) {
        return res.status(err.status || 500).json({ message: err.message });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        if (!email || !newPassword)
            return res
                .status(400)
                .json({ message: "Please provide new password" });
        await authService.resetPassword({ email, newPassword });
        return res.json({ message: "Reset password successfully" });
    } catch (err) {
        return res.status(err.status || 500).json({ message: err.message });
    }
};

module.exports = {
    register,
    verifyRegister,
    login,
    forgotPassword,
    verifyResetOtp,
    resetPassword,
};
