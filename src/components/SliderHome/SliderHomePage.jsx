import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { LazyLoadImage } from "react-lazy-load-image-component";
import React, { memo, useState, useLayoutEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useGetHomePage } from "../../asset/api/path";
import { LoadingSkeleton } from "../loading/LoadingSvg";
import { SlideStyle } from "../../asset/styles/styledComponents";

const SliderHomePage = memo(() => {
  const [datas, setData] = useState(null);
  const { data, status } = useGetHomePage();
  const dataNice = data?.data?.items.filter((e) => e.sectionType === "banner");
  useLayoutEffect(() => {
    if (data) {
      setData(dataNice[0].items);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  try {
    return (
      <SlideStyle>
        <div className="gallery mr-[-15px] ml-[-15px]">
          <div className="gallery-container slider_list min-h-[160px]">
            <Swiper
              modules={[Navigation, Autoplay, Pagination]}
              height={216} // 
              loop={true} // tạp vòng lặp
              autoplay={{ delay: 3500, disableOnInteraction: false }} // tự động chuyển đổi hình ảnh
              pagination={{ clickable: true }}
              loopfillgroupwithblank="true"
              navigation={{
                prevEl: navigationPrevRef.current,
                nextEl: navigationNextRef.current,
              }}
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = navigationPrevRef.current
                swiper.params.navigation.nextEl = navigationNextRef.current
              }}
              speed={600}
              allowTouchMove={false}
              scrollbar={{ draggable: false }}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  allowTouchMove: true,
                  navigation: false,
                  autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                  },
                },
                600: {
                  slidesPerView: 2,
                  allowTouchMove: true,
                },
                1040: { 
                  slidesPerView: 4
                },
              }}
            >
              <>
                <button ref={navigationPrevRef} type="button" className="slider_list-btn-left slick-prev slick-arrow">
                  <span className="material-icons-outlined">arrow_back_ios</span>
                </button>
                <button ref={navigationNextRef} type="button" className="slider_list-btn-right slick-next slick-arrow ">
                  <span className="material-icons-outlined">arrow_forward_ios</span>
                </button>
              </>
              {datas && datas.length > 0 && datas.map((e) => {
                return (
                  <SwiperSlide key={e.banner}>
                    <div className="gallery-item">
                      <div className="zm-card  cursor-pointer">
                        <div className="zm-card-image">
                          <LazyLoadImage height={"auto"} src={e.banner} alt="" />
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
              {(!datas || status === "loading") && Array(3).fill(0).map((e, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="gallery-item">
                      <div className="zm-card  cursor-pointer">
                        <div className="zm-card-image ">
                          <LoadingSkeleton className="w-full h-[216px] " />
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </SlideStyle>
    );
  } catch (error) {
    console.log(error)
  };
});

export default SliderHomePage;