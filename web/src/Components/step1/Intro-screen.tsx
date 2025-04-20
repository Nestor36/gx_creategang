"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import "./style.css";

import GlitchText from "../lib/reactbits/GlitchText";
//import "animate.css";

export default function IntroScreen({
  onIntroComplete,
  progressDuration = 10000, // duración por defecto de 10 segundos
}: {
  onIntroComplete?: () => void;
  progressDuration?: number;
}) {
  const [showLogo, setShowLogo] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showLine, setShowLine] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [particlesVisible, setParticlesVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Control de la secuencia de animación
  useEffect(() => {
    const sequence = async () => {
      // Activar partículas
      setParticlesVisible(true);

      // Animación del logo
      await new Promise((resolve) => setTimeout(resolve, 300));
      setShowLogo(true);

      // Animación del título
      await new Promise((resolve) => setTimeout(resolve, 800));
      setShowTitle(true);

      // Animación del subtítulo
      await new Promise((resolve) => setTimeout(resolve, 300));
      setShowSubtitle(true);

      // Animación de la línea
      await new Promise((resolve) => setTimeout(resolve, 300));
      setShowLine(true);

      // Mostrar el componente de loading (barra y porcentaje)
      await new Promise((resolve) => setTimeout(resolve, 300));
      setShowLoading(true);

      // Animación del progress bar de forma uniforme durante "progressDuration"
      const stepIncrement = 5;
      const numberOfSteps = 100 / stepIncrement;
      const delay = (progressDuration * 1000) / numberOfSteps;

      for (let i = 0; i <= 100; i += stepIncrement) {
        setLoadingProgress(i);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }

      // Al llegar al 100% iniciamos la animación de salida
      setIsExiting(true);

      // Esperamos que termine la animación antes de llamar a onIntroComplete
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Se llama a la función callback para ocultar la intro
      if (onIntroComplete) onIntroComplete();
    };

    sequence();
  }, [onIntroComplete, progressDuration]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 bg-transparent flex flex-col items-center justify-center z-50 overflow-hidden"
    >
      {/* Fondo animado con degradado y partículas 
      <div className="animated-bg">
        {spans.map((_, index) => (
          <span key={index}></span>
        ))}
      </div>
      */}
      {/* imagen primero izquierda */}

      <motion.h1
        initial={{ opacity: 0, x: -200 }} // Empieza más a la izquierda y opaco
        animate={{
          opacity: isExiting ? 0 : 0.6,
          x: isExiting ? -400 : 4,
        }} // Termina en su posición actual
        transition={{
          duration: 0.5,
          delay: isExiting ? 0 : 0.5,
        }}
        className="absolute inset-0 flex items-end justify-start z-0"
      >
        <img
          src="./character/jon_gravelli.png"
          className="ml-[-50px] w-1/5 h-auto"
        />
        <img
          src="./character/girl_weapon.png"
          className="z-0 ml-[-200px] w-1/5 h-auto"
        />
      </motion.h1>

      <motion.h1
        initial={{ opacity: 0, x: 200 }} // Inicia fuera de la pantalla a la derecha
        animate={{
          opacity: isExiting ? 0 : 0.7,
          x: isExiting ? 400 : 4,
        }} // Termina en su posición actual
        transition={{
          duration: 0.5,
          delay: isExiting ? 0 : 0.5,
        }}
        className="absolute inset-0 flex items-end justify-end z-0"
      >
        <img
          src="./character/team_3.png"
          className="mr-[-100px] w-3/5 h-auto -scale-x-100"
        />
      </motion.h1>

      {/* Elementos animados en el fondo */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Fondo degradado animado 
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: 1.2,
            opacity: 0.15,
            rotate: 360,
          }}
          transition={{
            duration: 8,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-red-600 via-red-600 to-pink-600 blur-3xl"
        />
*/}
        {/* Partículas animadas
        {particlesVisible && <Particles />} */}
      </div>

      {/* Contenedor del contenido principal */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Animación del Logo */}
        <AnimatePresence>
          {showLogo && (
            <motion.div
              initial={{ scale: 0, opacity: 0, rotateY: 90 }}
              animate={{ scale: 1, opacity: isExiting ? 0 : 1, rotateY: 0 }}
              transition={{
                duration: 1.2,
                type: "spring",
                stiffness: 100,
                damping: 10,
              }}
              className="mb-8 relative"
            >
              {/* Anillo pulsante */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{
                  scale: [0.8, 1.1, 0.8],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-500/30 to-purple-600/30 blur-md"
              />

              {/* Contenedor del logo */}

              {/* Anillos de pulso */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-[#df3d3d]"
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-[#df3d3d]"
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 1.8, opacity: 0 }}
                transition={{
                  duration: 2,
                  delay: 0.3,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />

              <div className="w-36 h-36 rounded-full flex items-center justify-center relative overflow-hidden">
                {/* Brillo interno */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.4, 0.7, 0.4] }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-2 rounded-full bg-white/10 blur-md"
                />
                {/* Icono del logo */}

                <motion.div
                  className="w-40 h-40 rounded-full bg-gradient opacity-0 flex items-center justify-center shadow-lg shadow-black-500/30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Icono principal */}
                  <Icon
                    icon="game-icons:spy"
                    width="140"
                    height="140"
                    className="text-[#df3d3d] relative z-10"
                  />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animación del Título */}
        <AnimatePresence>
          {showTitle && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isExiting ? 0 : 1, y: 0 }}
              transition={{ duration: 0.7, type: "spring" }}
              className="relative z-0"
            >
              {/* Sombra del texto para dar profundidad */}
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute text-1xl font-bold text-pink-500/30 blur-md uppercase tracking-widest z-0"
                style={{ transform: "translate(4px, 4px)" }}
              >
                GANGS
              </motion.h1>

              {/* Título principal con animación por letra */}
              <motion.h1 className="text-1xl font-bold uppercase tracking-widest relative z-0">
                {"GANGS".split("").map((letter, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.1 * i,
                      type: "spring",
                      stiffness: 100,
                    }}
                    className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500 z-0"
                  >
                    <GlitchText
                      speed={1}
                      enableShadows={true}
                      enableOnHover={false}
                      className="text-2xl z-0"
                    >
                      {letter}
                    </GlitchText>
                  </motion.span>
                ))}
              </motion.h1>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animación del Subtítulo */}
        <AnimatePresence>
          {showSubtitle && (
            <motion.p
              initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
              animate={{
                opacity: isExiting ? 0 : 1,
                y: 0,
                filter: "blur(0px)",
              }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-4 text-gray-400 text-xl font-light"
            >
              Management System
            </motion.p>
          )}
        </AnimatePresence>

        {/* Animación de la línea y progress bar */}
        <AnimatePresence>
          {showLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isExiting ? 0 : 1 }}
              transition={{ duration: 0.8 }}
              className="mt-8 flex flex-col items-center"
            >
              {/* Barra de progreso */}
              <div className="w-48 h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: `${loadingProgress}%` }}
                  className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
                />
              </div>

              {/* Porcentaje */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 text-xs text-gray-600"
              >
                {loadingProgress}%
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// Componente de partículas animadas
