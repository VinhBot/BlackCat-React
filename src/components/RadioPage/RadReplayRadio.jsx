import React, { memo } from "react";
import { v4 as uuidv4 } from "uuid";

import CarouselItem from "../Selection/CarouselItem";
import PlayListSelector from "../Selection/PlayListSelector";

const PodcastRadio = memo(({ data }) => {
   const SubTitle = (item) => (
      <div className="care_title">
         <div className="care_title-img">
            <img src={item?.thumbnail} alt="" />
         </div>
         <div className="care_title-text">
            <h3 className="uppercase">{data?.title}</h3>
            <a href="#!">{item?.title}</a>
         </div>
      </div>
   );

   return (
      <PlayListSelector isTitleSub={SubTitle(data?.subTitle)} title={data?.title}>
         {data?.items?.length > 0 && data?.items.map((e, index) => {
            if (index > 4) return
            let classGird = "col l-2-4 m-3 c-5"
            if (index === 4) {
               classGird = "col l-2-4 m-0 c-5"
            }

            return (
               <CarouselItem
                  isHiddenButton={true}
                  isSwiper={true}
                  key={e.encodeId}
                  artis={false}
                  desc={false}
                  class1={classGird}
                  item={e}
               ></CarouselItem>
            )
         })}
         {!data && Array(5).fill(0).map((e, index) => {
            let classGird = "col l-2-4 m-3 c-5"
            if (index === 4) {
               classGird = "col l-2-4 m-0 c-5"
            }

            return (
               <CarouselItem.Loading
                  key={uuidv4()}
                  artis={false}
                  desc={false}
                  class1={classGird}
                  item={e}
               ></CarouselItem.Loading>
            )
         })}
      </PlayListSelector>
   )
});

const RadReplayRadio = ({ data }) => {
   return (
      <>
         {data?.map((e) => {
            return <PodcastRadio data={e} key={uuidv4()}></PodcastRadio>
         })}
      </>
   )
}

export default RadReplayRadio
