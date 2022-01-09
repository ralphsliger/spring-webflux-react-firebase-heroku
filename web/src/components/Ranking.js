import React from "react";

function Ranking({ question }) {
  const average = Math.round(
    question.reviewScores / question.numberOfReviews
  );

  switch (average) {
    case 1:
      return <div>{`\u{1f641}`}</div>;
      break;
    case 2:
      return <div>{`\u{1f606}`}</div>;
      break;
    case 3:
      return <div>{`\u{1f600}`}</div>;
      break;
    default:
      return <div></div>;
  }
}

export default Ranking; 