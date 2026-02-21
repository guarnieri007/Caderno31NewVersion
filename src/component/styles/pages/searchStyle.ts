import styled from "styled-components";

export const PageSearchContainer = styled.div`
  width: auto;
  height: auto;
  margin: 0 auto;

  padding: ${(p) => p.theme.spacings.normal} ${(p) => p.theme.spacings.big};

  .filter {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    align-items: center;
    border: none;
    gap: ${(prop) => prop.theme.spacings.normal};
    background-color: ${(prop) => prop.theme.colors.button_background};
    padding: 8px 6px;
    border-radius: 6px;
    cursor: pointer;

    span
    {
      display: flex;
      justify-content: center;
      align-items: center;
      color: ${({theme}) => theme.colors.button_text};
    }
  }
`;

export const MobileSidebar = styled.div<{ $open: boolean }>`
  display: block;
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100dvh;
  background-color: rgba(0,0,0, 0.4);
  z-index: 2;

  
  
  .content {
      .sidebarHeader {
        box-sizing: border-box;
        padding: ${(props) => props.theme.spacings.normal} ${(props) => props.theme.spacings.small};
        display: flex;
        flex-direction: row;
        gap: 8px;

        .titles {
          display: flex;
          flex-grow: 1;
          flex-direction: column;
          gap: ${(props) => props.theme.spacings.small};

          * {
            padding: 0;
            margin: 0;
            text-align: center
          }
          h2 {
            font-size: 20px;
          }
          p {
            font-size: 16px;
            font-style: italic;
          }
        }

        .closeButton{
          cursor: pointer;
        }

      }

    display: block;
    top: 0;
    bottom: 0;
    width: 90%;
    height: 100dvh;
    background: #363434;
    overflow-y: auto;
    color: #5FFFE2;
    padding: 0px;
    margin: 0px;
  }

  transform-origin: left center;
  transform: ${(p) => (p.$open ? "translateX(0)" : "translateX(-100%)")};
  will-change: transform;
  transition: transform 300ms ease;
`;

