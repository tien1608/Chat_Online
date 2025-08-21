import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const forgotPassword = useAuthStore((s) => s.forgotPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const resMessage = await forgotPassword(email);
      setMessage(resMessage);
    } catch (err) {
      setMessage(err.response?.data?.message || "Gửi email thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-yellow-400 to-orange-500">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-96">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Quên mật khẩu
        </h2>

        {message && (
          <p
            className={`text-center mb-4 ${
              message.includes("thành công") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Nhập email của bạn"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-xl shadow-lg hover:from-yellow-600 hover:to-orange-600 transition disabled:opacity-50"
          >
            {loading ? "Đang gửi..." : "Gửi email"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          Quay lại{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
}
