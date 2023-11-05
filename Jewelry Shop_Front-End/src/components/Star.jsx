import React from "react";
import StarIcon from "@mui/icons-material/Star";
import styled from "styled-components";

const Container = styled.span``;
const WhiteStar = styled(StarIcon)`
  color: black;
`;

const Star = (props) => {
  const { number } = props;

  const stars = Array.from({ length: 5 }, (v, i) =>
    i < number ? (
      <WhiteStar key={i} />
    ) : (
      <StarIcon key={i} style={{ color: "#c5c3c3" }} />
    )
  );

  return <Container>{stars}</Container>;
};

export default Star;
