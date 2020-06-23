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
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SchoolIcon from '@material-ui/icons/School';
import EditIcon from '@material-ui/icons/Edit';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import DeleteIcon from '@material-ui/icons/Delete';
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
    },
    drawerPaper: {
        width: 256,
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: 256,
            flexShrink: 0,
        },
    },
}));

const listItems = [
    {
        key: 'home',
        name: 'Home',
        link: '/',
        icon: <HomeIcon/>
    }, {
        key: 'courses',
        name: 'Courses',
        link: '/courses',
        icon: <SchoolIcon/>
    }, {
        key: 'accountDetails',
        name: 'Account Details',
        link: '/users/details',
        icon: <AccountCircleIcon/>
    }, {
        key: 'editAccount',
        name: 'Edit Account',
        link: '/users/edit',
        icon: <EditIcon/>
    }, {
        key: 'changePassword',
        name: 'Change Password',
        link: '/users/edit_password',
        icon: <VpnKeyIcon/>
    }, {
        key: 'deleteAccount',
        name: 'Delete Account',
        link: '/users/cancel_account',
        icon: <DeleteIcon/>
    }, {
        key: 'logout',
        name: 'Logout',
        link: '/users/sign_out',
        icon: <ExitToAppIcon/>
    },
]

export default function HeaderHome(props) {
    const {courseName, fullName} = props;
    const classes = useStyles();
    const [drawerOpen, setDrawerOpen] = useState(false)

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen)
    };

    return (
        <div>
            <AppBar position="fixed" className='app-bar'>
                <Toolbar>
                    <Hidden only={['lg', 'xl','md']}>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                                    onClick={handleDrawerToggle}>
                            <MenuIcon/>
                        </IconButton>
                    </Hidden>
                    <Typography variant="h6" className={classes.title}>
                        {courseName && fullName ? courseName : 'VC Room'}
                    </Typography>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer}>
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
                                    to={i.link}
                                    role="button"
                                >
                                    <ListItem button key={index} className='custom-link-btn'>
                                        <ListItemIcon>
                                            {i.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={i.name} className='custom-listItem-text'/>
                                    </ListItem>
                                </Link>
                                {index === 0 || index === 1 || index === 5 ? <Divider/> : ''}
                            </Fragment>
                        ))}
                    </List>
                </Drawer>
            </nav>
            <nav className={classes.drawer}>
                <Hidden smDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open={drawerOpen}
                    >
                        <Toolbar/>
                        <List className='menu-link'>
                            {listItems.map((i, index) => (
                                <Fragment>
                                    <Link
                                        to={i.link}
                                        role="button"
                                    >
                                        <ListItem button key={index} className='custom-link-btn'>
                                            <ListItemIcon>
                                                {i.icon}
                                            </ListItemIcon>
                                            <ListItemText primary={i.name} className='custom-listItem-text'/>
                                        </ListItem>
                                    </Link>
                                    {index === 0 || index === 1 || index === 5 ? <Divider/> : ''}
                                </Fragment>
                            ))}
                        </List>
                    </Drawer>
                </Hidden>
            </nav>
        </div>
    );
}
