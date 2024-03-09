import { Author } from "@prisma/client";
import Image from "next/image";
import React, { FC } from "react";

const AuthorProfile: FC<{ author: Author }> = ({ author }) => {
  return (
    <div className="dark:bg-slate-900 flex w-fit h-11 items-center gap-x-3 bg-gray-50  pr-5 py-1 rounded-full">
      <Image
        src={author.imageUrl}
        alt={author.name}
        width={100}
        height={100}
        className="w-10 h-10 rounded-full object-fit"
      />
      <p>{author.name}</p>
    </div>
  );
};

export default AuthorProfile;
