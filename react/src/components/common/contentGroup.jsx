import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { scroller } from "react-scroll/modules";
import useDeepCompareEffect from "use-deep-compare-effect";

import TitleBar from "./titleBar";
import AlbumContainer from "./albumContainer";
import ArtistContainer from "./artistContainer";
import ReviewContainer from "./reviewContainer";
import RatingContainer from "./ratingContainer";
import UserContainer from "./userContainer";
import Sorting from "./sorting";
import Pagination from "./pagination";
import sort, { getSortOptions } from "../../utils/sort";
import { paginate } from "./../../utils/paginate";
import RatingAlbumContainer from "./ratingAlbumContainer";

export const StyledContentGroup = styled.div`
    overflow: auto;

    .placeholder {
        padding: 2rem 3rem;
        font-size: clamp(1rem, 2vw, 2rem);
        @media (max-width: ${({ theme }) => theme.mobile}) {
            padding: 1rem 2rem;
        }
    }

    .sortingContainer {
        margin: 1.5rem 1rem;
    }
`;

export const ContentContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(${(props) => props.normalColSize || 4}, 1fr);

    @media (max-width: ${({ theme }) => theme.mobile}) {
        grid-template-columns: repeat(${(props) => props.smallColSize || 2}, 1fr);
        justify-items: center;
    }

    @media (max-width: 30rem) {
        grid-template-columns: repeat(${(props) => props.smallestColSize || 2}, 1fr);
    } ;
`;

function handlePageChange(page, setContentCurrentPage) {
    setContentCurrentPage(page);
    scroller.scrollTo("contentTitleBar", { duration: 500, delay: 0, smooth: "easeInOutQuart", offset: -100 });
}

const ContentGroup = ({
    title,
    viewAllUrl,
    noTitleMargin,
    content: propsContent,
    contentType,
    showPlaceholderWhenEmpty,
    albumCustomScore,
    albumIsAoty,
    albumIsInArtistPage,
    artistShowAvgScore,
    reviewIsOutsideAlbum,
    ratingAlbumIsReviewDateHidden,
    isPaginationEnabled,
    contentPageSize,
    isSortingEnabled,
    sortingMethod: propsSortingMethod,
    className,
    itemsCount,
    id,
    colSize,
}) => {
    const [normalColSize, smallColSize, smallestColSize] = colSize;
    const [sortingMethod, setSortingMethod] = useState(isSortingEnabled && (propsSortingMethod || getSortOptions(contentType)[0]));
    const [contentCurrentPage, setContentCurrentPage] = useState(1);

    const getContent = () => {
        const sorted = isSortingEnabled ? sort(propsContent, contentType, sortingMethod) : propsContent;
        const cropped = itemsCount ? sorted?.slice(0, parseInt(itemsCount)) : sorted;
        const content = isPaginationEnabled ? paginate(cropped, contentCurrentPage, contentPageSize) : cropped;
        return content;
    };

    const [content, setContent] = useState(getContent());

    useEffect(() => {
        setContent(getContent());
    }, [propsContent, contentCurrentPage]);

    // If sorting state changed, sort and go back to 1 page
    useEffect(() => {
        setContentCurrentPage(1);
        setContent(getContent());
    }, [sortingMethod?.value]);

    return (
        <React.Fragment>
            {(!showPlaceholderWhenEmpty && content?.length === 0) || (
                <StyledContentGroup className={className} id={id}>
                    {title && <TitleBar className="contentTitleBar" title={title} viewAllUrl={viewAllUrl} noMargin={noTitleMargin} />}
                    {isSortingEnabled && (
                        <div className="sortingContainer">
                            <Sorting setSortingMethod={setSortingMethod} contentType={contentType} sortingMethod={sortingMethod} />
                        </div>
                    )}
                    {content?.length !== 0 ? (
                        <ContentContainer
                            className="contentContainer"
                            normalColSize={normalColSize}
                            smallColSize={smallColSize}
                            smallestColSize={smallestColSize}
                        >
                            {contentType === "albums" &&
                                content?.map((a) => (
                                    <AlbumContainer
                                        key={a.id}
                                        album={a}
                                        customScore={albumCustomScore}
                                        isAoty={albumIsAoty}
                                        isInArtistPage={albumIsInArtistPage}
                                    />
                                ))}

                            {contentType === "artists" &&
                                content?.map((a) => <ArtistContainer key={a.id} artist={a} showAvgScore={artistShowAvgScore} />)}

                            {contentType === "reviews" &&
                                content?.map((r) => <ReviewContainer key={r.id} review={r} isOutsideAlbum={reviewIsOutsideAlbum} />)}

                            {contentType === "ratings" && content?.map((r) => <RatingContainer key={r.id} rating={r} />)}

                            {contentType === "ratingAlbums" &&
                                content?.map((r) => (
                                    <RatingAlbumContainer key={r.id} review={r} isReviewDateHidden={ratingAlbumIsReviewDateHidden} />
                                ))}

                            {contentType === "users" && content?.map((u) => <UserContainer key={u.id} user={u} />)}
                        </ContentContainer>
                    ) : (
                        <h1 className="placeholder">No {contentType} yet</h1>
                    )}
                    {isPaginationEnabled && (
                        <div className="paginationContainer">
                            <Pagination
                                itemsCount={propsContent.length}
                                pageSize={contentPageSize}
                                currentPage={contentCurrentPage}
                                onPageChange={(page) => handlePageChange(page, setContentCurrentPage)}
                            />
                        </div>
                    )}
                </StyledContentGroup>
            )}
        </React.Fragment>
    );
};

ContentGroup.propTypes = {
    // TitleBar Props
    title: PropTypes.string,
    viewAllUrl: PropTypes.string,
    noTitleMargin: PropTypes.bool,

    // Content Props
    content: PropTypes.array,
    contentType: PropTypes.string.isRequired,
    showPlaceholderWhenEmpty: PropTypes.bool,
    albumCustomScore: PropTypes.string,
    albumIsAoty: PropTypes.bool,
    albumIsInArtistPage: PropTypes.bool,
    artistShowAvgScore: PropTypes.bool,
    reviewIsOutsideAlbum: PropTypes.bool,
    ratingAlbumIsReviewDateHidden: PropTypes.bool,

    // Sorting and pagination Props
    isPaginationEnabled: PropTypes.bool,
    contentPageSize: PropTypes.number,
    isSortingEnabled: PropTypes.bool,
    sortingMethod: PropTypes.object,

    // Misc Props
    className: PropTypes.string,
    itemsCount: PropTypes.number,
    colSize: PropTypes.array.isRequired,
};

export default ContentGroup;
