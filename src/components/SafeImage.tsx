import { useState, type ReactNode } from 'react';

interface SafeImageProps {
  src?: string;
  alt: string;
  className?: string;
  fallbackTitle: string;
  fallbackIcon?: ReactNode;
}

export function SafeImage({
  src,
  alt,
  className = '',
  fallbackTitle,
  fallbackIcon,
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-slate-100 via-slate-200/70 to-violet-100/60 dark:from-[#12141E] dark:via-[#151828] dark:to-violet-950/30 p-6 text-center ${className}`}
      >
        {fallbackIcon && (
          <div className="text-violet-600 dark:text-violet-400 opacity-85">{fallbackIcon}</div>
        )}
        <span className="font-display text-sm font-medium text-slate-600 dark:text-slate-300 max-w-[22ch]">
          {fallbackTitle}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
