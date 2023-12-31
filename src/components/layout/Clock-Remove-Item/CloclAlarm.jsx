import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import usePortal from "react-cool-portal";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import React, { memo } from "react";
import * as yup from "yup";

import { setClockOff, setPlay } from "../../../assets/redux/Features/settingPlayFeatures.js";
import { _PortalStyle as PortalStyle } from "../../../assets/styledComponents";

const CloclAlarm = memo(() => {
   const dispatch = useDispatch()
   const clockOff = useSelector((state) => state.setting.clockOff)

   const { Portal, show, hide } = usePortal({ defaultShow: false })

   const handleClickBackdrop = (e) => {
      if (e.target.id === "theme-overlay" || e.target.id === "portal-bio-arits" || e.target.id === "close-block" || e.target?.parentElement?.id === "close-block") {
         hide();
      };
   };

   const { register, handleSubmit, watch, formState: { errors } } = useForm({
      resolver: yupResolver(yup.object({
         hours: yup.number().required("Vui lòng nhập số giờ"),
         minute: yup.number().required("Vui lòng nhập số phút"),
      })),
      mode: "onChange",
      defaultValues: {
         hours: "00",
         minute: "00",
      },
   });

   const watchHours = watch("hours") === "0" || watch("hours") === "00";
   const watchMinute = watch("minute") === "0" || watch("minute") === "00";

   let TimeOut;
   const handleClock = ({ hours, minute }) => {
      const timoutPause = parseInt(hours) * 60 * 60 * 1000 + parseInt(minute) * 60 * 1000;
      TimeOut = setTimeout(() => {
         dispatch(setClockOff(false))
         dispatch(setPlay(false))
      }, [timoutPause])
      clearTimeout(TimeOut);
      dispatch(setClockOff(true));
      hide();
      toast(`Nhạc sẽ dừng sau ${hours} Giờ, ${minute} Phút`, {
         type: "success",
         autoClose: "default",
      });
   };

   const handleRemoveTimeOut = () => {
      clearTimeout(TimeOut)
      dispatch(setClockOff(false))
      hide()
   };

   const err = errors.hours || errors.minute || (watchHours && watchMinute);

   return (
      <>
         <div onClick={() => show()} className={`player_btn queue_time ${clockOff ? "active" : ""}`}>
            <span className="material-icons-outlined"> alarm </span>
            <div className="playing_title-hover">Hẹn giờ</div>
         </div>
         <Portal>
            <PortalStyle>
               <div className="zm-portal-modal theme-modal-overlay" id="theme-overlay" onClick={handleClickBackdrop}>
                  {!clockOff && (
                     <div className="modal is-active">
                        <form onSubmit={handleSubmit(handleClock)} name="ClockOut">
                           <div role="presentation" className="modal-background">
                              <div className="modal-content">
                                 <div className="alarm-setting">
                                    <h3 className="title">Hẹn giờ dừng phát nhạc</h3>
                                    <div className="time-picker">
                                       <div className="time-input">
                                          <div className="control">
                                             <input
                                                onInput={(e) => {
                                                   if (e.target.value.length >= 2) {
                                                      e.target.value = e.target.value.slice(0, 2)
                                                   };
                                                }}
                                                {...register("hours")}
                                                className="input is-primary"
                                                type="number"
                                                defaultValue={"00"}
                                             />
                                          </div>
                                          <span className="label">giờ</span>
                                       </div>
                                       <div className="dot">:</div>
                                       <div className="time-input">
                                          <div className="control">
                                             <input
                                                onInput={(e) => {
                                                   if (e.target.value > 59) {
                                                      e.target.value = 59
                                                   };

                                                   if (e.target.value.length >= 2) {
                                                      e.target.value = e.target.value.slice(0, 2)
                                                   };
                                                }}
                                                {...register("minute", { maxLength: 2 })}
                                                className="input is-primary"
                                                type="text"
                                                pattern="\d*"
                                                maxLength="2"
                                                max={60}
                                                defaultValue={"00"}
                                             />
                                          </div>
                                          <span className="label">phút</span>
                                       </div>
                                    </div>
                                    <h3 className="estimate-time subtitle">Chọn thời gian để dừng phát nhạc</h3>
                                    <button
                                       disabled={err}
                                       className="w-full zm-btn active is-medium is-outlined is-fullwidth is-upper button"
                                       tabIndex={-1}
                                       type="submit"
                                    >
                                       Lưu lại
                                    </button>
                                    <button
                                       onClick={handleClickBackdrop}
                                       type="button"
                                       className="w-full zm-btn mar-t-10 active is-fullwidth is-upper button hover:opacity-90"
                                       tabIndex={0}
                                       id="close-block"
                                    >
                                       <i className="icon" />
                                       <span>Hủy</span>
                                    </button>
                                 </div>
                              </div>
                           </div>
                        </form>
                     </div>
                  )}
                  {clockOff && (
                     <div className="modal is-active">
                        <div role="presentation" className="modal-background">
                           <div className="confirm-modal">
                              <h3 className="title">Xóa hẹn giờ</h3>
                              <span>Bạn có chắc chắn muốn xóa hẹn giờ?</span>
                              <div className="actions flex items-end justify-end mt-[16px]">
                                 <button
                                    onClick={() => {
                                       hide()
                                    }}
                                    className="zm-btn is-outlined  is-small button"
                                    tabIndex={0}
                                 >
                                    Không
                                 </button>
                                 <button
                                    onClick={handleRemoveTimeOut}
                                    className="!ml-[16px] zm-btn is-outlined active  is-small button"
                                    tabIndex={0}
                                 >
                                    Có
                                 </button>
                              </div>
                           </div>
                        </div>
                     </div>
                  )}
               </div>
            </PortalStyle>
         </Portal>
      </>
   )
})

export default CloclAlarm
