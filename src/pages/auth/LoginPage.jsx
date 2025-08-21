import { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { useNavigate, Link } from "react-router-dom"; // thêm Link

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/chat"); // chuyển sang trang chat
    } catch (err) {
      alert(err.response?.data?.message || "Đăng nhập thất bại");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-96">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="absolute left-3 top-3 text-gray-400">📧</span>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              placeholder="Mật khẩu"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="absolute left-3 top-3 text-gray-400">🔒</span>
          </div>

          {/* Button */}
          <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl shadow-lg hover:from-blue-600 hover:to-indigo-600 transition">
            Đăng nhập
          </button>
        </form>

        {/* Links */}
        <div className="flex justify-between mt-4 text-sm">
          <Link to="/register" className="text-green-500 hover:underline">
            Đăng ký
          </Link>
          <Link to="/ForgotPassword" className="text-red-500 hover:underline">
            Quên mật khẩu?
          </Link>
        </div>
      </div>
    </div>
  );
}
