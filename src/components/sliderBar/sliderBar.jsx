import "./sliderBar.scss";

const SliderBar = ({ activeElementSizePos, windowWidth }) => {
  return (
    <>
      <div
        className='sliderBar sliderBarDesktop'
        style={{
          width: `${activeElementSizePos.width}px`,
          left: `${activeElementSizePos.posX}px`,
          display: windowWidth < 816 ? "none" : "block",
        }}></div>
      <div
        className='sliderBar sliderBarMobile'
        style={{
          top: `${activeElementSizePos.posY}px`,
          height: `${activeElementSizePos.height}px`,
          display: windowWidth > 815 ? "none" : "block",
        }}></div>
    </>
  );
};

export default SliderBar;
