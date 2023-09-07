import React, { useState } from "react";
import Tippy from "@tippyjs/react";

import { 
   SettingPortalStyles, 
   SettingPortalChildrenStylle
} from "../../asset/styles/styledComponents";


const SettingPortalChildren = () => {
   const [state, setSate] = useState(false)

   return (
      <SettingPortalChildrenStylle className="menu-list quality-list">
         <li onClick={() => setSate(false)} className="">
            <div className="option">
               <div className="left">
                  <div>
                     <b>SQ • 128</b>
                  </div>
                  <div className="desc">Giảm sử dụng dữ liệu cho các kết nối chậm hơn.</div>
               </div>
               <i className={`icon !mr-0 ml-auto ${!state && "ic-check"}`} />
            </div>
         </li>
         <li onClick={() => setSate(true)}>
            <div className="option">
               <div className="left">
                  <div>
                     <b>HQ • 320</b>
                  </div>
                  <div className="desc">Kết hợp tốt nhất giữa việc sử dụng dữ liệu và chất lượng âm thanh.</div>
               </div>
               <i className={`icon !mr-0 ml-auto ${state && "ic-check"}`} />
            </div>
         </li>
      </SettingPortalChildrenStylle>
   )
}

const SettingPortal = () => {
   const project = [
     { name: "Giới thiệu", icons: "icon ic-20-info", path: "/profile" },
     { name: "Facebook", icons: "icon ic-20-Report", path: "https://www.facebook.com/phan.vinh.92754/" },
     { name: "Liên hệ", icons: "icon ic-20-Call", path: "https://mp3.zing.vn/huong-dan/contact" },
     // { name: "", icons: "", path: "" },
   ];
   return (
      <SettingPortalStyles className="setting-portal">
         <ul className="menu-list relative">
            <Tippy
               interactiveBorder={0}
               offset={[-10, 0]}
               interactive={true}
               arrow={false}
               content={<SettingPortalChildren></SettingPortalChildren>}
               placement={"left-start"}
            >
               <li className="quality-setting">
                  <button className="zm-btn button flex n w-full items-center" tabIndex={0}>
                     <i className="icon ic-20-quaility-SQ" />
                     Chất lượng nhạc
                     <i className="icon ic-go-right !mr-0 flex-1 !pr-0 !justify-end" />
                  </button>
               </li>
            </Tippy>
         </ul>
         <footer className="footer">
            <ul className="menu-list zm-nav-footer">
              {project.map(({name, icons, path}, index) => (
                <li key={index}>
                  <a target="_blank" href={path} className="z-link zm-btn" title={name} rel="noreferrer">
                     <i className={icons}/>
                     <div>{name}</div>
                  </a>
                 </li>
              ))}
            </ul>
         </footer>
      </SettingPortalStyles>
   )
}

export default SettingPortal
