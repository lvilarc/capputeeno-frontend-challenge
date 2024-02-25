"use client"

import styled from "styled-components";

const FooterContainer = styled.footer`
    display: flex;
    background-color: #333;
    color: #fff;
    padding: 20px;
    align-items: center;
    text-align: center;
    width: 100%;
    height: 200px;
    justify-content: center;
`;

export function Footer() {
    return (
        <FooterContainer>
            <div>
                <p>Todos os direitos reservados.</p>
                <p>Qualquer informação adicional pode ser adicionada aqui.</p>
            </div>
        </FooterContainer>
    );
}