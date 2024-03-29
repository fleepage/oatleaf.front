import classnames from "classnames";
import React, { useContext, useEffect, useRef, useState } from "react";
import Headroom from "react-headroom";
import { scroller } from "react-scroll";
import ServiceCard from "../component/cards/ServiceCard";
import GlideComponent from "../component/carousel/GlideComponent";
import { AuthContext } from "../context/AuthContext";
import { getCurrentRadius, setCurrentRadius } from "../helpers/Utils";

const slideSettings = {
  type: "carousel",
  gap: 30,
  perView: 4,
  hideNav: true,
  peek: { before: 10, after: 10 },
  breakpoints: {
    600: { perView: 1 },
    992: { perView: 2 },
    1200: { perView: 3 },
  },
};

const mobileSlideSettings = {
  type: "carousel",
  gap: 30,
  perView: 1,
  hideNav: true,
  peek: { before: 10, after: 10 },
  breakpoints: {
    600: { perView: 1 },
    992: { perView: 2 },
    1200: { perView: 3 },
  },
};

const bannerItem = [
  {
    id: 1,
    image: "/assets/img/landing-page/features/digital_school.png",
    name: "oatlaf",
  },
  {
    id: 2,
    image: "/assets/img/landing-page/features/home1.png",
    name: "oatlaf",
  },
  {
    id: 3,
    image: "/assets/img/landing-page/features/parent-teachers.png",
    name: "oatlaf",
  },
  {
    id: 3,
    image: "/assets/img/landing-page/features/library.png",
    name: "oatlaf",
  },
];

const slideItems = [
  {
    caption: "2K",
    title: "School(s)",
    detail:
      "Numbers of school on oatleaf. Sharing knowledge and enriching student expierience.",
  },
  {
    caption: "30K",
    title: "Student(s)",
    detail: "Enjoying the benefit of wall-less school.",
  },
  {
    caption: "1K",
    title: "Parent/Gaurdian",
    detail:
      "parent/gaurdian are part of the platform. School is now a way of life not a place to attend",
  },
  {
    caption: "10K",
    title: "Teacher(s)",
    detail:
      "We help teacher(s) become their best by providing them with AI-enabled tools.",
  },
];

const features = [
  {
    title: "School(s)",
    action: 1,
    img: "/assets/img/landing-page/features/school.svg",
    detail:
      "On Oatleaf payment is one button away. <br /><br />All you have to do is select biller, select mda and revenue head then select the serices you are paying for then click on pay to initiate payment.",
  },
  {
    title: "Student(s)",
    action: 2,
    img: "/assets/img/landing-page/features/knowledge.svg",
    detail:
      "On Oatleaf payment is one button away. <br /><br />All you have to do is select biller, select mda and revenue head then select the serices you are paying for then click on pay to initiate payment.",
  },
  {
    title: "Parent/Gaurdian",
    img: "/assets/img/landing-page/features/family.svg",
    action: 3,
    detail:
      "At Oatleaf we understand the concept of simplicity and efficiency we built this platform with customer at heart. We always blieve customer comes first, Paying for utility has never been this easy and simple",
  },
  {
    title: "Teacher(s)",
    action: 4,
    img: "/assets/img/landing-page/features/teacher.svg",
    detail:
      "You can View and track your payment. <br /><br />All at the comfort of your smartphone. You can also view and print receipt for any payment all you need to do is login to th platform head to Histroy and select what you are looking for",
  },
  // {
  //   title: "Bookstore(s)",
  //   action: 4,
  //   img: "/assets/img/landing-page/features/store.svg",
  //   detail:
  //     "You can View and track your payment. <br /><br />All at the comfort of your smartphone. You can also view and print receipt for any payment all you need to do is login to th platform head to Histroy and select what you are looking for",
  // },
  // {
  //   title: "sponsor/organisation",
  //   action: 4,
  //   img: "/assets/img/landing-page/features/ceo.svg",
  //   detail:
  //     "You can View and track your payment. <br /><br />All at the comfort of your smartphone. You can also view and print receipt for any payment all you need to do is login to th platform head to Histroy and select what you are looking for",
  // },
  // {
  //   title: "Developer(s).",
  //   action: 5,
  //   img: "/assets/img/landing-page/features/developer.svg",
  //   detail:
  //     "Oatleaf Integrated Solutions Provides much more services, check our our website for more information on what we can do for you..",
  // },
];

