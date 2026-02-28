

## Fix: Sign Out Not Working

### Problem
The sign-out button calls `supabase.auth.signOut()` but there's no error handling -- if the call fails silently, the UI won't update and the user stays "logged in." Additionally, the navigation to `/` happens regardless of whether sign-out succeeded.

### About the .env File
The `.env` file is automatically managed by Lovable Cloud and is intentionally hidden from the code editor. Your backend credentials (URL and key) are injected at build time -- you do **not** need to create or edit this file. Everything is already connected.

### Plan

**1. Add error handling and state reset to `signOut` in `useAuth.tsx`**
- Wrap `supabase.auth.signOut()` in a try-catch
- Manually clear `user`, `session`, `isAdmin`, and `candidateProfileId` state after sign-out to ensure the UI updates even if the auth listener doesn't fire
- Add `{ scope: 'local' }` option to ensure the local session is always cleared

**2. Update `handleSignOut` in `Navbar.tsx`**
- Add error handling with a toast notification if sign-out fails
- Ensure navigation to `/` only happens after successful sign-out

### Technical Details

In `useAuth.tsx`, the `signOut` function will change from:
```typescript
const signOut = async () => {
  await supabase.auth.signOut();
};
```
To:
```typescript
const signOut = async () => {
  await supabase.auth.signOut({ scope: 'local' });
  setUser(null);
  setSession(null);
  setIsAdmin(false);
  setCandidateProfileId(null);
};
```

This ensures the local state is always cleared immediately, making the UI responsive even if the backend call has issues.

