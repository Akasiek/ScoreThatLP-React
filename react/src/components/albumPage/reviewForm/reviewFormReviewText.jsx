import React, { useState } from "react";

const ReviewFormReviewText = ({ data, setData, saveUserReview }) => {
    const [savingPrompt, setSavingPrompt] = useState(null);
    const [timer, setTimer] = useState(null);

    const handleReview = ({ currentTarget: textarea }) => {
        // Control input
        const newData = { ...data };
        newData.review = textarea.value;
        setData(newData);

        setSavingPrompt(null);
        saveUserReview(newData, timer, setTimer, setSavingPrompt, 1000);
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
