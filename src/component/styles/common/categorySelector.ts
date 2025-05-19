import styled from "styled-components";

export const CategorySelectorStyle = styled.div`
  margin-top: 1rem;

  .dropdown {
    position: relative;
    width: 100%;
  }

  .dropdown-header {
  background-color: #1f242c;
  padding: 0.75rem 1rem;
  border: 1px solid #444;
  border-radius: 8px;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;

  input {
    background: transparent;
    border: none;
    outline: none;
    color: #fff;
    font-size: 1rem;
    flex: 1;
    width: 100%;
    font-family: inherit;

    &::placeholder {
      color: #aaa;
    }

    &:disabled {
      cursor: not-allowed;
      color: #555;
    }
  }

  .icon {
  margin-left: 0.5rem;
  display: flex;
  align-items: center;
  cursor: pointer;

    &.disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
    }
}


  .dropdown-list {
    background-color: #2f343d;
    list-style: none;
    padding: 0;
    margin: 0.5rem 0 0 0;
    border: 1px solid #444;
    border-radius: 8px;
    position: absolute;
    width: 100%;
    z-index: 10;
    max-height: 200px;
    overflow-y: auto;

    li {
      padding: 0.75rem 1rem;
      cursor: pointer;
      color: #fff;

      &:hover {
        background-color: #3a404b;
      }
    }
  }

  .chip-container {
    display: flex;
    flex-wrap: wrap;
    margin-top: 0.75rem;
    gap: 0.5rem;
  }

  .chip {
    background-color: #4e5767;
    color: #fff;
    padding: 0.4rem 0.8rem;
    border-radius: 9999px;
    display: flex;
    align-items: center;
    font-size: 0.875rem;

    button {
      background: none;
      border: none;
      color: #fff;
      margin-left: 0.5rem;
      cursor: pointer;
      font-weight: bold;
    }
  }
`;
