import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TableCell,
  TableRow,
} from '@material-ui/core';
import React, { useCallback, useContext, useState } from 'react';
import { mainContext, url } from '../MainContext';
import { IRoleRequest, IUser, Role } from '../types';

interface IProps {
  user: IUser;
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
}));

export default function TableItem({ user }: IProps) {
  const classes = useStyles();
  const roles: Role[] = ['USER', 'MODERATOR'];

  const [role, setRole] = useState<Role>(user.role);
  const { getHeaders } = useContext(mainContext);

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<{
        name?: string | undefined;
        value: unknown;
      }>
    ) => {
      const role = e.target.value as Role;
      setRole(role);

      const data: IRoleRequest = {
        id: user.id,
        role: role,
      };

      const headers = getHeaders();
      fetch(`${url}/role`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(data),
      })
        .then(async (response) => {
          if (response.ok) {
            const responseData: IUser = await response.json();

            return;
          }
        })
        .catch(() => console.log('Error changing role'));
    },
    [setRole, getHeaders, user]
  );

  return (
    <TableRow>
      <TableCell>{user.name}</TableCell>
      <TableCell>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel>{role}</InputLabel>
          <Select value={role} onChange={handleChange} label={role}>
            <MenuItem value={roles[0]}>{roles[0]}</MenuItem>
            <MenuItem value={roles[1]}>{roles[1]}</MenuItem>
          </Select>
        </FormControl>
      </TableCell>
    </TableRow>
  );
}
