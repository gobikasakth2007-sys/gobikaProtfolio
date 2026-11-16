import { useState } from 'react';
import {
  Check,
  Copy,
  Edit3,
  Github,
  Linkedin,
  Mail,
  Send,
} from 'lucide-react';
import type { ContactInfo } from '../types/portfolio';

interface ContactSectionProps {
  contact: ContactInfo;
  onUpdateContact: (updated: ContactInfo) => void;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

function isConfiguredEmail(email: string): boolean {
  const trimmed = email.trim();
  return trimmed.length > 0 && !trimmed.startsWith('[') && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}

function isConfiguredUrl(url: string): boolean {
  const trimmed = url.trim();
  return trimmed.length > 0 && !trimmed.startsWith('[') && (trimmed.startsWith('http://') || trimmed.startsWith('https://'));
}

export function ContactSection({ contact, onUpdateContact }: ContactSectionProps) {
  const [editingLinks, setEditingLinks] = useState(false);
  const [draftContact, setDraftContact] = useState<ContactInfo>(contact);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Contact form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleCopy = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      window.setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      // Clipboard fallback ignored cleanly
    }
  };

  const handleSaveLinks = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateContact({
      ...draftContact,
      email: draftContact.email.trim() || '[Add Email]',
      linkedinUrl: draftContact.linkedinUrl.trim() || '[Add LinkedIn URL]',
      githubUrl: draftContact.githubUrl.trim() || '[Add GitHub URL]',
    });
    setEditingLinks(false);
  };

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!name.trim() || name.trim().length < 2) {
      nextErrors.name = 'Please enter your name (at least 2 characters).';
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!subject.trim() || subject.trim().length < 3) {
      nextErrors.subject = 'Please enter a subject (at least 3 characters).';
    }
    if (!message.trim() || message.trim().length < 10) {
      nextErrors.message = 'Please write a message of at least 10 characters.';
    }
    return nextErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }
    setSubmitted(true);
  };

  const handleResetForm = () => {
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setErrors({});
    setSubmitted(false);
  };

  const emailReady = isConfiguredEmail(contact.email);
  const linkedinReady = isConfiguredUrl(contact.linkedinUrl);
  const githubReady = isConfiguredUrl(contact.githubUrl);

  return (
    <section
      id="contact"
      className="py-20 sm:py-24 bg-slate-50 dark:bg-[#07080D]"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-xs font-medium tracking-wide text-violet-600 dark:text-violet-400">
            06. Connect
          </p>
          <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 dark:text-white [text-wrap:balance]">
            Get in Touch
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
            Open to internship opportunities, collaborative coding projects, and technical conversations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Direct Contact Details Column */}
          <div className="lg:col-span-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#11131C] p-6 sm:p-7">
            <div className="flex items-center justify-between gap-2 mb-6">
              <h3 className="font-display text-lg font-semibold text-slate-950 dark:text-white">
                Contact Details
              </h3>
              <button
                type="button"
                onClick={() => {
                  setDraftContact(contact);
                  setEditingLinks((prev) => !prev);
                }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-white/10 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:border-violet-500/50 transition-colors"
              >
                <Edit3 className="h-3.5 w-3.5" />
                <span>{editingLinks ? 'Cancel' : 'Edit Links'}</span>
              </button>
            </div>

            {editingLinks ? (
              <form onSubmit={handleSaveLinks} className="space-y-4">
                <div>
                  <label htmlFor="contact-edit-email" className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                    Email
                  </label>
                  <input
                    id="contact-edit-email"
                    type="text"
                    value={draftContact.email}
                    onChange={(e) => setDraftContact({ ...draftContact, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-slate-300 dark:border-white/15 bg-slate-50 dark:bg-[#07080D] px-3.5 py-2 text-sm text-slate-900 dark:text-white focus:border-violet-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="contact-edit-linkedin" className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                    LinkedIn URL
                  </label>
                  <input
                    id="contact-edit-linkedin"
                    type="text"
                    value={draftContact.linkedinUrl}
                    onChange={(e) => setDraftContact({ ...draftContact, linkedinUrl: e.target.value })}
                    placeholder="https://linkedin.com/in/your-profile"
                    className="w-full rounded-lg border border-slate-300 dark:border-white/15 bg-slate-50 dark:bg-[#07080D] px-3.5 py-2 text-sm text-slate-900 dark:text-white focus:border-violet-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="contact-edit-github" className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                    GitHub URL
                  </label>
                  <input
                    id="contact-edit-github"
                    type="text"
                    value={draftContact.githubUrl}
                    onChange={(e) => setDraftContact({ ...draftContact, githubUrl: e.target.value })}
                    placeholder="https://github.com/your-username"
                    className="w-full rounded-lg border border-slate-300 dark:border-white/15 bg-slate-50 dark:bg-[#07080D] px-3.5 py-2 text-sm text-slate-900 dark:text-white focus:border-violet-500 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-2.5 text-xs font-semibold text-white"
                >
                  Save Contact Links
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                {/* Email */}
                <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#090B11] p-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-600/10 text-violet-600 dark:text-violet-400 shrink-0">
                      <Mail className="h-4.5 w-4.5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-slate-500 dark:text-slate-400">Email</p>
                      {emailReady ? (
                        <a
                          href={`mailto:${contact.email}`}
                          className="block truncate text-sm font-medium text-slate-900 dark:text-white hover:text-violet-600 dark:hover:text-violet-400"
                        >
                          {contact.email}
                        </a>
                      ) : (
                        <p className="truncate text-sm font-medium text-slate-700 dark:text-slate-300">
                          {contact.email}
                        </p>
                      )}
                    </div>
                  </div>
                  {emailReady && (
                    <button
                      type="button"
                      onClick={() => handleCopy('email', contact.email)}
                      aria-label="Copy email address"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 shrink-0"
                    >
                      {copiedKey === 'email' ? (
                        <Check className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  )}
                </div>

                {/* LinkedIn */}
                <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#090B11] p-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/10 text-blue-600 dark:text-blue-400 shrink-0">
                      <Linkedin className="h-4.5 w-4.5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-slate-500 dark:text-slate-400">LinkedIn</p>
                      {linkedinReady ? (
                        <a
                          href={contact.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block truncate text-sm font-medium text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          {contact.linkedinUrl}
                        </a>
                      ) : (
                        <p className="truncate text-sm font-medium text-slate-700 dark:text-slate-300">
                          {contact.linkedinUrl}
                        </p>
                      )}
                    </div>
                  </div>
                  {linkedinReady && (
                    <button
                      type="button"
                      onClick={() => handleCopy('linkedin', contact.linkedinUrl)}
                      aria-label="Copy LinkedIn URL"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 shrink-0"
                    >
                      {copiedKey === 'linkedin' ? (
                        <Check className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  )}
                </div>

                {/* GitHub */}
                <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#090B11] p-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900/10 dark:bg-white/10 text-slate-800 dark:text-slate-200 shrink-0">
                      <Github className="h-4.5 w-4.5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-slate-500 dark:text-slate-400">GitHub</p>
                      {githubReady ? (
                        <a
                          href={contact.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block truncate text-sm font-medium text-slate-900 dark:text-white hover:text-violet-600 dark:hover:text-violet-400"
                        >
                          {contact.githubUrl}
                        </a>
                      ) : (
                        <p className="truncate text-sm font-medium text-slate-700 dark:text-slate-300">
                          {contact.githubUrl}
                        </p>
                      )}
                    </div>
                  </div>
                  {githubReady && (
                    <button
                      type="button"
                      onClick={() => handleCopy('github', contact.githubUrl)}
                      aria-label="Copy GitHub URL"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 shrink-0"
                    >
                      {copiedKey === 'github' ? (
                        <Check className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Validated Contact Form Column */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#11131C] p-6 sm:p-8">
            {submitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                  <Check className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-semibold text-slate-950 dark:text-white">
                  Message Validated &amp; Prepared
                </h3>
                <p className="mx-auto max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  Thank you, <span className="font-medium text-slate-900 dark:text-white">{name}</span>. Your inquiry regarding &ldquo;{subject}&rdquo; is ready.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  {emailReady && (
                    <a
                      href={`mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`}
                      className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-2.5 text-xs font-semibold text-white"
                    >
                      <Mail className="h-4 w-4" />
                      <span>Open in Email Client</span>
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="rounded-lg border border-slate-200 dark:border-white/10 px-4 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      aria-invalid={Boolean(errors.name)}
                      placeholder="Recruiter or collaborator name"
                      className={`w-full rounded-lg border bg-slate-50 dark:bg-[#07080D] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                        errors.name
                          ? 'border-rose-500 focus:ring-rose-500/30'
                          : 'border-slate-300 dark:border-white/15 focus:border-violet-500 focus:ring-violet-500/30'
                      }`}
                    />
                    {errors.name && (
                      <p role="alert" className="mt-1.5 text-xs text-rose-600 dark:text-rose-400">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      aria-invalid={Boolean(errors.email)}
                      placeholder="name@company.com"
                      className={`w-full rounded-lg border bg-slate-50 dark:bg-[#07080D] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                        errors.email
                          ? 'border-rose-500 focus:ring-rose-500/30'
                          : 'border-slate-300 dark:border-white/15 focus:border-violet-500 focus:ring-violet-500/30'
                      }`}
                    />
                    {errors.email && (
                      <p role="alert" className="mt-1.5 text-xs text-rose-600 dark:text-rose-400">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={subject}
                    onChange={(e) => {
                      setSubject(e.target.value);
                      if (errors.subject) setErrors({ ...errors, subject: undefined });
                    }}
                    aria-invalid={Boolean(errors.subject)}
                    placeholder="Internship inquiry, project collaboration, etc."
                    className={`w-full rounded-lg border bg-slate-50 dark:bg-[#07080D] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                      errors.subject
                        ? 'border-rose-500 focus:ring-rose-500/30'
                        : 'border-slate-300 dark:border-white/15 focus:border-violet-500 focus:ring-violet-500/30'
                    }`}
                  />
                  {errors.subject && (
                    <p role="alert" className="mt-1.5 text-xs text-rose-600 dark:text-rose-400">
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errors.message) setErrors({ ...errors, message: undefined });
                    }}
                    aria-invalid={Boolean(errors.message)}
                    placeholder="Share details about the role, project, or question..."
                    className={`w-full rounded-lg border bg-slate-50 dark:bg-[#07080D] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                      errors.message
                        ? 'border-rose-500 focus:ring-rose-500/30'
                        : 'border-slate-300 dark:border-white/15 focus:border-violet-500 focus:ring-violet-500/30'
                    }`}
                  />
                  {errors.message && (
                    <p role="alert" className="mt-1.5 text-xs text-rose-600 dark:text-rose-400">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-end">
                  <button
                    type="submit"
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-violet-600/20 hover:from-violet-500 hover:to-blue-500 active:scale-[0.98] transition-all whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                  >
                    <Send className="h-4 w-4" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
