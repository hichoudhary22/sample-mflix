"use client";
import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface ImageWithFallbackProps extends ImageProps {
  fallback: string;
}

export default function ImageWithFallback(props: ImageWithFallbackProps) {
  const { src, fallback, ...rest } = props;
  const [imgsrc, setImgSrc] = useState(src);
  return <Image src={imgsrc} {...rest} onError={() => setImgSrc(fallback)} />;
}
