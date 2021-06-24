import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TableCell,
  TableRow,
} from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import { IUserModel, Role } from './MainView';

interface IProps {
  user: IUserModel;
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

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<{
        name?: string | undefined;
        value: unknown;
      }>
    ) => {
      const role = e.target.value as Role;
      setRole(role);
    },
    [setRole]
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
