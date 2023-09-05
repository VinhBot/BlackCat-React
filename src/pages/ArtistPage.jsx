import React, { useState, useLayoutEffect } from "react";
import { Outlet, useParams } from "react-router";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { ArtistInfoTop, LoadingSvg } from "../components/main";
import { scrollTop } from "../asset/data/functions";
import { tmdAPI } from "../asset/api/path";
import "./styles/ArtistPage.scss";

const ArtistPage = () => {
   const { name } = useParams();
   const [datas, setData] = useState([]);
   const fetchData = async () => {
      const data = await axios.get(tmdAPI.getArtistPage(name));
      setData(data?.data?.data);
   };
   const project = [
     { _name: "TỔNG QUAN", _path: `/nghe-si/${name}/` },
     { _name: "BÀI HÁT", _path: `/nghe-si/${name}/song` },
     { _name: "SINGLE & EP", _path: `/nghe-si/${name}/single` },
     { _name: "ALBUM", _path: `/nghe-si/${name}/album` },
     { _name: "MV", _path: `/nghe-si/${name}/mv` },
   ];
   useLayoutEffect(() => {
      scrollTop();
      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
   if(datas?.length === 0) {
     return <LoadingSvg/>
   };
   return (
      <div className=" mt-5 ">
         <ArtistInfoTop data={datas}/>
         <div className="flex items-center min-h-[52px] mb-[30px]">
            <ul className="zm-navbar-menu flex items-center justify-center gap-[10px]">
              {project.map((item, index) => (
                <NavLink key={index} to={item._path} className={(item) => (item.isActive ? "zm-navbar-item is-active" : "zm-navbar-item ")}>
                  <div className="navbar-link">
                     <span>{item._name}</span>
                  </div>
                </NavLink>
              ))}                                                    
            </ul>
         </div>
         <Outlet context={datas} />
      </div>
   );
};

export default ArtistPage;