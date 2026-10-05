import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import carImage from "../assets/car.png";
import "./Hero.css";

gsap.registerPlugin(ScrollTrigger);

function Hero() {
  const heroRef = useRef(null);
  const roadRef = useRef(null);
  const carRef = useRef(null);
  const trailRef = useRef(null);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    const road = roadRef.current;
    const car = carRef.current;
    const trail = trailRef.current;

    if (!hero || !road || !car || !trail) {
      console.error("Hero elements could not be found.");
      return;
    }

    const ctx = gsap.context(() => {
      const roadWidth = road.getBoundingClientRect().width;
      const carWidth = car.getBoundingClientRect().width;

      // Let the car move slightly beyond the right edge.
      const endX = roadWidth - carWidth + 180;

      /*
       * ========================================
       * 1. INITIAL HEADLINE ANIMATION
       * ========================================
       */

      gsap.fromTo(
        ".value-letter",
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.04,
          ease: "power3.out",
        }
      );

      /*
       * ========================================
       * 2. HIDE STAT CARDS INITIALLY
       * ========================================
       *
       * Cards are NOT part of the intro animation.
       * Their opacity is controlled only by
       * their individual ScrollTriggers below.
       */

      gsap.set(".stat", {
        opacity: 0,
        y: 20,
      });

      /*
       * ========================================
       * 3. SCROLL-DRIVEN CAR
       * ========================================
       */

      gsap.to(car, {
        x: endX,
        ease: "none",

        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: () => `+=${window.innerHeight * 2}`,
          scrub: 0.8,
        },

        onUpdate: () => {
          const currentX = gsap.getProperty(car, "x");

          const carCenter = currentX + carWidth / 2;

          gsap.set(trail, {
            width: carCenter,
          });
        },
      });

      /*
       * ========================================
       * 4. PROGRESSIVE CARD REVEALS
       * ========================================
       */

      gsap.to(".stat-one", {
        opacity: 1,
        y: 0,
        ease: "none",

        scrollTrigger: {
          trigger: hero,
          start: "top+=300 top",
          end: "top+=500 top",
          scrub: true,
        },
      });

      gsap.to(".stat-two", {
        opacity: 1,
        y: 0,
        ease: "none",

        scrollTrigger: {
          trigger: hero,
          start: "top+=500 top",
          end: "top+=700 top",
          scrub: true,
        },
      });

      gsap.to(".stat-three", {
        opacity: 1,
        y: 0,
        ease: "none",

        scrollTrigger: {
          trigger: hero,
          start: "top+=700 top",
          end: "top+=900 top",
          scrub: true,
        },
      });

      gsap.to(".stat-four", {
        opacity: 1,
        y: 0,
        ease: "none",

        scrollTrigger: {
          trigger: hero,
          start: "top+=900 top",
          end: "top+=1100 top",
          scrub: true,
        },
      });

      ScrollTrigger.refresh();
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero">
      <div className="hero-track">

        {/* Main road */}
        <div ref={roadRef} className="road">

          {/* Green trail */}
          <div ref={trailRef} className="trail" />

          {/* Headline */}
          <div className="value-text">
            {"WELCOME ITZFIZZ".split("").map((letter, index) => (
              <span
                key={index}
                className="value-letter"
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </div>

          {/* Car */}
          <img
            ref={carRef}
            src={carImage}
            alt="Blue car"
            className="car"
          />

        </div>

        {/* Statistics */}

        <div className="stat stat-one">
          <span className="stat-number">58%</span>
          <span>Increase in pick up point use</span>
        </div>

        <div className="stat stat-two">
          <span className="stat-number">23%</span>
          <span>Decreased in customer phone calls</span>
        </div>

        <div className="stat stat-three">
          <span className="stat-number">27%</span>
          <span>Increase in pick up point use</span>
        </div>

        <div className="stat stat-four">
          <span className="stat-number">40%</span>
          <span>Decreased in customer phone calls</span>
        </div>

      </div>
    </section>
  );
}

export default Hero;