import React, {useState} from 'react'
import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery } from '@mui/material'
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material'

import { SideBar } from '../'
import useStyles from './styles'

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const classes = useStyles()
  const isMobile = useMediaQuery('(max-width:600px)')
  const theme = useTheme()
  const isAuthenticated = true

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
          {!isMobile && 'Search...'}
          <div>
            {!isAuthenticated ? (
              <Button color='inherit' onClick={() => {}}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button 
                color='inherit'
                component={Link}
                to='/profile/:id'
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
          {isMobile && 'Search...'}
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