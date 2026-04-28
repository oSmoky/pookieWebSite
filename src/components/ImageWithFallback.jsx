import { useState } from "react";

export default function ImageWithFallback({ src, alt, className, fallbackLabel, loading = "lazy" }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`${className ?? ""} image-fallback`}>
        <span>{fallbackLabel}</span>
      </div>
    );
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading={loading}
      onError={() => setFailed(true)}
    />
  );
}
