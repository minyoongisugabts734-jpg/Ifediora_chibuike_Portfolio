import React, { useState } from "react";

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackInitials?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = "",
  fallbackInitials = "ICD",
  ...rest
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt || "Profile image"}
        className={`bg-gradient-to-br from-surface-container-highest via-surface-container to-primary-container/40 flex flex-col items-center justify-center text-secondary font-code-inline font-semibold select-none ${className}`}
      >
        <span className="text-lg tracking-wider">{fallbackInitials}</span>
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
      {...rest}
    />
  );
};
