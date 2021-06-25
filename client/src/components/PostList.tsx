import { Box, Fab, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { IPost } from '../types';
import PostEditor from './PostEditor';
import PostItem from './PostItem';

interface IProps {
  canModify: boolean;
  data: IPost[];
  showPost(id: number): void;
}

const useStyles = makeStyles({
  addButton: {
    position: 'fixed',
    right: '30px',
    bottom: '30px',
  },
});

export default function PostList({ canModify, data, showPost }: IProps) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClick = useCallback(() => {
    setOpen((s) => !s);
  }, [setOpen]);

  return (
    <Box>
      {data.map((e) => (
        <PostItem
          post={e}
          canModify={canModify}
          showPost={() => showPost(e.id)}
          key={e.id}
        />
      ))}
      {canModify && (
        <Fab
          color="primary"
          aria-label="add"
          className={classes.addButton}
          onClick={handleClick}
        >
          <AddIcon />
        </Fab>
      )}
      {open && <PostEditor />}
    </Box>
  );
}
