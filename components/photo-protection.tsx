"use client"

import { useEffect } from "react"

/** Prevents right-click saving and dragging of all images sitewide. */
export function PhotoProtection() {
  useEffect(() => {
    const blockContextMenu = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === "IMG") e.preventDefault()
    }
    const blockDrag = (e: DragEvent) => {
      if ((e.target as HTMLElement).tagName === "IMG") e.preventDefault()
    }
    document.addEventListener("contextmenu", blockContextMenu)
    document.addEventListener("dragstart", blockDrag)
    return () => {
      document.removeEventListener("contextmenu", blockContextMenu)
      document.removeEventListener("dragstart", blockDrag)
    }
  }, [])

  return null
}
