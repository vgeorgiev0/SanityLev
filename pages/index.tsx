import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import PostItem from "../components/Posts/PostItem";
import { sanityClient, urlFor } from "../sanity";
import { Post } from "../typings";

interface Props {
  posts: [Post];
}

const Home = ({ posts }: Props) => {
  return (
    // <div className="flex min-h-screen flex-col items-center justify-center py-2">
    <div className="max-w-7xl mx-auto">
      <Header />
      <Hero />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p2 md:p-6">
        {posts.map(
          ({
            _id,
            mainImage,
            slug,
            author,
            _createdAt,
            body,
            description,
            title,
          }) => {
            return (
              <PostItem
                key={_id}
                _id={_id}
                mainImage={mainImage}
                slug={slug}
                author={author}
                _createdAt={_createdAt}
                body={body}
                description={description}
                title={title}
              />
            );
          }
        )}
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const query = `*[_type == 'post']{
  _id,
   title,
  slug,
  description,
  mainImage,
author -> {
  name,
  image
}}`;
  const posts = await sanityClient.fetch(query);
  return {
    props: {
      posts,
    },
  };
};
