import {
  Box,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { IPost } from '../types';

interface IProps {
  canModify: boolean;
}

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    minHeight: '150px',
    margin: '20px',
  },
  postBox: {
    flex: 1,
    padding: '25px',
  },
  controlBox: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '15px',
  },
  postBar: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '15px',
  },
  titleBox: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  postDetails: {
    textAlign: 'right',
    fontSize: '13px',
    fontStyle: 'italic',
    color: '#495057',
  },
  contentBox: {
    wordBreak: 'break-word',
  },
  title: {
    fontWeight: 'bold',
  },
});

export default function PostItem({
  title,
  content,
  creator,
  modificationDate,
  canModify,
}: IPost & IProps) {
  const classes = useStyles();

  const maxWordsCount = 100;
  const words = content.split(' ');

  return (
    <Paper className={classes.container}>
      <Box className={classes.postBox}>
        <Box className={classes.postBar}>
          <Box className={classes.titleBox}>
            <Typography variant="h5" classes={{ root: classes.title }}>
              {title}
            </Typography>
          </Box>
          <Box className={classes.postDetails}>
            <div>Created by: {creator.name}</div>
            <div>Last modified in: {modificationDate}</div>
          </Box>
        </Box>
        <Box className={classes.contentBox}>
          {words.length > maxWordsCount
            ? `${words.slice(0, maxWordsCount).join(' ')}...`
            : content}
        </Box>
      </Box>
      {canModify && (
        <Box className={classes.controlBox}>
          <IconButton>
            <EditIcon />
          </IconButton>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
    </Paper>
  );
}
