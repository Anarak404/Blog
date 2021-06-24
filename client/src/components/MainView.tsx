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
import { IPost, IUser } from '../types';
import Post from './Post';
import PostEditor from './PostEditor';
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

const userRoles: IUser[] = [
  {
    id: 1,
    name: 'name1',
    role: 'ADMIN',
  },
  {
    id: 2,
    name: 'name2',
    role: 'MODERATOR',
  },
  {
    id: 3,
    name: 'name3',
    role: 'USER',
  },
  {
    id: 4,
    name: 'name4',
    role: 'USER',
  },
  {
    id: 5,
    name: 'name5',
    role: 'MODERATOR',
  },
];

const data: IPost[] = [
  {
    id: 1,
    title: 'Tytuł 1',
    content:
      'tresc 1 yugs vol dns; aw v;asvm lkn jlwsa vndl snv hla gew rn dvlk;'.repeat(
        80
      ),
    creationDate: '12.12.3031',
    modificationDate: '21.43.3211',
    creator: { id: 2, name: 'Imie 1', role: 'USER' },
    lastModifier: { id: 7, name: 'Imie 2', role: 'MODERATOR' },
  },
  {
    id: 2,
    title: 'Tytuł 2',
    content:
      'trescswetesxerxsrexjcerdsxjc trescswetesxerxsrexjcerdsxjctrescswetesxerxsrexjcerdsxjctrescswetesxerxsrexjcerdsxjc',
    creationDate: '12.12.3031',
    modificationDate: '21.43.3211',
    creator: { id: 2, name: 'Imie 3', role: 'ADMIN' },
    lastModifier: { id: 2, name: 'Imie 5', role: 'MODERATOR' },
  },
  {
    id: 3,
    title: 'Tytuł 3',
    content: 'tresc 3 yugs vo ldns;a wv;a svm l knjlws avnd snvh lage rndvlk;',
    creationDate: '12.12.3031',
    modificationDate: '21.43.3211',
    creator: { id: 2, name: 'Imie 4', role: 'USER' },
    lastModifier: { id: 2, name: 'Imie 4', role: 'USER' },
  },
  {
    id: 4,
    title: 'Tytuł 4',
    content:
      'tresc 4 yug svo ld ns;awv; asvm  lknjlws avndls nvhla gewrndvl k;',
    creationDate: '12.12.3031',
    modificationDate: '21.43.3211',
    creator: { id: 2, name: 'Imie 4', role: 'USER' },
    lastModifier: { id: 2, name: 'Imie 4', role: 'USER' },
  },
];

type Route = 'Post' | 'Roles' | 'Posts';

export default function MainView() {
  const classes = useStyles();
  const { role } = useContext(mainContext);
  const [id, setId] = useState(0);
  const [route, setRoute] = useState<Route>('Posts');

  const canModify = ['ADMIN', 'MODERATOR'].includes(role);

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
          <Typography
            variant="h5"
            className={classes.cursor}
            onClick={showRoles}
          >
            Role
          </Typography>
          <div className={classes.spacer} />
          <IconButton>
            <ExitToAppIcon fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" className={classes.container}>
        {route === 'Posts' && (
          <PostList data={data} canModify={canModify} showPost={showPost} />
        )}
        {route === 'Post' && <Post id={id} />}
        {route === 'Roles' && <TableRoles users={userRoles} />}
      </Container>
    </>
  );
}
