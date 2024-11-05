
import React from 'react';
import styled from 'styled-components';


const ImageContainer  = styled.div`

`;

// Styled component for the image, with dynamic sizing based on props
const StyledImage = styled.img`
  width: ${(props) => props.width || '100px'};
  height: ${(props) => props.height || '100px'};
  object-fit: cover; /* Ensures the image maintains aspect ratio */
`;

const ImageComponent = ({ src, alt, width, height }) => (
    <ImageContainer>
      <StyledImage src={src} alt={alt} width={width} height={height} />
    </ImageContainer>
  );

export default ImageComponent;