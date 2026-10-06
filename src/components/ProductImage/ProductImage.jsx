import React, { useState } from "react";
import fallback from "../../assets/product-fallback.svg";
import "./ProductImage.css";
export default function ProductImage({ src, alt, className = "", loading = "lazy" }) {
  const [failedSource, setFailedSource] = useState(null);
  return <img className={"product-image " + className} src={failedSource === src ? fallback : src} alt={alt} loading={loading} onError={() => setFailedSource(src)} />;
}
