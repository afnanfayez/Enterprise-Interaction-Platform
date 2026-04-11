'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import type { AppMessages, Locale } from '@/lib/i18n';

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  accountType: string;
  createdAt: string;
}

interface ProfileViewProps {
  locale: Locale;
  messages: AppMessages;
  profile: ProfileData | null;
  loading: boolean;
  saving: boolean;
  editing: boolean;
  fieldErrors: Record<string, string>;
  onEdit: () => void;
  onCancel: () => void;
  onSave: (name: string, phone: string) => void;
}

function formatMemberSince(dateStr: string, locale: Locale): string {
  if (!dateStr) return '—';
  try {
    return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
}

export default function ProfileView({
  locale,
  messages,
  profile,
  loading,
  saving,
  editing,
  fieldErrors,
  onEdit,
  onCancel,
  onSave,
}: ProfileViewProps) {
  const { profile: t, auth } = messages;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [prevProfile, setPrevProfile] = useState<ProfileData | null>(null);
  const [prevEditing, setPrevEditing] = useState(false);

  // Sync form state during render (React 19 recommended pattern)
  if (profile && profile !== prevProfile) {
    setPrevProfile(profile);
    setName(profile.name);
    setPhone(profile.phone);
  }
  if (editing && !prevEditing && profile) {
    setName(profile.name);
    setPhone(profile.phone);
  }
  if (editing !== prevEditing) {
    setPrevEditing(editing);
  }

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-brand-accent" />
      </div>
    );
  }

  if (!profile) return null;

  const accountTypeLabel =
    auth.accountTypes[profile.accountType as keyof typeof auth.accountTypes] ??
    profile.accountType;

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-xl py-8">
      <h1 className="mb-6 text-2xl font-bold text-neutral-900 dark:text-neutral-100">{t.title}</h1>

      <Card padding="lg">
        <div className="flex flex-col gap-5">
          {/* Name */}
          {editing ? (
            <Input
              label={t.nameLabel}
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={fieldErrors.name}
              required
            />
          ) : (
            <div>
              <p className="text-sm font-semibold text-neutral-500 dark:text-neutral-400">
                {t.nameLabel}
              </p>
              <p className="mt-0.5 text-neutral-900 dark:text-neutral-100">{profile.name}</p>
            </div>
          )}

          {/* Email (always read-only) */}
          <div>
            {editing ? (
              <Input
                label={t.emailLabel}
                value={profile.email}
                disabled
              />
            ) : (
              <>
                <p className="text-sm font-semibold text-neutral-500 dark:text-neutral-400">
                  {t.emailLabel}
                </p>
                <p className="mt-0.5 text-neutral-900 dark:text-neutral-100">{profile.email}</p>
              </>
            )}
          </div>

          {/* Phone */}
          {editing ? (
            <Input
              label={t.phoneLabel}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={fieldErrors.phone}
            />
          ) : (
            <div>
              <p className="text-sm font-semibold text-neutral-500 dark:text-neutral-400">
                {t.phoneLabel}
              </p>
              <p className="mt-0.5 text-neutral-900 dark:text-neutral-100">
                {profile.phone || '—'}
              </p>
            </div>
          )}

          {/* Account type (always read-only) */}
          {!editing && (
            <div>
              <p className="text-sm font-semibold text-neutral-500 dark:text-neutral-400">
                {t.accountTypeLabel}
              </p>
              <p className="mt-0.5 text-neutral-900 dark:text-neutral-100">{accountTypeLabel}</p>
            </div>
          )}

          {/* Member since */}
          {!editing && profile.createdAt && (
            <div>
              <p className="text-sm font-semibold text-neutral-500 dark:text-neutral-400">
                {locale === 'ar' ? 'عضو منذ' : 'Member since'}
              </p>
              <p className="mt-0.5 text-neutral-900 dark:text-neutral-100">
                {formatMemberSince(profile.createdAt, locale)}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="mt-2 flex gap-3">
            {editing ? (
              <>
                <Button
                  onClick={() => onSave(name, phone)}
                  loading={saving}
                >
                  {t.saveButton}
                </Button>
                <Button
                  variant="secondary"
                  onClick={onCancel}
                  disabled={saving}
                >
                  {t.cancelButton}
                </Button>
              </>
            ) : (
              <Button variant="secondary" onClick={onEdit}>
                {t.editButton}
              </Button>
            )}
          </div>
        </div>
      </Card>
      </div>
    </main>
  );
}
