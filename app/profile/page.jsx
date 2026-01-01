'use client';

import React, { useState, useEffect } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/app/lib/firebase';
// import pdfToText from 'react-pdftotext';

const ProfilePage = () => {
  const [user, loadingAuth] = useAuthState(auth);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [status, setStatus] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name || user.displayName || '');
          setEmail(data.email || user.email || '');
          setResumeText(data.resumeText || '');
          setCountry(data.location?.country || '');
          setCity(data.location?.city || '');
          setGithub(data.github || '');
          setLinkedin(data.linkedin || '');
        } else {
          setName(user.displayName || '');
          setEmail(user.email || '');
        }
      } catch (err) {
        console.error(err);
      }
    };
    if (user) loadProfile();
  }, [user]);

  const handleResumeUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.name.toLowerCase().endsWith('.pdf')) {
      setStatus('Please upload a valid PDF file.');
      return;
    }
  
    setUploading(true);
    setStatus('Analyzing resume...');
  
    try {
      const { default: pdfToText } = await import('react-pdftotext');
      const text = await pdfToText(file);
  
      setResumeText(text.trim());
      setStatus('Resume processed successfully.');
    } catch (err) {
      console.error(err);
      setStatus('Failed to process resume. Please try another file.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    setStatus('Saving profile...');

    try {
      await setDoc(doc(db, 'users', user.uid), {
        name: name.trim(),
        email,
        resumeText,
        location: { country: country.trim(), city: city.trim() },
        github: github.trim(),
        linkedin: linkedin.trim(),
        updatedAt: new Date().toISOString(),
      }, { merge: true });

      setStatus('Profile saved successfully.');
    } catch (err) {
      console.error(err);
      setStatus('Failed to save profile. Please try again.');
    }
  };

  if (loadingAuth) return <div className="flex items-center justify-center min-h-screen"><div className="text-lg text-gray-600">Loading...</div></div>;
  if (!user) return <div className="flex items-center justify-center min-h-screen"><div className="text-lg text-red-600">Please sign in to access your profile.</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-6">
      <div className="max-w-5xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-10 pt-10 pb-12 space-y-10">
            {/* Personal Information */}
            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-6 border-b border-gray-200 pb-3">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                  />
                </div>
              </div>
            </section>

            {/* Resume Upload */}
            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-6 border-b border-gray-200 pb-3">Professional Resume</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Upload Resume (PDF)</label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleResumeUpload}
                    disabled={uploading}
                    className="block w-full text-sm text-gray-600 file:mr-5 file:py-3 file:px-6 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-black file:text-white hover:file:bg-gray-800 transition-all cursor-pointer"
                  />
                </div>
                {resumeText && (
                  <div className="mt-5 p-5 bg-gray-50 border border-gray-200 rounded-lg">
                    <p className="text-sm text-gray-600">Resume processed and ready</p>
                  </div>
                )}
              </div>
            </section>

            {/* Location */}
            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-6 border-b border-gray-200 pb-3">Location</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                    placeholder="United States"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                    placeholder="San Francisco"
                  />
                </div>
              </div>
            </section>

            {/* Professional Links */}
            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-6 border-b border-gray-200 pb-3">Professional Links</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">GitHub</label>
                  <input
                    type="url"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                    placeholder="https://github.com/username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                  <input
                    type="url"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
              </div>
            </section>
          </div>

          {/* Footer with Save Button */}
          <div className="bg-gray-50 px-10 py-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                {status && (
                  <p className={`text-sm font-medium ${status.includes('successfully') ? 'text-green-700' : status.includes('Saving') || status.includes('Analyzing') ? 'text-gray-700' : 'text-red-700'}`}>
                    {status}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={uploading}
                className="px-8 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;