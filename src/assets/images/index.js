/* eslint-disable no-undef */
import productImg from '@/assets/images/product_img_default.jpg'
import avatar from '@/assets/images/avatar.jpg'
import carousel1 from "@/assets/images/bgcake1.jpg"
import carousel2 from "@/assets/images/bgcake2.jpg"
import carousel3 from "@/assets/images/bgcake3.jpg"
import iconBakery from "@/assets/images/icon_bakery.png"
import imgBakeryFront from "@/assets/images/image_bakery_front.png"
import imgBakeryBehind from "@/assets/images/image_bakery_behind.jpg"
import cupcake from "@/assets/images/discover_cake1.png"
import fritter from "@/assets/images/discover_cake2.png"
import pancake from "@/assets/images/discover_cake3.png"
import tiramisu from "@/assets/images/discover_cake4.png"
import donut from "@/assets/images/discover_cake5.png"
import strawberryCake from "@/assets/images/discover_cake6.png"
import imgShop1 from "@/assets/images/picture_shop_1.jpg"
import imgShop2 from "@/assets/images/picture_shop_2.jpg"
import imgShop3 from "@/assets/images/picture_shop_3.jpg"
import imgShop4 from "@/assets/images/picture_shop_4.jpg"
import logo from "@/assets/images/logo.png"
import avatar1 from "@/assets/images/avatar1.jpg"
import avatar2 from "@/assets/images/avatar2.jpg"
import avatar3 from "@/assets/images/avatar3.jpg"
import avatar4 from "@/assets/images/avatar4.jpg"
import contactImg from "@/assets/images/contact-us-image.jpg"
import aboutIcon1 from "@/assets/images/about-icon-1.png"
import aboutIcon2 from "@/assets/images/about-icon-2.png"
import aboutIcon3 from "@/assets/images/about-icon-3.png"
import aboutIcon4 from "@/assets/images/about-icon-4.png"
import aboutPage from "@/assets/images/aboutus.jpg"
import noCart from "@/assets/images/empty_cart.png"
import noOrder from "@/assets/images/no-order.svg"
import gifLoad from "@/assets/images/load.gif"
import pageProductNotFound from "@/assets/images/pageProductNotFound.png"
import noComment from "@/assets/images/noComment.jpg"
import notFound from "@/assets/images/PageNotFound.jpg"



const images = {
    productImgDefault: productImg,
    avatarDefault: avatar,
    carousel: [{ src: carousel2, hash: "L29%O|~XF*LMd;MJD%I:0NNF?uZ$" }, { src: carousel3, hash: "L04n-|-;004.00Nb~q-VTdW;a0%1" }, { src: carousel1, hash: "L04n-|-;004.00Nb~q-VTdW;a0%1" }],
    iconCarousel: iconBakery,
    introduceFont: imgBakeryFront,
    introduceBehind: imgBakeryBehind,
    discoverCake: {
        cupcake,
        fritter,
        pancake,
        tiramisu,
        donut,
        strawberryCake,
    },

    imgShop: {
        imgShop1,
        imgShop2,
        imgShop3,
        imgShop4,
    },
    logo,
    commentAvatar: {
        avatar1,
        avatar2,
        avatar3,
        avatar4,
    },
    contactImg,

    aboutIcon: {
        aboutIcon1,
        aboutIcon2,
        aboutIcon3,
        aboutIcon4,
    },
    aboutPage,
    noCart,
    noOrder,
    gifLoad,
    pageProductNotFound,
    noComment,
    notFound

};

export default images;
