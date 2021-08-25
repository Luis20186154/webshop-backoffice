import React, { useState } from 'react'
import axios from 'axios';
import {
    Button, Slide, DialogTitle, DialogContentText, DialogActions, DialogContent, Dialog, TextField, makeStyles, createStyles, Theme, Select, MenuItem, InputLabel
} from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import { PhotoCamera } from '@material-ui/icons';
import { db } from '../../firebase/firebaseConfig';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction='up' ref={ref} {...props} />;
});

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
            marginTop: 10,
        },
        input: {
            display: 'none',
        },
    }),
);

const ButtonFormProduct = () => {

    const classes = useStyles();
    const [openDialog, setOpenDialog] = useState(false);

    const [category, setcategory] = useState<any>('food');
    const [productName, setproductName] = useState('');
    const [price, setprice] = useState<any>(0);
    const [file, setfile] = useState<any>(null);

    //TODO: verify if is necesary const [cantity, setcantity] = useState<any>(0);


    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleSubmit = async () => {
        console.log('uploading photo');
        console.log(file)

        const data = new FormData();
        data.append('upload_preset', 'upload_food');
        data.append('file', file[0]);

        try {

            const result = await axios({
                method: 'POST',
                url: 'https://api.cloudinary.com/v1_1/dyhww1ai4/image/upload',
                data
            })

            await db.collection('products').add({
                category,
                productName,
                price,
                urlImage: result.data.secure_url,
                available: true
            }).then(product => {
                product.update({
                    id: product.id
                })
            }).catch(ex => console.log('error to register product', ex));

        } catch (ex) {
            console.log(ex);
        }
    }

    return (
        <div>
            <Button variant='outlined' color='primary' onClick={handleClickOpenDialog}>
                Agregar Producto
            </Button>
            <Dialog
                open={openDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby='alert-dialog-slide-title'
                aria-describedby='alert-dialog-slide-description'
            >
                <DialogTitle id='alert-dialog-slide-title'>{'Añadir Nuevo Producto'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-slide-description'>
                        Aquí añadirás el nuevo producto con las características.
                        Al crear el nuevo producto se dará por hecho que esta  disponible.
                    </DialogContentText>

                    <form noValidate>

                        <InputLabel>Categoría del prducto</InputLabel>
                        <Select
                            id="demo-simple-select-helper"
                            value={category}
                            onChange={(e) => setcategory(e.target.value)}
                            fullWidth
                        >
                            <MenuItem value={'food'}>Comida</MenuItem>
                            <MenuItem value={'drinks'}>Bebidas</MenuItem>
                            <MenuItem value={'clothes'}>Ropa</MenuItem>
                        </Select>

                        <TextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            id='productName'
                            label='Nombre del producto'
                            name='productName'
                            autoComplete='productName'
                            autoFocus
                            value={productName}
                            onChange={(e) => setproductName(e.target.value)}
                        />

                        <TextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            id='productPrice'
                            label='Precio del producto'
                            name='productPrice'
                            autoComplete='productPrice'
                            autoFocus
                            type='number'
                            value={price}
                            onChange={(e) => setprice(e.target.value)}
                        />

                        <input
                            accept='image/*'
                            className={classes.input}
                            id='contained-button-file'
                            name='productImage'
                            type='file'
                            onChange={(e) => setfile(e.currentTarget.files)}
                        />

                    </form>

                    <div className={classes.root}>
                        <label htmlFor='contained-button-file'>
                            <Button variant='contained' component='span'>
                                Subir Foto
                                <PhotoCamera style={{ marginLeft: 10 }} />
                            </Button>
                        </label>
                    </div>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='primary'>
                        Cancelar
                    </Button>
                    <Button onClick={handleSubmit} color='primary'>
                        Agregar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ButtonFormProduct;