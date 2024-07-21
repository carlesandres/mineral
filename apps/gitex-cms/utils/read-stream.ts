type Setter = (data: string) => string;

type UpdateCb = (setter: Setter) => void;

export const readStream = async (
  url: string,
  requestOptions: any,
  updateCb: UpdateCb,
) => {
  const response = await fetch(url, requestOptions);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  // This data is a ReadableStream
  const data = response.body;
  if (!data) {
    return;
  }

  const reader = data.getReader();
  const decoder = new TextDecoder();
  let done = false;

  while (!done) {
    const { value, done: doneReading } = await reader.read();
    if (value === undefined) {
      break;
    }
    done = doneReading;
    const newVal = decoder.decode(value);
    updateCb((prev) => prev + newVal);
  }
};
