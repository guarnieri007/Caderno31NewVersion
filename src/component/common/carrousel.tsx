import React, { ReactElement } from "react";
import { CarrouselMainDiv } from "../styles/common/carrousel-styles";
import { CarrouselProps } from "../../interfaces";
import Icon from "../icons/icon";
import { UIIcons } from "../icons";
import { useTheme } from "styled-components";
import { Button } from "./button";

export const Carrousel = ({ children }: CarrouselProps): ReactElement => {
    const childrenArray = React.Children.toArray(children);
    const trackRef = React.useRef<HTMLDivElement>(null);

    // Animation config
    const ANIMATION_MS = 800; // try 900-1400 for a visible slide
    const EPS = 0.5;
    
    // Importing the theme
    const theme = useTheme();

    // Keep track of the current animation so we can cancel it
    const rafIdRef = React.useRef<number | null>(null);

    const getSlides = () => {
        const track = trackRef.current;
        if (!track) return [];
        return Array.from(track.querySelectorAll<HTMLElement>("[data-slide='1']"));
    };

    const getActiveIndex = () => {
        const track = trackRef.current;
        if (!track) return 0;

        const slides = getSlides();
        if (!slides.length) return 0;

        const trackRect = track.getBoundingClientRect();
        const trackCenter = trackRect.left + trackRect.width / 2;

        let bestIdx = 0;
        let bestDist = Number.POSITIVE_INFINITY;

        slides.forEach((el, idx) => {
            const r = el.getBoundingClientRect();
            const center = r.left + r.width / 2;
            const dist = Math.abs(center - trackCenter);

            if (dist < bestDist) {
                bestDist = dist;
                bestIdx = idx;
            }
        });

        return bestIdx;
    };

    const easeInOutCubic = (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const cancelAnimation = () => {
        if (rafIdRef.current != null) {
            cancelAnimationFrame(rafIdRef.current);
            rafIdRef.current = null;
        }
    };

    type ScrollSnapStop = "normal" | "always";
    type SnapStyle = CSSStyleDeclaration & { scrollSnapStop?: ScrollSnapStop };

    const animateScrollTo = (element: HTMLElement, to: number, duration: number) => {
        cancelAnimation();

        const start = element.scrollLeft;
        const change = to - start;
        if (Math.abs(change) < EPS) return;

        // IMPORTANT: disable snap during animation (desktop browsers can "fight" the scroll)
        const style = element.style as SnapStyle;

        const prevSnapType = style.scrollSnapType;
        const prevSnapStop = style.scrollSnapStop;

        style.scrollSnapType = "none";
        style.scrollSnapStop = "normal";

        const startTime = performance.now();

        const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeInOutCubic(progress);

            element.scrollLeft = start + change * eased;

            if (progress < 1) {
                rafIdRef.current = requestAnimationFrame(tick);
                return;
            }

            element.scrollLeft = to;

            // Re-enable snap AFTER the animation completes
            style.scrollSnapType = prevSnapType;
            style.scrollSnapStop = prevSnapStop;

            rafIdRef.current = null;
        };

        rafIdRef.current = requestAnimationFrame(tick);
    };

    const scrollToIndex = (idx: number) => {
        const track = trackRef.current;
        if (!track) return;

        const slides = getSlides();
        if (!slides.length) return;

        const clamped = Math.max(0, Math.min(idx, slides.length - 1));
        const target = slides[clamped];

        const trackRect = track.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();

        // ScrollLeft needed to center the target slide inside the track viewport
        const targetScrollLeft =
            track.scrollLeft +
            (targetRect.left + targetRect.width / 2) -
            (trackRect.left + trackRect.width / 2);

        // Clamp to valid range
        const maxScrollLeft = track.scrollWidth - track.clientWidth;
        const clampedScrollLeft = Math.max(0, Math.min(targetScrollLeft, maxScrollLeft));

        animateScrollTo(track, clampedScrollLeft, ANIMATION_MS);
    };

    const scroll = (direction: "left" | "right") => {
        const slides = getSlides();
        if (!slides.length) return;

        const current = getActiveIndex();
        const next = direction === "right" ? current + 1 : current - 1;

        if (next < 0) return scrollToIndex(slides.length - 1);
        if (next >= slides.length) return scrollToIndex(0);

        scrollToIndex(next);
    };

    // Cleanup on unmount
    React.useEffect(() => {
        return () => cancelAnimation();
    }, []);

    return (
        <CarrouselMainDiv>
            {childrenArray.length > 0 && (
                <div className="viewport">
                    <div className="track" ref={trackRef}>
                        {childrenArray.map((child, i) => (
                            <div key={i} data-slide="1">
                                {child}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="defaultPadding navegation">
                {childrenArray.length > 1 && (
                    <>
                        <Button className="previous-button" handleOnClick={() => scroll("left")} color="secondary">
                            <Icon icon={UIIcons.ChevronLeft} size={20} color={theme.colors.button_text} />
                        </Button>

                        <Button className="next-button" handleOnClick={() => scroll("right")} color="secondary">
                            <Icon icon={UIIcons.ChevronRight} size={20} color={theme.colors.button_text} />
                        </Button>
                    </>
                )}
            </div>
        </CarrouselMainDiv>
    );
};
