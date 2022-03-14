import React from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";

const ReviewFormRating = ({ data, setData, onSave, changeRatingContainerColor }) => {
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

        // Change rating container background color
        changeRatingContainerColor(input.value);

        // Validate rating
        let errorMessage = "";
        if (input.value !== "") errorMessage = validateProperty(input, schema);
        if (errorMessage) toast.error(errorMessage);

        onSave(newData);
    };
    return (
        <div className="rating" id="ratingContainer">
            <form>
                <h4>Your Rating</h4>
                <div className="ratingInputContainer">
                    <input type="number" name="rating" min="0" max="100" value={data.rating} onChange={handleRating} />
                </div>
            </form>
        </div>
    );
};

export default ReviewFormRating;
