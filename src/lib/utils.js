export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

// Files in public/ are root-relative; prefix them with the basePath when the
// site is exported to a sub-directory (see next.config.mjs).
export function asset(path) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${path}`
}
