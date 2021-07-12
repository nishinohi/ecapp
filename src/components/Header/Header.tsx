import React from 'react'
import { createStyles, makeStyles } from '@material-ui/styles'
import { AppBar, Toolbar } from '@material-ui/core'
import logo from '../../assets/img/icons/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from 'reducks/store/store'
import { getIsSignedIn } from 'reducks/users/selectors'
import { push } from 'connected-react-router'
import HeaderMenus from './HeaderMenus'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  menuBar: {
    backgroundColor: '#fff',
    color: '#444',
  },
  toolbar: {
    margin: '0 auto',
    maxWidth: 1024,
    width: '100%',
  },
  iconButtons: {
    margin: '0 0 0 auto',
  },
})

const Header = (): JSX.Element => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const selector = useSelector((state: AppState) => state)
  const isSignedIn = getIsSignedIn(selector)

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.menuBar}>
        <Toolbar className={classes.toolbar}>
          <img src={logo} alt="Torahack" width="128px" onClick={() => dispatch(push('/'))} />
          {isSignedIn && (
            <div className={classes.iconButtons}>
              <HeaderMenus />
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
