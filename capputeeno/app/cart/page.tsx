"use client"

import { BackArrow } from "@/components/back-arrow";
import { ShoppingBagProductsListWrapper } from "@/components/shoppingbag-products-list";
import styled from "styled-components"
import { useFilter } from "@/hooks/useFilter";
import { useEffect, useState } from "react";
import { formatPrice } from "@/utils/format-price";



const CartPageContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    padding: 30px 14vw;
    gap: 20px;
`;
const CartContainer = styled.div`
    width: 736px;
    @media (max-width: 1228px) {
        width: 516px;
    }
`;
const TextContainer = styled.div`
    h1 {
        margin-top: 14px;
        font-size: 24px;
        font-weight: 500;
        text-transform: uppercase;
        color: rgba(65, 65, 77, 1);
    }
    h2 {
        
        font-size: 16px;
        font-weight: 300;
        color: rgba(65, 65, 77, 1);
        display: inline;
    }
    h3 {
        font-size: 16px;
        font-weight: 600;
        color: rgba(65, 65, 77, 1);
        display: inline-block;
    }
    div {
        margin-top: 8px;
    }
`;
const OrderSummaryContainer = styled.div`
    background: rgba(255, 255, 255, 1);
    width: 352px;
    height: 700px;
    h1 {
        text-transform: uppercase;
        font-size: 20px;
        font-weight: 600;
        color: rgba(65, 65, 77, 1);
        line-height: 18px;
        margin-bottom: 30px;
    }
`;
const DivSpaceBetween = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    h2, h3 {
        font-size: 16px;
        font-weight: 400;
        color: rgba(65, 65, 77, 1);
    }
`;
const DivSpaceBetweenBold = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    h2, h3 {
        font-size: 16px;
        font-weight: 600;
        color: rgba(65, 65, 77, 1);
    }
`;
const PaddingDiv = styled.div`
    height: 100%;
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
const LineDiv = styled.div`
    width: 304px;
    border: 1px solid rgba(220, 226, 229, 1);
    margin-top: 22px;
`;
const CheckoutButton = styled.button`
    border-radius: 4px;
    color: rgba(245, 245, 250, 1);
    text-transform: uppercase;
    font-family: inherit;
    border: none;
    background: rgba(81, 184, 83, 1);
    width: 304px;
    height: 44px;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    text-align: center;
    margin-top: 40px;
    cursor: pointer;

`;
const HelpLinks = styled.div`
    gap: 10px;
    display: flex;
    flex-direction: column;
    p {
        text-transform: uppercase;
        text-decoration: underline;
        font-size: 14px;
        font-weight: 500;
        color: rgba(115, 115, 128, 1);
        cursor: pointer;
    }
`;


export default function CartPage() {
    const deliveryTax = 4000;

    const { shoppingBagItems } = useFilter();
    const [ids, setIds] = useState<string[]>();
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if (shoppingBagItems.length > 0) {
            const ids = shoppingBagItems.map(item => item[0]);
            setIds(ids)


            const tPrice: number = shoppingBagItems
                .map(([_, quantity, price]) => quantity * price)
                .reduce((acc, productTotalPrice) => acc + productTotalPrice, 0);
            setTotalPrice(tPrice)

        } else {
            setIds([]);
            setTotalPrice(0);
        }
    }, [shoppingBagItems])

    return (

        <CartPageContainer>
            <CartContainer>
                <BackArrow navigate="/"></BackArrow>
                <TextContainer>
                    <h1>{ids && ids.length > 0 ? "Seu carrinho" : "Seu carrinho está vazio"}</h1>
                    {ids && ids.length > 0 &&
                        <div>
                            <h2>Total ({ids.length} produtos) </h2>
                            <h3>{formatPrice(totalPrice)}</h3>
                        </div>
                    }
                </TextContainer>

                {ids && ids.length > 0 && <ShoppingBagProductsListWrapper ids={ids} />}



            </CartContainer>
            {ids && ids.length > 0 &&
                <OrderSummaryContainer>
                    <PaddingDiv>
                        <div>
                            <h1>Resumo do pedido</h1>


                            <DivSpaceBetween>
                                <h2>Subtotal de produtos</h2>
                                <h3>{formatPrice(totalPrice)}</h3>
                            </DivSpaceBetween>
                            <DivSpaceBetween>
                                <h2>Entrega</h2>
                                <h3>{formatPrice(deliveryTax)}</h3>
                            </DivSpaceBetween>
                            <LineDiv></LineDiv>
                            <DivSpaceBetweenBold>
                                <h2>Total</h2>
                                <h3>{formatPrice(totalPrice + deliveryTax)}</h3>
                            </DivSpaceBetweenBold>

                            <CheckoutButton>Finalizar a compra</CheckoutButton>
                        </div>


                        <HelpLinks>
                            <p>Ajuda</p>
                            <p>reembolsos</p>
                            <p>entregas e frete</p>
                            <p>trocas e devoluções</p>
                        </HelpLinks>


                    </PaddingDiv>

                </OrderSummaryContainer>}
        </CartPageContainer>

    )
}


