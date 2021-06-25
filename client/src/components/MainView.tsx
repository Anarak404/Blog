import {
  AppBar,
  Container,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import React from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { useContext } from 'react';
import { mainContext } from '../MainContext';
import Post from './Post';
import PostList from './PostList';
import TableRoles from './TableRoles';

const useStyles = makeStyles({
  spacer: {
    flex: 1,
  },
  margin: {
    marginRight: '25px',
  },
  cursor: {
    cursor: 'pointer',
  },
  container: {
    marginTop: '100px',
    marginBottom: '50px',
  },
  addButton: {
    position: 'fixed',
    right: '30px',
    bottom: '30px',
  },
});

type Route = 'Post' | 'Roles' | 'Posts';

export default function MainView() {
  const classes = useStyles();
  const { role, posts } = useContext(mainContext);

  const [id, setId] = useState(0);
  const [route, setRoute] = useState<Route>('Posts');

  const canModify = ['ADMIN', 'MODERATOR'].includes(role);
  const hasAccess = 'ADMIN';

  const showPost = useCallback(
    (id: number) => {
      setId(id);
      setRoute('Post');
    },
    [setId, setRoute]
  );

  const showPosts = useCallback(() => {
    setRoute('Posts');
  }, [setRoute]);

  const showRoles = useCallback(() => {
    setRoute('Roles');
  }, [setRoute]);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h5"
            className={[classes.margin, classes.cursor].join(' ')}
            onClick={showPosts}
          >
            Home
          </Typography>
          {hasAccess === role && (
            <Typography
              variant="h5"
              className={classes.cursor}
              onClick={showRoles}
            >
              Role
            </Typography>
          )}
          <div className={classes.spacer} />
          <IconButton>
            <ExitToAppIcon fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" className={classes.container}>
        {route === 'Posts' && (
          <PostList data={posts} canModify={canModify} showPost={showPost} />
        )}
        {route === 'Post' && <Post id={id} />}
        {route === 'Roles' && <TableRoles />}
      </Container>
    </>
  );
}
