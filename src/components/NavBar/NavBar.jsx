import React, {useEffect, useState} from 'react'
import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery } from '@mui/material'
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material'
import { createSessionId, fetchToken, moviesApi } from '../../utils'
import { useDispatch, useSelector } from 'react-redux'

import { setUser, userSelector } from '../../features/auth'

import { SideBar, Search } from '../'
import useStyles from './styles'

const NavBar = () => {
  const { isAuthenticated, user } = useSelector(userSelector)
  const [mobileOpen, setMobileOpen] = useState(false)
  const classes = useStyles()
  const isMobile = useMediaQuery('(max-width:600px)')
  const theme = useTheme()
  const dispatch = useDispatch()

  const token = localStorage.getItem('request_token')
  const sessionIdFromStorage = localStorage.getItem('session_id')

  useEffect(() => {
    const logInUser = async () => {
      if(token) {
        if(sessionIdFromStorage) {
          const { data: userData } = await moviesApi.get(`/account?session_id=${sessionIdFromStorage}`)
          dispatch(setUser(userData))
        } else {
          const sessionId = await createSessionId()
          const { data: userData } = await moviesApi.get(`/account?session_id=${sessionId}`)
          dispatch(setUser(userData))
        }
      }
    }

    logInUser()
  }, [token])

  return (
    <>
      <AppBar position='fixed'>
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton
              color='inherit'
              edge='start'
              style={{ outline: 'none' }}
              onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              className={classes.menuButton}
            >
              <Menu />
            </IconButton>
          )}
          <IconButton color='inherit' sx={{ ml: 1 }} onClick={() => {}}>
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search />}
          <div>
            {!isAuthenticated ? (
              <Button color='inherit' onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button 
                color='inherit'
                component={Link}
                to={`/profile/${user.id}`}
                className={classes.linkButton}
                onClick={() => {}}
              >
                {!isMobile && <>My Movies &nbsp;</>}
                <Avatar 
                  style={{ width: 30, height: 30 }}
                  alt='Profile'
                  src='https://media.istockphoto.com/id/1018999828/cs/vektor/v%C3%BDchoz%C3%AD-ikona-profilu-avatara-z%C3%A1stupn%C3%BD-symbol-%C5%A1ed%C3%A9-fotografie.jpg?s=1024x1024&w=is&k=20&c=qjcThKc6aF85rPLGbk2BQxXscyDFhKuJM_obQGplMLM='
                />
              </Button>
            )}
          </div>
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>
      <div>
        <nav className={classes.drawer}>
              {isMobile ? (
                <Drawer
                  variant='temporary'
                  anchor='right'
                  open={mobileOpen}
                  onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
                  className={classes.drawerBackground}
                  classes={{ paper: classes.drawerPaper }}
                  ModalProps={{ keepMounted: true }}
                >
                  <SideBar setMobileOpen={setMobileOpen} />
                </Drawer>
              ) : (
                <Drawer classes={{ paper: classes.drawerPaper }} variant='permanent' open>
                  <SideBar setMobileOpen={setMobileOpen} />
                </Drawer>
              )}
        </nav>
      </div>
    </>
  )
}

export default NavBar