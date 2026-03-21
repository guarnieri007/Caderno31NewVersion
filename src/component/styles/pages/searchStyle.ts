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
      color: ${({ theme }) => theme.colors.button_text};
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
  transform-origin: left center;
  transform: ${(p) => (p.$open ? "translateX(0)" : "translateX(-100%)")};
  will-change: transform;
  transition: transform 300ms ease;
  
  .content {
    .sidebarHeader 
      {
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
      width: 82%;
      height: 100dvh;
      background: ${({ theme }) => theme.colors.background_primary};
      overflow-y: auto;
      color: ${({ theme }) => theme.colors.text};
      padding: 0px;
      margin: 0px;
    }  
    
    .fieldSelector {
      display: flex;
      flex-direction: column;
      padding: ${({ theme }) => theme.spacings.normal};
      padding-bottom: ${({ theme }) => theme.spacings.biger};
      gap: ${({ theme }) => theme.spacings.biger};
      .section {
        display: flex;
        flex-direction: column;
        gap: ${({ theme }) => theme.spacings.reduced};
        
        .optionItem {
          display: flex;
          flex-direction: row;
          align-content: center;
          align-items: center;
          gap: ${({ theme }) => theme.spacings.reduced};
          cursor: pointer;
          
          .checkBox{
            display: flex;
            flex-direction: row;
            flex-shrink: 0;
            align-items: center;
            justify-content: center;
            height: 24px;
            width: 24px;
            border: 2px ${({ theme }) => theme.colors.border_default} solid;
            border-radius: ${({ theme }) => theme.borderRadius.small};
          }
          span {
            flex: 1;
            min-width: 0;
            line-height: 1;
            white-space: nowrap;                /* Precisa definir para ter o ellipsis em uma linha somente */
            overflow: hidden;                   /* Esconde o texto que exceder o tamanho */
            text-overflow: ellipsis;            /* Exibe os três pontinhos */
          }
        }
      }
    }
`;

