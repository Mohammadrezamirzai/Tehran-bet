interface MoonIconProps {
  className?: string;
}

export default function MoonIcon({ className = "h-5 w-5" }: MoonIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} text-yellow-400 dark:text-white drop-shadow-[0_2px_8px_rgba(249,115,22,0.4)]`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
      />
    </svg>
  );
}
