/*================== npm package ==========================*/
import { auth, database, setDoc, doc, serverTimestamp, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "../assets/firebase-config.js";
import { setUser } from "../assets/redux/Features/userFeatures.js";
import { SignUpStyles } from "../assets/styledComponents.js";
import React, { useState, memo, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";

/*========================================================
# Biểu mẫu đăng nhập
========================================================*/
const SignInForm = memo(({ setSign }) => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { register, handleSubmit, reset, setFocus, formState: { errors }} = useForm({ 
     resolver: yupResolver(yup.object({
       email: yup.string().required("Vui lòng nhập tài khoản vào ô này").max(40, "Email bạn nhập quá dài").email("Biểu mẫu email được cung cấp không dúng định dạng"),
       password: yup.string().required("Vui lòng nhập mật khẩu vào ô này").max(30, "Độ dài mật khẩu không quá 30 kí tự").min(6, "Độ dài tối thiểu 6 ký tự"),
     })), 
     mode: "onChange"
   });

   useEffect(() => {
      setFocus("email");
   }, [setFocus]);

   const login = handleSubmit((data) => {
      signInWithEmailAndPassword(auth, data.email, data.password).then((userCredential) => {
        setTimeout(() => reset({ 
          email: "",
          password: "" 
        }), 1000);
        dispatch(setUser({
          displayName: userCredential.user.displayName,
          photoURL: userCredential.user.photoURL,
          email: userCredential.user.email,
          uid: userCredential.user.uid,
        }));
        toast("Đăng Nhập Thành Công, Chúc bạn có giây phút nghe nhạc vui vẻ 😍", {
          type: "success",
        });
        setTimeout(() => navigate("/"), 700);
      }).catch((e) => {
        toast("Đăng Nhập không thành công, Tài Khoản hoặc Mật Khẩu không chính xác 🥲", {
          type: "error",
        });
        setTimeout(() => reset({ 
          password: ""
        }), 1000);
      });
   });

   return (
      <div>
         <form onSubmit={login} name="loginForm" className="loginForm w-full">
            {/* Tài Khoản */}
            <div className="form-group">
               <input {...register("email")} type="email" className="form-control email" name="email" placeholder="Email " />
            </div>
            <div style={{ paddingLeft: "1rem", marginTop: "0.375rem", color: "red" }}>{errors?.email?.message}</div>
           {/* Mật Khẩu */}
            <div className="form-group">
               <input {...register("password")} type="password" className="form-control password" name="password" placeholder="Password" />
               <span className="fa fa-eye-slash pwd-toggle" />
            </div>
            <div className="mt-[6px]  px-[1rem] text-red-500">{errors?.password?.message}</div>
            <button className="btn-login" type="submit">
               Đăng Nhập
            </button>
         </form>
         <div className="flex items-center justify-between mt-[20px]">
            <div>Bạn chưa có tài khoản?</div>
            <button onClick={() => setSign(false)} className="underline text-blue-600">
              Đăng ký{" "}
            </button>
         </div>
      </div>
   );
});
/*========================================================
# Biểu mẫu đăng ký
========================================================*/
const SignUpForm = ({ setSign }) => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { register, handleSubmit, reset, setFocus, formState: { errors, isSubmitting }} = useForm({
     resolver: yupResolver(yup.object({
       email: yup.string().required("Vui lòng nhập email vào ô này").max(40, "Email bạn nhập quá 40 kí tự").email("Biểu mẫu email được cung cấp không dúng định dạng"),
       password: yup.string().required("Vui lòng nhập mật khẩu vào ô này").max(30, "Độ dài mật khẩu không quá 30 kí tự").min(6, "Độ dài tối thiểu 6 ký tự"),
       passwordCheck: yup.string().required("Vui lòng nhập lại mật khẩu vào ô này").oneOf([yup.ref("password"), null], "Mật khẩu bạn nhập lại không khớp với mật khẩu trước đó"),
       name: yup.string().required("Vui lòng nhập tên vào ô này").max(30, "Tên của bạn quá dài").min(5, "Tên không thể ngắn quá 5 kí tự"),
     })),
     mode: "onChange",
   });

   const onSubmit = handleSubmit(async(data) => {
      createUserWithEmailAndPassword(auth, data.email, data.password).then(async(userCredential) => {
        updateProfile(auth.currentUser, { displayName: data.name }); 
        await setDoc(doc(database, "users", userCredential.user.uid), {
          email: data.email,
          password: data.password,
          name: data.name,
          id: userCredential.user.uid,
          favouriteSongs: [],
          favouritePlaylist: [],
          favouriteArtist: [],
          timestamp: serverTimestamp(),
        });
        dispatch(setUser({
          displayName: data.name,
          photoURL: userCredential.user.photoURL,
          email: userCredential.user.email,
          uid: userCredential.user.uid,
        }));
        // reset lại form khi nhập xong các giá trị 
        setTimeout(() => {
          reset({ 
            email: "",
            password: "",
            passwordCheck: "",
            name: ""
          });
        }, 1000);
         
        toast("Đăng ký Thành Công", {
          type: "success",
        });
        setTimeout(() => navigate("/"), 1000);
      }).catch((error) => {
        console.log(error);
        return toast("Đăng ký Không Thành Công ", {
          type: "error",
        });
      });
   }); 

   useEffect(() => {
      setFocus("email");
   }, [setFocus]);

   return (
      <div>
         <form onSubmit={onSubmit} name="loginForm" className="loginForm w-full">
            <div className="form-group">
               <input {...register("email")} type="email" className="form-control email" name="email" placeholder="Email " />
            </div>
            <div className="mt-[6px]  px-[1rem] text-red-500">{errors?.email?.message}</div>

            <div className="form-group">
               <input {...register("password")} type="password" className="form-control password" name="password" placeholder="Mật khẩu"/>
               <span className="fa fa-eye-slash pwd-toggle" />
            </div>
            <div className="mt-[6px]  px-[1rem] text-red-500">{errors?.password?.message}</div>

            <div className="form-group">
               <input {...register("passwordCheck")} type="password" className="form-control password" name="passwordCheck" placeholder="Nhập lại mật khẩu"/>
               <span className="fa fa-eye-slash pwd-toggle" />
            </div>
            <div className="mt-[6px]  px-[1rem] text-red-500">{errors?.passwordCheck?.message}</div>

            <div className="form-group">
               <input {...register("name")} type="text" className="form-control" name="name" placeholder="Tên hiển thị" />
               <span className="fa fa-eye-slash pwd-toggle" />
            </div>
            <div className="mt-[6px] px-[1rem] text-red-500" >{errors?.name?.message}</div>

            <button disabled={isSubmitting} className="btn-login " type="submit">
               {isSubmitting ? "Loading..." : "Đăng Ký"}
            </button>
         </form>
         <div className="flex items-center justify-between mt-[20px]">
            <div>Bạn đã có tài khoản?</div>
            <button onClick={() => setSign(true)} className="underline text-blue-600">
               Đăng Nhập{" "}
            </button>
         </div>
      </div>
   );
};
/*========================================================
# AuthenticationPage
========================================================*/
const AuthenticationPage = () => {
   const [sign, setSign] = useState(true);
   const clickerErr = () => toast("Xin lỗi hiện tại phương thức đăng nhập này đang được phát triển", {          
     type: "error",        
   });
   return (
      <SignUpStyles>
         <div className="gird wide">
            <div className="flex w-full h-[100vh] items-center justify-center">
               <div className=" mb-[5rem] l-8 m-10 c-12">
                  <div className="row !flex-wrap authForm">
                     <div className="col l-5 m-5 c-12 left flex items-center justify-center ">
                        <div className="sider">
                           <div className="sider_brand-item">
                              <div className="sider_brand-item-img">
                                 <img src="/avatarMain.png" alt="logo" />
                              </div>
                              <p className="sider_brand-item-text">
                                 <Link to="/">BlackCat-Club</Link>
                              </p>
                           </div>
                        </div>

                        <div className="text-center mb-[2rem]  font-semibold">Đăng nhập bằng mạng xã hội để truy cập nhanh</div>
                        <div className="flex flex-col justify-start items-center gap-[16px]">
                           <button onClick={clickerErr} className="btnAuth bg-[#3b5998]">Tiếp tục với Facebook</button>
                        </div>

                     </div>
                     <div className="col l-7 m-7 c-12 right">
                        <div className="flex  items-baseline justify-center ">
                           <div className="text-header active">{sign ? "Đăng Nhập" : "Đăng Ký"}</div>
                        </div>
                        {sign ? <SignInForm setSign={setSign}/> : <SignUpForm setSign={setSign}/>}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </SignUpStyles>
   );
};

export default AuthenticationPage;