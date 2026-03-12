// /src/component/styles/common/uploadArea.ts
import styled from "styled-components";

export const UploadWrapper = styled.div`
  border: 2px dashed ${(prop) => prop.theme.colors.border_default};
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  border-radius: ${(prop) => prop.theme.borderRadius.mediumX1};
  background-color: ${(prop) => prop.theme.colors.background_secondary};
  transition: background-color 0.3s;
  color: ${(prop) => prop.theme.colors.text_hover};
  &:hover {
    background-color: ${(prop) => prop.theme.colors.background_card};
  }
`;

export const FileItem = styled.div`
  display: grid;
  max-width: 100%;
  overflow: scroll;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    "picture description"
    "picture description"
    "progress-actions progress-actions";
  justify-content: space-between;
  align-items: center;
  margin-top: 0rem;
  padding: 0.3rem;
  background: ${(prop) => prop.theme.colors.background_primary};
  border: 1px solid ${(prop) => prop.theme.colors.border_default};
  border-radius: ${(prop) => prop.theme.borderRadius.small};
  gap: ${(prop) => prop.theme.spacings.min};

  .picture {
    grid-area: picture;
    height: 48px;
    width: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 50%;
  }

  .description {
    grid-area: description;
    max-width: 100%;
    height: auto;
    width: 100%;
  }

  .progress-actions-holder {
    grid-area: progress-actions;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 8px;

    .actions {
      display: flex;
      gap: ${(prop) => prop.theme.spacings.small};
      align-items: center;
      justify-content: start;
      align-self: normal;

      svg {
        cursor: pointer;
      }
    }
  }
`;


export const ProgressBar = styled.div.withConfig({
  shouldForwardProp: (prop) => !['progress'].includes(prop),
}).attrs<{ progress: number }>((props) => ({
  style: {
    '--progress-width': `${props.progress}%`,
  } as React.CSSProperties,
}))`
  height: 8px;
  width: 100%;
  background: ${(prop) => prop.theme.colors.background_card};
  border: 2px solid ${(prop) => prop.theme.colors.button_text_hover};
  border-radius: 4px;
  overflow: hidden;
  margin: 0.5rem 0;
  &::after {
    content: "";
    display: block;
    height: 100%;
    width: var(--progress-width);
    background-color: ${(prop) => prop.theme.colors.primary};
    transition: width 0.3s ease;
  }
`;