import React from "react";
// import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledFooter = styled.footer`
    background-color: var(--accentColor);
    min-height: 300px;

    div {
        max-width: 1470px;
        margin: 0 auto;
    }
`;

const Footer = () => {
    return (
        <StyledFooter>
            <div>
                <div>
                    {/* <h2>Albums</h2>
                    <ul>
                        <li>
                            <Link>all albums</Link>
                        </li>
                        <li>
                            <Link>album of the year</Link>
                        </li>
                        <li>
                            <Link></Link>
                        </li>
                        <li>
                            <Link></Link>
                        </li>
                        <li>
                            <Link></Link>
                        </li>
                    </ul> */}
                </div>
            </div>
        </StyledFooter>
    );
};

export default Footer;
