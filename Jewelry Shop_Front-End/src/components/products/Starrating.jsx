import React, { useState } from "react";
import styled from "styled-components";

const Controller = styled.div`
  .on {
    color: #000;
  }
  .off {
    color: #ccc;
  }
`;
const Button = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`;

const StarRating = ({ value, onChange }) => {
  const [hover, setHover] = useState(0);

  return (
    <Controller className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <Button
            type="button"
            key={index}
            className={index <= (hover || value) ? "on" : "off"}
            onClick={() => onChange(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(value)}
          >
            <span className="star" style={{ fontSize: "30px" }}>
              &#9733;
            </span>
          </Button>
        );
      })}
    </Controller>
  );
};

export default StarRating;
