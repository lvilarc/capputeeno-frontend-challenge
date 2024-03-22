"use client"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { BackArrow } from "@/components/back-arrow";
import styled from "styled-components";



import { useProduct } from "@/hooks/useProduct";
import { formatPrice } from '@/utils/format-price';
import { ShoppingBagWhiteIcon } from '@/components/shoppingbag-white-icon';
import { useEffect, useState } from 'react';
import { useFilter } from '@/hooks/useFilter';
import { DoneIcon } from '@/components/done-icon';
import { CartItem } from '@/types/cart-item';

const queryClient = new QueryClient()

const ProductPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 30px 394px;
`;
const ProductContainer = styled.div`
    gap: 30px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 22px;
    img {
        width: 640px;
        height: 580px;
    }
    p {
        font-size: 16px;
        font-weight: 400;
        color: rgba(65, 65, 77, 1);
    }
    h1 {
        margin-top: 10px;
        font-size: 32px;
        font-weight: 300;
        color: background: rgba(65, 65, 77, 1);
    }
    h2 {
        margin-top: 2px;
        font-size: 20px;
        font-weight: 600;
        color: rgba(9, 9, 10, 1);
    }
    h3 {
        margin-top: 20px;
        font-size: 12px;
        font-weight: 400;
        color: rgba(65, 65, 77, 1);
    }
    h4 {
        margin-top: 60px;
        font-size: 16px;
        font-weight: 500;
        text-transform: uppercase;
        color: rgba(115, 115, 128, 1);
    }
    h5 {
        margin-top: 8px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(65, 65, 77, 1);
    }
    
`;

const Button = styled.button<ButtonProps>`
    cursor: pointer;
    display: flex;
    color: rgba(245, 245, 250, 1);
    border: none;
    background: ${props => props.added === "true" ? 'rgba(81, 184, 83, 1)' : 'rgba(17, 93, 140, 1)'};
    border-radius: 4px;
    font-size: 16px;
    font-weight: 500;
    font-family: inherit;
    text-transform: uppercase;
    display: flex;
    gap: 14px;
    width: 448px;
    height: 44px;
    justify-content: center;
    align-items: center;
    svg {
        width: 24px;
        height: 24px;
    }
`;

const ProductInfoContainer = styled.div`
    display: flex; 
    flex-direction: column; 
    height: 580px;
    width: 448px;
    justify-content: space-between;
`;

interface ButtonProps {
    added: "true" | "false"; // Accepts only "true" or "false" strings
}

const Product = ({ params }: { params: { productId: string } }) => {
    const { setShoppingBagItems } = useFilter();
    const [isAdded, setIsAdded] = useState<boolean>(false);

    useEffect(() => {
        let shoppingbag: CartItem[] = JSON.parse(localStorage.getItem('shoppingbag-items') || '[]');


        const isAdded = shoppingbag.some(item => item[0] === params.productId);

        setIsAdded(isAdded);
    }, []);

    const { data } = useProduct(params.productId);

    const handleAddToCart = () => {
        if (!isAdded) {
            let shoppingbag: CartItem[] = JSON.parse(localStorage.getItem('shoppingbag-items') || '[]');

            if (!shoppingbag.some(item => item[0] === params.productId)) {
                if (data) {
                    shoppingbag.push([params.productId, 1, data.price_in_cents]);
                }
                localStorage.setItem('shoppingbag-items', JSON.stringify(shoppingbag));
                setShoppingBagItems(shoppingbag)
                setIsAdded(true);
            } else {
                setIsAdded(false);
            }
        }

    };

    const getCategoryName = (category: string): string => {
        switch (category) {
            case 'mugs':
                return 'Caneca';
            case 't-shirts':
                return 'Camiseta';
            // Adicione mais casos conforme necessário para outras categorias
            default:
                return category;
        }
    };


    return (

        <ProductPageContainer>
            <BackArrow navigate='/' />
            <ProductContainer>
                <img src={data?.image_url}></img>
                <ProductInfoContainer>
                    <div>
                    <p>{data ? getCategoryName(data.category) : ''}</p>
                        <h1>{data?.name}</h1>
                        <h2>{data?.price_in_cents ? formatPrice(data.price_in_cents) : 'Price not available'}</h2>
                        <h3>*Frete de R$40,00 para todo o Brasil. Grátis para compras acima de R$900,00.</h3>
                        <h4>Descrição</h4>
                        <h5>{data?.description}</h5>
                    </div>
                    <Button added={isAdded ? "true" : "false"} onClick={handleAddToCart}>
                        {isAdded ? <DoneIcon /> : <ShoppingBagWhiteIcon />}
                        {isAdded ? 'Produto Adicionado' : 'Adicionar ao carrinho'}
                    </Button>
                </ProductInfoContainer>
            </ProductContainer>

        </ProductPageContainer>



    )
}


export default function ProductWrapper({ params }: { params: { productId: string } }) {
    return (
        <QueryClientProvider client={queryClient}>
            <Product params={params}></Product>
        </QueryClientProvider>
    )
}