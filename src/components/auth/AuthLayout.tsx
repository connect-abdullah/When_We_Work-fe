import React from "react";
import { Card } from "@/components/ui";
import Image from "next/image";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string | ReactNode;
  showLogo?: boolean;
  logoPath?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  showLogo = true,
  logoPath = "/logo.png",
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-[#5A6ACF]/15 via-[#5A6ACF]/5 to-transparent rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-[#4A5ABF]/15 via-purple-400/10 to-transparent rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
      <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-to-br from-blue-200/10 to-purple-200/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

      <div className="w-full max-w-md relative z-10">
        <Card
          className="p-8 rounded-2xl shadow-2xl border border-white/20 bg-white/90 backdrop-blur-md"
          shadow={false}
        >
          <div className="text-center mb-6">
            {showLogo && (
              <div className="mb-4 flex justify-center">
                <div className="w-12 h-12 bg-gray-300 rounded-xl flex items-center justify-center shadow-md">
                  <Image
                    src={logoPath}
                    alt="logo"
                    width={32}
                    height={32}
                    className="rounded-lg"
                  />
                </div>
              </div>
            )}
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
            {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
          </div>

          <div className="w-full">{children}</div>
        </Card>
      </div>
    </div>
  );
};

export default AuthLayout;
