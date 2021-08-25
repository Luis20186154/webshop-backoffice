import { useEffect, useState } from 'react'
import { db } from '../firebase/firebaseConfig';

export const useGetProductsDrinks = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [productsDrink, setproductsDrink] = useState<any>(undefined);

    const getProducts = async () => {
        await db.collection('products').get().then((querySnapshot) => {
            setproductsDrink(querySnapshot.docs.map((doc) => {
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
        productsDrink
    }
}
