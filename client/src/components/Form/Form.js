import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import { createPost, updatePost, getPosts } from "../../actions/posts";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    // creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const post = useSelector((state) =>
    currentId ? state.posts.find((message) => message._id === currentId) : null
  );
  const dispatch = useDispatch();
  // const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (post) setPostData(post);
  }, [currentId, post]);

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  useEffect(() => setCurrentId(0), []);

  const clear = () => {
    setCurrentId(0);
    setPostData({
      // creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
      clear();
    } else {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
      clear();
    }
  };

  useEffect(() => {
    dispatch(getPosts);
  }, [dispatch]);

  const [showSignInMessage, setShowSignInMessage] = useState(false);

  useEffect(() => {
    setShowSignInMessage(!user?.result?.name);
  }, [user]);

  if (showSignInMessage) {
    return (
      <Paper className="paper">
        <Typography variant="h6" align="center">
          Please Sign In to create your memories and like other memories
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className="paper" style={{ padding: "20px" }}>
      <form
        autoComplete="off"
        noValidate
        className="root form"
        onSubmit={handleSubmit}
      >
        <Typography variant="h6" style={{ margin: "5px" }}>
          {currentId ? `Editing "${postData?.title}"` : "Creating a Memory"}
        </Typography>
        {/* <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
          style={{ margin: "5px" }}
        /> */}
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          style={{ margin: "5px" }}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          rows={4}
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
          style={{ margin: "5px" }}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags (coma separated)"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
          style={{ margin: "5px" }}
        />
        <div className="fileInput" style={{ margin: "2px" }}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className="buttonSubmit"
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
          style={{ margin: "5px" }}
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
          style={{ margin: "5px" }}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
