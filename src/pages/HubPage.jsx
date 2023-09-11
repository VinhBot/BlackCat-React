import { useNavigate } from "react-router";
import React from "react";

import { LoadingSvg } from "../components/loading/LoadingSvg.jsx";
import NationsHub from "../components/HubPage/NationsHub.jsx";
import GenreHub from "../components/HubPage/GenreHub.jsx";
import MoodHub from "../components/HubPage/MoodHub.jsx";
import data from "../assets/Json/hubPage.json";

const HubPage = () => {
   const navigate = useNavigate();
   const datas = data.data;
   const linkVip = datas.banners[1].link;
   const selectoNation = datas.nations;
   const selectoGenre = datas.genre;
   const selectoMood = datas.topic;
   if (datas.length === 0) return <LoadingSvg/>
   return (
      <div className="transition-all" style={{ width: "100%", borderRadius: "4px", position: "relative", overflow: "hidden", color: "var(--text-primary)" }}>
         <div>
            <figure onClick={() => navigate(`/hub/detail/${linkVip.slice(linkVip.lastIndexOf("/") + 1, linkVip.lastIndexOf("."))}`)} className="cursor-pointer image banner-image is-48x48 !rounded-xl overflow-hidden">
               <img src={datas.banners[1].cover} alt="" />
            </figure>
         </div>
         <MoodHub data={selectoMood}/>
         <NationsHub data={selectoNation}/>
         <GenreHub data={selectoGenre}/>
      </div>
   );
};

export default HubPage;