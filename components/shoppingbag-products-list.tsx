"use client"

import styled from "styled-components"
import { ShoppingBagProductCard } from "./shoppingbag-product-card"

import { useCart } from "@/hooks/useCart";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const ProductsContainer = styled.div`
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

interface ShoppingBagProductsListProps {
    ids: string[]
}

function ShoppingBagProductsList(props: ShoppingBagProductsListProps) {
    // const productIds = ['29dde6f0-5dc3-4016-825d-31bee27f29b5', '13d58611-b07e-4722-ae85-f80e73fe8d1d', '9e96de2b-4ef9-4579-99f9-918f2677c58d'];
    // const productsQuery = productIds.map((productId, index) => `
    //     product${index + 1}: Product(id: "${productId}") {
    //         name
    //         description
    //         image_url
    //         category
    //         id
    //         price_in_cents
    //         sales
    //         created_at
    //     }
    // `).join('\n');
    // const query = `query {
    //     ${productsQuery}
    // }`;
    // console.log(query)







    // const { shoppingBagItems } = useFilter();
    // const [cartItemIds, setCardItemIds] = useState<string[]>();
    // const ids = shoppingBagItems.map(item => item[0]);

    // console.log('ids', ids)








    // useEffect(() => {
    //     const ids = shoppingBagItems.map(item => item[0]);
    //     setCardItemIds(ids);
    // }, [])

    const { data } = useCart(props.ids);
    console.log('data', data)


    return (
        <ProductsContainer>
            {data && Object.values(data).map(product => (
                product && (
                    <ShoppingBagProductCard
                        key={product.id}
                        img={product.image_url}
                        title={product.name}
                        price={product.price_in_cents}
                        description={product.description}
                    />
                )
            ))}
        </ProductsContainer>
    )
}

export function ShoppingBagProductsListWrapper(props: ShoppingBagProductsListProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <ShoppingBagProductsList ids={props.ids} />
        </QueryClientProvider>
    )
}