const actions = [
  {
    title: "Manage Your Children",
    icon: "simple-icon-graduation",
    value: "get the latest app from either google playstore or apple appstore",
    btext: "Check Now",
  },
  // {
  //   title: "Get A Freelance Teacher",
  //   icon: "simple-icon-user",
  //   value: "get the latest app from either google playstore or apple appstore",
  //   btext: "Find Now",
  // },
  {
    title: "Find School",
    icon: "iconsminds-building",
    value: "get the latest app from either google playstore or apple appstore",
    btext: "Search",
  },
  // {
  //   title: "Find Event",
  //   icon: "iconsminds-mail-read",
  //   value: "get the latest app from either google playstore or apple appstore",
  //   btext: "Search",
  // },
  {
    title: "Manage Your School",
    icon: "iconsminds-building",
    value: "get the latest app from either google playstore or apple appstore",
    btext: "Get Started",
  },
  // {
  //   title: "Manage An Organisation",
  //   icon: "iconsminds-building",
  //   value: "get the latest app from either google playstore or apple appstore",
  //   btext: "Get Started",
  // },
  // {
  //   title: "Organise An Event",
  //   icon: "iconsminds-building",
  //   value: "get the latest app from either google playstore or apple appstore",
  //   btext: "Get Started",
  // },
  {
    title: "Do Lot More",
    icon: "iconsminds-building",
    value: "get the latest app from either google playstore or apple appstore",
    btext: "Get Started",
  },
];

