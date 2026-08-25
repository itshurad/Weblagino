import { getPostsApi } from "@/services/postServices";
import setCookieOnReq from "@/utils/setCookieOnReq";
import { cookies } from "next/headers";
import queryString from "query-string";
import PostList from "../../../_components/PostList";

async function Category({ params, searchParams }) {
  const { categorySlug } = params;
  const cookieStore = cookies();
  const queries = `${queryString.stringify(
    searchParams,
  )}&categorySlug=${categorySlug}`;
  const options = setCookieOnReq(cookieStore);
  const { posts } = await getPostsApi(queries, options);

  return <PostList posts={posts} />;
}

export default Category;
