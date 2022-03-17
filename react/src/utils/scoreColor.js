export default function getScoreColor(score) {
    score = parseInt(score);
    if (score <= 100 && score >= 70) return "Green";
    if (score < 70 && score > 45) return "Yellow";
    if (score <= 45 && score >= 0) return "Red";
    return null;
}
