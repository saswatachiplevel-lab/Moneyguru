import React, { useState, useEffect } from 'react';
import {
  X,
  User as UserIcon,
  LogOut,
  CalendarCheck,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Save,
  HelpCircle,
  FileText
} from 'lucide-react';
import {
  auth,
  loginWithGoogle,
  logoutUser,
  getUserConsultations,
  getUserProfile,
  updateUserProfile,
  type ConsultationBooking,
  type UserProfile
} from '../lib/firebase';
import type { User } from 'firebase/auth';
import { MoneyguruLogo } from './MoneyguruLogo';

interface ClientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookNewConsultation: () => void;
}

export const ClientPortalModal: React.FC<ClientPortalModalProps> = ({
  isOpen,
  onClose,
  onBookNewConsultation,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [consultations, setConsultations] = useState<ConsultationBooking[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  // Questionnaire States
  const [riskAppetite, setRiskAppetite] = useState<'Conservative' | 'Moderate' | 'Aggressive' | 'Not Sure'>('Moderate');
  const [primaryGoal, setPrimaryGoal] = useState<string>('Long-term Wealth Creation & Protection');
  
  const [loading, setLoading] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      if (user) {
        setLoading(true);
        try {
          const [fetchedConsultations, userProf] = await Promise.all([
            getUserConsultations(user.uid),
            getUserProfile(user.uid)
          ]);
          setConsultations(fetchedConsultations);
          if (userProf) {
            setProfile(userProf);
            if (userProf.riskAppetite) setRiskAppetite(userProf.riskAppetite);
            if (userProf.primaryGoal) setPrimaryGoal(userProf.primaryGoal);
          }
        } catch (err) {
          console.error('Error fetching portal data:', err);
        } finally {
          setLoading(false);
        }
      } else {
        setConsultations([]);
        setProfile(null);
      }
    });
    return () => unsub();
  }, [isOpen]);

  const handleSaveProfile = async () => {
    if (!currentUser) return;
    try {
      setSavingProfile(true);
      setSaveSuccess(false);
      await updateUserProfile(currentUser.uid, {
        riskAppetite,
        primaryGoal,
        displayName: currentUser.displayName || 'Client',
        email: currentUser.email || '',
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Profile update failed:', err);
    } finally {
      setSavingProfile(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await loginWithGoogle();
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#071D29]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="bg-[#071D29] p-6 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <MoneyguruLogo size={38} showText={false} />
            <div>
              <h3 className="text-lg font-bold">Moneyguru Client Portal</h3>
              <p className="text-xs text-white/60">
                {currentUser ? currentUser.email : 'Sign in to access your inquiries & profile'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-[#092532]">
          
          {!currentUser ? (
            <div className="py-10 text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#071D29] text-[#C9F24A] flex items-center justify-center mx-auto mb-4">
                <UserIcon className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-[#092532]">Sign In with Your Google Account</h4>
              <p className="text-xs sm:text-sm text-[#607078] mt-2 max-w-md mx-auto">
                Securely track all your consultation inquiries, scheduled sessions, and investor risk profile in one place.
              </p>
              <div className="mt-6">
                <button
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="inline-flex items-center gap-2 bg-[#071D29] hover:bg-[#0B2733] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full transition-all shadow-md"
                >
                  <UserIcon className="w-4 h-4 text-[#C9F24A]" />
                  <span>{loading ? 'Connecting...' : 'Sign In with Google'}</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Profile Summary Card */}
              <div className="p-5 rounded-2xl bg-[#F7F8F5] border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt={currentUser.displayName || ''}
                      className="w-12 h-12 rounded-full border-2 border-[#C9F24A]"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-[#071D29] text-[#C9F24A] font-bold flex items-center justify-center">
                      {currentUser.displayName ? currentUser.displayName[0] : 'U'}
                    </div>
                  )}
                  <div>
                    <h4 className="text-base font-bold text-[#092532] leading-tight">
                      {currentUser.displayName}
                    </h4>
                    <p className="text-xs text-[#607078]">{currentUser.email}</p>
                    <span className="inline-block text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full mt-1">
                      Verified Client Account
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    logoutUser();
                    onClose();
                  }}
                  className="flex items-center gap-1.5 text-xs text-red-600 hover:text-red-700 font-medium py-1.5 px-3 rounded-lg border border-red-200 hover:bg-red-50 w-fit"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>

              {/* Consultation Bookings Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#092532] flex items-center gap-1.5">
                    <CalendarCheck className="w-4 h-4 text-[#123B43]" />
                    <span>My Booked Consultations ({consultations.length})</span>
                  </h4>
                  <button
                    onClick={() => {
                      onClose();
                      onBookNewConsultation();
                    }}
                    className="text-xs font-bold text-[#071D29] hover:underline"
                  >
                    + Book Another
                  </button>
                </div>

                {consultations.length === 0 ? (
                  <div className="p-6 rounded-2xl border border-dashed border-gray-300 text-center text-xs text-[#607078]">
                    <p>No booked consultations logged under this account yet.</p>
                    <button
                      onClick={() => {
                        onClose();
                        onBookNewConsultation();
                      }}
                      className="mt-2 text-xs font-bold text-[#071D29] underline"
                    >
                      Schedule your first free session now
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {consultations.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#092532]">{item.service}</span>
                            <span className="text-[10px] font-semibold bg-[#C9F24A]/40 text-[#071D29] px-2 py-0.5 rounded-full capitalize">
                              {item.status}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#607078] mt-1">
                            Contact via: {item.preferredContact} • {new Date(item.createdAt).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-gray-500 italic mt-1 line-clamp-1">
                            "{item.message}"
                          </p>
                        </div>
                        <span className="text-[10px] font-mono text-gray-400">
                          Ref: {item.id?.substring(0, 8)}...
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Investor Profile Questionnaire (Stored in Firestore) */}
              <div className="p-5 rounded-2xl bg-[#F7F8F5] border border-gray-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#071D29]" />
                    <h4 className="text-xs sm:text-sm font-bold text-[#092532] uppercase tracking-wider">
                      My Investor Suitability Profile
                    </h4>
                  </div>
                  {saveSuccess && (
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 animate-in fade-in">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Saved!
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#092532] mb-1.5">
                    Your Comfort With Risk
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(['Conservative', 'Moderate', 'Aggressive', 'Not Sure'] as const).map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setRiskAppetite(level)}
                        className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all ${
                          riskAppetite === level
                            ? 'bg-[#071D29] text-[#C9F24A] border-[#071D29] shadow-sm'
                            : 'bg-white text-[#607078] border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#092532] mb-1.5">
                    Primary Financial Priority
                  </label>
                  <select
                    value={primaryGoal}
                    onChange={(e) => setPrimaryGoal(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#071D29]"
                  >
                    <option value="Long-term Wealth Creation & Protection">Long-term Wealth Creation & Protection</option>
                    <option value="Emergency Fund & Health Shield">Emergency Fund & Healthcare Shield</option>
                    <option value="Child Higher Education Planning">Child Higher Education Planning</option>
                    <option value="Debt Reduction & Home Loan Prepayment">Debt Reduction & Loan Prepayment</option>
                    <option value="Retirement Freedom Corpus">Retirement Freedom Corpus</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleSaveProfile}
                    disabled={savingProfile}
                    className="flex items-center justify-center gap-2 bg-[#071D29] text-[#C9F24A] hover:bg-[#0B2733] font-bold text-xs px-5 py-2.5 rounded-xl transition-all disabled:opacity-50"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{savingProfile ? 'Saving Changes...' : 'Save Profile Preferences'}</span>
                  </button>
                </div>
              </div>

            </>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="text-xs font-bold text-gray-600 px-5 py-2 rounded-full border border-gray-300 hover:bg-gray-100"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
