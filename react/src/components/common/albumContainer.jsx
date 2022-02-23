import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";

import getScoreColor from "./../../utils/scoreColor";

export const StyledAlbumContainer = styled.div`
    letter-spacing: -0.05em;

    display: grid;
    grid-template-rows: auto auto 1fr;
    align-items: flex-end;

    a {
        color: var(--lightColor);
        text-decoration: none;
    }

    &:hover .albumImageContainer {
        box-shadow: 0 0 50px rgba(233, 69, 96, 0.65);
        outline-width: 5px;
        outline-offset: -5px;
        transition: all 0.1s ease-in-out;
    }

    .albumImageContainer {
        position: relative;
        overflow: hidden;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        outline: 0 solid var(--accentColor);

        transition: box-shadow 0.5s ease-in-out, all 0.2s ease-in-out;

        a {
            display: block;
            width: 100%;
            height: 100%;
            img {
                width: 100%;
                aspect-ratio: 1;
                vertical-align: top;
            }
        }

        .albumAOTYPositionContainer {
            aspect-ratio: 1 / 1;
            height: clamp(1.2rem, 2.2vw, 2.2rem);
            background-color: var(--accentColor);
            position: absolute;
            left: 0;
            bottom: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: clamp(0.85rem, 1.2vw, 1.2rem);
        }
    }

    .albumTextContainer {
        padding: 0.8rem 0.45rem;

        display: block;
        overflow: hidden;

        h2 {
            padding-left: 1px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            position: relative;
            font-size: clamp(0.6rem, 1.25vw, 1.1rem);
        }

        h3 {
            padding-left: 1px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: clamp(0.75rem, 1.35vw, 1.25rem);
            font-weight: 400;
            text-indent: -1.5px;
        }

        h2,
        h3 {
            transition: color 0.1s ease-in-out;
        }

        h2:hover,
        h3:hover {
            color: var(--accentColor);
        }

        @media (max-width: ${({ theme }) => theme.mobile}) {
            padding: 0.45rem;
        }
    }

    .albumScoreContainer {
        text-align: right;
        padding: 0.25rem 0.6rem;
        font-size: clamp(0.7rem, 1.15vw, 1.15rem);
        color: var(--darkestColor);
        background-color: var(--accentColor);

        &.GreenBG {
            background-color: var(--greenScoreColor) !important;
        }
        &.YellowBG {
            background-color: var(--yellowScoreColor) !important;
        }
        &.RedBG {
            background-color: var(--redScoreColor) !important;
        }

        .alignCenter {
            text-align: center;
        }

        @media (max-width: ${({ theme }) => theme.mobile}) {
        }
    }

    @media (max-width: ${({ theme }) => theme.mobile}) {
        letter-spacing: 0;

        .albumScoreContainer {
            padding: 0.15rem 0.35rem;
        }
    }
`;

const AlbumContainer = ({ album, customScore, isAoty, isInArtistPage }) => {
    return (
        <StyledAlbumContainer>
            <div className="albumImageContainer">
                <Link to={`/albums/${album.id}`}>
                    <img src={album.art_cover} alt={`${album.title} art cover`} />
                    {album.position && isAoty && <div className="albumAOTYPositionContainer">{album.position}</div>}
                </Link>
            </div>

            <div className="albumTextContainer">
                {isInArtistPage === true ? (
                    <React.Fragment>
                        <Link to={`/albums/${album.id}`}>
                            <h3 style={{ fontWeight: 900 }}>{album.title}</h3>
                        </Link>
                        <h2 style={{ fontWeight: 400 }}>
                            {album.release_type} | <span title={album.release_date}>{moment(album.release_date).format("YYYY")}</span>
                        </h2>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Link to={`/artists/${album.artist.slug}`}>
                            <h2>{album.artist.name}</h2>
                        </Link>
                        <Link to={`/albums/${album.id}`}>
                            <h3>{album.title}</h3>
                        </Link>
                    </React.Fragment>
                )}
            </div>

            <div className={`albumScoreContainer ${getScoreColor(album.overall_score)}BG`}>
                {moment(album.release_date) < moment() ? (
                    <p>{album[customScore] || album.overall_score || "No ratings"}</p>
                ) : (
                    <p className="alignCenter">Waiting for the release</p>
                )}
            </div>
        </StyledAlbumContainer>
    );
};

export default AlbumContainer;
