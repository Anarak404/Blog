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
  const { getHeaders } = useContext(mainContext);

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
        .then(async (response) => {
          if (response.ok) {
            const responseData: IPost = await response.json();
          }
        })
        .catch((e) => console.log('Error while creating post', e));
    } else {
      fetch(`${url}/post/update/${post?.id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(data),
      }).then(async (response) => {
        if (response.ok) {
          const responseData: IPost = await response.json();
        }
      });
    }
    setOpen((s) => !s);
  }, [setOpen, getHeaders, inEditMode, post]);

  return (
    <Modal open={open} className={classes.modal}>
      <Paper className={classes.paper}>
        <Typography variant="h5" className={classes.typography}>
          Title
        </Typography>
        <TextField variant="outlined" inputRef={titleRef} />
        <Typography variant="h5" className={classes.typography}>
          Content
        </Typography>
        <TextField
          variant="outlined"
          multiline
          rows="15"
          inputRef={contentRef}
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
