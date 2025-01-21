"use client";

import { fadeIn, textVariant } from "@/lib/motion";
import { motion } from "framer-motion";
import { Tilt } from "react-tilt";
import Image from "next/image";
import { services } from "@/constants";
import { StarWrapper } from "@/hoc";

const ServiceCard = ({ index, title, icon }: { index: number; title: string; icon: string }) => (
  <Tilt className="xs:w-[250px] w-full">
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
    >
      <div className="bg-[#151030] rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col">
        <div className="h-16 w-16 object-contain">
          <Image src={icon} alt={title} height={100} width={100} objectFit="contain" />
        </div>

        <h3 className="text-white text-[20px] font-bold text-center">{title}</h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className="sm:text-[18px] text-[14px] text-blue-100 uppercase tracking-wider">
          Introduction
        </p>
        <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
          Overview.
        </h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-blue-100 text-[17px] max-w-4xl leading-[30px]"
      >
        I&apos;m a skilled full-stack developer with experience in TypeScript, JavaScript, and Go.
        I have expertise in frameworks like React and Node.js. I&apos;m a quick learner and
        collaborate closely with clients to create efficient, scalable, and user-friendly solutions
        that solve real-world problems. Let&apos;s work together to bring your ideas to life!
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default StarWrapper(About, "about");
