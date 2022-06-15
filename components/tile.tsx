import React, { useRef, useContext } from "react";
import { ScrollContext } from "../utils/scroll-observer";

interface WrapperProps {
  children: React.ReactNode;
  numOfPages: number;
}

interface TileContextValue {
  numOfPages: number;
  currentPage: number;
}

interface TileBackgroundValue {
  children: React.ReactNode;
}

export const TileContext = React.createContext<TileContextValue>({
  numOfPages: 0,
  currentPage: 0,
});

export const TileWrapper: React.FC<WrapperProps> = ({
  children,
  numOfPages, // 3
}) => {
  const { scrollY } = useContext(ScrollContext);
  const refContainer = useRef<HTMLDivElement>(null);

  let currentPage = 0;

  const { current: elContainer } = refContainer;
  if (elContainer) {
    // clientHeight -> 본문 높이, offsetTop -> title 상단으로부터 부모상단까지 높이
    // window.innerHeight -> 사용자 브라우저 높이(* halfH는 그의 반 크기)
    const { clientHeight, offsetTop } = elContainer;
    const screenH = window.innerHeight;
    console.log("window.innerHeight22", screenH);
    const halfH = screenH / 2;
    const percentY =
      Math.min(
        clientHeight + halfH,
        Math.max(-screenH, scrollY - offsetTop) + halfH
      ) / clientHeight;
    currentPage = percentY * numOfPages;
  }

  return (
    <TileContext.Provider value={{ numOfPages, currentPage }}>
      <div
        ref={refContainer}
        className="relative bg-black text-white"
        style={{
          height: numOfPages * 100 + "vh",
        }}
      >
        {children}
      </div>
    </TileContext.Provider>
  );
};

export const TileBackground: React.FC<TileBackgroundValue> = ({ children }) => (
  <div className="absolute h-full w-full">{children}</div>
);

export const TileContent: React.FC<TileBackgroundValue> = ({ children }) => (
  <div className="sticky top-0 h-screen overflow-hidden">{children}</div>
);

interface Props {
  page: number;
  renderContent: (props: { progress: number }) => any;
}

export const Tile: React.FC<Props> = ({ page, renderContent }) => {
  const { currentPage, numOfPages } = useContext(TileContext);
  const progress = Math.max(0, currentPage - page);
  const refContainer = useRef<HTMLDivElement>(null);

  // progress는 해당 컴포넌트가 브라우저의 반을 차지하기 시작하면서 부터 증가
  // 0.25 -> 즉, 컴포넌트를 브라우저 반에서 8% 정도 올리면 opacity: 1이 됨
  let opacity = Math.min(1, Math.max(0, progress * 4));
  // progress가 1.5이면 해당 컴포넌트가 브라우저에서 다 내려간 것 -> 0.85는 반 좀 더 되게
  if (progress > 0.85 && page < numOfPages - 1) {
    // 0.85에서 1 -> 즉 컴포넌트를 0.15(3%)만 올려도 사라지지만 다음 Tile 컴포넌트가 보이기 시작
    opacity = Math.max(0, (1.0 - progress) * 4);
  }

  return (
    <div
      ref={refContainer}
      className="absolute top-0 w-full"
      style={{
        pointerEvents: progress <= 0 || progress >= 1 ? "none" : undefined,
        opacity,
      }}
    >
      {renderContent({ progress })}
    </div>
  );
};
