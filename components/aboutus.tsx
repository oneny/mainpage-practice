import React from "react";
import Member from "./member";

const AboutUs: React.FC = () => {
  return (
    <section className="bg-white flex flex-col py-20 text-3xl md:text-4xl ">
      <div className="container mx-auto px-11">
        <p className="leading-tight max-w-5xl mx-auto text-4xl tracking-tight">
          <strong>We will help you ship better apps, faster. </strong>
          Our team of expert engineers has created the best user experiences in
          some of the most popular apps worldwide.
        </p>
      </div>
      <div className="container mx-auto px-11 text-center mt-28">
        <h2>Our Team</h2>
        <div className="mt-2">the &ldquo;spec-ops&rdquo;</div>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-20">
          <Member id="marc" name="Marc" socialId="@marc" link="#" />
          <Member id="szymon" name="Szymon" socialId="@szymon" link="#" />
          <Member id="thomas" name="Thomas" socialId="@thomas" link="#" />
          <Member id="christoph" name="Christoph" socialId="@christoph" link="#" />
          <Member id="janic" name="Janic" socialId="@janic" link="#" />
          <Member id="catalin" name="Catalin" socialId="@catalin" link="#" />
          <Member id="mo" name="Mo" socialId="@mo" link="#" />
          <Member id="eric" name="Eric" socialId="@eric" link="#" />
          <Member id="matei" name="Matei" socialId="@matei" link="#" />
          <Member id="viktoria" name="Viktoria" socialId="@viktoria" link="#" />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
