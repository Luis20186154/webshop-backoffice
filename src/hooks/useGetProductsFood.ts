import { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { db } from '../firebase/firebaseConfig';
import { ItemProduct } from '../interfaces/ProductInterface';

export const useGetProductsFood = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [productsFood, setproductsFood] = useState<any>([]);

    const getProducts = async () => {

        //const prueba = await db.collection('products').get() as unknown as ItemProduct[];

        //console.log(prueba)

        await db.collection('products').get().then( querySnapshot => {
            
            //setproductsFood(querySnapshot.docs as unknown as ItemProduct[]);
            setproductsFood(querySnapshot.docs.map((doc) => {
                
                return doc.data();                
            }));

        });        

        setIsLoading(false);
    }

    useEffect(() => {
        getProducts();
    }, [])

    return {
        isLoading,
        productsFood
    }
}
