import { useEffect, useState } from 'react'
import { db } from '../firebase/firebaseConfig';
import { ItemProduct } from '../interfaces/ProductInterface';

export const useGetProduct = (id: string) => {

    const [loadingProduct, setloadingProduct] = useState(true);
    const [product, setproduct] = useState<ItemProduct>();

    const getProduct = async () => {

        await db.collection('products').doc(id.trim()).get().then(doc => {
            setproduct(doc.data() as ItemProduct);
        })

        setloadingProduct(false);
    }

    useEffect(() => {
        getProduct();
    }, [])

    return {
        loadingProduct,
        product
    }
}
