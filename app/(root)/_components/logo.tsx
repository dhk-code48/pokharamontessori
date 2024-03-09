"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";

const SchoolLogo = ({
  dark,
  light,
}: {
  dark: string | null | undefined;
  light: string | null | undefined;
}) => {
  const { resolvedTheme } = useTheme();

  return (
    <Image
      src={resolvedTheme === "dark" ? dark ?? "" : light ?? ""}
      className="h-full w-auto"
      alt="School Logo"
      width={624}
      height={134}
    />
  );
};

export default SchoolLogo;
