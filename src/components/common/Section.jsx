import React from "react";

const Section = ({ title, subtitle, children, name }) => {
  return (
    <div>
      <section
        name={name}
        className="min-h-fit flex flex-col justify-start items-center py-16 px-5 text-center"
      >
        <p className="font-bold text-4xl my-8 text-center text-transparent bg-clip-text  bg-gradient-to-r from-primary to-[#5C24B3]  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 md:text-5xl capitalize ">
          {title}
        </p>
        <p className="max-w-xl font-light text-gray-500 mb-10 text-sm md:text-base ">
          {subtitle}
        </p>

        {children}
      </section>
    </div>
  );
};

export default Section;
