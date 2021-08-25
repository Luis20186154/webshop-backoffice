import React from 'react';
import { useHistory } from 'react-router-dom';
import { Collapse, createStyles, List, makeStyles, Theme } from '@material-ui/core';
import {
    StoreOutlined, People, BarChart, Layers, Assignment, ExpandLess, ExpandMore, Fastfood, Slideshow, LocalDrink, Healing
} from '@material-ui/icons';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
        nested: {
            paddingLeft: theme.spacing(4),
        },
    }),
);

const MainListItems = () => {

    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const history = useHistory();

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <div>
            <ListItem button onClick={() => history.push('/')}>
                <ListItemIcon>
                    <Slideshow />
                </ListItemIcon>
                <ListItemText primary="Slider Principal" />
            </ListItem>

            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    <StoreOutlined />
                </ListItemIcon>
                <ListItemText primary="Productos" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={classes.nested} onClick={() => history.push('/products/food')}>
                        <ListItemIcon>
                            <Fastfood />
                        </ListItemIcon>
                        <ListItemText primary="Comida" />
                    </ListItem>

                    <ListItem button className={classes.nested} onClick={() => history.push('/products/drink')}>
                        <ListItemIcon>
                            <LocalDrink />
                        </ListItemIcon>
                        <ListItemText primary="Bebidas" />
                    </ListItem>

                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <Healing />
                        </ListItemIcon>
                        <ListItemText primary="Cuidado e higiene" />
                    </ListItem>
                </List>
            </Collapse>

            <ListItem button>
                <ListItemIcon>
                    <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Orders" />
            </ListItem>

            <ListItem button>
                <ListItemIcon>
                    <People />
                </ListItemIcon>
                <ListItemText primary="Clienes" />
            </ListItem>

            <ListItem button>
                <ListItemIcon>
                    <BarChart />
                </ListItemIcon>
                <ListItemText primary="Reports" />
            </ListItem>

            <ListItem button>
                <ListItemIcon>
                    <Layers />
                </ListItemIcon>
                <ListItemText primary="Integrations" />
            </ListItem>
        </div>
    )
};

const SecondaryListItems = (
    <div>
        <ListSubheader inset>Saved reports</ListSubheader>
        <ListItem button>
            <ListItemIcon>
                <Assignment />
            </ListItemIcon>
            <ListItemText primary="Current month" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <Assignment />
            </ListItemIcon>
            <ListItemText primary="Last quarter" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <Assignment />
            </ListItemIcon>
            <ListItemText primary="Year-end sale" />
        </ListItem>
    </div>
);

export { MainListItems, SecondaryListItems };