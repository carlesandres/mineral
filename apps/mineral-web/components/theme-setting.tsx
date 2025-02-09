import { useState, useEffect } from 'react';
import Checkbox from './Checkbox';
import { useTheme } from 'next-themes';

const ThemeSetting = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <Checkbox
      label="Dark Mode"
      checked={isDark}
      onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
    />
  );
};

export default ThemeSetting;
