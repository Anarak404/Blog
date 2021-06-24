import {
  Box,
  Button,
  makeStyles,
  Modal,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useRef } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { IPost } from './MainView';

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

  const handleClose = useCallback(() => {
    setOpen((s) => !s);
  }, []);

  const save = useCallback(() => {
    console.log(contentRef.current?.value);
  }, []);

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
