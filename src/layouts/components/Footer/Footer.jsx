import React from "react";
import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import images from "@/assets/images";

import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";

import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TikTokIcon from "@/assets/images/TikTokIcon/TikTokIcon.jsx";
import PhoneIcon from "@mui/icons-material/Phone";
import PlaceIcon from "@mui/icons-material/Place";
import MailIcon from "@mui/icons-material/Mail";

const cx = classNames.bind(styles);
const Footer = () => {
  return (
    <footer className={cx("footer")}>
      <div className={cx("footer-content")}>
        <div className="container">
          <div className={cx("footer-row")}>
            <div className={cx("footer-col")}>
              <div className={cx("footer-logo")}>
                <img src={images.logo} alt="" />
              </div>
              <div className={cx("footer-desc")}>
                Chúng tôi luôn mong muốn mang đến cho khách hàng những trải
                nghiệm tốt nhất, tạo ra những khoảng khắc khó quên khi đến
                Baroibeo bakery.
              </div>
              <div className={cx("footer-social")}>
                <a
                  href="https://twitter.com/"
                  className={cx("footer-social-link")}
                >
                  <TwitterIcon />
                </a>
                <a
                  href="https://facebook.com/"
                  className={cx("footer-social-link")}
                >
                  <FacebookOutlinedIcon />
                </a>
                <a
                  href="https://Instagram.com/"
                  className={cx("footer-social-link")}
                >
                  <InstagramIcon />
                </a>
                <a
                  href="https://tiktok.com/"
                  className={cx("footer-social-link")}
                >
                  <TikTokIcon />
                </a>
                <a
                  href="https://youtube.com/"
                  className={cx("footer-social-link")}
                >
                  <YouTubeIcon />
                </a>
              </div>
            </div>

            <div className={cx("footer-col")}>
              <div className={cx("footer-location")}>
                <div className={cx("footer-tittle")}>Hệ thống cửa hàng</div>
                <div className={cx("footer-address")}>
                  <PlaceIcon className={cx("footer-icon")} />
                  <div className={cx("footer-text")}>
                    CH1: 125/2 Hòa Hưng, Phường 10, Quận 10, TP.HCM, Việt Nam
                  </div>
                </div>
                <div className={cx("footer-address")}>
                  <PlaceIcon className={cx("footer-icon")} />
                  <div className={cx("footer-text")}>
                    CH2: 128/5 Đường Bùi Quang Là, Phường 12, Quận Gò
                    Vấp,TP.HCM, Việt Nam
                  </div>
                </div>
              </div>

              <div className={cx("footer-contact")}>
                <div className={cx("footer-tittle")}>Liên hệ</div>
                <div className={cx("footer-address")}>
                  <PhoneIcon className={cx("footer-icon")} />
                  <div className={cx("footer-text")}>
                    {" "}
                    HotLine đặt hàng: 0766980574
                  </div>
                </div>
                <div className={cx("footer-address")}>
                  <MailIcon className={cx("footer-icon")} />
                  <div className={cx("footer-text")}>
                    Email: datbui18102002@gmail.com
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={cx("copy-right")}>
        © Bản quyền thuộc về <span> Baroibeo Bakery</span>
      </div>
    </footer>
  );
};

export default Footer;
