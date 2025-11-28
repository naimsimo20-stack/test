export function SkipToContent() {
  return (
    <a
      href="#main-content"
      role="navigation"
      className="
        sr-only
        focus:not-sr-only
        focus:fixed
        focus:top-4
        focus:left-4
        focus:z-50
        focus:rounded-md
        focus:p-3
        focus:bg-accent
        focus:text-accent-foreground
        focus:shadow-lg
        focus:outline-none
      "
    >
      Passer au contenu principal
    </a>
  )
}
