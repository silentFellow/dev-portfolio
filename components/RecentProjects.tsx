"use client";

import { FaLocationArrow } from "react-icons/fa6";

import { projects } from "@/constants";
import { motion } from "framer-motion";
import { Tilt } from "react-tilt";
import { fadeIn } from "@/lib/motion";
import Image from "next/image";
import { Carousel } from "./ui/apple-cards-carousel";

const ProjectCard = ({
  index,
  title,
  desc,
  img,
  link,
  iconLists,
}: {
  index: number;
  title: string;
  desc: string;
  img: string;
  iconLists: string[];
  link: string;
}) => (
  <Tilt className="lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center sm:w-96 w-[80vw] mr-12">
    <div
      style={{
        perspective: "1000px",
        transform: "rotateX(70deg) translateZ(0deg)",
      }}
      className="ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
    >
      <div
        style={{
          transform: "translate(-50%,-50%) rotateX(0deg)",
        }}
        // remove  bg-black
        className="absolute left-1/2 p-4 top-1/2  flex justify-start items-start  rounded-2xl  shadow-[0_8px_16px_rgb(0_0_0/0.4)] border border-white/[0.1] group-hover/pin:border-white/[0.2] transition duration-700 overflow-hidden"
      >
        <motion.div
          variants={fadeIn("right", "spring", index * 0.5, 0.75)}
          initial="initial"
          animate="animate"
          className="relative group/pin z-50  cursor-pointer"
          onClick={() => window.open(link, "_black")}
        >
          <div className="relative flex items-center justify-center sm:w-96 w-[80vw] overflow-hidden h-[20vh] lg:h-[30vh] mb-10">
            <Image src={img} alt="cover" layout="fill" objectFit="cover" className="z-10" />
          </div>

          <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">{title}</h1>

          <p
            className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2"
            style={{
              color: "#BEC1DD",
              margin: "1vh 0",
            }}
          >
            {desc}
          </p>

          <div className="flex items-center justify-between mt-7 mb-3">
            <div className="flex items-center">
              {iconLists.map((icon, index) => (
                <div
                  key={index}
                  className="border border-white-100/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                  style={{
                    transform: `translateX(-${5 * index + 2}px)`,
                  }}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={icon}
                      alt="icon5"
                      layout="fill"
                      objectFit="contain"
                      className="p-2"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center items-center">
              <p className="flex lg:text-xl md:text-xs text-sm text-purple">Check Live Site</p>
              <FaLocationArrow className="ms-3" color="#CBACF9" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </Tilt>
);

const cards = projects.map((project, index) => (
  <ProjectCard key={project.title} index={index} {...project} />
));

const RecentProjects = () => {
  return (
    <div className="py-20">
      <h1 className="heading">
        A small selection of <span className="text-purple">recent projects</span>
      </h1>
      <Carousel items={cards} />
    </div>
  );
};

export default RecentProjects;
