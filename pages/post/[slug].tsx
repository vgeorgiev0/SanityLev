import { ErrorMessage } from "@hookform/error-message";
import { GetStaticProps } from "next";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
// @ts-ignore
import PortableText from "react-portable-text";
import Header from "../../components/Header/Header";
import CommentItem from "../../components/Posts/CommentItem";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings";

interface Props {
  post: Post;
}

interface IFormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

const Post = ({ post }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const [submitted, setSubmitted] = useState(false);

  const onSubmit: SubmitHandler<IFormInput> = async (data: any) => {
    await fetch("/api/createComment", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    setSubmitted(true);
  };

  return (
    <main>
      <Header />
      <img
        className="w-full h-40 object-cover"
        src={urlFor(post.mainImage).url()}
        alt=""
      />
      <article className="max-w-3xl mx-auto p-5">
        <h1 className="text-3xl mt-10 mb-3">{post.title}</h1>
        <h2 className="text-xl font-light text-gray-500 mb-2">
          {post.description}
        </h2>
        <div className="flex items-center space-x-2">
          <img
            className="h-10 w-10 rounded-full"
            src={urlFor(post.author.image).url()}
            alt=""
          />
          <p className="font-extralight text-sm">
            Blog post by{" "}
            <span className="text-green-600">{post.author.name}</span> at{" "}
            {new Date(post._createdAt).toLocaleString()}
          </p>
        </div>
        <div className="mt-10">
          <PortableText
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            content={post.body}
            serializers={{
              h1: (props: any) => (
                <h1 className="text-2xl font-bold my-5" {...props} />
              ),
              h2: (props: any) => (
                <h2 className="text-xl font-bold my-5" {...props} />
              ),
              li: (children: any) => (
                <li className="ml-4 list-disc">{children}</li>
              ),
              link: ({ href, children }: any) => (
                <a
                  target={"_blank"}
                  href={href}
                  className="text-blue-600 hover:underline"
                >
                  {children}
                </a>
              ),
            }}
          />
        </div>
      </article>
      <hr className="max-w-lg my-5 mx-auto border border-yellow-500" />

      {submitted ? (
        <div className="flex flex-col p-10 my-10 bg-yellow-500 text-white max-w-2xl mx-auto">
          <h3 className="text-3xl font-bold">
            Thank you for submitting your comment!
          </h3>
          <p>Once it has been approved, it will appear bellow.</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col p-5 max-w-2xl mx-auto mb-10"
        >
          <h3 className="text-sm text-yellow-500">Enjoyed this article?</h3>
          <h4 className="text-3xl font-bold">Leave a comment below!</h4>
          <hr className="py-3 mt-2" />

          <input
            {...register("_id")}
            type="hidden"
            name="_id"
            value={post._id}
          />

          <label className="block mb-5">
            <span className="text-gray-700">Name</span>
            <input
              {...register("name", {
                required: "The Name field is required",
              })}
              className="border shadow rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring-1"
              placeholder="Enter your name here"
              type="text"
            />
          </label>
          <label className="block mb-5">
            <span className="text-gray-700">E-mail</span>
            <input
              {...register("email", {
                required: "The E-mail field is required",
              })}
              className="border shadow rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring-1"
              placeholder="Enter your E-mail here"
              type="email"
            />
          </label>
          <label className="block mb-5">
            <span className="text-gray-700">Comment</span>
            <textarea
              {...register("comment", {
                required: "The Comment field is required",
              })}
              className="border shadow rounded py-2 px-3 form-textarea mt-1 block w-full ring-yellow-500 outline-none focus:ring-1"
              rows={8}
              placeholder="Leave a comment"
            />
          </label>

          <div className="flex flex-col p-7 items-center">
            <ErrorMessage
              errors={errors}
              name="name"
              as="p"
              className="text-red-500"
            />
            <ErrorMessage
              errors={errors}
              name="email"
              as="p"
              className="text-red-500"
            />{" "}
            <ErrorMessage
              errors={errors}
              name="comment"
              as="p"
              className="text-red-500"
            />
          </div>

          <input
            type={"submit"}
            className="shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer"
          />
        </form>
      )}
      <div className="flex flex-col p-10 my-10 max-w-2xl mx-auto shadow-yellow-500 shadow space-y-2">
        <h3 className="text-4xl">Comments</h3>
        <hr className="pb-2" />
        <div>
          {post?.comments?.map((comment) => (
            <CommentItem
              key={comment._id}
              name={comment.name}
              email={comment.email}
              comment={comment.comment}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Post;

export const getStaticPaths = async () => {
  const query = `*[_type == "post"]{
      _id,
      slug {
        current
      }
  }`;
  const posts = await sanityClient.fetch(query);

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0] {
      _id,
      _createdAt,
      title,
      author -> {
        name,
        image,
      },
      "comments": *[
        _type == "comment" && 
        post._ref == ^._id && 
        approved == true],
        description,
        mainImage,
        slug,
        body
  }`;
  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};
