import styled from "styled-components";

export const Button = styled.button`
    background-color: ${({ theme }) => theme.colors.blueColor};
    border: none;

    color: ${({ theme }) => theme.colors.lightColor};
    font-family: "Montserrat", sans-serif !important;
    font-weight: 900;
    text-decoration: none;
    font-size: 1.25rem;
    cursor: pointer;

    aspect-ratio: 2.2 / 1;
    width: 4.65em;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 0 rgba(0, 0, 0, 0.2);
    transition: all 0.05s ease-in-out;

    &:active {
        transform: translateY(4px);
        box-shadow: 0 0 0 rgba(0, 0, 0, 0.2);
    }
`;
