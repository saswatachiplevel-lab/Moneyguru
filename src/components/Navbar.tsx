import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  ArrowUpRight,
  User as UserIcon,
  LogOut,
  Sparkles,
  PhoneCall,
  CalendarCheck
} from 'lucide-react';
import { auth, loginWithGoogle, logoutUser } from '../lib/firebase';
import type { User } from 'firebase/auth';

interface NavbarProps {
  onOpenConsultation: (service?: string) => void;
  onOpenPortal: () => void;
  onOpenPartner: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenConsultation,
  onOpenPortal,
  onOpenPartner,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleAuth = async () => {
    try {
      setAuthLoading(true);
      await loginWithGoogle();
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8 pt-4">
      <div className="max-w-7xl mx-auto">
        <div
          className={`flex items-center justify-between px-5 py-3 transition-all duration-300 rounded-full ${
            isScrolled
              ? 'bg-[#071D29]/90 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/40'
              : 'bg-[#0B2733]/65 backdrop-blur-md border border-white/15'
          }`}
        >
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-full bg-[#123B43] border border-[#C9F24A]/40 flex items-center justify-center transition-transform group-hover:scale-105 shadow-inner">
              <span className="text-[#C9F24A] font-bold text-lg leading-none">M</span>
              <div className="w-1.5 h-1.5 rounded-full bg-[#C9F24A] -ml-0.5 mt-2 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-lg tracking-tight leading-none group-hover:text-[#D9F77A] transition-colors">
                Moneyguru
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#C9F24A] font-semibold mt-0.5">
                Financial Services
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <a
              href="#home"
              className="text-white/80 hover:text-white px-3.5 py-1.5 text-sm font-medium rounded-full hover:bg-white/5 transition-all"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-white/80 hover:text-white px-3.5 py-1.5 text-sm font-medium rounded-full hover:bg-white/5 transition-all"
            >
              About Us
            </a>
            <a
              href="#services"
              className="text-white/80 hover:text-white px-3.5 py-1.5 text-sm font-medium rounded-full hover:bg-white/5 transition-all"
            >
              Services
            </a>
            <a
              href="#calculators"
              className="text-white/80 hover:text-white px-3.5 py-1.5 text-sm font-medium rounded-full hover:bg-white/5 transition-all"
            >
              Calculators
            </a>
            <a
              href="#journey"
              className="text-white/80 hover:text-white px-3.5 py-1.5 text-sm font-medium rounded-full hover:bg-white/5 transition-all"
            >
              Beginners
            </a>
            <a
              href="#insights"
              className="text-white/80 hover:text-white px-3.5 py-1.5 text-sm font-medium rounded-full hover:bg-white/5 transition-all"
            >
              Insights
            </a>
            <button
              onClick={onOpenPartner}
              className="text-white/80 hover:text-white px-3.5 py-1.5 text-sm font-medium rounded-full hover:bg-white/5 transition-all"
            >
              Partner
            </button>
            <a
              href="#contact"
              className="text-white/80 hover:text-white px-3.5 py-1.5 text-sm font-medium rounded-full hover:bg-white/5 transition-all"
            >
              Contact
            </a>
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {/* User Account / Google Login Button */}
            {currentUser ? (
              <div className="flex items-center gap-2 bg-white/10 rounded-full pl-2 pr-3 py-1 border border-white/10">
                <button
                  onClick={onOpenPortal}
                  className="flex items-center gap-2 text-xs text-white hover:text-[#C9F24A] transition-colors focus:outline-none"
                  title="Open Client Portal"
                >
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt={currentUser.displayName || 'User'}
                      className="w-6 h-6 rounded-full border border-[#C9F24A]"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-[#123B43] flex items-center justify-center text-[10px] font-bold text-[#C9F24A]">
                      {currentUser.displayName ? currentUser.displayName[0] : 'U'}
                    </div>
                  )}
                  <span className="font-medium truncate max-w-[90px]">
                    {currentUser.displayName?.split(' ')[0] || 'Client'}
                  </span>
                </button>
                <button
                  onClick={handleLogout}
                  className="text-white/50 hover:text-white/90 transition-colors p-1"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleGoogleAuth}
                disabled={authLoading}
                className="hidden md:flex items-center gap-1.5 text-xs text-white/90 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 px-3 py-2 rounded-full transition-all"
              >
                <UserIcon className="w-3.5 h-3.5 text-[#C9F24A]" />
                <span>{authLoading ? 'Signing In...' : 'Sign In'}</span>
              </button>
            )}

            {/* Primary Action Button (Lime Pill) */}
            <button
              onClick={() => onOpenConsultation()}
              className="group flex items-center gap-2 bg-[#C9F24A] hover:bg-[#D9F77A] text-[#071D29] font-bold text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all shadow-md hover:shadow-lg hover:shadow-[#C9F24A]/25 active:scale-95"
            >
              <span>Book Consultation</span>
              <span className="w-5 h-5 rounded-full bg-[#071D29] text-[#C9F24A] flex items-center justify-center transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="w-3 h-3" />
              </span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#C9F24A]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 bg-[#071D29]/95 backdrop-blur-2xl border border-white/15 rounded-3xl p-5 shadow-2xl animate-in fade-in slide-in-from-top-3 duration-200">
            <div className="flex flex-col gap-1 pb-4 border-b border-white/10">
              <a
                href="#home"
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/90 hover:text-[#C9F24A] px-4 py-2.5 text-base font-medium rounded-xl hover:bg-white/5"
              >
                Home
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/90 hover:text-[#C9F24A] px-4 py-2.5 text-base font-medium rounded-xl hover:bg-white/5"
              >
                About Us
              </a>
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/90 hover:text-[#C9F24A] px-4 py-2.5 text-base font-medium rounded-xl hover:bg-white/5"
              >
                Services (7 Categories)
              </a>
              <a
                href="#calculators"
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/90 hover:text-[#C9F24A] px-4 py-2.5 text-base font-medium rounded-xl hover:bg-white/5"
              >
                SIP & EMI Calculators
              </a>
              <a
                href="#journey"
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/90 hover:text-[#C9F24A] px-4 py-2.5 text-base font-medium rounded-xl hover:bg-white/5"
              >
                Beginner Journey
              </a>
              <a
                href="#insights"
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/90 hover:text-[#C9F24A] px-4 py-2.5 text-base font-medium rounded-xl hover:bg-white/5"
              >
                Financial Insights
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPartner();
                }}
                className="text-left text-white/90 hover:text-[#C9F24A] px-4 py-2.5 text-base font-medium rounded-xl hover:bg-white/5"
              >
                Partner With Us
              </button>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/90 hover:text-[#C9F24A] px-4 py-2.5 text-base font-medium rounded-xl hover:bg-white/5"
              >
                Contact
              </a>
            </div>

            <div className="pt-4 flex flex-col gap-2.5">
              {currentUser ? (
                <div className="flex items-center justify-between bg-white/5 px-4 py-3 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-2.5">
                    {currentUser.photoURL ? (
                      <img
                        src={currentUser.photoURL}
                        alt={currentUser.displayName || ''}
                        className="w-8 h-8 rounded-full border border-[#C9F24A]"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[#123B43] flex items-center justify-center font-bold text-[#C9F24A]">
                        {currentUser.displayName ? currentUser.displayName[0] : 'U'}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-semibold text-white leading-tight">
                        {currentUser.displayName}
                      </p>
                      <p className="text-[11px] text-white/60">{currentUser.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenPortal();
                      }}
                      className="text-xs bg-[#123B43] text-[#C9F24A] px-2.5 py-1.5 rounded-lg font-medium"
                    >
                      Portal
                    </button>
                    <button
                      onClick={handleLogout}
                      className="p-1.5 text-white/50 hover:text-white"
                      title="Log Out"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleGoogleAuth}
                  disabled={authLoading}
                  className="w-full flex items-center justify-center gap-2 bg-white/10 text-white py-2.5 rounded-2xl font-medium border border-white/15"
                >
                  <UserIcon className="w-4 h-4 text-[#C9F24A]" />
                  <span>{authLoading ? 'Signing In...' : 'Sign In with Google'}</span>
                </button>
              )}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#C9F24A] text-[#071D29] font-bold py-3 rounded-2xl shadow-lg"
              >
                <span>Book a Free Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
