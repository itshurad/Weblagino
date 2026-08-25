import Author from "./Author";
import CoverImage from "./CoverImage";

function RelatedPost({ posts }) {
  return (
    <div className="">
      <div className="flex h-[400px] flex-col gap-6 overflow-y-auto">
        {posts.map((item) => {
          return (
            <div key={item._id} className="col-span-1">
              <CoverImage {...item} />
              <div className="mt-3 flex items-center justify-between">
                <p>{item.title}</p>
                <Author {...item.author} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default RelatedPost;
