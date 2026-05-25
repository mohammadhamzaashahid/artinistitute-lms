"use client";

import { useState } from "react";
import { BookOpenCheck, Headphones, ShieldCheck } from "lucide-react";

import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import VerifyOtpForm from "@/components/auth/VerifyOtpForm";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils/cn";

export default function AuthModal({
  open,
  onOpenChange,
  defaultView = "login",
}) {
  const [view, setView] = useState(defaultView);
  const [pendingEmail, setPendingEmail] = useState("");

  function handleOpenChange(value) {
    onOpenChange(value);

    if (!value) {
      setTimeout(() => {
        setView("login");
        setPendingEmail("");
      }, 220);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[92vh] w-[calc(100vw-24px)] overflow-hidden rounded-[28px] border-[#e5edf6] p-0 sm:max-w-[920px]">
        <DialogTitle className="sr-only">Authentication</DialogTitle>
        <div className="grid min-h-[620px] lg:grid-cols-[0.92fr_1.08fr]">
          <div className="relative hidden overflow-hidden bg-[#377dff] p-10 text-white lg:block">
            <div className="absolute -left-16 -top-16 h-52 w-52 rounded-full bg-white/10" />
            <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/10" />

            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <p className="text-[24px] font-semibold tracking-[-0.04em]">
                  Artin Institute
                </p>

                <h2 className="mt-14 text-[42px] font-bold leading-[1.08] tracking-[-0.055em]">
                  Learn smarter with focused audio courses.
                </h2>

                <p className="mt-5 text-[17px] leading-8 text-white/78">
                  Create your account, subscribe to courses, and continue
                  learning from anywhere.
                </p>
              </div>

              <div className="grid gap-4">
                <AuthBenefit
                  icon={Headphones}
                  title="Listen anywhere"
                  description="Mobile-first learning experience."
                />
                <AuthBenefit
                  icon={BookOpenCheck}
                  title="Structured lectures"
                  description="Clear lessons with simple progress."
                />
                <AuthBenefit
                  icon={ShieldCheck}
                  title="Secure account"
                  description="Protected login and subscription access."
                />
              </div>
            </div>
          </div>

          <div className="overflow-y-auto bg-white p-6 sm:p-8 lg:p-10">
            <div className="mx-auto max-w-[430px]">
              <div className="mb-8">
                <div className="inline-flex rounded-full bg-[#f4f7fb] p-1">
                  <AuthTab
                    active={view === "login"}
                    onClick={() => setView("login")}
                  >
                    Sign in
                  </AuthTab>
                  <AuthTab
                    active={view === "register"}
                    onClick={() => setView("register")}
                  >
                    Sign up
                  </AuthTab>
                </div>
              </div>

              {view === "login" ? (
                <LoginForm
                  onForgot={() => setView("forgot")}
                  onSuccess={() => handleOpenChange(false)}
                />
              ) : null}

              {view === "register" ? (
                <RegisterForm
                  onRegistered={(email) => {
                    setPendingEmail(email);
                    setView("verify");
                  }}
                />
              ) : null}

              {view === "verify" ? (
                <VerifyOtpForm
                  email={pendingEmail}
                  onBack={() => setView("register")}
                  onVerified={() => setView("login")}
                />
              ) : null}

              {view === "forgot" ? (
                <ForgotPasswordForm
                  onBack={() => setView("login")}
                  onSuccess={(email) => {
                    setPendingEmail(email);
                    setView("reset-verify");
                  }}
                />
              ) : null}

              {view === "reset-verify" ? (
                <ResetPasswordForm
                  email={pendingEmail}
                  onBack={() => setView("forgot")}
                  onSuccess={() => setView("login")}
                />
              ) : null}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function AuthTab({ children, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-10 rounded-full px-5 text-sm font-bold transition",
        active
          ? "bg-white text-[#20242a] shadow-sm"
          : "text-[#66788f] hover:text-[#20242a]"
      )}
    >
      {children}
    </button>
  );
}

function AuthBenefit({ icon: Icon, title, description }) {
  return (
    <div className="flex gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h3 className="font-bold">{title}</h3>
        <p className="mt-1 text-sm leading-5 text-white/72">{description}</p>
      </div>
    </div>
  );
}
