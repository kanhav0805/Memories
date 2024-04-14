import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import moment from "moment";
import "./styles.css";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";
// import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAltIcon";
// import { likePost, deletePost } from "../../../actions/posts";
import ThumbUpAltOutlined from "@mui/icons-material/ThumbUpAltOutlined";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  // console.log(post);
  const handleDeletePost = (id) => {
    console.log(id, "id");
    dispatch(deletePost(id));
  };

  const user = JSON.parse(localStorage.getItem("profile"));

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <ThumbUpIcon fontSize="small" />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };
  return (
    <Card className="card">
      <CardMedia
        className="media"
        // sx={{ height: 140 }}
        image={post.selectedFile}
        title="green iguana"
      />
      <div className="overlay">
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      {(user?.result?.googleId === post?.creator ||
        user?.result?._id === post?.creator) && (
        <div className="overlay2">
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={() => {
              setCurrentId(post._id);
            }}
          >
            <MoreHorizOutlinedIcon fontSize="small" />
          </Button>
        </div>
      )}
      <div className="details">
        <Typography variant="body2" color="textSecondary" component="h2">
          {post?.tags?.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography className="title" gutterBottom variant="h5" component="h2">
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className="cardActions">
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={() => dispatch(likePost(post._id))}
        >
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            size="small"
            color="secondary"
            onClick={() => dispatch(deletePost(post._id))}
          >
            <DeleteIcon fontSize="small" /> Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
