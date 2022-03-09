import React, { useState } from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";

const ReviewFormRating = ({ data, setData, saveUserReview, changeRatingContainerColor }) => {
    const [savingPrompt, setSavingPrompt] = useState(null);
    const [timer, setTimer] = useState(null);

    const schema = {
        rating: Joi.number().integer().min(0).max(100).required().label("Rating"),
    };

    const validateProperty = ({ name, value }, schema) => {
        const obj = { [name]: value };
        const objSchema = { [name]: schema[name] };
        const { error } = Joi.validate(obj, objSchema);
        return error ? error.details[0].message : null;
    };

    const handleRating = ({ currentTarget: input }) => {
        // Control input
        const newData = { ...data };
        newData.rating = input.value;
        setData(newData);

        setSavingPrompt(null);

        // Change rating container background color
        changeRatingContainerColor(input.value);

        // Validate rating
        let errorMessage = "";
        if (input.value !== "") errorMessage = validateProperty(input, schema);
        if (errorMessage) toast.error(errorMessage);

        saveUserReview(newData, timer, setTimer, setSavingPrompt, 800);
    };
    return (
        <div className="rating" id="ratingContainer">
            <form>
                <h4>Your Rating</h4>
                <div className="ratingInputContainer">
                    <input type="number" name="rating" min="0" max="100" value={data.rating} onChange={handleRating} />
                </div>
                <p className="savingPrompt">{savingPrompt}</p>
            </form>
        </div>
    );
};

export default ReviewFormRating;
