import {
  Box,
  Button,
  makeStyles,
  Modal,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useContext, useRef } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { mainContext, url } from '../MainContext';
import { IPost, IPostRequest } from '../types';
import { isNotEmptyString } from './Register';

interface IProps {
  post?: IPost;
}

const useStyles = makeStyles({
  paper: {
    width: '55vw',
    height: '80vh',
    margin: 'auto',
    maxWidth: '800px',
    display: 'flex',
    flexDirection: 'column',
    padding: ' 20px 40px',
  },
  modal: {
    display: 'flex',
  },
  typography: {
    padding: '10px',
  },
  box: {
    padding: '10px 0',
    display: 'flex',
    justifyContent: 'space-between',
  },
});

export default function PostEditor({ post }: IProps) {
  const classes = useStyles();
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLInputElement>(null);

  const inEditMode = post !== undefined;

  const [open, setOpen] = useState(true);
  const [title, setTitle] = useState(post?.title);
  const [content, setcontent] = useState(post?.content);
  const { getHeaders, refreshPosts } = useContext(mainContext);

  const onTitleChange = useCallback(
    (s: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(s.target.value);
    },
    [setTitle]
  );

  const onContentChange = useCallback(
    (s: React.ChangeEvent<HTMLInputElement>) => {
      setcontent(s.target.value);
    },
    [setcontent]
  );

  const handleClose = useCallback(() => {
    setOpen((s) => !s);
  }, []);

  const save = useCallback(() => {
    const title = titleRef.current?.value;
    const content = contentRef.current?.value;

    if (!isNotEmptyString(title)) {
      return;
    }
    if (!isNotEmptyString(content)) {
      return;
    }

    const data: IPostRequest = {
      title: title as string,
      content: content as string,
    };

    const headers = getHeaders();

    if (!inEditMode) {
      fetch(`${url}/post/add`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            refreshPosts();
          }
        })
        .catch((e) => console.log('Error while creating post', e));
    } else {
      fetch(`${url}/post/update/${post?.id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(data),
      }).then((response) => {
        if (response.ok) {
          refreshPosts();
        }
      });
    }
    setOpen((s) => !s);
  }, [setOpen, getHeaders, inEditMode, post, refreshPosts]);

  return (
    <Modal open={open} className={classes.modal}>
      <Paper className={classes.paper}>
        <Typography variant="h5" className={classes.typography}>
          Title
        </Typography>
        <TextField
          variant="outlined"
          inputRef={titleRef}
          value={title}
          onChange={onTitleChange}
        />
        <Typography variant="h5" className={classes.typography}>
          Content
        </Typography>
        <TextField
          variant="outlined"
          multiline
          rows="15"
          inputRef={contentRef}
          value={content}
          onChange={onContentChange}
        />
        <Box className={classes.box}>
          <Button variant="outlined" color="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={save}>
            {inEditMode ? 'Save' : 'Add'}
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
}
