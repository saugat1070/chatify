import React, { useState } from "react";
import { useAuthStore } from "../Store/userAuth";
import BorderAnimatedContainer from "../components/BorderAnimated";
import {
  MessageCircleCodeIcon,
  LockIcon,
  MailIcon,
  UserIcon,
  LoaderIcon,
  Loader,
} from "lucide-react";
import { Link } from "react-router";

function SignUp() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { signup, isSignUp } = useAuthStore();
  const handleSubmit = (event) => {
    event.preventDefault();
    signup(formData);
    setFormData(() => ({
      fullName: "",
      email: "",
      password: "",
    }));
  };
  return (
    <div className="w-full flex items-center justify-center p-4 bg-slate-900">
      <div className="relative w-full max-w-6xl  md:h-[800px] h-[650px]">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row">
            {/* FORM-COLUMN - LEFT SIDE */}
            <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
              {/* message icon - create account */}
              <div className="w-full max-w-md">
                <div className="text-center mb-8">
                  <MessageCircleCodeIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                  <h2 className="text-2xl font-bold text-slate-200 mb-2">
                    Create Account
                  </h2>
                  <p className="text-slate-400">Sign up for a new account</p>
                </div>
                {/* SIGN-UP FORM */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* for-fullname */}
                  <div>
                    <label className="auth-input-label">Full Name</label>
                    <div className="relative">
                      <UserIcon className="auth-input-icon" />
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        className="input"
                        placeholder="Saugat Giri"
                      />
                    </div>
                  </div>
                  {/* for email */}
                  <div>
                    <label className="auth-input-label">Email</label>
                    <div className="relative">
                      <MailIcon className="auth-input-icon" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="input"
                        placeholder="SaugatGiri@gmail.com"
                      />
                    </div>
                  </div>
                  {/* password-input */}
                  <div>
                    <label className="auth-input-label">Password</label>
                    <div className="relative">
                      <LockIcon className="auth-input-icon" />
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        className="input"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>
                  {/* submit button */}
                  <button
                    className="auth-btn"
                    type="submit"
                    disabled={isSignUp}
                  >
                    {isSignUp ? (
                      <LoaderIcon className="w-full h-5 animate-spin text-center" />
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </form>

                {/* redirect the login */}
                <div className="mt-6 text-center">
                  <Link to="/login" className="auth-link">
                    Already have an account? Login
                  </Link>
                </div>
              </div>
            </div>
            {/* FORM-ILLUSTRATION - RIGHT SIDE */}
            <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent">
              <div>
                <img
                  src="/signup.png"
                  alt="people using mobile devices"
                  className="w-full h-auto object-contain"
                />
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-medium text-cyan-400">
                    Start Your Journey Today
                  </h3>
                  <div className="mt-4 flex justify-center gap-4">
                    <span className="auth-badge">Free</span>
                    <span className="auth-badge">Easy Setup</span>
                    <span className="auth-badge">Privavte</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}

export default SignUp;
