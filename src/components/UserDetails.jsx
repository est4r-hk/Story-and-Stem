import { useEffect, useState } from 'react'

const UserDetails = () => {
  const [user, setUser] = useState(null)

  // Load user from localStorage safely
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    } catch (error) {
      console.error('Failed to parse user from localStorage:', error)
      localStorage.removeItem('user')
    }
  }, [])

  // Sync user state across tabs/windows
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const storedUser = localStorage.getItem('user')
        setUser(storedUser ? JSON.parse(storedUser) : null)
      } catch {
        setUser(null)
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <div className="d-flex justify-content-end align-items-center p-3 text-light">
      {user ? (
        <div className="d-flex align-items-center gap-3">
          
          {/* Username */}
          <div className="fw-bold">
            👋 Hello, {user?.username || 'User'}
          </div>

          {/* Logout Button */}
          <button
            className="btn btn-danger btn-sm"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>
      ) : (
        <div className="text-muted">
          Not logged in
        </div>
      )}
    </div>
  )
}

export default UserDetails