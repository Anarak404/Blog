import {
  AppBar,
  Container,
  Fab,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import PostItem from './PostItem';
import PostList from './PostList';

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
    marginBottom: '0px',
  },
  addButton: {
    position: 'fixed',
    right: '30px',
    bottom: '30px',
  },
});

interface IUserModel {
  name: string;
  role: 'USER' | 'MODERATOR' | 'ADMIN';
}

export interface IPost {
  id: number;
  title: string;
  content: string;
  creator: IUserModel;
  lastModifier: IUserModel;
  creationDate: string;
  modificationDate: string;
}

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
    creator: { name: 'Imie 1', role: 'USER' },
    lastModifier: { name: 'Imie 2', role: 'MODERATOR' },
  },
  {
    id: 2,
    title: 'Tytuł 2',
    content:
      'trescswetesxerxsrexjcerdsxjc trescswetesxerxsrexjcerdsxjctrescswetesxerxsrexjcerdsxjctrescswetesxerxsrexjcerdsxjc',
    creationDate: '12.12.3031',
    modificationDate: '21.43.3211',
    creator: { name: 'Imie 3', role: 'ADMIN' },
    lastModifier: { name: 'Imie 5', role: 'MODERATOR' },
  },
  {
    id: 3,
    title: 'Tytuł 3',
    content: 'tresc 3 yugs vo ldns;a wv;a svm l knjlws avnd snvh lage rndvlk;',
    creationDate: '12.12.3031',
    modificationDate: '21.43.3211',
    creator: { name: 'Imie 4', role: 'USER' },
    lastModifier: { name: 'Imie 4', role: 'USER' },
  },
  {
    id: 4,
    title: 'Tytuł 4',
    content:
      'tresc 4 yug svo ld ns;awv; asvm  lknjlws avndls nvhla gewrndvl k;',
    creationDate: '12.12.3031',
    modificationDate: '21.43.3211',
    creator: { name: 'Imie 4', role: 'USER' },
    lastModifier: { name: 'Imie 4', role: 'USER' },
  },
];

export default function MainView() {
  const classes = useStyles();
  const myRole = 'ADMIN';

  const canModify = ['ADMIN', 'MODERATOR'].includes(myRole);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h5"
            className={[classes.margin, classes.cursor].join(' ')}
          >
            Home
          </Typography>
          <Typography variant="h5" className={classes.cursor}>
            Role
          </Typography>
          <div className={classes.spacer} />
          <IconButton>
            <ExitToAppIcon fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" className={classes.container}>
        <PostList data={data} canModify={canModify} />
      </Container>
    </>
  );
}
