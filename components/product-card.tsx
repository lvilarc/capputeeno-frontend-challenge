"use client"

import { formatPrice } from "@/utils/format-price"

import styled from "styled-components";





interface ProductCardProps {
    img: string,
    title: string,
    price: number
}

const CardContainer = styled.div`
    background: rgba(255, 255, 255, 0.4);
    width: 256px;
    height: 378px;
    display: flex;
    flex-direction: column;
    border-radius: 10px 10px 6px 6px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    img {
        width: 256px;
        height: 300px;
        border-radius: 10px 10px 0px 0px;
    }
    h1 {
        margin-left: 14px;
        font-family: inherit;
        font-size: 16px;
        font-weight: 300;
        color: rgba(65, 65, 77, 1);
    }
    div {
        gap: 6px;
        display: flex;
        padding: 8px 0px;
        justify-content: center;
        flex-direction: column;
        div {
            padding: 0;
            width: 228px;
            height: 1px;
            background-color: rgba(220, 226, 229, 1);
            margin-left: 14px;
        }
    }
    p {
        margin-left: 14px;
        font-family: inherit;
        font-size: 14px;
        font-weight: 600;
        color: rgba(9, 9, 10, 1);
    }
`;


export function ProductCard(props: ProductCardProps) {
    const price = formatPrice(props.price);
    return (
     
            <CardContainer>
                <img src={props.img}></img>
                <div>
                    <h1>{props.title}</h1>
                    <div></div>
                    <p>{price}</p>
                </div>

            </CardContainer>
       

    )
}