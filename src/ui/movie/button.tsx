"use client";
import { ReactNode } from "react";
export default function Button({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: Function;
}) {
  return (
    <button
      className="flex w-full justify-center gap-2 self-center rounded-2xl bg-yellow-400 p-2 font-semibold"
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
}
