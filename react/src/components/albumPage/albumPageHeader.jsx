import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";
import getScoreColor from "../../utils/scoreColor";

export const StyledAlbumPageHeader = styled.header`
    display: grid;
    grid-template-columns: auto 1fr;

    img {
        aspect-ratio: 1;
        height: ${(props) => (props.isCompact ? "10rem" : "clamp(25rem, 45vw, 40rem)")};
        min-height: 100%;
        width: 100%;
        object-fit: cover;

        z-index: 2;
        box-shadow: 0 0 25px rgba(0, 0, 0, 0.1);
        transition: all 0.2s ease-in-out;
        &:hover {
            box-shadow: 0 0 50px rgba(0, 0, 0, 0.35);
            transform: scale(1.02);
        }
    }

    div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        letter-spacing: -0.05rem;
        padding: 2rem;
        background-color: var(--accentColor);
        a {
            position: relative;
            color: var(--lightColor);
            text-decoration: none;

            &::after {
                position: absolute;
                visibility: hidden;
                bottom: 0;
                left: 0;
                right: 0;
                width: 0;
                content: "";
                border: 1px solid var(--lightColor);
                transition: width 0.2s ease-in-out, visibility 0s ease-in-out 0.2s;
            }

            &:hover {
                &::after {
                    width: 100%;
                    visibility: visible;
                    transition: width 0.2s ease-in-out;
                }
            }
        }

        hr {
            border: 1px solid var(--darkestColor);
            opacity: 0.2;
            margin: 1.5rem 5rem 1rem 0;
        }

        h1 {
            font-size: clamp(2rem, 5vw, 3.5rem);
            line-height: 100%;
        }

        h2 {
            font-size: clamp(3rem, 5vw, 4.25rem);
            color: var(--darkestColor);
            p {
                font-size: clamp(1.25rem, 2.25vw, 2.25rem);
                margin-bottom: clamp(0.5rem, 1vw, 1rem);
            }
        }

        h3 {
            font-size: clamp(1rem, 2.5vw, 1.5rem);
            font-weight: normal;
        }

        h4 {
            font-size: clamp(0.65rem, 2vw, 1rem);
            font-weight: normal;
            line-height: 0.8rem;
            color: var(--darkestColor);
        }

        &.GreenBG {
            background-color: var(--greenScoreColor) !important;
        }
        &.YellowBG {
            background-color: var(--yellowScoreColor) !important;
        }
        &.RedBG {
            background-color: var(--redScoreColor) !important;
        }
    }
    @media (max-width: ${(props) => (props.isCompact ? "35rem" : ({ theme }) => theme.mobile)}) {
        grid-template-columns: none;
        grid-template-rows: auto 1fr;

        img {
            height: auto;
            max-height: none;
        }
    }
`;

const AlbumPageHeader = ({ album, isCompact }) => {
    return (
        <StyledAlbumPageHeader isCompact={isCompact}>
            <img src={album.art_cover} alt="" />
            <div className={`${getScoreColor(album.overall_score)}BG`}>
                <h3>
                    <Link to={`/artists/${album.artist.slug}`}>{album.artist.name}</Link>
                </h3>
                <h1>{album.title}</h1>
                <hr />
                <h2>{moment(album.release_date) < moment() ? album.overall_score || <p>No ratings yet</p> : <p>Waiting for the release</p>}</h2>
                <h4>
                    {moment(album.release_date) < moment() && album.number_of_ratings > 0 && (
                        <React.Fragment>
                            Score based on <span style={{ fontWeight: "900" }}>{album.number_of_ratings}</span> ratings
                        </React.Fragment>
                    )}
                </h4>
            </div>
        </StyledAlbumPageHeader>
    );
};

export default AlbumPageHeader;
