import React, { useEffect, useState, useLayoutEffect, useCallback } from "react";
import { useParams } from "react-router";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useSelector } from "react-redux";
import { fancyTimeFormat, scrollTop } from "../asset/data/functions";
import { tmdAPI } from "../asset/api/path";
import scrollIntoView from "smooth-scroll-into-view-if-needed";
import {
  AlbumPageInfo, PlayListSelector, CarouselItem, 
  ItemArits, ItemChartList, LoadingSvg,
} from "../components/main";  

import "./styles/AlbumPage.scss";

const AlbumPage = () => {
   const currentEncodeId = useSelector((state) => state.queueNowPlay.currentEncodeId);
   const { id } = useParams();
   const [datas, setData] = useState([]);
   const [dataSuggested, setDataSuggested] = useState([]);
   useEffect(() => {
      let node = document.querySelector(`.main_topchart .zing-chart_item.main_page-hover.active`)
      if (!node) return
      setTimeout(() => scrollIntoView(node, {
        block: "center",
        behavior: "smooth",
        scrollMode: "if-needed",
      }), 200);
   }, [currentEncodeId, datas]);
   useLayoutEffect(() => {
      scrollTop()
      fetchData()
      fetchDataSuggested()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [id]);
   const fetchData = useCallback(async () => {
      const data = await axios.get(tmdAPI.getAlbumPage(id))
      setData(data.data.data)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
   const fetchDataSuggested = useCallback(async () => {
      const data = await axios.get(tmdAPI.getSuggestedAlbum(id))
      setDataSuggested(data.data.data);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
   if (datas?.length === 0 || dataSuggested?.length === 0) return <LoadingSvg/>
   const idAlbum = datas?.encodeId;
   let indexItem = -1;
   return (
      <div className="albumpagestyles mt-[10px]">
         <div className="playlist-detail-container">
            <div className="clearfix">
               <AlbumPageInfo datas={datas}></AlbumPageInfo>
               <div className="playlist-content">
                  <div className="description">
                     {datas?.sortDescription && (
                        <>
                           <span>Lời tựa</span> {datas?.sortDescription}
                        </>
                     )}
                  </div>

                  <div className="main_topchart mt-2">
                     <div className="container_zing-chart">
                        <div className="zing-chart_list pt-2">
                           <div className="zing-chart_item none-hover main_page-hover">
                              <div className="zing-chart_item-left">
                                 <div className="zing-chart_item-info column-text">BÀI HÁT</div>
                              </div>

                              <div className="zing-chart_item-center">
                                 <p className="thesong_name column-text">ALBUM</p>
                              </div>

                              <div className="zing-chart_item-right gap-3">
                                 <p className="thesong_time column-text">THỜI GIAN</p>
                              </div>
                           </div>

                           {datas?.song?.items.map((e, index) => {
                              if(e.streamingStatus === 1) {
                                 indexItem++;
                              };
                              return (
                                 <ItemChartList
                                    idAlbum={idAlbum}
                                    isNoneRank
                                    item={e}
                                    index={index}
                                    indexNotVip={indexItem}
                                    key={e.encodeId}
                                 />
                              );
                           })}
                           <h3 className="bottom-info subtitle mt-[10px] ml-[12px]">
                              <span>{datas?.song?.total} bài hát</span>
                              <span className="mx-[8px]">•</span>
                              <span>{fancyTimeFormat(datas?.song?.totalDuration, 1)}</span>
                           </h3>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div>
               {dataSuggested?.map((e) => {
                  // eslint-disable-next-line
                  if(e.sectionType === "adBanner") return;

                  if(e.sectionType === "artist") {
                     return (
                        <PlayListSelector key={uuidv4()} title={e.title}>
                           {e?.items?.map((item, index) => {
                              // eslint-disable-next-line
                              if(index > 4) return
                              let classGird = "col l-2-4 m-3 c-5"
                              if(index === 4) {
                                 classGird = "col l-2-4 m-0 c-5"
                              };
                              return <ItemArits key={uuidv4()} classGird={classGird} data={item}/>
                           })}
                        </PlayListSelector>
                     )
                  }

                  if (e.sectionType === "playlist") {
                     return (
                        <PlayListSelector key={uuidv4()} title={e.title}>
                           {e?.items?.map((item, index) => {
                              // eslint-disable-next-line
                              if (index > 4) return
                              let classGird = "col l-2-4 m-3 c-5"
                              if (index === 4) {
                                 classGird = "col l-2-4 m-0 c-5"
                              };
                              return (<CarouselItem isSwiper={true} key={uuidv4()} artis={true} desc={false} class1={classGird} item={item}/>)
                           })}
                        </PlayListSelector>
                     )
                  }
                  return <div key={uuidv4()}></div>
               })}
            </div>
         </div>
      </div>
   )
}


export default AlbumPage
