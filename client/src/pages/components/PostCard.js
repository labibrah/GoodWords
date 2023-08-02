import React from "react";
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { ThumbUp, Comment } from "@mui/icons-material";

const PostCard = ({ post }) => {
  return (
    <Card>
      <CardHeader
        avatar={<Avatar src="/broken-image.jpg" />}
        title={post.name}
        subheader={post.category}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.content}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="like">
          <ThumbUp />
          <Typography variant="body2" color="textSecondary" component="p">
            {post.likes} Likes
          </Typography>
        </IconButton>
        <IconButton aria-label="comment">
          <Comment />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default PostCard;
