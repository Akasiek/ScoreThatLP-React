import React, { useState, useContext } from "react";

import { ReloadContext } from "../albumPage";
import { getReviewerAlbumRating, saveReview, deleteReview, createReview } from "../../../services/reviewService";

const ReviewFormReviewText = ({ data, setData, saveUserReview }) => {
    const [savingPrompt, setSavingPrompt] = useState(null);
    const [timer, setTimer] = useState(null);
    const [reload, setReload] = useContext(ReloadContext);

    const handleReview = ({ currentTarget: textarea }) => {
        // Control input
        const newData = { ...data };
        newData.review = textarea.value;
        setData(newData);

        saveUserReview(newData, timer, setTimer, setSavingPrompt, 2000);
    };
    return (
        <div className="review">
            <form>
                <h4>Your review</h4>
                <textarea placeholder="Leave a review..." value={data.review} onChange={handleReview}></textarea>
                <p className="savingPrompt">{savingPrompt}</p>
            </form>
        </div>
    );
};

export default ReviewFormReviewText;
