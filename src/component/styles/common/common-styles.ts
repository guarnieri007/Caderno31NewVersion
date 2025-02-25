import styled from "styled-components";
import { ButtonProps } from "../../common/button";
interface ButtonStyledProps {
  $buttontheme: ButtonProps["color"];
  $width: string | undefined;
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
  width: ${(prop) => prop.$width !== null ? prop.$width : "initial"};
  color: ${(prop) => prop.theme.colors.button_text};
  background-color: ${(prop) => prop.$buttontheme === "primary" ? prop.theme.colors.primary : prop.theme.colors.button_background};
  
  &:hover {
    color: ${(prop) => prop.theme.colors.button_text_hover};
    
    &::after {
      content: "";
      box-sizing: border-box;
      position: absolute;
      background: linear-gradient(
        to right,
        ${(prop) => prop.theme.colors.button_text} 0%,
        ${(prop) => prop.theme.colors.background_secondary} 50%,
        ${(prop) => prop.theme.colors.button_text} 100%
      );
      border-radius: 999px;
      bottom: 6px;
      left: 16px;
      right: 0px;
      width: calc(100% - 32px);
      height: 2px;
    }
  }
`;

interface HeroHeaderProps {
  $bgcolor: string | undefined;
  $imagebg: string | undefined;
}
export const HeroHeader = styled.header<HeroHeaderProps>`

display: flex;
flex-direction: column;
align-items: start;
height: 523px;
box-sizing: border-box;
padding: 12px ${(prop) => prop.theme.spacings["main-padding"]};
padding-bottom: 56px;
border-radius: 16px;
background-repeat: no-repeat;
background-position: right center;
background-size: auto 364px;
border: solid 1px ${(prop) => prop.theme.colors.text};
background-color: ${(prop) => prop.$bgcolor !== null ? prop.$bgcolor : "#fff"};
background-image: url(${(prop) => (prop.$imagebg !== null && prop.$imagebg !== undefined) ? prop.$imagebg : "#fff"});

h1 {
  flex-grow: 1;
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
  margin-top: 0;
  max-width: min(950px, 60%);
  color: ${(prop) => prop.theme.colors.text_hover};
  font-size: 48px;
  font-weight: 800;
  line-height: 62px;
  align-content: center;
  //-webkit-text-stroke: 1px ${(prop) => prop.theme.colors.primary_hover};
  word-spacing: 40%;
}

p {
  margin-top: 20px;
  color: ${(prop) => prop.theme.colors.text_hover};
  font-size: 18px;
  line-height: 22px;
}
@media (max-width: 768px) {
  padding: ${(prop) => prop.theme.spacings.normal};
  height: 360px;
  h1 {
    align-content: normal;
    font-size: 24px;
    line-height: 2rem;
    width: 100%;
    margin-top: ${(prop) => prop.theme.spacings.normal};
    max-width: initial;
    text-align: center;
  }
}

`;

export const ItemsColectionsDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  margin-bottom: 5rem;

  h2 {
    color: ${(prop) => prop.theme.colors.text_hover};
    font-size: 24px;
    font-family: "Gelasio";
    font-weight: 800;
    line-height: 32px;
  }

  @media (max-width: 768px) {
    h2 {
      text-align: center;
    }
  }
  
`;

export const CreatorChipDiv = styled.div`

  width: 100%;
  height: 105px;
  background-color: #030303;
  border-radius: 8px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  padding: 14px;
  border: 1px solid transparent;
  
  &:hover {
    border: 1px solid ${(prop) => prop.theme.colors.text};
  }

  img {
    max-width: 64px;
    max-height: 64px;
    border-radius: 50%;
  }

  > div {
    width: 100%;

    h2 {
      color: ${(prop) => prop.theme.colors.text_hover};
      font-size: 1rem;
      line-height: 1rem;
      display: -webkit-box;               /* Usa o layout flexível baseado em caixas */
      -webkit-box-orient: vertical;       /* Orienta as caixas verticalmente */
      overflow: hidden;                   /* Esconde o texto que exceder o tamanho */
      text-overflow: ellipsis;            /* Exibe os três pontinhos */
      -webkit-line-clamp: 2;              /* Limita a exibição a 3 linhas */
      line-height: 1rem;                   /* Define a altura da linha para ajustar a altura da div */
      max-height: calc(1rem * 2);
    }

    p {
      display: -webkit-box;               /* Usa o layout flexível baseado em caixas */
      -webkit-box-orient: vertical;       /* Orienta as caixas verticalmente */
      overflow: hidden;                   /* Esconde o texto que exceder o tamanho */
      text-overflow: ellipsis;            /* Exibe os três pontinhos */
      -webkit-line-clamp: 1;              /* Limita a exibição a 3 linhas */
      line-height: 1rem;                   /* Define a altura da linha para ajustar a altura da div */
      max-height: calc(1rem * 1);
      color: ${(prop) => prop.theme.colors.text};
      font-size: 0.875rem;
      line-height: 15px;
    }
  }
`;

export const ContentCreatorDiv = styled.div`

  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  overflow-y: auto;
  padding-bottom: 24px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 430px) {
    grid-template-columns: repeat(1, 1fr);
  }

`;

export const Chip = styled.div`
  background-color: ${(prop) => prop.theme.colors.text};
  border: ${(prop) => prop.theme.colors.button_text_hover} solid 2px;
  border-radius: 1rem;
  font-size: 0.75rem;
  display: inline-flex;
  flex-wrap: nowrap;
  width: fit-content;
  padding: 0.175rem 0.75rem;
  color: ${(prop) => prop.theme.colors.button_text_hover};
`;