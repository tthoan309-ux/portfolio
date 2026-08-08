"use client";

import { useEffect } from "react";

const editableSelector =
  "input, textarea, select, [contenteditable='true'], [role='textbox']";

export function CopyProtection() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;

    document.documentElement.classList.add("copy-protected");

    const isEditable = (target: EventTarget | null) =>
      target instanceof Element && Boolean(target.closest(editableSelector));

    const preventCopy = (event: Event) => {
      if (!isEditable(event.target)) event.preventDefault();
    };

    const preventCopyShortcut = (event: KeyboardEvent) => {
      if (
        !isEditable(event.target) &&
        (event.ctrlKey || event.metaKey) &&
        ["c", "x"].includes(event.key.toLowerCase())
      ) {
        event.preventDefault();
      }
    };

    document.addEventListener("copy", preventCopy);
    document.addEventListener("cut", preventCopy);
    document.addEventListener("contextmenu", preventCopy);
    document.addEventListener("dragstart", preventCopy);
    document.addEventListener("keydown", preventCopyShortcut);

    return () => {
      document.documentElement.classList.remove("copy-protected");
      document.removeEventListener("copy", preventCopy);
      document.removeEventListener("cut", preventCopy);
      document.removeEventListener("contextmenu", preventCopy);
      document.removeEventListener("dragstart", preventCopy);
      document.removeEventListener("keydown", preventCopyShortcut);
    };
  }, []);

  return null;
}
