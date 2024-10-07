import styled from "styled-components";

export const CarrouselMainDiv = styled.div`
    width: 100%;
    height: auto;
    .content {
        display: flex;
        flex-direction: row;

        .carrousel-item {
            width: 100%;
        }
    }
    .navegation {
        padding-top: 0px;
        display: flex;
        flex-direction: row;

        span {
            margin: 0px 8px;
            min-width: 80px;
            text-align: center;
            line-height: 33px;
        }
        button {
            padding: 6px 8px;
            height: min-content;
        }
        button.previous-button {
            margin-left: auto;
        }
        button.next-button {
            margin-right: auto;
        }
    }
`;