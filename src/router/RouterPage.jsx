import { Route, Routes, useLocation } from "react-router-dom";
import React, { memo, useEffect, useRef } from "react";
// Components
import Loading from "../components/loading/Loading";
// 
const MyInfoPage = React.lazy(() => import('../components/MyMusicPage/MyInfoPage'));
const HistorySong = React.lazy(() => import('../components/HistoryPage/HistorySong'));
const HistoryVideo = React.lazy(() => import('../components/HistoryPage/HistoryVideo'));
const HistroryPlayList = React.lazy(() => import('../components/HistoryPage/HistroryPlayList'));
const SearchPagePlaylist = React.lazy(() => import('../components/SearchPage/SearchPagePlaylist'));
const SearchPageSong = React.lazy(() => import('../components/SearchPage/SearchPageSong'));
const SearchPageMv = React.lazy(() => import('../components/SearchPage/SearchPageMv'));
const SearchPageArtist = React.lazy(() => import('../components/SearchPage/SearchPageArtist'));
const SearchPageAll = React.lazy(() => import('../components/SearchPage/SearchPageAll'));
const HubDetailPage = React.lazy(() => import('../components/HubPage/HubDetailPage'));
const ArtistSingle = React.lazy(() => import('../components/ArtistPage/ArtistSingle'));
const ArtistMv = React.lazy(() => import('../components/ArtistPage/ArtistMv'));
const ArtistAlbum = React.lazy(() => import('../components/ArtistPage/ArtistAlbum'));
const ArtistSong = React.lazy(() => import('../components/ArtistPage/ArtistSong'));
const ArtistALl = React.lazy(() => import('../components/ArtistPage/ArtistALl'));
const MyMusicArtis = React.lazy(() => import('../components/MyMusicPage/MyMusicArtis'));
const MyMusicPlayList = React.lazy(() => import('../components/MyMusicPage/MyMusicPlayList'));
const MyMusicSong = React.lazy(() => import('../components/MyMusicPage/MyMusicSong'));
const MyMusicAll = React.lazy(() => import('../components/MyMusicPage/MyMusicAll'));
const NewFeedPageChidlen = React.lazy(() => import('../components/Followpage/NewFeedPageChidlen'));
const MvPageList = React.lazy(() => import('../components/MVpage/MvPageList'));
// pages
const AuthenticationPage = React.lazy(() => import('../pages/AuthenticationPage'));
const NewMusicPage = React.lazy(() => import('../pages/NewMusicPage'));
const VideoPopUp = React.lazy(() => import('../pages/VideoPopUp'));
const HistoryPage = React.lazy(() => import('../pages/HistoryPage'));
const ZingChartPage = React.lazy(() => import('../pages/ZingChartPage'));
const Top100Page = React.lazy(() => import('../pages/Top100Page'));
const SearchPage = React.lazy(() => import('../pages/SearchPage'));
const RadioPage = React.lazy(() => import('../pages/RadioPage'));
const NotFound = React.lazy(() => import('../pages/NotFound'));
const NewFeedPage = React.lazy(() => import('../pages/NewFeedPage'));
const MyMusicPage = React.lazy(() => import('../pages/MyMusicPage'));
const MvPage = React.lazy(() => import('../pages/MvPage'));
const HubPage = React.lazy(() => import('../pages/HubPage'));
const HomePage = React.lazy(() => import('../pages/HomePage'));
const AlbumPage = React.lazy(() => import('../pages/AlbumPage'));
const ArtistPage = React.lazy(() => import('../pages/ArtistPage'));
const Profile = React.lazy(() => import('../pages/Profile'));

const RouterPage = memo(() => {
   const mainPageRef = useRef();
   const location = useLocation();
   useEffect(() => {
      mainPageRef.current.addEventListener("scroll", function() {
         if(mainPageRef.current.scrollTop > 30) {
            document.documentElement.classList.add("is-scroll");
         } else {
            document.documentElement.classList.remove("is-scroll");
         };
      });
   }, []);
   return (
      <div ref={mainPageRef} id="scrollableDiv" className="main-page">
        <div className="container">
          <Routes location={location} key={location.pathname}>
            <Route element={<Loading/>}>
              {/* Phần trang cá nhân, giao diện người dùng */}
              <Route path="/mymusic/" element={<MyMusicPage />}>
                  <Route path="playlist" element={<MyMusicPlayList />}/>
                  <Route path="nghe-si" element={<MyMusicArtis />}/>
                  <Route path="song" element={<MyMusicSong />}/>
                  <Route path="info" element={<MyInfoPage />}/>
                  <Route index element={<MyMusicAll />}/>
               </Route>
               {/* phần đăng nhập, trang chủ */}
               <Route path="/auth" element={<AuthenticationPage />} />
               <Route index element={<HomePage />}/>
               <Route path="/" element={<HomePage />}/>
               <Route path="/zing-chart" element={<ZingChartPage />}/>
               <Route path="/radio" element={<RadioPage />}/>
               <Route path="newfeed/:nation" element={<NewFeedPage />}>
                  <Route path=":id" element={<NewFeedPageChidlen />}/>
               </Route>
               {/*  */}
               <Route path="/moi-phat-hanh" element={<NewMusicPage/>}/>
               <Route path="/hub/" element={<HubPage/>}/>
               <Route path="/hub/detail/:id" element={<HubDetailPage/>}/>
               <Route path="/top100" element={<Top100Page/>}/>
               {/*  */}
               <Route path="/mv" element={<MvPage/>}>
                  <Route path=":id" element={<MvPageList/>}/>
               </Route>
               {/* Phần tìm kiếm */}
               <Route path="/tim-kiem" element={<SearchPage/>}>
                  <Route path="tatca/:id" element={<SearchPageAll/>}/>
                  <Route path="baihat/:id" element={<SearchPageSong/>}/>
                  <Route path="artist/:id" element={<SearchPageArtist/>}/>
                  <Route path="video/:id" element={<SearchPageMv/>}/>
                  <Route path="playlist/:id" element={<SearchPagePlaylist/>}/>
               </Route>
               {/*  */}
               <Route path="/nghe-si/:name" element={<ArtistPage/>}>
                  <Route index element={<ArtistALl/>}/>
                  <Route path="song" element={<ArtistSong/>}/>
                  <Route path="album" element={<ArtistAlbum/>}/>
                  <Route path="mv" element={<ArtistMv/>}/>
                  <Route path="single" element={<ArtistSingle/>}/>
               </Route>
               {/*  */}
               <Route path="/history/" element={<HistoryPage/>}>
                  <Route index path="playlist" element={<HistroryPlayList/>}/>
                  <Route path="video" element={<HistoryVideo/>}/>
                  <Route path="song" element={<HistorySong/>}/>
               </Route>
               {/*  */}
               <Route path="/video-clip/:id" element={<VideoPopUp/>}/>
               <Route path="/album/:id" element={<AlbumPage/>}/>
               <Route path="/profile" element={<Profile/>}/>
               {/* Hiển thị nếu không thể tìm thấy trang yêu cầu */}
               <Route path="*" element={<NotFound/>}/>
            </Route>
          </Routes>
        </div>
      </div>
   );
});

export default RouterPage;