import React from "react";
import styled from "styled-components";

const StyledLoadingScreen = styled.div`
    height: 100vh;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: var(--darkBlueColor);

    display: flex;
    justify-content: center;
    align-items: center;

    z-index: 1000;

    img {
        height: 10rem;
    }
`;

const LoadingScreen = () => {
    return (
        <StyledLoadingScreen>
            <div className="loadingImgContainer">
                <img src="/images/loading.svg" alt="Loading circle animation" />
            </div>
        </StyledLoadingScreen>
    );
};

export default LoadingScreen;
