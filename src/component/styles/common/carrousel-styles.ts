import styled from "styled-components";

export const CarrouselMainDiv = styled.div`
  width: 100%;

  .viewport {
    width: 100%;
    overflow: hidden;
  }

 /* =========================
   DESKTOP / DEFAULT (peek dos dois lados + tamanho consistente)
   ========================= */
.track {
  --peek: 56px;
  --gutter: ${(p) => p.theme.spacings.normal};
  --edge: calc(var(--peek) + var(--gutter));

  display: flex;
  overflow-x: auto;
  overflow-y: hidden;

  scroll-snap-type: x mandatory;
  scroll-snap-stop: always;

  gap: ${(p) => p.theme.spacings.big};

  /* Only vertical padding here */
  padding-block: ${(p) => p.theme.spacings["main-padding"]};
  padding-bottom: ${(p) => p.theme.spacings.small};

  /* No horizontal padding; we'll do it via edge spacers */
  padding-inline: 0;

  /* Tell snap to consider the edge spacing too (helps a lot) */
  scroll-padding-inline: var(--edge);

  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  overscroll-behavior-x: contain;
  -webkit-overflow-scrolling: touch;

  box-sizing: border-box;
}

/* Bigger spacers = the "fake neighbor" on both ends + gutter */
.track::before,
.track::after {
  content: "";
  flex: 0 0 var(--edge);
}

/* Slides remain the same width, always */
.track > * {
  scroll-snap-align: center;

  flex: 0 0 calc(100% - (2 * var(--peek)));
  min-width: calc(100% - (2 * var(--peek)));

  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: stretch;
}

.track > * > * {
  width: 100%;
  box-sizing: border-box;
}


  .navegation {
    padding-top: 0px;
    display: flex;
    flex-direction: row;
    gap: ${(p) => p.theme.spacings.normal};

    span {
      margin: 0px 8px;
      min-width: 80px;
      text-align: center;
      line-height: 33px;
      pointer-events: none;
      user-select: none;
    }

    button {
      padding: 6px ${(prop) => prop.theme.spacings.small};
      height: min-content;
      line-height: inherit;
    }

    button:hover {
      cursor: pointer;
    }

    button.previous-button {
      margin-left: auto;
    }

    button.next-button {
      margin-right: auto;
    }
  }

  /* =========================
     MOBILE (peek nos dois lados + centralização estável)
     ========================= */
  @media (max-width: 768px) {
    .track {
      /* You can tweak peek independently on mobile */
      --peek: 40px;

      /* Remove desktop padding strategy */
      padding: 0;
      scroll-padding-left: 0;
      scroll-padding-right: 0;

      /* Keep only vertical padding if you want */
      padding-block: ${(p) => p.theme.spacings.normal};

      /* gap often needs to be smaller on mobile */
      gap: ${(p) => p.theme.spacings.normal};
      scroll-snap-stop: always;
    }

    /* Enable spacers only on mobile */
    .track::before,
    .track::after {
      content: "";
      flex: 0 0 var(--peek);
    }

    .track > * {
      /* Mobile: real peeks both sides */
      scroll-snap-align: center;

      flex: 0 0 calc(100% - (2 * var(--peek)));
      min-width: calc(100% - (2 * var(--peek)));

      /* Center hero inside wrapper (helps with "looks off") */
      display: flex;
      justify-content: center;
      align-items: stretch;
    }

    .track > * > * {
      width: 100%;
      box-sizing: border-box;
    }
  }
`;
