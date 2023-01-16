import Link from "next/link";
import React from "react";
import { urlFor } from "../../sanity";
import { Post } from "../../typings";

interface PostItemProps extends Post {}

const PostItem: React.FC<PostItemProps> = ({
  _id: id,
  slug,
  mainImage,
  author,
  body,
  description,
  title,
  _createdAt,
}) => {
  return (
    <Link key={id} href={`/post/${slug.current}`}>
      <div className="group cursor-pointer border rounded-lg overflow-hidden">
        <img
          className="h-60 rounded-md w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
          src={urlFor(mainImage).url()}
          alt=""
        />
        <div className="flex justify-between p-5 bg-white">
          <div>
            <p className="text-lg font-bold">{title}</p>
            <p className="text-xs">
              {title} by {author?.name}
            </p>
          </div>
          <img
            className="h-12 w-12 rounded-full"
            src={urlFor(author?.image).url()}
            alt=""
          />
        </div>
      </div>
    </Link>
  );
};

export default PostItem;
