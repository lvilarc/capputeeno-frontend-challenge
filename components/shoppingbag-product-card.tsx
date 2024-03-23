"use client"

import styled from "styled-components"
import { BinIcon } from "./icons/bin-icon";
import { useEffect, useState } from "react";
import { PlusIcon } from "./icons/plus-icon";
import { MinusIcon } from "./icons/minus-icon";
import { formatPrice } from "@/utils/format-price";
import { useFilter } from "@/hooks/useFilter";
import { CartItem } from "@/types/cart-item";



const CardContainer = styled.div`
    width: 736px;
    height: 211px;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 8px;
    display: flex;
    img {
        border-radius: 8px 0px 0px 8px;
        width: 256px;
        height: 211px;
    }
    @media (max-width: 1228px) {
        width: 516px;
    }
    
`;
const TextContainer = styled.div`
    padding: 16px 14px 18px 30px;
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
`;

const TitleDescriptionContainer = styled.div`
    h2 {
        margin-top: 14px;
        font-size: 12px;
        font-weight: 400;
        color: rgba(65, 65, 77, 1);
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
`;

const TitleContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    h1 {
        font-size: 20px;
        font-weight: 300;
        color: rgba(65, 65, 77, 1);
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    button {
        all: unset;
        cursor: pointer;
    }
`;
const PriceContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    div {
        display: flex;
        gap: 2px;
        
        h4 {
            display: flex;
            border: 1px solid rgba(17, 93, 140, 1);
            color: white;
            height: 30px;
            align-items: center;
            justify-content: center;
            width: 50px;
            background-color: rgba(17, 93, 140, 1);
            font-size: 17px;
            font-weight: 400;
            font-family: inherit;
        }
        
    }
    h3 {
        color: rgba(9, 9, 10, 1);
        font-family: inherit;
        font-size: 16px;
        font-weight: 600;
    }
`;

const MinusButton = styled.button`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 34px;
        height: 30px;
        border-radius: 25px 0px 0px 25px;
        border: 1px solid rgba(17, 93, 140, 1);
        background: rgba(17, 93, 140, 1);
        cursor: pointer;
        svg {
            width: 24px;
            height: 24px;
        }
`;

const PlusButton = styled.button`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 34px;
        height: 30px;
        border-radius: 0px 25px 25px 0px;
        border: 1px solid rgba(17, 93, 140, 1);
        background: rgba(17, 93, 140, 1);
        cursor: pointer;
        svg {
            width: 24px;
            height: 24px;
        }
`;

const PriceDiv = styled.div`
    display: flex;
    h5 {
        margin-right: 10px;
        color: rgba(9, 9, 10, 1);
        font-size: 16px;
        font-weight: 400;
    }
`;




interface ShoppingBagProductCardProps {
    id: string,
    img: string,
    title: string,
    price: number,
    description: string,
    removeItemFromData: (itemId: string) => void
}


export function ShoppingBagProductCard(props: ShoppingBagProductCardProps) {
    const { shoppingBagItems, setShoppingBagItems } = useFilter();

    const [quantity, setQuantity] = useState<number>(0);

    const price = formatPrice(props.price);

    const [finalPrice, setFinalPrice] = useState(formatPrice(0));

    useEffect(() => {
        const storedData = localStorage.getItem('shoppingbag-items');

        if (storedData) {
            const parsedData: [string, number][] = JSON.parse(storedData);
            const item = parsedData.find(([itemId]) => itemId === props.id);
            if (item) {
                setQuantity(item[1]); // Define a quantidade do item específico
                setFinalPrice(`${item[1]}x ${formatPrice(props.price)}`);
            }
        }
    }, [props.id]);

    


    function handleDelete() {
        const updatedItems = shoppingBagItems.filter(([itemId]) => itemId !== props.id);

        setShoppingBagItems(updatedItems);

        localStorage.setItem('shoppingbag-items', JSON.stringify(updatedItems));

        props.removeItemFromData(props.id);
    }

    const handleIncrement = () => {
        const updatedItems: CartItem[] = shoppingBagItems.map(([itemId, quantity, price_in_cents]) => {
            if (itemId === props.id) {
                setQuantity(prevQuantity => prevQuantity + 1);
                return [itemId, quantity + 1, price_in_cents];

            }
            return [itemId, quantity, price_in_cents];
        });

        setShoppingBagItems(updatedItems);
        localStorage.setItem('shoppingbag-items', JSON.stringify(updatedItems));
    };

    const handleDecrement = () => {
        const updatedItems: CartItem[] = shoppingBagItems.map(([itemId, quantity, price_in_cents]) => {
            if (itemId === props.id && quantity > 1) {
                setQuantity(prevQuantity => prevQuantity - 1);
                return [itemId, quantity - 1, price_in_cents];
            }
            return [itemId, quantity, price_in_cents];
        });

        setShoppingBagItems(updatedItems);
        localStorage.setItem('shoppingbag-items', JSON.stringify(updatedItems));
    };

    return (
        <CardContainer>
            <img src={props.img}></img>
            <TextContainer>
                <TitleDescriptionContainer>
                    <TitleContainer>
                        <h1>{props.title}</h1>
                        <button onClick={handleDelete}>
                            <BinIcon />
                        </button>
                    </TitleContainer>
                    <h2>{props.description}</h2>
                </TitleDescriptionContainer>
                <PriceContainer>
                    <div>
                        <MinusButton onClick={handleDecrement}><MinusIcon /></MinusButton>
                        <h4>{quantity}</h4>
                        <PlusButton onClick={handleIncrement}><PlusIcon /></PlusButton>
                    </div>
                    <PriceDiv>
                        <h5>{quantity + 'x'}</h5>
                        <h3>{price}</h3>
                    </PriceDiv>

                </PriceContainer>

            </TextContainer>

        </CardContainer>
    )
}