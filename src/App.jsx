import React, { memo, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { auth, onAuthStateChanged } from "./assets/firebase-config.js";
import { setPlaying } from "./assets/redux/Features/settingPlayFeatures.js";
import { setUser } from "./assets/redux/Features/userFeatures.js";
import Siderleft from "./components/layout/Siderleft.jsx";
import BottomPlay from "./components/layout/Bottom.jsx";
import Header from "./components/layout/Header.jsx";
import RouterPage from "./router/RouterPage";
// Component được đánh dấu là memo để tối ưu hoá render
const App = memo(() => {
   // Sử dụng useSelector để lấy state từ Redux
   const queueNowPlaySelector = useSelector((state) => state.queueNowPlay);
   const timeSelector = useSelector((state) => state.currentTimes);
   const settingSelector = useSelector((state) => state.setting);
   const loggedSelector = useSelector((state) => state.logged);
   const lyricsSelector = useSelector((state) => state.lyrics);
   const usersSelcetor = useSelector((state) => state.users);
   const theme = useSelector((state) => state.themetoggle);
   // Sử dụng useDispatch để gửi các action đến Redux
   const dispatch = useDispatch();
   // Hàm giúp đặt giá trị vào localStorage một cách an toàn
   const setLocalStorageItem = (key, value) => {
      if (!JSON.parse(localStorage.getItem(key))) {
         localStorage.setItem(key, JSON.stringify(value));
      };
   };
   // Sử dụng useLayoutEffect để thực hiện các tác vụ layout cần thiết ngay sau khi DOM được cập nhật
   useLayoutEffect(() => {
      // Lắng nghe sự kiện thay đổi trạng thái xác thực
      onAuthStateChanged(auth, (user) => {
         // Nếu chưa đăng nhập và có user, dispatch action để set user vào Redux
         if (!usersSelcetor.activeUser && user) {
            dispatch(setUser({
               displayName: user.displayName,
               photoURL: user.photoURL,
               email: user.email,
               uid: user.uid,
            }));
         }
      });
      // eslint-disable-next-line
   }, [usersSelcetor.activeUser]);
   // Sử dụng useEffect để lắng nghe sự kiện bàn phím và thực hiện các tác vụ tương ứng
   useEffect(() => {
      const keyboardShortcuts = (e) => {
         const isInput = Array.from(document.querySelectorAll("input")).some((input) => input === document.activeElement);
         if (isInput) return;
         if (e.keyCode === 32) {
            e.preventDefault();
            dispatch(setPlaying());
         } else if (e.keyCode === 39 || e.keyCode === 37 || e.keyCode === 74 || e.keyCode === 76) {
            // Đối tượng ánh xạ mã phím sang các ID tương ứng
            const keyMap = {
               39: "nextMusic",
               37: "prevMusic",
               74: "randomMusic",
               76: "loopMusic",
            };
            document.querySelector(`#${keyMap[e.keyCode]}`).click();
         };
      };
      document.addEventListener("keydown", keyboardShortcuts);
      return () => document.removeEventListener("keydown", keyboardShortcuts);
      // eslint-disable-next-line
   }, []);

   // Sử dụng useLayoutEffect để cập nhật giao diện người dùng dựa trên theme
   useLayoutEffect(() => {
      const rootElement = document.documentElement;
      rootElement.setAttribute("data-theme", theme.dataTheme);
      rootElement.classList.toggle("theme-bg-image", theme.bgImg);
      rootElement.classList.toggle("zma", theme.bgPlaying);
      // Nếu có style được đặt, áp dụng style vào rootElement
      if (theme.dataStyle) {
         rootElement.setAttribute("style", theme.dataStyle.join(" ; "));
      } else {
         rootElement.removeAttribute("style");
      };
      // eslint-disable-next-line
   }, [theme]);

   // Sử dụng useLayoutEffect để đặt giá trị ban đầu cho localStorage
   useLayoutEffect(() => {
      setLocalStorageItem("queue_nowplay", queueNowPlaySelector);
      setLocalStorageItem("blackcat_logged", loggedSelector);
      setLocalStorageItem("blackcat_setting", settingSelector);
      setLocalStorageItem("blackcat_lyrics", lyricsSelector);
      setLocalStorageItem("blackcat_timeCurrent", timeSelector);
      // eslint-disable-next-line
   }, []);

   // JSX trả về cho component
   return (
      <>
         <div className={`main ${queueNowPlaySelector.currentEncodeId ? "" : "hide-bottom"}`} style={theme.bgImg ? { backgroundImage: `url('${theme.bgImg}')` } : {}}>
            <Header />
            <Siderleft />
            <BottomPlay />
            <RouterPage />
            <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover limit={5} />
         </div>
      </>
   );
});

// Xuất component để sử dụng trong ứng dụng
export default App;