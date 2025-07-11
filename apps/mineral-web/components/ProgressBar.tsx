interface ProgressBarProps {
  progressPercent: number;
  currentSlideNum: number;
  slideCount: number;
  itemName?: string;
}

const ProgressBar = ({
  progressPercent,
  currentSlideNum,
  slideCount,
  itemName = 'Slide',
}: ProgressBarProps) => (
  <div className="slide-navigation relative m-2 flex h-8 w-40 items-center overflow-hidden rounded bg-gray-300">
    <style jsx>{`
      .slide-visual-progress {
        width: ${progressPercent}%;
      }
    `}</style>
    <div className="slide-text-progress absolute z-10 flex w-full space-x-2 p-2 text-center">
      <span className="">{itemName}:</span>
      <span className="font-bold">
        {currentSlideNum} / {slideCount}
      </span>
    </div>
    <div className="slide-visual-progress h-full" />
  </div>
);

export default ProgressBar;