"use client";

import { useTheme } from "next-themes";
import { IconButton, Tooltip } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Tooltip title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}>
      <IconButton
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        color="inherit"
      >
        {theme === "dark" ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Tooltip>
  );
} 