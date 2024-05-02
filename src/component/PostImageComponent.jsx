import { useFetchImageQuery } from "../api/postApi";
import { useEffect } from "react";

const PostImageComponent = ({ postId }) => {
  const { data: imageData, isLoading, isError, refetch } = useFetchImageQuery(postId);

  useEffect(() => {
    refetch(postId);
  }, [postId, refetch]);

  return (
    <div>
      {isLoading ? (
        <p>Loading image...</p>
      ) : isError ? (
        <p>Error fetching image</p>
      ) : (
        <img src={imageData?.imageData} alt="Post Image" />
      )}
    </div>
  );
};

export default PostImageComponent;
