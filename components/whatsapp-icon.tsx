import React from "react"

interface WhatsAppIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
  size?: number
}

/**
 * Standard Official WhatsApp Vector Icon
 * Clean, properly wound path with crisp cutout phone handset
 */
export function WhatsAppIcon({ className = "w-5 h-5", size, ...props }: WhatsAppIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.16c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.32a8.21 8.21 0 0 1-1.26-4.38c0-4.54 3.71-8.25 8.25-8.25 2.2 0 4.27.86 5.83 2.41 1.55 1.56 2.41 3.63 2.41 5.84 0 4.55-3.7 8.25-8.24 8.25zm4.53-5.77c-.25-.13-1.48-.73-1.71-.81-.23-.09-.39-.13-.56.12-.16.25-.62.78-.76.95-.14.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.38-.44.12-.15.16-.25.24-.41.09-.17.05-.32-.02-.44-.06-.13-.55-1.33-.76-1.82-.2-.48-.4-.42-.55-.43-.14-.01-.31-.01-.47-.01-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.07s.89 2.4 1.01 2.56c.13.17 1.75 2.66 4.23 3.73.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.46-.6 1.67-1.18.21-.57.21-1.06.15-1.16-.06-.11-.21-.14-.45-.26z"
      />
    </svg>
  )
}
