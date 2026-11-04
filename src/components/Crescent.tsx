type Props = { size?: number; className?: string; withFigure?: boolean }

export function Crescent({ size = 24, className, withFigure = false }: Props) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 120 120"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M60 0 A60 60 0 1 1 60 120 A70 70 0 0 0 60 0 Z" fill="currentColor" />
      {withFigure && (
        <>
          <circle cx="30" cy="34" r="13" fill="currentColor" />
          <path
            d="M48 44 C 40 60, 18 66, 10 86 C 6 96, 8 108, 14 118 C 16 100, 30 92, 44 82 C 54 74, 56 58, 48 44 Z"
            fill="var(--sage)"
          />
        </>
      )}
    </svg>
  )
}
