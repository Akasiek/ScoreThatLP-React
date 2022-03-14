export default function getScoreColor(score) {
    score = parseInt(score);
    if (score <= 100 && score > 65) return "Green";
    if (score <= 65 && score > 36) return "Yellow";
    if (score <= 36 && score >= 0) return "Red";
    return null;
}
