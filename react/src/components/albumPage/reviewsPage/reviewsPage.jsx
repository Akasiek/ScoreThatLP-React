import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

import ContentGroup from "../../common/contentGroup";
import AlbumPageHeader from "../albumPageHeader";
import { getAlbum, getArtist, getRatings, getReviews } from "../../../services/fakeMusicService";
import { Main } from "../../../App";

const StyledReviewsPage = styled.section`
    background-color: var(--darkBlueColor);

    margin: 0 2.5rem;

    @media (max-width: ${({ theme }) => theme.mobile}) {
        margin: 0;
    }

    .contentGroupContainer {
        padding: 1rem 5rem;

        .reviewsGroup {
            padding: 3rem 0;

            .contentTitleBar {
                margin: 0 0 2rem 0;
            }

            .sortingContainer {
                margin: 2rem 0;
            }

            .contentContainer {
                gap: 3rem;
            }

            .paginationContainer {
                margin-top: 2rem;
            }
        }

        @media (max-width: ${({ theme }) => theme.mobile}) {
            padding: 0 1.5rem;

            .reviewsGroup {
                padding: 2rem 0;

                .contentTitleBar {
                    margin: 0 0 1.5rem 0;
                }

                .contentContainer {
                    gap: 2rem;
                }
            }
        }

        .ratingsGroup {
            margin: 3rem 0;

            & > div {
                gap: 2.5rem 4%;

                @media (max-width: ${({ theme }) => theme.mobile}) {
                    gap: 1.5rem 4%;
                }

                @media (max-width: 30rem) {
                    gap: 1rem 6%;
                }
            }

            .contentTitleBar {
                margin: 0 0 2rem 0;
            }
        }
    }
`;

const ReviewsPage = ({ match }) => {
    const album = getAlbum(match.params.id);
    const reviews = getReviews(album.id);
    const ratings = getRatings(album.id);

    return (
        <Main pushUnderNavbar={true}>
            <StyledReviewsPage>
                <Helmet>
                    <title>
                        {album.title} - {getArtist(album.artist_id).name} | Reviews | ScoreThatLP{" "}
                    </title>
                </Helmet>
                <AlbumPageHeader album={album} isCompact={true} />

                <div className="contentGroupContainer">
                    <ContentGroup
                        className={"reviewsGroup"}
                        title={`Reviews: ${reviews.length}`}
                        noTitleMargin={true}
                        content={reviews}
                        contentType="reviews"
                        contentPageSize={5}
                        colSize={[1, 1, 1]}
                        isSortingEnabled={true}
                        isPaginationEnabled={true}
                    />
                    <ContentGroup
                        className={"ratingsGroup"}
                        title={`Ratings ${ratings.length}`}
                        noTitleMargin={true}
                        content={ratings}
                        contentType="ratings"
                        contentPageSize={15}
                        colSize={[5, 3, 2]}
                    />
                </div>
            </StyledReviewsPage>
        </Main>
    );
};

export default ReviewsPage;
