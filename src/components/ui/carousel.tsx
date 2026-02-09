// components/ui/carousel.tsx
import * as React from "react"
import useEmblaCarousel, { type EmblaCarouselType } from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

type CarouselApi = EmblaCarouselType

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  items: React.ReactNode[]
  autoPlay?: boolean
  interval?: number
  showArrows?: boolean
  showDots?: boolean
  loop?: boolean
  draggable?: boolean
  slidesToShow?: number
  spacing?: number
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({
    className,
    items,
    autoPlay = false,
    interval = 5000,
    showArrows = true,
    showDots = true,
    loop = true,
    draggable = true,
    slidesToShow = 1,
    spacing = 16,
    ...props
  }, ref) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
      loop,
      draggable,
      align: "start",
    })
    const [selectedIndex, setSelectedIndex] = React.useState(0)
    const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([])
    const [isAutoPlaying, setIsAutoPlaying] = React.useState(autoPlay)

    const scrollPrev = React.useCallback(() => {
      if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = React.useCallback(() => {
      if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    const scrollTo = React.useCallback(
      (index: number) => {
        if (emblaApi) emblaApi.scrollTo(index)
      },
      [emblaApi]
    )

    const onSelect = React.useCallback((api: CarouselApi) => {
      setSelectedIndex(api.selectedScrollSnap())
    }, [])

    React.useEffect(() => {
      if (!emblaApi) return

      onSelect(emblaApi)
      setScrollSnaps(emblaApi.scrollSnapList())
      emblaApi.on("select", onSelect)

      return () => {
        emblaApi.off("select", onSelect)
      }
    }, [emblaApi, onSelect])

    // Auto-play functionality
    React.useEffect(() => {
      if (!isAutoPlaying || !emblaApi || !loop) return

      const intervalId = setInterval(() => {
        if (emblaApi.canScrollNext()) {
          scrollNext()
        } else {
          scrollTo(0)
        }
      }, interval)

      return () => clearInterval(intervalId)
    }, [isAutoPlaying, emblaApi, interval, loop, scrollNext, scrollTo])

    const toggleAutoPlay = () => setIsAutoPlaying(!isAutoPlaying)

    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        <div className="overflow-hidden" ref={emblaRef}>
          <div
            className="flex"
            style={{ gap: `${spacing}px`, marginLeft: `-${spacing / 2}px` }}
          >
            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex-[0_0_calc(100%/var(--slides-to-show))] min-w-0 pl-[calc(var(--spacing)/2)]"
                style={
                  {
                    "--slides-to-show": slidesToShow,
                    "--spacing": `${spacing}px`,
                  } as React.CSSProperties
                }
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>

        {showArrows && items.length > slidesToShow && (
          <>
            <button
              onClick={scrollPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:scale-110 disabled:opacity-50"
              aria-label="Previous slide"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:scale-110 disabled:opacity-50"
              aria-label="Next slide"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </>
        )}

        {showDots && items.length > 1 && (
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={cn(
                  "h-2 w-2 rounded-full transition-all",
                  index === selectedIndex
                    ? "bg-accent-600 w-8"
                    : "bg-primary-300 hover:bg-primary-400"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {autoPlay && (
          <button
            onClick={toggleAutoPlay}
            className="absolute top-4 right-4 rounded-full bg-white/90 p-2 shadow-lg backdrop-blur-sm"
            aria-label={isAutoPlaying ? "Pause autoplay" : "Play autoplay"}
          >
            {isAutoPlaying ? "⏸️" : "▶️"}
          </button>
        )}
      </div>
    )
  }
)
Carousel.displayName = "Carousel"

// Carousel Item Component
interface CarouselItemProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number
  isActive: boolean
}

export const CarouselItem = React.forwardRef<HTMLDivElement, CarouselItemProps>(
  ({ className, index, isActive, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn("relative", className)}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: isActive ? 1 : 0.7, scale: isActive ? 1 : 0.95 }}
        transition={{ duration: 0.3 }}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)
CarouselItem.displayName = "CarouselItem"

export { Carousel }