import React from 'react';
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

export default function Header() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Hidden mdUp>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon/>
                        </IconButton>
                    </Hidden>
                    <Typography variant="h6" className={classes.title}>
                        VCRoom
                    </Typography>
                    <Button  variant="contained" color="primary" disableElevation startIcon={<ExitToAppIcon />}>
                        <Link to='/users/sign_out' className={classes.btnLogout}>
                            Logout
                        </Link>
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}
