import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { mainContext, url } from '../MainContext';
import { IUser } from '../types';
import TableItem from './TableItem';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: '40vw',
  },
  tableHead: {
    backgroundColor: theme.palette.primary.main,
  },
}));

export default function TableRoles() {
  const classes = useStyles();
  const { getHeaders } = useContext(mainContext);

  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const headers = getHeaders();
    fetch(`${url}/user/admin`, { method: 'GET', headers })
      .then(async (response) => {
        if (response.ok) {
          const data: IUser[] = await response.json();
          setUsers(data);
        }
      })
      .catch((e) => console.log('Error in get post', e));
  }, [getHeaders, setUsers]);

  return (
    <TableContainer component={Paper} elevation={4} className={classes.table}>
      <Table>
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align='right'>Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((e) => (
            <TableItem user={e} key={e.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
