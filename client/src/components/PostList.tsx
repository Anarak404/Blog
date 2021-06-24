import { Box, Fab, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import { IPost } from '../types';
import PostItem from './PostItem';

interface IProps {
  canModify: boolean;
  data: IPost[];
  showPost(id: number): void
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

  return (
    <Box>
      {data.map((e) => (
        <PostItem {...e} canModify={canModify} showPost={() => showPost(e.id)} />
      ))}
      {canModify && (
        <Fab color="primary" aria-label="add" className={classes.addButton}>
          <AddIcon />
        </Fab>
      )}
    </Box>
  );
}
