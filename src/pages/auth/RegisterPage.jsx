import { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const register = useAuthStore((s) => s.register);
  const navigate = useNavigate();

  const validatePassword = (pwd) => {
    const hasUpperCase = /[A-Z]/.test(pwd);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
    return pwd.length >= 8 && hasUpperCase && hasSpecialChar;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validatePassword(password)) {
      setError(
        "Mật khẩu phải ít nhất 8 ký tự, có chữ in hoa và ký tự đặc biệt"
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu và xác nhận mật khẩu không khớp");
      return;
    }

    try {
      await register(email, password);
      alert("Đăng ký thành công! Vui lòng đăng nhập.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Đăng ký thất bại");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 to-pink-500">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-96">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Đăng ký
        </h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Mật khẩu"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Xác nhận mật khẩu"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:from-purple-600 hover:to-pink-600 transition">
            Đăng ký
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          Bạn đã có tài khoản?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
}
