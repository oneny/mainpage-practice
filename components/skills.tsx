import React, { useContext, useRef } from "react";
import s from "../styles/skills.module.css";
import { ScrollContext } from "../utils/scroll-observer";

// Animations for Skills
const opacityForBlock = (sectionProgress: number, blockNo: number) => {
  const progress = sectionProgress - blockNo;
  if (progress >= 0 && progress < 1) return 1;
  return 0.2;
};

const Skills: React.FC = () => {
  const { scrollY } = useContext(ScrollContext);
  const refContainer = useRef<HTMLDivElement>(null);

  const numOfPages = 3;
  let progress = 0;

  const { current: elContainer } = refContainer; // destructuring
  if (elContainer) {
    console.log("elContainer", elContainer);
    // clientHeight -> 본문 높이, offsetTop -> 자식 상단에서 부모 상단까지의 높이
    const { clientHeight, offsetTop } = elContainer;
    const screenH = window.innerHeight; // 사용자 브라우저의 높이
    const halfH = screenH / 2; // 브라우저 높이 반
    console.log('halfH', halfH);
    console.log('halfH - screenH', (halfH - screenH) / clientHeight);
    console.log('halfH + scrollY - offsetTop', (halfH + scrollY - offsetTop) / clientHeight);
    console.log('clientHeight + halfH', (clientHeight + halfH) / clientHeight)
    const percentY =
      Math.min(
        clientHeight + halfH,
        Math.max(-screenH, scrollY - offsetTop) + halfH
      ) / clientHeight; // 본문 높이
    console.log('percentY * numOfPages', percentY * numOfPages)
    progress = Math.min(numOfPages - 0.5, Math.max(0.5, percentY * numOfPages));
  }

  return (
    <div ref={refContainer} className="bg-black text-white">
      <div className="min-h-screen max-w-5xl mx-auto px-10 lg:px-20 py-24 md:py-28 lg:py-36 flex flex-col justify-center items-center text-4xl md:text-6xl lg:text-7xl tracking-tight font-semibold">
        <div className="leading-[1.15]">
          <div
            className={s.skillText}
            style={{
              opacity: opacityForBlock(progress, 0),
            }}
          >
            We know our tools inside out.
          </div>
          <span
            className={`${s.skillText} inline-block after:content-['_']`}
            style={{
              opacity: opacityForBlock(progress, 1),
            }}
          >
            Our team has contributed 123 commits to React Native core, powering
            thousands of apps worldwide.
          </span>
          <span
            className={`${s.skillText} inline-block`}
            style={{
              opacity: opacityForBlock(progress, 2),
            }}
          >
            We&apos;re maintaining some of the most popular open-source
            projects, with over 30 million downloads
          </span>
        </div>
      </div>
    </div>
  );
};

export default Skills;