import React from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'

function AuthenticatedPage({ component, fallback, requiresAdmin=false }) {
  const router = useRouter();
  const user = useSelector((state) => state.user);

  // putting in the admin check
  if (requiresAdmin && !user.isAdmin) {
    router.replace(fallback);
  }

  if (!user.id || !user.token) {
    router.replace(fallback);
  }

  return <>{component}</>;
}

export default AuthenticatedPage