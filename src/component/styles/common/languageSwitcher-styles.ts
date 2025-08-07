import styled from 'styled-components';

export const LanguageSwitcherStyles = styled.div`

    display: flex;
    gap: 8px;
    height: 100%;
    align-items: center;

    @media (max-width: 768px) {
        justify-content: center;
        flex-wrap: wrap;
        height: auto;
    }
`
