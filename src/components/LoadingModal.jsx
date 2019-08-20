import React from 'react'
import Modal from '@material-ui/core/Modal'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(
  createStyles({
    spinnerContainer: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }),
  { name: 'LoadingModal' }
)

const LoadingModal = props => {
  const { loading } = props
  const classes = useStyles(props)

  return (
    <Modal open={!!loading}>
      <div className={classes.spinnerContainer}>
        <CircularProgress />
      </div>
    </Modal>
  )
}

export default LoadingModal
