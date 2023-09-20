export const challengeColor = (question) => {
  if (question?.difficulty === "HARD" || question?.difficulty === "EXTREME") {
    return "card-red";
  } else if (question?.difficulty === "MEDIUM") {
    return "card-blue";
  } else {
    return "card-green";
  }
};
