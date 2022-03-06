import React, { useContext, useState } from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";

import { ReloadContext } from "../albumPage";
import { getReviewerAlbumRating, saveReview, deleteReview, createReview } from "../../../services/reviewService";

const ReviewFormRating = ({ data, setData, user, album, changeRatingContainerColor }) => {
    const [savingPrompt, setSavingPrompt] = useState(null);
    const [ratingTimer, setRatingTimer] = useState(null);
    const [reload, setReload] = useContext(ReloadContext);

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

        // Save rating
        // Wait 0.8s for user not to press anything. Then start saving.
        clearTimeout(ratingTimer);
        const newTimer = setTimeout(async () => {
            // Check if user has already rated this album
            const { data: reviewData } = await getReviewerAlbumRating(user.id, album.id);

            if (reviewData.length > 0) {
                if (newData.rating !== "") {
                    // If there is a rating and new rating isn't null, update it
                    const promise = saveReview({ rating: newData.rating }, reviewData[0].id);
                    setSavingPrompt("Saving...");
                    const respond = await promise;
                    setSavingPrompt("Saved");
                } else if (newData.rating === "") {
                    // If there is a rating and new rating is null, delete the rating in DB
                    const promise = deleteReview(reviewData[0].id);
                    setSavingPrompt("Saving...");
                    const respond = await promise;
                    setSavingPrompt("Saved");
                }
            } else if (reviewData.length == 0) {
                // If there is no rating, create it
                const promise = createReview({
                    rating: newData.rating,
                    reviewer_id: user.id,
                    album_id: album.id,
                });
                setSavingPrompt("Saving...");
                const respond = await promise;
                setSavingPrompt("Saved");
            }

            // Reload album and reviews info on album page
            setReload(!reload);

            setRatingTimer(null);
        }, 800);
        setRatingTimer(newTimer);
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
