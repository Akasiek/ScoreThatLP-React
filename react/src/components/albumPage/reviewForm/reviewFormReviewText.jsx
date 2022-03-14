import React from "react";

const ReviewFormReviewText = ({ data, setData, onSave }) => {
    const handleReview = ({ currentTarget: textarea }) => {
        // Control input
        const newData = { ...data };
        newData.review = textarea.value;
        setData(newData);

        onSave(newData);
    };
    return (
        <div className="review">
            <form>
                <h4>Your review</h4>
                <textarea placeholder="Leave a review..." value={data.review} onChange={handleReview}></textarea>
            </form>
        </div>
    );
};

export default ReviewFormReviewText;
