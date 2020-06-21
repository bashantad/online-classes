import React, {Fragment, useState} from 'react';
import {Link} from "react-router-dom";

import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Drawer from "@material-ui/core/Drawer";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import ClassIcon from '@material-ui/icons/Class';
import ChatIcon from '@material-ui/icons/Chat';
import VideocamIcon from '@material-ui/icons/Videocam';
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    btnLogout: {
        color: 'white',
        textDecoration: 'none',
        textTransform: 'capitalize',
    }
}));

const listItems = [
    {
        key: 'home',
        name: 'Home',
        link: '/',
        icon: <HomeIcon/>
    },
    {
        key: 'joinVideo',
        name: 'Video Call',
        link: '/joincalls',
        icon: <VideocamIcon/>
    },
    {
        key: 'joinClass',
        name: 'Join Class',
        link: '/classroom/1',
        icon: <ClassIcon/>
    },
    {
        key: 'joinMessages',
        name: 'Messages',
        link: '/courses/1/messages',
        icon: <ChatIcon/>
    }
]

export default function Header(props) {
    const {handleVideo, courseName, fullName} = props;
    const classes = useStyles();
    const [drawerOpen, setDrawerOpen] = useState(false)

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen)
    };

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className='app-bar'>
                <Toolbar>
                    <Hidden>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                                    onClick={handleDrawerToggle}>
                            <MenuIcon/>
                        </IconButton>
                    </Hidden>
                    <Typography variant="h6" className={classes.title}>
                        {/*{courseName && fullName ? `${courseName - fullName}` : 'VCRoom'}*/}
                        VCRoom
                    </Typography>
                    <Button variant="contained" color="primary" disableElevation startIcon={<ExitToAppIcon/>}>
                        <Link to='/users/sign_out' className={classes.btnLogout}>
                            Logout
                        </Link>
                    </Button>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="temporary"
                anchor={'left'}
                open={drawerOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
            >
                <Toolbar/>
                <List className='menu-link'>
                    {listItems.map((i, index) => (
                        <Fragment>
                            <Link
                                to={i.key !== 'joinVideo' ? i.link : handleVideo}
                                role="button"
                            >
                                <ListItem button key={index}>
                                    <ListItemIcon>
                                        {i.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={i.name}/>
                                </ListItem>
                            </Link>
                            {index === 0 || index === 3 ? <Divider/>: ''}
                        </Fragment>
                    ))}
                </List>
            </Drawer>

        </div>
    );
}
