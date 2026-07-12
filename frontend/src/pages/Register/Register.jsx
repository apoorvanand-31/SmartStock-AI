import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      await api.post("/auth/register", data);

      alert("Registration Successful!");

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-blue-600">
          SmartStock AI
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Create Account
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          <div>
            <label>Name</label>

            <input
              {...register("name", {
                required: "Name is required",
              })}
              className="w-full border rounded-lg p-3 mt-1"
            />

            <p className="text-red-500 text-sm">
              {errors.name?.message}
            </p>
          </div>

          <div>
            <label>Email</label>

            <input
              type="email"
              {...register("email", {
                required: "Email is required",
              })}
              className="w-full border rounded-lg p-3 mt-1"
            />

            <p className="text-red-500 text-sm">
              {errors.email?.message}
            </p>
          </div>

          <div>
            <label>Password</label>

            <input
              type="password"
              {...register("password", {
                required: "Password is required",
              })}
              className="w-full border rounded-lg p-3 mt-1"
            />

            <p className="text-red-500 text-sm">
              {errors.password?.message}
            </p>
          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            {loading ? "Creating..." : "Register"}
          </button>

          <p className="text-center">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-blue-600 font-semibold"
            >
              Login
            </Link>
          </p>

        </form>

      </div>
    </div>
  );
}

export default Register;