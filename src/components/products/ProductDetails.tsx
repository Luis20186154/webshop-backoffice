import React from 'react'
import { useParams } from 'react-router-dom';
import { Container, Paper, Typography } from '@material-ui/core';
import { useGetProduct } from '../../hooks/useGetProduct';

interface RequestParams {
    id: string
}

const ProductDetails = () => {

    const { id } = useParams<RequestParams>();
    const { loadingProduct, product } = useGetProduct(id);

    console.log('the product', product)

    return loadingProduct ? <h1>CARGANDO PRODUCTO...</h1>
        : (
            <Container maxWidth="xl" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <img
                    src={product?.urlImage}
                    alt={product?.productName + ' image'}
                    style={{
                        height: 450,
                        width: 550
                    }}
                />

                <Paper style={{
                    height: 150,
                    width: '50%'
                }}>

                    <Typography variant='h4' color='initial'>
                        {product!.productName}
                    </Typography>

                </Paper>
            </Container>
        )
}

export default ProductDetails;