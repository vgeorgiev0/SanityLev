import React from "react";
import { Comment } from "../../typings";

const CommentItem = ({ name, comment, email, post }: Comment) => {
  return (
    <div>
      <p>
        <span className="text-yellow-500">{name}</span>: {comment}
      </p>
    </div>
  );
};

export default CommentItem;
