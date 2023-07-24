import { useState } from "react";
import { useRouter } from "next/router";
import { useEffectOnce } from "@hooks";
import { Divider } from "@components/common";

const initialUsefulLinks = [
  {
    name: "Competition",
    url: "/",
    target: "_self",
  },
  {
    name: "Code of Conduct",
    url: "https://sliitfoss.org/code-conduct",
    target: "_blank",
  },
  // {
  //     name: 'Source Code',
  //     url: 'https://github.com/sliit-foss/bashaway-landing'
  // },
];

const Footer = () => {
  const [usefulLinks, setUsefulLinks] = useState(initialUsefulLinks);

  const socialLinks = [
    {
      icon: "fb",
      url: "https://www.facebook.com/sliitfoss",
    },
    {
      icon: "insta",
      url: "https://www.instagram.com/sliitfoss/",
    },
    {
      icon: "linkedin",
      url: "https://www.linkedin.com/company/sliit-foss-community/?originalSubdomain=lk",
    },
    {
      icon: "twitter",
      url: "https://twitter.com/fosssliit?lang=en",
    },
    {
      icon: "youtube",
      url: "https://www.youtube.com/channel/UCPPO-QR0Dv13ewjhPsc_I3w/featured",
    },
  ];

  const router = useRouter();

  useEffectOnce(() => {
    if (localStorage.getItem("token")) {
      const cpy = [...usefulLinks];
      cpy.splice(0, 1);
      setUsefulLinks(cpy);
    }
  });

  return (
    <>
      <Divider />
      <div
        className="flex flex-col justify-between p-3 md:p-12  grayscale relative z-[2] md:flex-row"
        id="footer"
      >
        <div className="w-full">
          <div className="flex flex-col justify-center items-center w-full xl:w-10/12 md:pl-24 md:items-center md:justify-start scale-[0.7] relative md:bottom-14">
            <div className="flex justify-start items-center">
              <a href="https://sliitfoss.org" target="_blank" rel="noreferrer">
                <img
                  src="/assets/images/club-logos/foss-logo.svg"
                  className="w-[6.6rem] h-[6.6rem] mx-6"
                />
              </a>
              <a
                href="https://www.facebook.com/sliit.fcsc/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="/assets/images/club-logos/fcsc-logo.png"
                  className="w-32 h-32 mx-6 filter brightness-125"
                />
              </a>
            </div>
            <div className="flex justify-start items-center">
              <a
                href="https://community.mozilla.org/en/groups/mozilla-campus-club-of-sliit/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="/assets/images/club-logos/mozilla-logo.png"
                  className="w-[6.1rem] h-[6.1rem] mx-6 mr-10 mb-3 filter brightness-115"
                />
              </a>
              <a
                href="https://wif-web.web.app"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="/assets/images/club-logos/wif-logo.png"
                  className="w-28 h-28 ml-4 mx-6 relative sm:mb-4"
                />
              </a>
            </div>
            <div className="flex justify-start items-center">
              <a
                href="https://www.facebook.com/csnesc/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="/assets/images/club-logos/csne-logo.png"
                  className="w-[7.2rem] h-[7.2rem] mx-0 ml-4 sm:ml-0 mr-12 mb-3 filter brightness-115"
                />
              </a>
              <a
                href="https://www.facebook.com/sliit.cscs/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="/assets/images/club-logos/cs-logo.png"
                  className="w-20 h-22 ml-4 mx-6 relative mb-8"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center w-full mt-6 md:justify-start md:items-center ">
          <h1 className="mb-8 text-2xl font-semibold text-white">Contact</h1>
          <a
            className="mb-8 text-nav-links-unselected hover:text-primary transition duration-300"
            href="mailto:sllitfoss@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            sllitfoss@gmail.com
          </a>
          <div className="flex justify-start mb-8">
            {socialLinks.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={`/assets/images/social/${link.icon}.svg`}
                  className="w-5 h-5 mx-2 fill-current hover:brightness-200 transition duration-300"
                ></img>
              </a>
            ))}
          </div>
          <h1 className="mb-4 text-2xl font-semibold text-white">
            Visit Us On
          </h1>
          <a
            className="mb-2 text-nav-links-unselected hover:text-primary transition duration-300"
            href="https://sliitfoss.org"
            target="_blank"
            rel="noreferrer"
          >
            sllitfoss.org
          </a>
        </div>
        <div className="flex flex-col items-center justify-end w-full mt-10 md:mt-6 mb-12 md:justify-start md:pr-0 ">
          <h1 className="mb-6 text-2xl font-semibold text-white">
            Useful Links
          </h1>
          {usefulLinks.map((link) => (
            <span
              className="mb-3 text-nav-links-unselected hover:text-primary cursor-pointer transition duration-300"
              key={link.url}
              onClick={() => {
                if (link.target === "_blank") {
                  window.open(link.url, link.target);
                } else {
                  router.push(link.url);
                }
              }}
            >
              {link.name}
            </span>
          ))}
        </div>
      </div>
      <Divider />
      <div className="flex flex-col justify-start px-10 pt-5 pb-6 md:flex-row md:justify-between text-nav-links-unselected md:px-24 relative z-50">
        <span className="text-center md:text-left text-white">
          Copyright © {new Date().getFullYear()} SLIIT FOSS Community
        </span>
        <div className="flex items-center justify-center mt-4 md:justify-start md:mt-0">
          <span className="mr-3 md:mr-8">Visit us On</span>
          <a
            href="https://github.com/sliit-foss"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={`/assets/images/social/github.svg`}
              className="w-5 h-5 mb-0.5 hover:brightness-200 transition duration-300"
            ></img>
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;
