// Kilka własnych, cienkich ikon — reszta to typografia.

type IconProps = { className?: string };

export function ArrowRight({ className }: IconProps) {
  return (
    <svg className={className} width="20" height="12" viewBox="0 0 20 12" fill="none" aria-hidden="true">
      <path d="M0 6h18M13 1l5 5-5 5" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

export function ArrowLeft({ className }: IconProps) {
  return (
    <svg className={className} width="20" height="12" viewBox="0 0 20 12" fill="none" aria-hidden="true">
      <path d="M20 6H2M7 1 2 6l5 5" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

export function ArrowUp({ className }: IconProps) {
  return (
    <svg className={className} width="12" height="20" viewBox="0 0 12 20" fill="none" aria-hidden="true">
      <path d="M6 20V2M1 7l5-5 5 5" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

export function Plus({ className }: IconProps) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M9 0v18M0 9h18" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}
