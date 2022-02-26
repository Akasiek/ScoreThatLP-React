import React, { Component } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import ClickAwayListener from "react-click-away-listener";

import SearchBar from "./searchBar";
import { Button } from "../common.styled";
import { searchArtists } from "./../../services/artistService";
import { searchReviewers } from "../../services/reviewerService";
import { searchAlbums } from "./../../services/albumService";

export const StyledNavBar = styled.nav`
    top: 0;
    left: 0;
    right: 0;
    z-index: 500;
    position: fixed;
    overflow: hidden;
`;

export const NavBarContainer = styled.div`
    z-index: 200;
    position: sticky;
    background-color: var(--accentColor);
    font-size: 1.5rem;

    display: flex;
    align-items: center;

    * {
        color: var(--lightColor);
        text-decoration: none;
        padding: 0.35rem 0;
    }
`;

export const LogoContainer = styled.div`
    flex: 1;
    padding-left: 30px;

    display: flex;
    align-items: center;

    @media (max-width: ${({ theme }) => theme.mobile}) {
        padding-left: 15px;
    }
    & > a {
        padding: 0;
    }

    img {
        vertical-align: top;
        height: clamp(1.5rem, 2vw, 2rem);
        padding: 0;
        transition: transform 0.1s ease-in-out;

        &:hover {
            transform: scale(1.1);
        }
    }
`;

export const NavLinks = styled.div`
    display: flex;
    align-items: center;
    text-align: right;
    gap: clamp(1rem, 2vw, 2rem);
    font-size: clamp(0.8rem, 1.5vw, 1.5rem);

    & > hr {
        height: 1.75rem;
        margin: 0.5rem 0;
        border: 1px solid var(--lightColor);
    }

    a {
        padding: 0;
        transition: all 0.1s ease-in-out;
        position: relative;

        &:not(:last-child):hover {
            transform: scale(1.1);
            transform-origin: center;
        }
    }

    button {
        margin-right: 30px;
    }

    @media (max-width: ${({ theme }) => theme.mobile}) {
        z-index: 200;
        position: fixed;
        right: 0;
        top: 0;
        height: 100vh;
        width: 60%;
        background-color: hsl(240, 28%, 14%, 0.6);
        backdrop-filter: blur(5px);
        font-size: clamp(1.25rem, 4vw, 2rem);

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: clamp(1rem, 3vw, 1.5rem);

        transform: ${({ visibility }) => (visibility ? "translateX(0)" : "translateX(100%)")};
        transition: transform 0.3s ease-in-out;

        hr {
            display: none;
        }

        button {
            background-color: transparent;
            box-shadow: none;
            font-size: inherit;
            width: inherit;
            margin: 0;
            padding: 0;
        }

        button:active {
            transform: none;
        }

        a::after {
            content: "";
            height: 2px;
            background-color: var(--accentColor);
            width: 100%;
            position: absolute;
            left: 0;
            bottom: 0;
            transform: scaleX(0);
            transform-origin: bottom right;
            transition: transform 0.1s ease-in-out;
        }

        a:hover::after {
            transform: scaleX(1);
            transform-origin: bottom left;
        }

        a:not(:last-child):hover,
        a > button:hover {
            transform: none;
            color: var(--accentColor);
        }
    }
`;

export const SearchIcon = styled.img`
    height: 25px;
    min-height: 15px;
    margin-right: 30px;
    cursor: pointer;

    transition: all 0.1s ease-in-out;

    &:hover {
        transform: scale(1.15);
    }

    @media (max-width: ${({ theme }) => theme.mobile}) {
        margin-right: 15px;
    }
`;

export const BurgerIcon = styled.img`
    display: none;

    min-height: 15px;
    height: 25px;
    padding-right: 15px;
    padding: 15px 15px 15px 0;
    cursor: pointer;

    @media (max-width: ${({ theme }) => theme.mobile}) {
        display: block;
    }
`;

export const CloseMenuIcon = styled.img`
    height: 25px;
    display: none;
    cursor: pointer;

    position: absolute;
    right: 0.8rem;
    top: 0.6rem;

    @media (max-width: ${({ theme }) => theme.mobile}) {
        display: block;
    }
`;

class NavBar extends Component {
    state = {
        visibleSearchBar: false,
        visibleLinkNav: false,
        searchQuery: "",
        queryResults: [],
    };

    handleSearch = async (searchQuery) => {
        this.setState({ searchQuery });
        if (searchQuery && searchQuery !== "") {
            const { data: artistsResults } = await searchArtists(searchQuery);
            const { data: albumsResults } = await searchAlbums(searchQuery);
            const { data: reviewersResults } = await searchReviewers(searchQuery);
            const queryResults = { albums: albumsResults, artists: artistsResults, reviewers: reviewersResults };
            this.setState({ queryResults });
        } else {
            this.setState({ queryResults: [] });
        }
    };

    toggleSearchBar = () => {
        const { visibleSearchBar } = this.state;
        this.setState({ visibleSearchBar: !visibleSearchBar, searchQuery: "", queryResults: [] });
        if (!visibleSearchBar) document.getElementById("searchInput").focus();
    };

    toggleLinkNab = () => {
        const { visibleLinkNav } = this.state;
        this.setState({ visibleLinkNav: !visibleLinkNav });
    };

    handleClickAway = () => {
        this.setState({ visibleSearchBar: false, visibleLinkNav: false, searchQuery: "", queryResults: [] });
    };

    handleSubmit = () => {
        this.props.history.push(`/search/${this.state.searchQuery}`);
        this.setState({ visibleSearchBar: false, searchQuery: "", queryResults: [] });
    };

    handleClick = () => {
        this.setState({ visibleSearchBar: false, searchQuery: "", queryResults: [] });
    };

    render() {
        const { visibleLinkNav, visibleSearchBar, searchQuery, queryResults } = this.state;
        return (
            <ClickAwayListener onClickAway={this.handleClickAway}>
                <StyledNavBar>
                    <NavBarContainer>
                        <LogoContainer>
                            <NavLink to="/">
                                <img src="/images/logo.svg" alt="ScoreThatLP Logo" />
                            </NavLink>
                        </LogoContainer>
                        <SearchIcon onClick={this.toggleSearchBar} src="/images/search.svg" alt="Search Icon" />
                        <NavLinks visibility={visibleLinkNav ? 1 : 0}>
                            <CloseMenuIcon src="/images/close.svg" onClick={this.toggleLinkNab} />
                            <NavLink to="/albums" onClick={this.handleClickAway}>
                                albums
                            </NavLink>
                            <NavLink to="/artists" onClick={this.handleClickAway}>
                                artists
                            </NavLink>
                            <NavLink to="/aoty" onClick={this.handleClickAway}>
                                aoty
                            </NavLink>
                            <NavLink to="/new-releases" onClick={this.handleClickAway}>
                                new releases
                            </NavLink>
                            <hr />
                            <NavLink to="/login" onClick={this.handleClickAway}>
                                <Button>log in</Button>
                            </NavLink>
                        </NavLinks>
                        <BurgerIcon src="/images/burgerMenu.svg" alt="Burger Menu" aria-hidden={true} onClick={this.toggleLinkNab} />
                    </NavBarContainer>

                    <SearchBar
                        visibleSearchBar={visibleSearchBar}
                        value={searchQuery}
                        queryResults={queryResults}
                        onSearch={this.handleSearch}
                        onSubmit={this.handleSubmit}
                        onClick={this.handleClick}
                    />
                </StyledNavBar>
            </ClickAwayListener>
        );
    }
}

export default withRouter(NavBar);
