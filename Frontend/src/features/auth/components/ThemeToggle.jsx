import { useContext } from 'react'
import { ThemeContext } from '../../theme/themeContext.jsx'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <button className='theme' onClick={toggleTheme}>
      {theme === 'light' ? '☀️' : '🌙'}
    </button>
  )
}

export default ThemeToggle