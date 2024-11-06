// CommentList.js
import React from 'react';
import { ListGroup } from 'react-bootstrap';

const CommentList = ({ comments }) => {
  return (
    <ListGroup>
      {comments.map((comment, index) => (
        <ListGroup.Item key={index}>{comment.content}</ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default CommentList;