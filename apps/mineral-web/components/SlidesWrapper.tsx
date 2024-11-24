import { useEffect, useCallback, useState } from 'react';
import introShortcuts from 'components/introShortcuts';
import SlideViewer from 'components/SlideViewer';
import { useShortcuts } from 'hooks/useShortcuts';
import useUIZStore from 'utils/useUIZStore';
import { useQueryParam } from 'hooks/useQueryP';
// import { differenceInISOWeekYears } from 'date-fns';
import { useRouter } from 'next/router';

interface Props {
  slides: string[];
  onDoubleClick: () => void;
  title: string;
}

const SlidesWrapper = (props: Props) => {
  const { toast } = useUIZStore();
  const { slides } = props;
  const { dispatch: dispatchShortcuts } = useShortcuts();
  const router = useRouter();
  const { param: initialCurrentSlide } = useQueryParam('currentSlide');
  const [currentSlide, setCurrentSlide] = useState(1);

  useEffect(() => {
    if (initialCurrentSlide) {
      setCurrentSlide(Number(initialCurrentSlide));
    }
  }, [initialCurrentSlide]);

  const handleSlideNavigation = useCallback(
    (slide: number) => {
      setCurrentSlide(slide);
      router.push({ query: { currentSlide: slide } });
    },
    [router]
  );

  const goToNextSlide = useCallback(() => {
    if (currentSlide >= slides.length) {
      toast('Last slide');
      return;
    }
    handleSlideNavigation(currentSlide + 1);
  }, [currentSlide, handleSlideNavigation, slides?.length, toast]);

  const goToPrevSlide = useCallback(() => {
    if (currentSlide <= 1) {
      toast('First slide');
      return;
    }
    handleSlideNavigation(currentSlide - 1);
  }, [currentSlide, handleSlideNavigation, toast]);

  const keyActionMap = {
    KEY_RIGHT: {
      action: goToNextSlide,
      requiresActivation: false,
    },
    KEY_LEFT: {
      action: goToPrevSlide,
      requiresActivation: false,
    },
  };

  useEffect(() => {
    dispatchShortcuts({
      type: 'set',
      keyActionMap,
      shortcutDescription: introShortcuts,
    });
  }, [dispatchShortcuts, keyActionMap]);

  // const progress = (currentSlide * 100) / slides.length;
  // const progressBar = (
  //   <ProgressBar
  //     slideCount={slides.length}
  //     currentSlideNum={currentSlide}
  //     progressPercent={progress}
  //   />
  // );

  // TO-DO: The router seems a bit slow to pick up the query param so it may be
  // better to start at 0 and then jump to the slide in the url once the router
  // is ready
  if (!router.isReady) {
    return null;
  }

  return (
    <SlideViewer
      onDoubleClick={props.onDoubleClick}
      title={props.title}
      style="wind"
      slides={props.slides}
      currentSlide={currentSlide}
    />
  );
};

export default SlidesWrapper;
