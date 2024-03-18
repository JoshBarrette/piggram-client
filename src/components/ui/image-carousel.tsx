import { Card } from "~/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { useEffect, useState } from "react";

export default function ImageCarousel({ imageUrls }: { imageUrls: string[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [selectedArr, setSelectedArr] = useState<boolean[]>([]);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  useEffect(() => {
    if (!api) {
      return;
    }

    const newArr = new Array<boolean>(count).fill(false);
    newArr[current - 1] = true;
    setSelectedArr(newArr);
  }, [current]);

  return (
    <Carousel setApi={setApi} className="w-[500px]">
      <CarouselContent>
        {imageUrls.map((imageUrl, index) => (
          <CarouselItem
            key={index}
            className="flex items-center justify-center"
          >
            <Card className="flex size-[500px] items-center justify-center overflow-hidden rounded-md">
              <img
                src={import.meta.env.VITE_APP_CDN_URL + imageUrl}
                alt={`image ${index}`}
                className="w-full"
              />
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>

      {current !== 1 && <CarouselPrevious className="left-4" />}
      {current !== imageUrls.length && <CarouselNext className="right-4" />}

      {imageUrls.length > 1 && (
        <div className="absolute bottom-3 flex w-full justify-center space-x-1.5">
          {selectedArr.map((sel, i) => (
            <div
              key={i}
              className={`size-2 rounded-full bg-white ${!sel && "opacity-50"}`}
            />
          ))}
        </div>
      )}
    </Carousel>
  );
}
