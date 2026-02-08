import styled, { keyframes } from "styled-components";
import { ButtonProps } from "../../common/button";
interface ButtonStyledProps {
  button_theme: ButtonProps["color"];
  width: string | undefined;
  clicable: boolean;
}

export const ButtonStyled = styled.button.withConfig({
  shouldForwardProp: (prop) => !['clicable'].includes(prop),
})<ButtonStyledProps>`
  min-width: min(60px, 100%);
  height: auto;
  padding: 4px 8px;
  border: 0;
  box-sizing: border-box;
  box-shadow: -2px 2px 0px rgba(0, 0, 0, 0.25);
  font-size: 14px;
  position: relative;
  display: inline-flex;
  align-items: center;
  width: ${({ width }) => width || "auto"};
  justify-content: center;
  border-radius: ${({ theme }) => theme.spacings.min};
  
  font-weight: 500;
  line-height: 18px;
  outline: none;
  width: ${(prop) => prop.width !== null ? prop.width : "initial"};
  color: ${(prop) => prop.theme.colors.button_text};
  background-color: ${(prop) => prop.button_theme === "primary" ? prop.theme.colors.primary : prop.theme.colors.button_background};
  
  &:hover, &:focus {
    cursor: ${(prop) => prop.clicable ? "pointer" : "not-allowed"};
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
      bottom: 4px;
      left: 16px;
      right: 0px;
      width: calc(100% - 32px);
      height: 2px;
    }
  }
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.span`
  width: 8px;
  height: 8px;
  border: 3px solid transparent;
  border-top: 3px solid rgba(255,255,255,0.7);
  border-right: 3px solid #fff;
  border-radius: 50%;
  animation: ${spin} 1.2s cubic-bezier(0.39, 0.475, 0.365, 0.665) infinite;
  display: inline-block;
  margin: 0px !important;
`;

interface HeroHeaderProps {
  bg_color: string | undefined;
  bg_image: string | undefined;
}
export const HeroHeader = styled.header.withConfig({
  shouldForwardProp: (prop) => !['bg_color', 'bg_image'].includes(prop),
})<HeroHeaderProps>`

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
background-color: ${(prop) => prop.bg_color !== null ? prop.bg_color : "#fff"};
background-image: url(${(prop) => (prop.bg_image !== null && prop.bg_image !== undefined) ? prop.bg_image : "#fff"});

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
    
    font-weight: 800;
    line-height: 32px;
  }

  .containerButton {
    display: flex;
    height: auto;
    width: 100%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    min-height: 80px;
  }

  @media (max-width: 768px) {
    
    h2 {
      text-align: center;
    }
  }
  
`;

export const CreatorChipDiv = styled.div`

  width: 100%;
  max-width: 100%;
  height: 105px;
  background-color: #030303;
  border-radius: 8px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  padding: 8px;
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

  @media (max-width: 768px) {
    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
    }    
  }

`;

interface RowsLines {
  number_items_uhd?: number;
  number_items_hd?: number;
  number_items_mobile_turned?: number;
  number_items_mobile?: number;
}

export const ContentCreatorDiv = styled.div.withConfig({
  shouldForwardProp: (prop) => !['number_items_uhd', 'number_items_hd', 'number_items_mobile_turned', 'number_items_mobile'].includes(prop),
})<RowsLines>`

  width: 100%;
  display: grid;
  grid-template-columns: repeat(${(prop) => prop.number_items_uhd ? prop.number_items_uhd : 4}, 1fr);
  gap: ${(prop) => prop.theme.spacings.big};
  row-gap: ${(prop) => prop.theme.spacings["main-padding"]};
  overflow-y: auto;
  padding-bottom: 24px;
  @media (max-width: 1081px) {
    grid-template-columns: repeat(${(prop) => prop.number_items_hd ? prop.number_items_hd : 3}, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(${(prop) => prop.number_items_mobile_turned ? prop.number_items_mobile_turned : 1}, 1fr);
  }
  @media (max-width: 430px) {
    grid-template-columns: repeat(${(prop) => prop.number_items_mobile ? prop.number_items_mobile : 1}, 1fr);
  }

`;

interface ChipProps {
  bg_color: string | undefined;
  text_color: string | undefined;
}

export const Chip = styled.div.withConfig({
  shouldForwardProp: (prop) => !['bg_color', 'text_color'].includes(prop),
})<ChipProps>`
  background-color: ${(prop) => prop.bg_color ? prop.bg_color : prop.theme.colors.text};
  border: ${(prop) => prop.text_color ? prop.text_color : prop.theme.colors.button_text_hover} solid 2px;
  border-radius: 1rem;
  font-size: 0.65rem;
  display: inline-flex;
  flex-wrap: nowrap;
  width: fit-content;
  padding: 0 0.6rem;
  color: ${(prop) => prop.text_color ? prop.text_color : prop.theme.colors.button_text_hover};
  user-select: none;
  line-height: 1.75rem;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0 0.4rem;
    line-height: 1.65rem;
  }

`;