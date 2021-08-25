import React from 'react'
import ButtonFormProduct from '../ButtonFormProduct'
import { useGetProductsFood } from '../../../hooks/useGetProductsFood';
import { ProductItem } from '../ProductItem';
import { Typography } from '@material-ui/core';

const Food = () => {

    const { isLoading, productsFood } = useGetProductsFood();
    console.log('productos', productsFood)
    
    return isLoading ? <h1>CARGANDO...</h1> : (
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginLeft: 45,
                marginRight: 55,
                marginBottom: 15
            }}>
                <Typography variant='h4' color='initial'>
                    Listado De Comida Actual
                </Typography>
                <ButtonFormProduct />
            </div>

            { (productsFood.length > 0) && <ProductItem products={productsFood} category={'food'}/>}

        </div>
    )
}

export default Food
