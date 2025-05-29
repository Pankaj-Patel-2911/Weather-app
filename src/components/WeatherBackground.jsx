import React, { useState, useEffect, useRef, useCallback } from "react";

const WeatherBackground = ({ weatherData }) => {
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const lastWeatherMain = useRef(null);
  const lastWeatherCode = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const animateCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    let particles = [];
    let clouds = [];

    let sun = { x: canvas.width * 0.85, y: canvas.height * 0.15, radius: 50 };

    const initParticles = (type, code) => {
      particles = [];
      let particleCount, minSpeed, maxSpeed, minSize, maxSize;

      const isRain = type === "rain";

      if (isRain) {
        if ((code >= 500 && code < 501) || code === 300 || code === 310) {
          particleCount = 150;
          minSpeed = 3;
          maxSpeed = 6;
          minSize = 1.5;
          maxSize = 3;
        } else if (
          (code >= 501 && code < 502) ||
          code === 301 ||
          code === 311 ||
          code === 313
        ) {
          particleCount = 300;
          minSpeed = 5;
          maxSpeed = 9;
          minSize = 2;
          maxSize = 4;
        } else if (
          (code >= 502 && code <= 531) ||
          (code >= 200 && code <= 232) ||
          code === 302 ||
          code === 312 ||
          code === 314
        ) {
          particleCount = 500;
          minSpeed = 8;
          maxSpeed = 15;
          minSize = 3;
          maxSize = 6;
        } else {
          particleCount = 200;
          minSpeed = 4;
          maxSpeed = 7;
          minSize = 2;
          maxSize = 3.5;
        }
      } else {
        if ((code >= 600 && code < 601) || code === 615 || code === 616) {
          particleCount = 50;
          minSpeed = 1;
          maxSpeed = 3;
          minSize = 1.5;
          maxSize = 3;
        } else if ((code >= 601 && code < 602) || code === 620) {
          particleCount = 80;
          minSpeed = 2;
          maxSpeed = 4;
          minSize = 2.5;
          maxSize = 4.5;
        } else if (code >= 602 && code <= 622) {
          // Heavy snow
          particleCount = 150;
          minSpeed = 3;
          maxSpeed = 6;
          minSize = 4;
          maxSize = 7;
        } else {
          particleCount = 80;
          minSpeed = 2;
          maxSpeed = 4;
          minSize = 2.5;
          maxSize = 4.5;
        }
      }

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * (maxSize - minSize) + minSize,
          speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
          opacity: Math.random() * 0.5 + 0.5,
        });
      }
    };

    const initClouds = () => {
      clouds = [];
      const numClouds = 5;
      for (let i = 0; i < numClouds; i++) {
        clouds.push({
          x: Math.random() * canvas.width,
          y: Math.random() * (canvas.height / 3),
          width: Math.random() * 200 + 100,
          height: Math.random() * 80 + 40,
          speed: Math.random() * 0.5 + 0.1,
          opacity: Math.random() * 0.6 + 0.4,
        });
      }
    };

    const drawSun = () => {
      ctx.beginPath();
      ctx.arc(sun.x, sun.y, sun.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 223, 0, 0.8)";
      ctx.shadowColor = "rgba(255, 223, 0, 0.6)";
      ctx.shadowBlur = 30;
      ctx.fill();
      ctx.shadowBlur = 0;

      for (let i = 0; i < 8; i++) {
        const angle = ((Math.PI * 2) / 8) * i;
        const startX = sun.x + (sun.radius + 10) * Math.cos(angle);
        const startY = sun.y + (sun.radius + 10) * Math.sin(angle);
        const endX = sun.x + (sun.radius + 30) * Math.cos(angle);
        const endY = sun.y + (sun.radius + 30) * Math.sin(angle);
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = "rgba(255, 223, 0, 0.6)";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    };

    const drawCloud = (cloud, color = "rgba(255, 255, 255,") => {
      ctx.beginPath();
      ctx.arc(cloud.x, cloud.y, cloud.width / 4, 0, Math.PI * 2);
      ctx.arc(
        cloud.x + cloud.width * 0.3,
        cloud.y - cloud.height * 0.2,
        cloud.width / 3.5,
        0,
        Math.PI * 2
      );
      ctx.arc(
        cloud.x + cloud.width * 0.6,
        cloud.y,
        cloud.width / 4,
        0,
        Math.PI * 2
      );
      ctx.arc(
        cloud.x + cloud.width * 0.2,
        cloud.y + cloud.height * 0.1,
        cloud.width / 3,
        0,
        Math.PI * 2
      );
      ctx.arc(
        cloud.x + cloud.width * 0.45,
        cloud.y + cloud.height * 0.15,
        cloud.width / 3.2,
        0,
        Math.PI * 2
      );
      ctx.closePath();
      ctx.fillStyle = `${color} ${cloud.opacity})`;
      ctx.fill();
    };

    const drawRain = (particle) => {
      ctx.beginPath();
      ctx.moveTo(particle.x, particle.y);
      ctx.lineTo(particle.x, particle.y + particle.size * 6);
      ctx.strokeStyle = `rgba(255, 255, 255, ${particle.opacity})`;
      ctx.lineWidth = particle.size / 1.5;
      ctx.lineCap = "round";
      ctx.stroke();
    };

    const drawSnow = (particle) => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const weatherMain = weatherData?.weather?.[0]?.main;
      const weatherCode = weatherData?.weather?.[0]?.id;

      let shouldDrawParticles = false;
      let particleType = "";
      let particleCodeForInit = 0;

      if (["Rain", "Drizzle", "Thunderstorm"].includes(weatherMain)) {
        shouldDrawParticles = true;
        particleType = "rain";

        particleCodeForInit =
          weatherMain === "Thunderstorm" ? 504 : weatherCode;
      } else if (weatherMain === "Snow") {
        shouldDrawParticles = true;
        particleType = "snow";
        particleCodeForInit = weatherCode;
      }

      if (shouldDrawParticles) {
        if (
          particles.length === 0 ||
          lastWeatherMain.current !== weatherMain ||
          lastWeatherCode.current !== weatherCode
        ) {
          initParticles(particleType, particleCodeForInit);
        }
        particles.forEach((p) => {
          if (particleType === "rain") drawRain(p);
          else drawSnow(p);
          p.y += p.speed;
          if (particleType === "snow") p.x += Math.sin(p.y * 0.01) * 0.5;
          if (p.y > canvas.height) {
            p.y = 0;
            p.x = Math.random() * canvas.width;
          }
        });
      } else {
        particles = [];
      }

      switch (weatherMain) {
        case "Clear":
          if (
            weatherData &&
            weatherData.dt > weatherData.sys.sunrise &&
            weatherData.dt < weatherData.sys.sunset
          ) {
            drawSun();
          }
          if (clouds.length > 0) clouds = [];
          break;
        case "Clouds":
        case "Rain":
        case "Drizzle":
        case "Snow":
        case "Thunderstorm":
        case "Mist":
        case "Fog":
        case "Haze":
        case "Smoke":
        case "Dust":
        case "Sand":
        case "Ash":
        case "Squall":
        case "Tornado":
          if (clouds.length === 0) initClouds();
          clouds.forEach((cloud) => {
            let cloudColor = "rgba(255, 255, 255,";
            if (["Rain", "Drizzle", "Thunderstorm"].includes(weatherMain))
              cloudColor = "rgba(150, 150, 150,";
            else if (weatherMain === "Snow") cloudColor = "rgba(200, 200, 200,";
            else if (
              ["Mist", "Fog", "Haze", "Smoke", "Dust", "Sand", "Ash"].includes(
                weatherMain
              )
            )
              cloudColor = "rgba(180, 180, 180,";
            drawCloud(cloud, cloudColor);
            cloud.x += cloud.speed;
            if (cloud.x > canvas.width + cloud.width / 2) {
              cloud.x = -cloud.width / 2;
              cloud.y = Math.random() * (canvas.height / 3);
            }
          });
          break;
        default:
          if (clouds.length === 0) initClouds();
          clouds.forEach((cloud) => {
            drawCloud(cloud);
            cloud.x += cloud.speed;
            if (cloud.x > canvas.width + cloud.width / 2) {
              cloud.x = -cloud.width / 2;
              cloud.y = Math.random() * (canvas.height / 3);
            }
          });
          break;
      }

      lastWeatherMain.current = weatherMain;
      lastWeatherCode.current = weatherCode;

      animationFrameId.current = requestAnimationFrame(animate);
    };

    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    const initialWeatherMain = weatherData?.weather?.[0]?.main;
    const initialWeatherCode = weatherData?.weather?.[0]?.id;

    if (["Rain", "Drizzle", "Thunderstorm"].includes(initialWeatherMain)) {
      initParticles(
        "rain",
        initialWeatherMain === "Thunderstorm" ? 504 : initialWeatherCode
      );
    } else if (initialWeatherMain === "Snow") {
      initParticles("snow", initialWeatherCode);
    } else {
      particles = [];
    }

    if (initialWeatherMain !== "Clear") {
      initClouds();
    } else {
      clouds = [];
    }

    animate();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [weatherData, dimensions]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-0"
    ></canvas>
  );
};

export default WeatherBackground;
