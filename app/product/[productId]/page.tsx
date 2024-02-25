"use client"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { BackArrow } from "@/components/back-arrow";
import styled from "styled-components";



import { useProduct } from "@/hooks/useProduct";
import { formatPrice } from '@/utils/format-price';
import { ShoppingBagWhiteIcon } from '@/components/shoppingbag-white-icon';

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
    button {
        cursor: pointer;
        display: flex;
        color: rgba(245, 245, 250, 1);
        border: none;
        background: rgba(17, 93, 140, 1);
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
    }
`;

const ProductInfoContainer = styled.div`
    display: flex; 
    flex-direction: column; 
    height: 580px;
    justify-content: space-between;
`;

const Product = ({ params }: { params: { productId: string } }) => {

    // console.log(params.productId);

    // const [productId, setProductId] = useState(params.productId);

    const { data } = useProduct(params.productId);
    console.log(data)
    console.log('oiioioioi')

    // const price = formatPrice(data?.price_in_cents);
    // const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <ProductPageContainer>
                <BackArrow navigate='/' />
                <ProductContainer>
                    <img src={data?.image_url}></img>
                    <ProductInfoContainer>
                        <div>
                            <p>Caneca</p>
                            <h1>{data?.name}</h1>
                            <h2>{data?.price_in_cents ? formatPrice(data.price_in_cents) : 'Price not available'}</h2>
                            <h3>*Frete de R$40,00 para todo o Brasil. Grátis para compras acima de R$900,00.</h3>
                            <h4>Descrição</h4>
                            <h5>{data?.description}</h5>
                        </div>
                        <button>
                            <ShoppingBagWhiteIcon />
                            Adicionar ao carrinho
                        </button>
                    </ProductInfoContainer>
                </ProductContainer>

            </ProductPageContainer>
        </QueryClientProvider>


    )
}


export default function ProductWrapper({ params }: { params: { productId: string } }) {
    return (
        <QueryClientProvider client={queryClient}>
            <Product params={params}></Product>
        </QueryClientProvider>
    )
}