import React from 'react';
import { Typography } from '@material-ui/core';
import { useGetProductsDrinks } from '../../../hooks/useGetProductsDrinks';
import ButtonFormProduct from '../ButtonFormProduct';
import { ProductItem } from '../ProductItem';

const Drinks = () => {

    const { isLoading, productsDrink } = useGetProductsDrinks();
    console.log(productsDrink);

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
                    Listado De Bebidas Actual
                </Typography>
                <ButtonFormProduct />
            </div>

            {/* {productsDrink.map(product => {
                if(product.category === 'drinks') {
                    return (
                        <h1>El oeoe</h1>
                    )
                }
            })} */}

        </div>
    )
}

export default Drinks;