export default function getScoreColor(score) {
    score = parseInt(score);
    if (score <= 100 && score > 74) return "Green";
    if (score <= 74 && score >= 40) return "Yellow";
    if (score < 40 && score >= 0) return "Red";
    return null;
}
