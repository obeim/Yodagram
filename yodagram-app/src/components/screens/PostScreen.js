import React from "react";

const PostScreen = ({ match }) => {
  return <div>post with id : {match.params.id}</div>;
};

export default PostScreen;
