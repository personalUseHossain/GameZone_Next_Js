'use client'
import '@/public/CSS/global.css'

import Navbar from '@/components/Navbar'

import { createContext, useState, useEffect } from 'react'
import { isAuth } from '@/utils/auth'
import { usePathname } from 'next/navigation'
import Loading from '@/components/Loading'
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer'





export const MyContext = createContext();




export default function RootLayout({ children }) {
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();




  useEffect(() => {
    const fetchAuthStatus = async () => {
      setLogin(await isAuth())
    };
    fetchAuthStatus();
  }, []);

  const pathname = usePathname()
  const isDashboardPage = pathname.startsWith('/dashboard') ? true : false;
  return (
    <html lang="en">
      <body>
        <MyContext.Provider value={{ login, setLogin, loading, setLoading }}>
          {loading && <Loading />}
          <Navbar style={isDashboardPage ? 'none' : 'flex'} />
          {children}
          <Footer />
        </MyContext.Provider>
      </body>
    </html>
  )
}
