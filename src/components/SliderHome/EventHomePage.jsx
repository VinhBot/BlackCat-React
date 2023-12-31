import { LazyLoadImage } from "react-lazy-load-image-component";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import React, { memo, useState } from "react";
import PlayListSelector from "../Selection/PlayListSelector";
import { EventStyle } from "../../assets/styledComponents";

const EventHomePage = memo(() => {
  const project = [
    {
       coverH: "https://cdn.discordapp.com/attachments/1092880160799326350/1092880297713991850/music.gif",
       title: "BlackCat-Club", 
       startTime: "1672574400",
       label: "Minigame",
       subscribeText: "quan tâm",
       unsubscribeText: "Đã quan tâm", 
       totalFollow: "11",
       followers: [
         "https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-Viet-Nam.jpg",
         "https://top10quangbinh.vn/wp-content/uploads/2022/10/anh-gai-xinh-che-mat-2.jpg",
         "https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-anh-meo-cute-1.jpg"
       ]
    },{
       coverH: "https://cdn.discordapp.com/attachments/1092880160799326350/1092880297713991850/music.gif",
       title: "BlackCat-Club", 
       startTime: "1672574400",
       label: "Sinh Nhật Sao",
       subscribeText: "chúc mừng",
       unsubscribeText: "Đã chúc mừng", 
       totalFollow: "11",
       followers: [
         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNJXEMo3Ao5QRaKnczjzT9iSzVKrbqPNsydGiPIo3NJS-isfA&s",
         "https://toigingiuvedep.vn/wp-content/uploads/2022/01/anh-meo-cute.jpg",
         "https://i.pinimg.com/originals/e4/7d/3c/e47d3cc028272905c14993deef6b68bf.jpg"
       ]
    },{
       coverH: "https://cdn.discordapp.com/attachments/1092880160799326350/1092880297713991850/music.gif",
       title: "BlackCat-Club", 
       startTime: "1672574400",
       label: "Phát Hành Bài Hát",
       subscribeText: "đăng ký",
       unsubscribeText: "Đã đăng ký", 
       totalFollow: "11",
       followers: [
         "https://kynguyenlamdep.com/wp-content/uploads/2022/06/anh-gai-xinh-cuc-dep.jpg",
         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNJXEMo3Ao5QRaKnczjzT9iSzVKrbqPNsydGiPIo3NJS-isfA&s",
         "https://toigingiuvedep.vn/wp-content/uploads/2022/03/hinh-cute-meo.jpg"
       ]
    },{
      coverH: "https://cdn.discordapp.com/attachments/1092880160799326350/1092880297713991850/music.gif",
      title: "BlackCat-Club", 
      startTime: "1672574400",
      label: "Phát Hành Bài Hát",
      subscribeText: "đăng ký",
      unsubscribeText: "Đã đăng ký", 
      totalFollow: "11",
      followers: [
        "https://kynguyenlamdep.com/wp-content/uploads/2022/06/anh-gai-xinh-cuc-dep.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNJXEMo3Ao5QRaKnczjzT9iSzVKrbqPNsydGiPIo3NJS-isfA&s",
        "https://toigingiuvedep.vn/wp-content/uploads/2022/03/hinh-cute-meo.jpg"
      ]
    },{
      coverH: "https://cdn.discordapp.com/attachments/1092880160799326350/1092880297713991850/music.gif",
      title: "BlackCat-Club", 
      startTime: "1672574400",
      label: "Phát Hành Bài Hát",
      subscribeText: "đăng ký",
      unsubscribeText: "Đã đăng ký", 
      totalFollow: "11",
      followers: [
        "https://kynguyenlamdep.com/wp-content/uploads/2022/06/anh-gai-xinh-cuc-dep.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNJXEMo3Ao5QRaKnczjzT9iSzVKrbqPNsydGiPIo3NJS-isfA&s",
        "https://toigingiuvedep.vn/wp-content/uploads/2022/03/hinh-cute-meo.jpg"
      ]
    },
  ];
  /*========================================================
  # EventHomeItem.js
  ========================================================*/
  const EventHomeItem = memo(({ item, className = "" }) => {
    const [isActive, setActice] = useState(false);
    const { coverH, title, startTime, followers, label, subscribeText, unsubscribeText, totalFollow } = item;
    // kiểm tra thời gian
    function checkTime(i) {
      if (i < 10) {
         i = "0" + i;
      };
      return i;
    };
    // Lịch
    var date = new Date(startTime * 1000);
    var result = date.toLocaleDateString("vi-VN", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
    // Lất Giờ
    var h = date.getHours();
    var m = date.getMinutes();
    h = checkTime(h);
    m = checkTime(m);
    let time = h + ":" + m;
    // sự kiện
    let praraTitle;
    if(label === "Minigame") {
      praraTitle = "đặt lịch";
    } else if(label === "Sinh Nhật Sao") {
      praraTitle = "chúc mừng";
    } else if(label === "Phát Hành Bài Hát" || label === "Phát Hành Album") {
      praraTitle = "quan tâm";
    };
    return (
      <EventStyle  className={`favorite_list-item ${className}`}>
         {/*Hiển thị hình ảnh, tiêu đề ....*/}
         <a className="main-page_list-item main_page-hover" href="# ">
            <div className="main-page_list-item_img">
               <img src={coverH} alt={title} />
            </div>
            <div className="favorite_content">
               <div className="tag">{label}</div>
               <p className="favorite_content-name">{title}</p>
               <div className="favorite_content-list">
                  {time + " " + result}
               </div>
            </div>
            <div className="main_blur-bg" />
         </a>
         {/* Hiển thị thông tin đăng ký */}
         <div className="flex justify-between items-center mt-3">
            <div className="left">
               <p className="left-title">Lượt {praraTitle}</p>
               <div className="avatars">
                  {followers && followers.map((e, index) => (
                    <div key={index} className="avatars-item">
                      <div className="avatars-item-img">
                        <LazyLoadImage height={190} src={e} alt="" />
                      </div>
                    </div>
                  ))}
                  <div className="text-item"> và {totalFollow} người khác</div>
               </div>
            </div>
            {/** Hiển thị nút tương tác */}
            <div className="right">
               <button type="button" onClick={() => setActice((value) => !value)} className={`right-btn rounded-full transition-all hover:opacity-70 ${isActive ? "is-active" : ""}`}>
                  {!isActive ? subscribeText : unsubscribeText}
               </button>
            </div>
         </div>
      </EventStyle >
    );
  });
  /*========================================================
  # 
  ========================================================*/                    
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  // thêm các nút cho thanh sự kiện
  const responseButton = () => {
      return (
          <div 
            // className="event-btn-arrow"
            style={{
              position: "absolute",
              marginTop: "0.5rem",
              top: "0px",
              flex: "none",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.625rem"
            }}
          >
              {/** trước */}
              <button ref={navigationPrevRef} type="button" className="cursor-pointer">
                 <span className="material-icons-outlined">
                   <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                 </span>
              </button>
              {/** Kế tiếp */}
              <button ref={navigationNextRef} type="button" className="cursor-pointer">
                 <span className="material-icons-outlined">
                   <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                 </span>
              </button>
          </div>
      );
  };

  try {
      return (
        <PlayListSelector childrenOption = {responseButton()} classAdd = {"container-event"} title={"Sự kiện"}>
          {project && project.length > 0 && (
               <Swiper
                  modules={[Navigation, Pagination]}
                  loop={true}
                  slidesPerView={3}
                  pagination={{ dynamicBullets: true }}
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
                        slidesPerGroup: 1,
                     },
                     700: {
                        slidesPerView: 2,
                        allowTouchMove: true,
                        slidesPerGroup: 2,
                     },
                     1024: {
                        slidesPerView: 3,
                        allowTouchMove: false,
                        slidesPerGroup: 3,
                     },
                  }}
              >
                {project && project.length > 0 && project.map((e, index) => (
                  <SwiperSlide key={index}>
                    <EventHomeItem key={index} className="col" item={e}/>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
         </PlayListSelector>
      );
  } catch(error) {
    console.log("EventHomePage: " + error);
  };
});

export default EventHomePage;