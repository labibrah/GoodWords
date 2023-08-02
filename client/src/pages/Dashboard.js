import React from "react";
import PostCard from "./components/PostCard";
import { gql, useQuery } from "@apollo/client";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { Theme } from "@mui/material";
const GET_POSTS = gql`
  query GetPosts {
    getPosts {
      id
      title
      content
      category
    }
  }
`;

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // marginTop: spacing(2),
    // marginTop: spacing(20),
  },
  logoutButton: {
    position: "absolute",
    // top: spacing(2),
    // right: spacing(2),
    color: "red",
  },
  createPostButton: {
    // margin: spacing(2),
  },
}));

const Dashboard = () => {
  const handleLogout = () => {
    // Implement your logout logic here
    console.log("Logout clicked");
  };

  const handleCreatePost = () => {
    // Implement your create post logic here
    console.log("Create Post clicked");
  };

  //   const { data } = useQuery(GET_POSTS);
  //   console.log(data);
  let post1 = {
    name: "Jane Doe",
    category: "Food Lifestyle",
    content:
      "Quidam alii sunt, et non est in nostra potestate. Quae omnia in nostra sententia, pursuit, cupiditatem, aversatio, ex quibus in Verbo, quicquid non suis actibus nostris. Non sunt in nostra potestate corpore bona fama",
    likes: 15,
  };
  let post2 = {
    name: "Jane Doe",
    category: "Food Lifestyle",
    content:
      "Quidam alii sunt, et non est in nostra potestate. Quae omnia in nostra sententia, pursuit, cupiditatem, aversatio, ex quibus in Verbo, quicquid non suis actibus nostris. Non sunt in nostra potestate corpore bona fama",
    likes: 10,
  };
  let post3 = {
    name: "You",
    category: "Food Lifestyle",
    content:
      "Quidam alii sunt, et non est in nostra potestate. Quae omnia in nostra sententia, pursuit, cupiditatem, aversatio, ex quibus in Verbo, quicquid non suis actibus nostris. Non sunt in nostra potestate corpore bona fama",
    likes: 2,
  };
  //   if (loading) {
  //     return <p>Loading...</p>;
  //   }
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {/* <ThemeProvider> */}
      <Button className={classes.logoutButton} onClick={handleLogout}>
        Logout
      </Button>
      <Button
        className={classes.createPostButton}
        variant="contained"
        color="primary"
        onClick={handleCreatePost}
      >
        Create Post
      </Button>
      {/* {data && data.posts.map((post) => <PostCard key={post.id} post={post} />)}
       */}
      {/* {data.posts?.map((post) => (
        <PostCard key={post.id} post={post} />
        <h1>{post.id}</h1>
      ))} */}
      <PostCard post={post1} />
      <br></br>
      <PostCard post={post2} />
      <br></br>

      <PostCard post={post3} />

      {/* </ThemeProvider> */}
      {/* <h1>Welcome to the Dashboard</h1> */}
    </div>
  );
};

export default Dashboard;
