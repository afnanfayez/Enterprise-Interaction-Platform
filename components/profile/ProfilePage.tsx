'use client';

import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/components/auth/AuthProvider';
import { getAccessToken } from '@/components/auth/AuthProvider';
import { getMessages, type Locale } from '@/lib/i18n';
import { updateProfileSchema } from '@/lib/validators';
import ProfileView from './ProfileView';

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  accountType: string;
  createdAt: string;
}

interface ProfilePageProps {
  locale: Locale;
}

export default function ProfilePage({ locale }: ProfilePageProps) {
  const messages = getMessages(locale);
  const { user, isLoading: authLoading } = useAuth();

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/profile', {
        headers: { Authorization: `Bearer ${getAccessToken()}` },
      });
      if (!res.ok) throw new Error('Failed to fetch profile');
      const body = (await res.json()) as { data: ProfileData };
      setProfile(body.data);
    } catch {
      // Profile might not have extra fields yet; fall back to auth user
      if (user) {
        setProfile({
          name: user.name,
          email: user.email,
          phone: '',
          accountType: user.role,
          createdAt: '',
        });
      }
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!authLoading) {
      fetchProfile();
    }
  }, [authLoading, fetchProfile]);

  const handleSave = useCallback(
    async (name: string, phone: string) => {
      setFieldErrors({});

      const result = updateProfileSchema.safeParse({ name, phone });
      if (!result.success) {
        const errs: Record<string, string> = {};
        for (const issue of result.error.issues) {
          const key = issue.path[0];
          if (typeof key === 'string') {
            errs[key] = issue.message;
          }
        }
        setFieldErrors(errs);
        return;
      }

      setSaving(true);
      try {
        const res = await fetch('/api/profile', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAccessToken()}`,
          },
          body: JSON.stringify(result.data),
        });
        if (!res.ok) throw new Error('Failed to update profile');

        const body = (await res.json()) as { data: ProfileData };
        setProfile(body.data);
        setEditing(false);
        toast.success(messages.profile.profileUpdated);
      } catch {
        toast.error(messages.errors.somethingWentWrong);
      } finally {
        setSaving(false);
      }
    },
    [messages],
  );

  const handleEdit = useCallback(() => {
    setFieldErrors({});
    setEditing(true);
  }, []);

  const handleCancel = useCallback(() => {
    setFieldErrors({});
    setEditing(false);
  }, []);

  return (
    <ProfileView
      locale={locale}
      messages={messages}
      profile={profile}
      loading={loading || authLoading}
      saving={saving}
      editing={editing}
      fieldErrors={fieldErrors}
      onEdit={handleEdit}
      onCancel={handleCancel}
      onSave={handleSave}
    />
  );
}
