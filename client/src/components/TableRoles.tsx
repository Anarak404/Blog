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
import React from 'react';
import { IUserModel } from './MainView';
import TableItem from './TableItem';

interface IProps {
  users: IUserModel[];
}

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: '60vw',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function TableRoles({ users }: IProps) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} elevation={4} className={classes.table}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((e) => (
            <TableItem user={e} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
