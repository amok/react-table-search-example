import React, { useState, useCallback } from 'react'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import SearchIcon from '@material-ui/icons/Search'
import { makeStyles } from '@material-ui/core/styles'
import { noop } from '../helpers'

const useStyles = makeStyles({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    padding: 10
  }
})

export default function SearchForm (props) {
  const { onSubmit: onSubmitProp = noop } = props
  const classes = useStyles()

  const [value, setValue] = useState('')

  const onSubmit = useCallback(event => {
    event.preventDefault()
    event.stopPropagation()
    onSubmitProp(value)
  }, [value])

  const onChange = useCallback(event => {
    setValue(event.target.value)
  }, [])

  const onReset = useCallback(() => {
    setValue('')
    onSubmitProp('')
  }, [value])

  return (
    <Paper className={classes.root} component='form' onSubmit={onSubmit}>
      <IconButton className={classes.iconButton} onClick={onReset}>
        <CloseIcon />
      </IconButton>
      <InputBase
        autoFocus
        value={value}
        onChange={onChange}
        className={classes.input}
        placeholder='Search'
        inputProps={{ 'aria-label': 'Search' }}
      />
      <IconButton type='submit' className={classes.iconButton} aria-label='search'>
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}
