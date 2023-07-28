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

const PostCard = () => {
  return (
    <Card>
      <CardHeader
        avatar={<Avatar src="/broken-image.jpg" />}
        title="John Doe"
        subheader="Category"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This is the content of the post. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit.
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="like">
          <ThumbUp />
        </IconButton>
        <IconButton aria-label="comment">
          <Comment />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default PostCard;
