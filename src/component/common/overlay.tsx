import { OverlayStyle } from "../styles/common/overlay";

interface OverlayProps {
    children?: React.ReactNode;
}
export const Overlay = ({ children }: OverlayProps) => {
    return (
        <OverlayStyle>
            {children}
        </OverlayStyle>
    )
}
export default Overlay;