import React from "react";
import { motion } from "motion/react";
import "./Marquee.css";

const Marquee = () => {
  const logo = [
    "/aws.svg",
    "/css.svg",
    "/docker.svg",
    "/git.svg",
    "/html.svg",
    "/js.svg",
    "/leapfrog.svg",
    "/node.svg",
    "/python.svg",
    "/react.svg",
    "/tailwind.svg",
  ];
  return (
    <div className="main-container">
      <div className="text">Trusted by over 2,000+ customers</div>
      <div className="border">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          className="flex gap-20">
          {logo.map((image, index) => {
            return (
              <img className="h-40 w-60" src={image} alt="logo" key={index} />
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default Marquee;
