import ImageComponent from "./ImageComponent";
import Logo from "../assets/eyeball.png";
import styled from "styled-components";

const HeaderContainer = styled.div`
  display: flex;
  align-items : center ;
  gap: 24px;
  /* background-color: ${({ theme }) => theme.colors.tileBackground}; */
  background-color: #5c5c5c7d;
  border-radius: 8px;
  padding: 10px 10px 5px 10px;
  justify-content : space-between;
  width : 650px;
  margin : auto;
`;

const TitleStyle = styled.h1`
  font-family: "Orbitron", sans-serif;
  letter-spacing: 0.5em; /* Increases space between letters */
  padding-left: 10px;
  text-transform: uppercase;
  color: #e4e7ea;
`;

const Header = ( { name }) => {
  return (
      <HeaderContainer>
        <ImageComponent
          src={Logo}
          alt="Sample Image"
          width="100px"
          height="100px"
        />
        <TitleStyle>{name}</TitleStyle>
      </HeaderContainer>
  );
};

export default Header;
