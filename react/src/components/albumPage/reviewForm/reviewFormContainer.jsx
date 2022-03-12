import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import getScoreColor from "../../../utils/scoreColor";
import ReviewFormRating from "./reviewFormRating";
import ReviewFormReviewText from "./reviewFormReviewText";
import { ReloadContext } from "../albumPage";
import { getReviewerAlbumRating, saveReview, deleteReview, createReview } from "../../../services/reviewService";

const StyledReviewForm = styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr;

    @media (max-width: 30rem) {
        grid-template-columns: none;
        grid-template-rows: auto auto auto;
    }

    input,
    textarea {
        font-family: "Montserrat";
        border: none;
        outline: none;
    }

    .rating,
    .review {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-block: clamp(1.8rem, 2.65vw, 2.65rem);
        padding-inline: clamp(1rem, 2vw, 2rem);

        form {
            display: flex;
            flex-direction: column;
            gap: clamp(0.25rem, 0.75vw, 0.75rem);
            position: relative;

            h4 {
                font-weight: normal;
                font-size: clamp(0.9rem, 1.2vw, 1.2rem);
            }

            .savingPrompt {
                position: absolute;
                bottom: 0;
                transform: translateY(100%);
                padding-top: clamp(0.25rem, 0.65vw, 0.65rem);
                font-size: clamp(0.8rem, 1vw, 1rem);
                font-style: italic;
                opacity: 0.8;
            }
        }
    }

    .rating {
        background-color: var(--accentColor);
        transition: background-color 0.3s ease-in-out;

        form {
            position: relative;
            input {
                padding-block: clamp(0.8rem, 1.1vw, 1.1rem);
                padding-inline: clamp(0.4rem, 0.9vw, 0.9rem);
                font-size: clamp(1.9rem, 2.75vw, 2.75rem);
                color: var(--blueColor);
            }

            h4 {
                color: var(--darkestColor);
            }

            .savingPrompt {
                position: absolute;
                bottom: 0;
                transform: translateY(100%);
                padding-top: clamp(0.25rem, 0.65vw, 0.65rem);
                font-size: clamp(0.8rem, 1vw, 1rem);
                color: var(--darkestColor);
                /* font-weight: normal; */
                font-style: italic;
                opacity: 0.8;
            }

            input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
        }

        .ratingInputContainer {
            input[type="number"] {
                font-weight: 900;
                text-align: center;
                transition: box-shadow 0.2s ease-in-out;
                &:focus {
                    box-shadow: 0 0 25px 5px rgba(0, 0, 0, 0.2);
                }
            }
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

    .review {
        background-color: var(--blueColor);
        align-items: center;
        form {
            flex: 1;
            textarea {
                width: 100%;
                height: 8rem;
                padding: 0.75rem;
                box-sizing: border-box;
                resize: vertical;

                font-size: clamp(0.9rem, 1.2vw, 1.2rem);
                color: var(--darkestColor);

                transition: box-shadow 0.2s ease-in-out;

                .savingPrompt {
                    color: var(--lightColor);
                }

                &:focus {
                    box-shadow: 0 0 35px -5px rgba(0, 0, 0, 0.4);
                }
            }
        }
    }

    .errorText {
        font-size: 1rem;
        width: 100%;
    }
`;

const changeRatingContainerColor = (value) => {
    const scoreColor = getScoreColor(parseInt(value)) || null;
    const ratingContainer = document.getElementById("ratingContainer");
    if (scoreColor) ratingContainer.className = `rating ${scoreColor}BG`;
    else ratingContainer.className = "rating";
};

const AlbumPageReviewFormContainer = ({ album, user }) => {
    const [data, setData] = useState({ rating: "", review: "" });
    const [reload, setReload] = useContext(ReloadContext);

    useEffect(() => {
        (async () => {
            // On load check if user already reviewed this album
            // If so, populate the form with his review
            const { data } = await getReviewerAlbumRating(user.id, album.id);
            const userReview = data[0];
            if (data.length > 0) {
                setData({
                    rating: userReview.rating,
                    review: userReview.review_text !== null ? userReview.review_text : "",
                });
                changeRatingContainerColor(userReview.rating);
            }
        })();
    }, [album.id, user.id]);

    const saveUserReview = (newData, timer, setTimer, setSavingPrompt, delay) => {
        // Save review
        // Wait a certain time (delay parameter) for user not to press anything. Then start saving.
        clearTimeout(timer);
        const newTimer = setTimeout(async () => {
            // Check if user has already rated this album
            const respond = await getReviewerAlbumRating(user.id, album.id);

            const getMethod = () => {
                if (respond.data.length > 0) {
                    // If there is a rating...
                    if (newData.rating !== "") {
                        // ...And new rating isn't null, update it
                        setSavingPrompt("Saving...");
                        return saveReview(
                            {
                                rating: newData.rating !== "" ? newData.rating : null,
                                review_text: newData.review !== "" ? newData.review : null,
                            },
                            respond.data[0].id
                        );
                    } else if (newData.rating === "" && newData.review === "") {
                        // ...And new rating and new review text is null, delete the rating in DB
                        setSavingPrompt("Saving...");
                        return deleteReview(respond.data[0].id);
                    }
                } else if (respond.data.length === 0) {
                    // If there is no rating...
                    if (newData.rating !== "") {
                        // ...And new rating isn't null, create it.
                        // To prevent making reviews without score
                        setSavingPrompt("Saving...");
                        return createReview({
                            rating: newData.rating !== "" ? newData.rating : null,
                            review_text: newData.review !== "" ? newData.review : null,
                            reviewer_id: user.id,
                            album_id: album.id,
                        });
                    }
                }
            };

            const newRespond = await getMethod();
            if (newRespond) setSavingPrompt("Saved");

            // Reload album and reviews info on album page
            setReload(!reload);

            setTimer(null);
        }, delay);
        setTimer(newTimer);
    };

    return (
        <StyledReviewForm>
            <ReviewFormRating data={data} setData={setData} saveUserReview={saveUserReview} changeRatingContainerColor={changeRatingContainerColor} />
            <ReviewFormReviewText data={data} setData={setData} saveUserReview={saveUserReview} />
        </StyledReviewForm>
    );
};

export default AlbumPageReviewFormContainer;
