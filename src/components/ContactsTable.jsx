import React, { useCallback } from 'react'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import { makeStyles } from '@material-ui/core/styles'

import { upperFirst, formatDate } from '../helpers'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto'
  },
  table: {
    minWidth: 650
  }
}))

export default function ContactsTable (props) {
  const {
    rows = [],
    statuses = [],
    onStatusChange: onStatusChangeProp = () => {}
  } = props

  const classes = useStyles()

  const onStatusChange = useCallback(event => {
    const id = event.target.name
    const value = event.target.value
    onStatusChangeProp({ id, value })
  }, [])

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Full Name</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Connected On</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell component='th' scope='row'>{row.fullName}</TableCell>
              <TableCell>{row.role}</TableCell>
              <TableCell>{formatDate(row.connectedOn)}</TableCell>
              <TableCell>
                <Select fullWidth name={String(row.id)} value={row.status} onChange={onStatusChange}>
                  {statuses.map(status => (
                    <MenuItem key={status} value={status}>{upperFirst(status)}</MenuItem>
                  ))}
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}
