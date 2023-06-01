import React from "react";
import ParticleImage, {
  ParticleOptions,
  Vector,
  forces,
  ParticleForce
} from "react-particle-image";

const ParticleComponent = ({ width, height }) => {
  
  const particleOptions = {
    filter: ({ x, y, image }) => {
      // Get pixel
      const pixel = image.get(x, y);
      // Make a particle for this pixel if blue > 50 (range 0-255)
      return pixel.b > 50 && pixel.b < 255;
    },
    color: ({ x, y, image }) => "black",
    radius: () => Math.random() * 1.5 + 0.5,
    mass: () => 40,
    friction: () => 0.15,
    initialPosition: ({ canvasDimensions }) => {
      return new Vector(
        canvasDimensions.width / 2,
        canvasDimensions.height / 2
      );
    }
  };

  const motionForce = (x, y) => {
    return forces.disturbance(x, y, 50);
  };

  return (
    <ParticleImage
      src={"https://media.discordapp.net/attachments/1078293936377954431/1113578342176792586/ProjectArena1.png?width=1176&height=661"}
      width={width}
      height={height}
      scale={0.5}
      entropy={10}
      maxParticles={6000}
      particleOptions={particleOptions}
      mouseMoveForce={motionForce}
      touchMoveForce={motionForce}
      backgroundColor="#FFFFFF"
      data-testid="particle-component"
    />
  );
};

export default ParticleComponent;
