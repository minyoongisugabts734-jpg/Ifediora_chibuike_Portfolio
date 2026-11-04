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
        aria-label={alt || "Portrait image"}
        className={`bg-gradient-to-br from-primary-fixed via-surface-container to-tertiary-fixed flex flex-col items-center justify-center text-primary font-headline-md font-bold select-none ${className}`}
      >
        <span className="tracking-tight">{fallbackInitials}</span>
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
