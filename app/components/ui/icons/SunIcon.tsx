interface SunIconProps {
  className?: string;
}

export default function SunIcon({ className = "h-5 w-5" }: SunIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} text-black dark:text-yellow-300 drop-shadow-[0_2px_8px_rgba(249,115,22,0.4)]`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.05l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );
}
