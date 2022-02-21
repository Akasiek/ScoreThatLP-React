import moment from "moment";
import _ from "lodash";

export default function sort(content, contentType, sorting) {
    if (contentType === "albums") {
        switch (sorting?.value) {
            case "newest":
                content = _.orderBy(
                    content,
                    (o) => {
                        return moment(o.release_date);
                    },
                    ["desc"]
                );
                break;

            case "oldest":
                content = _.orderBy(
                    content,
                    (o) => {
                        return moment(o.release_date);
                    },
                    ["asc"]
                );
                break;

            case "name-asc":
                content = _.orderBy(
                    content,
                    (o) => {
                        return o.title;
                    },
                    ["asc"]
                );
                break;

            case "name-desc":
                content = _.orderBy(
                    content,
                    (o) => {
                        return o.title;
                    },
                    ["desc"]
                );
                break;

            case "highest-score":
                content = _.orderBy(
                    content,
                    (o) => {
                        return moment(o.overall_score);
                    },
                    ["desc"]
                );
                break;

            case "lowest-score":
                content = _.orderBy(
                    content,
                    (o) => {
                        return o.overall_score;
                    },
                    ["asc"]
                );
                break;

            default:
                content = _.orderBy(
                    content,
                    (o) => {
                        return o.release_date;
                    },
                    ["desc"]
                );
                break;
        }
    }
    if (contentType === "reviews") {
        switch (sorting?.value) {
            case "newest":
                content = _.orderBy(
                    content,
                    (o) => {
                        return moment(o.created_at);
                    },
                    ["desc"]
                );
                break;

            case "oldest":
                content = _.orderBy(
                    content,
                    (o) => {
                        return moment(o.created_at);
                    },
                    ["asc"]
                );
                break;

            case "highest-score":
                content = _.orderBy(
                    content,
                    (o) => {
                        return o.rating;
                    },
                    ["desc"]
                );
                break;

            case "lowest-score":
                content = _.orderBy(
                    content,
                    (o) => {
                        return o.rating;
                    },
                    ["asc"]
                );
                break;

            case "most-liked":
                content = _.orderBy(
                    content,
                    (o) => {
                        return o.likes;
                    },
                    ["desc"]
                );
                break;

            case "least-liked":
                content = _.orderBy(
                    content,
                    (o) => {
                        return o.likes;
                    },
                    ["asc"]
                );
                break;

            default:
                content = _.orderBy(
                    content,
                    (o) => {
                        return moment(o.created_at);
                    },
                    ["desc"]
                );
                break;
        }
    }
    if (contentType === "artists") {
        switch (sorting?.value) {
            case "name-asc":
                content = _.orderBy(
                    content,
                    (o) => {
                        return o.name;
                    },
                    ["asc"]
                );
                break;

            case "name-desc":
                content = _.orderBy(
                    content,
                    (o) => {
                        return o.name;
                    },
                    ["desc"]
                );
                break;

            case "highest-avg-score":
                content = _.orderBy(
                    content,
                    (o) => {
                        return o.average_score;
                    },
                    ["desc"]
                );
                break;

            case "lowest-avg-score":
                content = _.orderBy(
                    content,
                    (o) => {
                        return o.average_score;
                    },
                    ["asc"]
                );
                break;

            default:
                content = _.orderBy(
                    content,
                    (o) => {
                        return o.name;
                    },
                    ["asc"]
                );
                break;
        }
    }
    if (contentType === "ratingAlbums") {
        switch (sorting?.value) {
            case "newest":
                content = _.orderBy(
                    content,
                    (o) => {
                        return moment(o.release_date);
                    },
                    ["desc"]
                );
                break;

            case "oldest":
                content = _.orderBy(
                    content,
                    (o) => {
                        return moment(o.release_date);
                    },
                    ["asc"]
                );
                break;

            case "name-asc":
                content = _.orderBy(
                    content,
                    (o) => {
                        return o.title;
                    },
                    ["asc"]
                );
                break;

            case "name-desc":
                content = _.orderBy(
                    content,
                    (o) => {
                        return o.title;
                    },
                    ["desc"]
                );
                break;

            case "highest-user-score":
                content = _.orderBy(
                    content,
                    (o) => {
                        return o.user_score;
                    },
                    ["desc"]
                );
                break;

            case "lowest-user-score":
                content = _.orderBy(
                    content,
                    (o) => {
                        return o.user_score;
                    },
                    ["asc"]
                );
                break;

            case "latest-rating":
                content = _.orderBy(
                    content,
                    (o) => {
                        return moment(o.review_date);
                    },
                    ["desc"]
                );
                break;

            case "oldest-rating":
                content = _.orderBy(
                    content,
                    (o) => {
                        return moment(o.review_date);
                    },
                    ["asc"]
                );
                break;

            default:
                content = _.orderBy(
                    content,
                    (o) => {
                        return moment(o.review_date);
                    },
                    ["desc"]
                );
                break;
        }
    }
    return content;
}

export function getSortOptions(contentType) {
    if (contentType === "albums") {
        return [
            { value: "newest", label: "Newest" },
            { value: "oldest", label: "Oldest" },
            { value: "name-asc", label: "Name ascending" },
            { value: "name-desc", label: "Name descending" },
            { value: "highest-score", label: "Highest score" },
            { value: "lowest-score", label: "Lowest score" },
        ];
    }

    if (contentType === "artists") {
        return [
            // { value: "popularity", label: "By Popularity" },
            { value: "name-asc", label: "Name ascending" },
            { value: "name-desc", label: "Name descending" },
            { value: "highest-avg-score", label: "Highest average score" },
            { value: "lowest-avg-score", label: "Lowest average score" },
        ];
    }

    if (contentType === "reviews") {
        return [
            { value: "newest", label: "Newest" },
            { value: "oldest", label: "Oldest" },
            { value: "highest-score", label: "Highest score" },
            { value: "lowest-score", label: "Lowest score" },
            { value: "most-liked", label: "Most liked" },
            { value: "least-liked", label: "Least liked" },
        ];
    }

    if (contentType === "ratingAlbums") {
        return [
            { value: "highest-user-score", label: "Highest user score" },
            { value: "lowest-user-score", label: "Lowest user score" },
            { value: "latest-rating", label: "Latest rating" },
            { value: "oldest-rating", label: "Oldest rating" },
            { value: "newest", label: "Newest album" },
            { value: "oldest", label: "Oldest album" },
            { value: "name-asc", label: "Name ascending" },
            { value: "name-desc", label: "Name descending" },
        ];
    }
}
