export default function getScoreColor(score) {
    score = parseInt(score);
    if (score <= 100 && score > 60) return "Green";
    if (score <= 60 && score > 35) return "Yellow";
    if (score <= 35 && score >= 0) return "Red";
    return null;
}
