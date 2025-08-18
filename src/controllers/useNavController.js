import { useState, useCallback } from "react";

export default function useNavController() {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen(v => !v), []);
  const close = useCallback(() => setOpen(false), []);
  return { open, toggle, close };
}
