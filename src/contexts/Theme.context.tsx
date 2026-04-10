import { createContext, useContext, useState } from 'react'
import { useColorScheme } from 'react-native'
import { lightTheme, darkTheme } from '@/constants/theme.constant'

type ThemeType = typeof lightTheme

const ThemeContext = createContext({
  theme: lightTheme,
  toggleTheme: () => {}
})

export const ThemeProvider = ({ children }: any) => {
  const systemTheme = useColorScheme()
  const [isDark, setIsDark] = useState(systemTheme === 'dark')

  const theme = isDark ? darkTheme : lightTheme

  const toggleTheme = () => setIsDark(prev => !prev)

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)