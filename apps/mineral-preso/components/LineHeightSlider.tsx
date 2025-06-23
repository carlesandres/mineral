import { cn } from '@/lib/utils';
import { Slider } from './ui/slider';
import { Label } from './ui/label';
import useSettingsStore, { setSetting } from '@/hooks/useSettingsStore';

interface LineHeightSliderProps {
  className?: string;
}

const lineHeightNames = ['XS', 'S', 'M', 'L', 'XL'];
const lineHeights = [1.25, 1.375, 1.5, 1.625, 2];

export const lineHeightToTwMap = {
  1.25: 'leading-[1.25]',
  1.375: 'leading-[1.375]',
  1.5: 'leading-[1.5]',
  1.625: 'leading-[1.625]',
  2: 'leading-[2]',
};

export const LineHeightSlider = (props: LineHeightSliderProps) => {
  const { className, ...rest } = props;
  const settings = useSettingsStore();
  const value = settings.lineHeightRem;

  const index = lineHeights.indexOf(value) ?? 2;
  const selectedName = lineHeightNames[index];

  const handleValueChange = (value: number[]) => {
    const newValue = lineHeights[value[0]];
    setSetting('lineHeightRem', newValue);
  };

  return (
    <div className={cn('my-6', className)}>
      <Label className="mb-3">{`Line height:`}</Label>
      <div className="flex items-center gap-2">
        <Slider
          className="max-w-[100px]"
          value={[index]}
          max={4}
          step={1}
          {...rest}
          onValueChange={handleValueChange}
        />
        <span>{selectedName}</span>
      </div>
    </div>
  );
};
