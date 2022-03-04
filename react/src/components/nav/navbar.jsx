import React, { useContext, useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import ClickAwayListener from "react-click-away-listener";

import SearchBar from "./searchBar";
import { searchArtists } from "./../../services/artistService";
import { searchReviewers } from "../../services/reviewerService";
import { searchAlbums } from "./../../services/albumService";
import UserContext from "./../../context/userContext";

const StyledNavBar = styled.nav`
    top: 0;
    left: 0;
    right: 0;
    z-index: 500;
    position: fixed;
    overflow: hidden;
`;

const NavBarContainer = styled.div`
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

const LogoContainer = styled.div`
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

const NavLinks = styled.div`
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

const SearchIcon = styled.img`
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

const BurgerIcon = styled.img`
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

const CloseMenuIcon = styled.img`
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

const Button = styled.button`
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

const NavBar = ({ history }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [queryResults, setQueryResults] = useState({});
    const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
    const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
    const [timer, setTimer] = useState(null);
    const [currentUser, setCurrentUser] = useContext(UserContext);

    const resetStates = () => {
        setSearchQuery("");
        setQueryResults({});
        setIsSearchBarVisible(false);
        setIsMobileMenuVisible(false);
    };

    const handleSearch = async (searchQuery) => {
        setSearchQuery(searchQuery);
        clearTimeout(timer);

        const newTimer = setTimeout(async () => {
            if (searchQuery && searchQuery !== "") {
                const { data: artistsResults } = await searchArtists(searchQuery);
                const { data: albumsResults } = await searchAlbums(searchQuery);
                const { data: reviewersResults } = await searchReviewers(searchQuery);
                setQueryResults({ albums: albumsResults, artists: artistsResults, reviewers: reviewersResults });
                setTimer(null);
            } else {
                setQueryResults({});
                setTimer(null);
            }
        }, 200);
        setTimer(newTimer);
    };

    const toggleSearchBar = () => {
        setIsSearchBarVisible(!isSearchBarVisible);
        setSearchQuery("");
        setQueryResults({});
        if (!isSearchBarVisible) document.getElementById("searchInput").focus();
    };

    const toggleMobileMenu = () => setIsMobileMenuVisible(!isMobileMenuVisible);

    const handleClickAway = () => resetStates();

    const handleSubmit = () => {
        history.push(`/search/${searchQuery}`);
        resetStates();
    };

    const handleClick = () => resetStates();

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <StyledNavBar>
                <NavBarContainer>
                    <LogoContainer>
                        <NavLink to="/">
                            <img src="/images/logo.svg" alt="ScoreThatLP Logo" />
                        </NavLink>
                    </LogoContainer>
                    <SearchIcon onClick={toggleSearchBar} src="/images/search.svg" alt="Search Icon" />
                    <NavLinks visibility={isMobileMenuVisible ? 1 : 0}>
                        <CloseMenuIcon src="/images/close.svg" onClick={toggleMobileMenu} />
                        <NavLink to="/albums" onClick={handleClickAway}>
                            albums
                        </NavLink>
                        <NavLink to="/artists" onClick={handleClickAway}>
                            artists
                        </NavLink>
                        <NavLink to="/aoty" onClick={handleClickAway}>
                            aoty
                        </NavLink>
                        <NavLink to="/new-releases" onClick={handleClickAway}>
                            new releases
                        </NavLink>
                        <hr />
                        {currentUser ? (
                            <div className="userContainer">{currentUser.username}</div>
                        ) : (
                            <NavLink to="/login" onClick={handleClickAway}>
                                <Button>log in</Button>
                            </NavLink>
                        )}
                    </NavLinks>
                    <BurgerIcon src="/images/burgerMenu.svg" alt="Burger Menu" aria-hidden={true} onClick={toggleMobileMenu} />
                </NavBarContainer>

                <SearchBar
                    visibleSearchBar={isSearchBarVisible}
                    value={searchQuery}
                    queryResults={queryResults}
                    timer={timer}
                    onSearch={handleSearch}
                    onSubmit={handleSubmit}
                    onClick={handleClick}
                />
            </StyledNavBar>
        </ClickAwayListener>
    );
};

export default withRouter(NavBar);
