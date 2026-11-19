"use client";

import { useEffect } from "react";

/**
 * Deterrents against casually lifting the site's photographs.
 *
 * What this does: suppresses the right-click menu, image dragging, the
 * long-press save sheet on phones, and the usual save / view-source /
 * developer-tools keystrokes.
 *
 * What it cannot do: stop anyone determined. Every image a browser displays
 * has already been downloaded to the machine showing it, and a visitor who
 * opens the network panel — or simply disables JavaScript — can still take a
 * copy. This raises the effort; it is not protection. The only real defences
 * are watermarking and publishing images no larger than the page needs.
 *
 * The context menu is left alone inside form fields, so a visitor can still
 * paste their phone number into the enquiry form.
 */
export default function ContentGuard() {
  useEffect(() => {
    const isFormField = (target: EventTarget | null) =>
      target instanceof Element && !!target.closest("input, textarea, [contenteditable='true']");

    const onContextMenu = (e: MouseEvent) => {
      if (isFormField(e.target)) return;
      e.preventDefault();
    };

    /* Dragging an image out of the page is the easiest copy of all. */
    const onDragStart = (e: DragEvent) => {
      if (e.target instanceof Element && e.target.closest("img, picture, figure, svg")) {
        e.preventDefault();
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      /* F12 — developer tools. */
      if (key === "f12") {
        e.preventDefault();
        return;
      }

      /* Ctrl/⌘ + S (save page) and Ctrl/⌘ + U (view source). */
      if ((e.ctrlKey || e.metaKey) && !e.shiftKey && (key === "s" || key === "u")) {
        if (isFormField(e.target)) return;
        e.preventDefault();
        return;
      }

      /* Ctrl/⌘ + Shift + I / J / C — developer tools and the element picker. */
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && ["i", "j", "c"].includes(key)) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("dragstart", onDragStart);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("dragstart", onDragStart);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return null;
}
