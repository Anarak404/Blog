import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { dateFormatter } from '../DateFormatter';
import { mainContext, url } from '../MainContext';
import { IPost } from '../types';

interface IProps {
  id: number;
}

const useStyles = makeStyles({
  container: {
    padding: '25px 70px',
  },
  postBox: {
    flex: 1,
    padding: '25px',
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
    padding: '15px',
  },
  postDetails: {
    fontSize: '13px',
    fontStyle: 'italic',
    color: '#495057',
  },
  alignRight: {
    textAlign: 'right',
  },
  postFooter: {
    textAlign: 'center',
    paddingTop: '20px',
  },
  contentBox: {
    wordBreak: 'break-word',
    fontSize: '21px',
    lineHeight: '28px',
  },
  title: {
    fontWeight: 'bold',
  },
});

export default function Post({ id }: IProps) {
  const classes = useStyles();
  const [data, setData] = useState<IPost>();

  const { getHeaders } = useContext(mainContext);

  useEffect(() => {
    const headers = getHeaders();
    fetch(`${url}/post/${id}`, { method: 'GET', headers })
      .then(async (response) => {
        if (response.ok) {
          const data: IPost = await response.json();
          setData(data);
        }
      })
      .catch((e) => console.log('Error in get post', e));
  }, [id, getHeaders]);

  return data ? (
    <Paper className={classes.container} elevation={8}>
      <Box className={classes.postBar}>
        <Box className={classes.titleBox}>
          <Typography variant="h3" classes={{ root: classes.title }}>
            {data.title}
          </Typography>
        </Box>
        <Box className={[classes.postDetails, classes.alignRight].join(' ')}>
          <div>Modified by: {data.lastModifier.name}</div>
          <div>
            Last modification date: {dateFormatter(data.modificationDate)}
          </div>
        </Box>
      </Box>
      <Box className={classes.contentBox}>{data.content}</Box>
      <Box className={[classes.postDetails, classes.postFooter].join(' ')}>
        Author: {data.creator.name}, created at: {dateFormatter(data.creationDate)}
      </Box>
    </Paper>
  ) : (
    <div />
  );
}
