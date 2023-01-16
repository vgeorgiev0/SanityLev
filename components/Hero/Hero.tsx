import React from "react";

const tap =
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Faquaiarte.com%2Fwp-content%2Fuploads%2F2016%2F04%2FDSC00142-1.jpg&f=1&nofb=1";

type Props = {};

const Hero = (props: Props) => {
  return (
    <div className="flex justify-between items-center bg-yellow-400 b-y border-black py-10 lg:py-0">
      <div className="p-10 space-y-5">
        <h1 className="text-6xl max-w-xl font-serif">
          <span className="underline decoration-black decoration-4">Lorem</span>{" "}
        </h1>
        <h2>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, tenetur?
          Dicta, non quam sapiente neque nostrum numquam et cum consequatur
          quasi.
        </h2>
      </div>
      <img
        className="hidden md:inline-flex h-32 lg:h-full rounded-t-full pr-2"
        src={tap}
        alt="tap"
      />
    </div>
  );
};

export default Hero;
