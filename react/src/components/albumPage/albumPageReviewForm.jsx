import React, { Component } from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import styled from "styled-components";
import getScoreColor from "../../utils/scoreColor";

const accentColor = ({ theme }) => theme.colors.accentColor;
const lightColor = ({ theme }) => theme.colors.lightColor;
const blueColor = ({ theme }) => theme.colors.blueColor;
const green = ({ theme }) => theme.ratingColors.green;
const yellow = ({ theme }) => theme.ratingColors.yellow;
const red = ({ theme }) => theme.ratingColors.red;
const mobile = ({ theme }) => theme.mobile;

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
        color: ${blueColor};
    }

    input[type="submit"] {
        border-radius: 25px;
        font-weight: 900;
        font-size: clamp(0.8rem, 2vw, 1rem);
        padding: 0.4rem 1rem;
        cursor: pointer;
        background-color: ${lightColor};
        color: ${blueColor};
        justify-self: end;

        box-shadow: 0 4px 0 rgba(0, 0, 0, 0.2);
        transition: all 0.05s ease-in-out;

        &:active {
            transform: translateY(4px);
            box-shadow: 0 0 0 rgba(0, 0, 0, 0.2);
        }

        &:disabled {
            filter: grayscale(100%) brightness(10%);
        }
    }

    form {
        width: 100%;
        display: grid;
        grid-template-rows: auto auto;
        align-items: center;
        gap: 1rem;

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
    }

    .rating,
    .review {
        display: flex;
        padding: 2rem;

        @media (max-width: 30rem) {
            padding: 2rem 1.5rem;
        }
    }

    .rating {
        // TODO: Change background color on input change
        background-color: ${accentColor};
        flex-direction: column;
        justify-content: center;
        transition: background-color 0.3s ease-in-out;

        h4 {
            font-weight: normal;
            font-size: clamp(0.8rem, 2vw, 1.25rem);
            margin-bottom: -0.5rem;
        }

        .ratingInputContainer {
            display: flex;
            input[type="number"] {
                flex: 1;
                padding: 1rem 1rem;
                font-size: clamp(1.5rem, 3vw, 3rem);
                font-weight: 900;
                text-align: center;
                transition: box-shadow 0.2s ease-in-out;
                &:focus {
                    box-shadow: 0 0 25px 5px rgba(0, 0, 0, 0.2);
                }
            }
        }

        &.GreenBG {
            background-color: ${green} !important;
        }
        &.YellowBG {
            background-color: ${yellow} !important;
        }
        &.RedBG {
            background-color: ${red} !important;
        }
    }

    .review {
        background-color: ${blueColor};
        justify-content: stretch;
        align-items: center;
        form {
            textarea {
                color: ${blueColor};
                resize: vertical;
                height: 7rem;
                padding: 0.75rem;
                font-size: clamp(0.7rem, 1.25vw, 1rem);
                transition: box-shadow 0.2s ease-in-out;
                &:focus {
                    box-shadow: 0 0 25px 5px rgba(0, 0, 0, 0.35);
                }
            }
        }
    }

    .errorText {
        font-size: 1rem;
        width: 100%;
    }
`;

class AlbumPageReviewForm extends Component {
    state = { data: { rating: "", review: "" }, errors: {} };

    schema = {
        rating: Joi.number().integer().min(0).max(100).required().label("Rating"),
        review: Joi.string().required().label("Review"),
    };

    validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
    };

    handleRatingChange = ({ currentTarget: input }) => {
        // Change rating form container background color
        const scoreColor = getScoreColor(parseInt(input.value)) || null;
        const ratingContainer = document.getElementById("ratingContainer");
        if (scoreColor) ratingContainer.className = `rating ${scoreColor}BG`;
        else ratingContainer.className = "rating";

        // Validate rating
        const errors = { ...this.state.errors };
        let errorMessage = "";
        if (input.value !== "") {
            errorMessage = this.validateProperty(input);
        }
        if (errorMessage) toast.error(errorMessage);

        this.setState({ rating: input.value, errors });
    };

    handleRating = () => {};

    render() {
        const { errors, data } = this.state;
        return (
            <StyledReviewForm>
                <div className="rating" id="ratingContainer">
                    <form onSubmit={this.handleRating}>
                        <h4>Your Rating</h4>
                        <div className="ratingInputContainer">
                            <input type="number" name="rating" min="0" max="100" onChange={this.handleRatingChange} />
                        </div>
                        <input
                            type="submit"
                            value="Save"
                            disabled={
                                errors["rating"] ? "disabled" : "" //TODO: NOT WORKING DISABLING
                            }
                        />
                    </form>
                </div>
                <div className="review">
                    <form>
                        <textarea placeholder="Leave a review..."></textarea>
                        <input type="submit" value="Save" />
                    </form>
                </div>
            </StyledReviewForm>
        );
    }
}

export default AlbumPageReviewForm;
