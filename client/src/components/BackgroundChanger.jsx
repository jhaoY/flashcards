import React, { useEffect, useState } from 'react';
import image1 from '../assets/images/Background_img1.png';
//import image2 from '../assets/images/Background_img2.png';
import image3 from '../assets/images/Background_img3.png';
import image4 from '../assets/images/Background_img4.png';


const images = [image1, image3, image4 ];

const BackgroundChanger = ({ containerRef }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
      const changeBackground = () => {
          if (containerRef.current) { // Ensure the ref is available
              containerRef.current.style.backgroundImage = `url(${images[currentIndex]})`;
          }
          setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      };

      const intervalId = setInterval(changeBackground, 5000);
      return () => clearInterval(intervalId);  // Cleanup on unmount
  }, [currentIndex, containerRef]);  // Add containerRef as a dependency

  return null;  // This component doesn't render anything visible
};

export default BackgroundChanger;