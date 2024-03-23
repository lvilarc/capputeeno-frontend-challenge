import { BackArrowIcon } from "@/components/icons/back-arrow-icon";

import styled from "styled-components";
import Link from 'next/link'


const BackArrowContainer = styled.div`
    cursor: pointer;
    display: inline-flex;
    gap: 5px;
    align-items: center;
    svg {
        width: 24px;
        height: 24px;
    }
    p {
        font-size: 14px;
        font-weight: 500;
        color: rgba(97, 116, 128, 1);
    }
`;

interface BackArrowProps {
    navigate: string;
}

export function BackArrow(props: BackArrowProps) {

    return (
        <Link href={props.navigate} style={{ textDecoration: 'none', color: 'inherit'}}>
            <BackArrowContainer>
                <BackArrowIcon />
                <p>Voltar</p>
            </BackArrowContainer>
        </Link>
    )
}