import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'

function withGuest(WrappedComponent, fallback) {
  return function Guest (props) {
    const [isGuest, setIsGuest] = useState(false);
    const router = useRouter();
    const user = useSelector((state) => state.user);
  
    if (user.id || user.token) {
      router.replace(fallback);
    } else {
      setIsGuest(true);
    }
  
    if (isGuest) {
      return <WrappedComponent {...props} />
    } else {
      return null
    }
  }

}

export default withGuest