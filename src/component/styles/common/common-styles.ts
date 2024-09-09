import styled from "styled-components"
import { ButtonProps } from "../../common/inputs";
interface ButtonStyledProps {
  ButtonTheme: ButtonProps["color"];
}

export const ButtonStyled = styled.button<ButtonStyledProps>`
  cursor: pointer;
  min-width: 108px;
  height: 38px;
  padding: 0px 8px;
  border: 0;
  box-sizing: border-box;
  box-shadow: -2px 2px 0px rgba(0, 0, 0, 0.25);
  font-size: 14px;
  position: relative;
  
  font-weight: 500;
  line-height: 18px;
  outline: none;
  color: ${(prop) => prop.theme["button-text-color"]};
  background-color: ${(prop) => prop.ButtonTheme === "primary" ? prop.theme["primary-color"] : prop.theme["button-background-color"]};
  
  &:hover {
    color: ${(prop) => prop.theme["button-text-color_hover"]};
    
    &::after {
      content: "";
      box-sizing: border-box;
      position: absolute;
      background: linear-gradient(
        to right,
        ${(prop) => prop.theme["button-text-color"]} 0%,
        ${(prop) => prop.theme["background-secondary"]} 50%,
        ${(prop) => prop.theme["button-text-color"]} 100%
      );
      border-radius: 999px;
      bottom: 6px;
      left: 16px;
      right: 0px;
      width: calc(100% - 32px);
      height: 2px;
    }
  }
`
interface HeroHeaderProps {
  bgColor: string | undefined;
  imagebg: string | undefined;
}
export const HeroHeader = styled.header<HeroHeaderProps>`

  display: flex;
  flex-direction: column;
  align-items: start;
  height: 523px;
  box-sizing: border-box;
  padding: 12px var(--main-padding);
  padding-bottom: 56px;
  border-radius: 16px;
  background-repeat: no-repeat;
  background-position: right center;
  background-size: auto 364px;
  background-color: ${(prop) => prop.bgColor !== null ? prop.bgColor : "#fff"};
  background-image: url(${(prop) => (prop.imagebg !== null && prop.imagebg !== undefined) ? prop.imagebg : "#fff"});

  h1 {
    flex-grow: 1;
    box-sizing: border-box;
    margin: 0px;
    padding: 0px;
    margin-top: 0;
    max-width: min(950px, 60%);
    color: ${(prop) => prop.theme.white};
    font-size: 48px;
    font-weight: 800;
    line-height: 62px;
    align-content: center;
  }

  p {
    margin-top: 20px;
    color: ${(prop) => prop.theme.white};
    font-size: 18px;
    line-height: 22px;
  }
`

export const ItemsColectionsDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;

  h2 {
    color: ${(prop) => prop.theme.white};
    font-size: 24px;
    font-family: "Gelasio";
    font-weight: 800;
    line-height: 32px;
  }

  > div {
    width: auto;
    height: auto;
    background-color: transparent;
    border-radius: 8px;
    border: 3px solid #b9becc;
    box-sizing: border-box;
    padding: 32px;
    button {
      display: block;
      margin: 40px auto 0px;
    }
  }
`

export const CreatorChipDiv = styled.div`

  width: 100%;
  height: 85px;
  background-color: #030303;
  border-radius: 8px;
  border: 2px solid ${(prop) => prop.theme.white};
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 8px;

  img {
    max-width: 54px;
    max-height: 40px;
    border-radius: 50%;
  }

  > div {
    width: 100%;

    h2 {
      color: ${(prop) => prop.theme.white};
      font-size: 1rem;
      line-height: 15px;
    }

    p {
      color: #a09ea3;
      font-size: 0.875rem;
      line-height: 15px;
    }
  }
`

export const ContentCreatorDiv = styled.div`

  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px 24px;
`

export const Chip = styled.div`
  background-color: #b9becc;
  border: ${(prop) => prop.theme.white} solid 2px;
  border-radius: 1rem;
  font-size: 0.875rem;
  display: inline-flex;
  flex-wrap: nowrap;
  width: auto;
  padding: 0.175rem 0.75rem; 
`