"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface PlatformInfo {
  name: string
  description: string
  imageSrc?: string;
  icon?: React.ReactNode;
}

export function PlatformsCarousel() {
  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )

  const platforms: PlatformInfo[] = [
    {
      name: "LeetCode",
      description: "Master popular problems and patterns",
      imageSrc: "/LeetCode_logo.png"
    },
    {
      name: "HackerRank",
      description: "Practice challenges with detailed solutions",
      imageSrc: "/HackerRank_logo.png"
    },
    {
      name: "CodeSignal",
      description: "Ace technical assessments and interviews",
      imageSrc: "/code_signal_logo.png"
    },
    {
      name: "Codility",
      description: "Prepare for in-depth technical screenings",
      imageSrc: "/codility_logo.png"
    },
    {
      name: "Top Companies",
      description: "FAANG and startup interview preparation",
      imageSrc: "/trophy.png"
    },
    {
      name: "AlgoExpert",
      description: "Structured learning and practice",
      imageSrc: "/algoexpert_logo.jpeg"
    },
    {
      name: "InterviewBit",
      description: "Company-specific interview preparation",
      imageSrc: "/interviewbit_logo.png"
    }
  ];

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[autoplayPlugin.current]}
      className="w-full"
    >
      <CarouselContent className="-ml-4">
        {platforms.map((platform, index) => (
          <CarouselItem key={index} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <div className="flex flex-col items-center p-6 bg-gray-100 dark:bg-zinc-900 border border-border rounded-lg hover:shadow-md transition-shadow h-full">
                <div className="w-16 h-16 mb-4 flex items-center justify-center">
                  {platform.imageSrc ? (
                    <img 
                      src={platform.imageSrc} 
                      alt={`${platform.name} logo`} 
                      className="h-12 w-auto object-contain" 
                    />
                  ) : platform.icon}
                </div>
                <h3 className="text-lg font-semibold">{platform.name}</h3>
                <p className="text-sm text-muted-foreground text-center mt-2">
                  {platform.description}
                </p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex justify-center mt-8">
        <CarouselPrevious className="static rounded-full mr-2" />
        <CarouselNext className="static rounded-full ml-2" />
      </div>
    </Carousel>
  )
}