const Home = (props) => {
  const { dispatch, auth } = useContext(AuthContext);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const refRowHome = useRef(null);
  const refSectionHome = useRef(null);
  const refSectionFooter = useRef(null);
  const [activeTab, setActiveTab] = useState(1);
  const [radius, setRadius] = useState(getCurrentRadius());

  useEffect(() => {
    if (auth !== null) {
      if (auth.isAuth) {
        props.history.push("/app");
      }
    } else {
      window.addEventListener("scroll", onWindowScroll);
      window.addEventListener("resize", onWindowResize);
      window.addEventListener("click", onWindowClick);

      document.body.classList.add("no-footer");
      return () => {
        window.removeEventListener("scroll", onWindowScroll);
        window.removeEventListener("resize", onWindowResize);
        window.removeEventListener("click", onWindowClick);
        document.body.classList.remove("no-footer");
      };
    }
  }, [auth, props]);

  useEffect(() => {
    if (radius === "flat") {
      document.body.classList.remove("rounded");
    } else {
      document.body.classList.add("rounded");
    }
    setCurrentRadius(radius);
  }, [radius]);

  const onWindowResize = (event) => {
    const homeRect = refRowHome.current.getBoundingClientRect();

    const homeSection = refSectionHome.current;
    homeSection.style.backgroundPositionX = homeRect.x - 580 + "px";

    const footerSection = refSectionFooter.current;
    footerSection.style.backgroundPositionX =
      event.target.innerWidth - homeRect.x - 2000 + "px";

    if (event.target.innerWidth >= 992) {
      setShowMobileMenu(false);
    }
  };

  const onWindowClick = () => {
    setShowMobileMenu(false);
  };

  const onWindowScroll = () => {
    setShowMobileMenu(false);
  };

  const scrollTo = (event, target) => {
    event.preventDefault();
    scroller.scrollTo(target, {
      duration: 500,
      delay: 0,
      smooth: "easeInOutQuart",
      offset: -100,
    });

    return false;
  };

  return (
    <div
      className={classnames("landing-page", {
        "show-mobile-menu": showMobileMenu,
      })}
      //style={{ backgroundColor: "white" }}
    >
      <div className="mobile-menu" onClick={(event) => event.stopPropagation()}>
        <a
          className="logo-mobile c-pointer"
          href="#scroll"
          onClick={(event) => scrollTo(event, "home")}
        >
          <span></span>
        </a>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a href="https://Oatleaf.com/">Register Your School</a>
          </li>
          <li className="nav-item">
            <a href="/">Contact Us</a>
          </li>
          <li className="nav-item">
            <div className="separator" />
          </li>
          <li className="nav-item pl-4">
            <a className="btn btn-primary btn-sm ml-2" href="/login">
              Signin
            </a>
          </li>
        </ul>
      </div>

      <div className="main-container">
        <Headroom className="landing-page-nav">
          <nav>
            <div className="container d-flex align-items-center justify-content-between">
              <a
                className="navbar-logo pull-left c-pointer"
                href="#scroll"
                onClick={(event) => scrollTo(event, "home")}
              >
                <span className="white"></span>
                <span className="dark"></span>
              </a>
              <ul className="navbar-nav d-none d-lg-flex flex-row">
                <li className="nav-item">
                  <a href="https://Oatleaf.com/">Register Your School</a>
                </li>
                <li className="nav-item">
                  <a href="https://Oatleaf.com/">Contact Us</a>
                </li>
                <li className="nav-item pl-4">
                  <a
                    className="btn btn-primary btn-sm ml-2 white"
                    href="/login"
                  >
                    Signin
                  </a>
                </li>
              </ul>
              <span
                className="mobile-menu-button"
                onClick={(event) => {
                  setShowMobileMenu(!showMobileMenu);
                  event.stopPropagation();
                }}
              >
                <i className="simple-icon-menu"></i>
              </span>
            </div>
          </nav>
        </Headroom>
        <div className="content-container" id="home">
          <div className="section home" ref={refSectionHome}>
            <div className="container">
              <div className="row home-row " ref={refRowHome}>
                <div
                  className="col-12 col-xl-4 col-lg-5 col-md-6 text-center mx-auto my-auto"
                  //style={{ backgroundColor: "black" }}
                >
                  <div className="home-text">
                    <div className="display-1">
                      The Future is Here!
                      <br />
                      School without walls.
                    </div>
                    <p className="mb-5">
                      Transforming schools into digital platforms.
                    </p>
                    <a
                      className="btn btn-primary btn-xl mr-2 mb-2"
                      href="/register"
                    >
                      Get Started
                      <i className="simple-icon-arrow-right" />
                    </a>
                  </div>
                </div>
                <div
                  className="col-12 col-xl-7 offset-xl-1 col-lg-7 col-md-6 text-center d-none d-md-block"
                  //style={{ backgroundColor: "green" }}
                >
                  <GlideComponent
                    settings={{
                      gap: 5,
                      perView: 1,
                      type: "carousel",
                      autoplay: true,
                      animationDuration: 6000,
                      hoverpause: true,
                      hideNav: true,
                    }}
                  >
                    {bannerItem.map((item) => {
                      return (
                        <div
                          key={item.id}
                          className="mx-auto my-auto text-center"
                        >
                          <img src={item.image} alt={item.name} />
                        </div>
                      );
                    })}
                  </GlideComponent>
                </div>
              </div>

              <div className="row d-none d-md-block">
                <div className="col-12 p-0">
                  <div className="home-carousel">
                    <GlideComponent settings={slideSettings}>
                      {slideItems.map((f, index) => (
                        <div key={`slide_${index}`} className="card">
                          <div className="card-body text-center">
                            <div>
                              <h2>{f.caption}</h2>
                              <h5 className="font-weight-semibold">
                                {f.title}
                              </h5>
                            </div>
                            <div>
                              <p className="detail-text">{f.detail}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </GlideComponent>
                  </div>
                </div>
              </div>

              <div className="row d-block d-md-none">
                <div className="col-12 p-0">
                  <div className="home-carousel">
                    <GlideComponent
                      settings={{
                        gap: 5,
                        perView: 1,
                        type: "carousel",
                      }}
                    >
                      {slideItems.map((f, index) => (
                        <div key={`slide_${index}`} className="card">
                          <div className="card-body text-center">
                            <div>
                              <h2>{f.caption}</h2>
                              <h5 className="font-weight-semibold">
                                {f.title}
                              </h5>
                            </div>
                            <div>
                              <p className="detail-text">{f.detail}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </GlideComponent>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="section">
            <div className="container" id="video">
              <div className="row">
                <div className="col-12">
                  <Card>
                    <CardBody>
                      <iframe
                        src="https://www.youtube.com/embed/E7wJTI-1dvQ"
                        frameborder="0"
                        allow="autoplay; encrypted-media"
                        allowfullscreen
                        title="video"
                        width="100%"
                        height="500px"
                      />
                    </CardBody>
                  </Card>
                </div>
              </div>
            </div>
          </div> */}

          <div className="section">
            <div className="container" id="action">
              <div className="row">
                <div className="col-12  align-items-center text-center">
                  <div className="feature-text-container">
                    <h2>Things you can do.</h2>
                    <div className="row">
                      {actions.map((item, index) => {
                        return (
                          <div
                            key={`action_card_${index}`}
                            className="col-12 col-md-3 col-lg-3"
                          >
                            <ServiceCard {...item} className="mb-0" />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="section">
            <div className="container" id="app">
              <div className="row">
                <div className="col-12 col-md-6 col-lg-5 d-flex align-items-center text-center">
                  <div className="feature-text-container">
                    <h2>Get oatleaf App</h2>
                    <p>
                      All at the comfort of your smartphone. You can also view
                      and print receipt for any payment all you need to do is
                      login to th platform head to Histroy and select what you
                      are looking for{" "}
                    </p>
                    <div className="row">
                      <div className="col-6">
                        <a href="">
                          <img
                            src="/assets/img/landing-page/features/android.png"
                            width="150px"
                          />
                        </a>
                      </div>
                      <div className="col-6">
                        <a href="">
                          <img
                            src="/assets/img/landing-page/features/ios.png"
                            width="150px"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-6 offset-lg-1 offset-md-0 position-relative text-center d-none d-md-block">
                  <img
                    src="/assets/img/landing-page/features/mobileApp.svg"
                    className="feature-image-right feature-image-charts position-relative"
                  />
                </div>
              </div>
            </div>
          </div> */}

          <div className="section">
            <div className="container" id="features">
              <div className="row">
                <div className="col-12 offset-0 col-lg-8 offset-lg-2 text-center">
                  <h1>Who can use Our Platform.</h1>
                  <p>
                    Blow are list of who can use oatlaf. You have endless
                    capabilities when you truly believe.
                  </p>
                </div>
              </div>
              {features.map((feature, i) => (
                <div key={`feature_${i}`}>
                  {i % 2 === 0 && (
                    <div className="row feature-row mb-10 feature-row-card">
                      <div className="col-12 col-md-6 col-lg-5 d-flex align-items-center text-center">
                        <div className="feature-text-container">
                          <h2>{feature.title}</h2>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: feature.detail,
                            }}
                          ></p>
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-lg-6 offset-lg-1 offset-md-0 position-relative text-center ">
                        <img
                          alt={feature.title}
                          src={feature.img}
                          className=""
                        />
                      </div>
                      <br />
                    </div>
                  )}
                  {i % 2 === 1 && (
                    <div className="row feature-row mb-10 feature-row-card">
                      <div className="col-12 col-md-6 col-lg-6 order-2 order-md-1 text-center ">
                        <img
                          alt={feature.title}
                          src={feature.img}
                          className=""
                        />
                      </div>
                      <div className="col-12 col-md-6 offset-md-0 col-lg-5 offset-lg-1 d-flex align-items-center order-1 order-md-2 text-center">
                        <div className="feature-text-container">
                          <h2>{feature.title}</h2>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: feature.detail,
                            }}
                          ></p>
                        </div>
                      </div>
                      <br />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* <div className="section">
            <div className="container" id="partners">
              <div className="row">
                <div className="col-12 offset-0 col-lg-8 offset-lg-2 text-center">
                  <h1>Our Partners.</h1>
                  <p>
                    Blow are list of what you can do on this platform. It ranges
                    from paying IGR bills to Utility bill . Select a paymnt
                    category and get started.
                  </p>
                </div>
              </div>
            </div>
          </div> */}

          <div className="section footer mb-0" ref={refSectionFooter}>
            <div className="container">
              <div className="row footer-row">
                <div className="col-12 text-right">
                  <a
                    className="btn btn-circle btn-outline-semi-light footer-circle-button c-pointer"
                    href="#scroll"
                    onClick={(event) => scrollTo(event, "home")}
                  >
                    <i className="simple-icon-arrow-up"></i>
                  </a>
                </div>
                <div className="col-12 text-center footer-content">
                  <a
                    className="c-pointer"
                    href="#scroll"
                    onClick={(event) => scrollTo(event, "home")}
                  >
                    <img
                      className="footer-logo"
                      alt="footer logo"
                      src="/assets/logos/white.png"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="container copyright pt-5 pb-5">
              <div className="row">
                <div className="col-12"></div>
                <div className="col-12 text-center">
                  <p className="mb-0">2020 © 0atleaf</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
