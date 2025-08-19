import { useDispatch, useSelector } from 'react-redux'
import { setTheme } from '../store'

export default function ThemeToggle() {
  const theme = useSelector((s) => s.preferences.theme)
  const dispatch = useDispatch()
  return (
    <button
      onClick={() => dispatch(setTheme(theme === 'light' ? 'dark' : 'light'))}
      className="rounded-md border px-3 py-1.5 text-sm"
    >
      {theme === 'light' ? 'Dark' : 'Light'} mode
    </button>
  )
}

