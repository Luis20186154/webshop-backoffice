import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { ExitToApp, ChevronLeftOutlined, Menu } from '@material-ui/icons';
import {
    Container, Typography, CssBaseline, AppBar, Toolbar, IconButton, Divider, List, Drawer, Button, ThemeProvider, createTheme
} from '@material-ui/core';
import { MainListItems, SecondaryListItems } from './ListItems';
import Carousel from './Carousel';
import Food from './products/food/Food';
import ProductDetails from './products/ProductDetails';
import { blueGrey } from '@material-ui/core/colors';
import { auth } from '../firebase/firebaseConfig';
import { AuthContext } from '../contexts/AuthContext';
import Drinks from './products/drinks/Drinks';

const drawerWidth = 240;

const theme = createTheme({
    palette: {
        primary: {
            main: blueGrey[50]
        },
    },
});

export default function Dashboard() {

    //TODO: Set the state for item menu when the user close it.
    const classes = useStyles();
    const { signOut } = useContext(AuthContext);
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleSignOut = async () => {
        try {
            await auth.signOut();
            signOut();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <Menu />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        Dashboard
                    </Typography>
                    <ThemeProvider theme={theme}>
                        <Button variant="contained" color="primary" className={classes.button} startIcon={<ExitToApp />}
                            onClick={handleSignOut}>
                            Salir
                        </Button>
                    </ThemeProvider>

                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftOutlined />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <MainListItems />
                </List>
                <Divider />
                <List>{SecondaryListItems}</List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Switch>
                        <Route exact path='/' component={Carousel} />
                        <Route exact path='/products/food' component={Food} />
                        <Route exact path='/products/drink' component={Drinks} />
                        <Route exact path='/products/:id/details' component={ProductDetails} />
                    </Switch>
                </Container>
            </main>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    button: {
        margin: theme.spacing(1),
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));