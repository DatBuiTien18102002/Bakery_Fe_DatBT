import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import PhoneIcon from "@mui/icons-material/Phone";
import PlaceIcon from "@mui/icons-material/Place";
import MailIcon from "@mui/icons-material/Mail";
import classNames from "classnames/bind";
import DiamondIcon from "@/assets/images/DiamondIcon/Diamond.jsx";
import images from "@/assets/images";

import ImageCustom from "@/components/ImageCustom/ImageCustom";
import styles from "./Contact.module.scss";
import { fadeIn, fadeInRight } from "@/utils/animation";
import { ContactForm } from "@/forms";

const cx = classNames.bind(styles);
const Contact = () => {
  const contactRef = useRef();
  const isInView = useInView(contactRef, { margin: "-200px" });
  return (
    <div className={cx("contact")}>
      <div className="container">
        <motion.div
          className={cx("contact-bakery")}
          variants={fadeIn(1, 1)}
          initial="hidden"
          animate="show"
        >
          Baroibeo Bakery
        </motion.div>
        <div className={cx("tittle", "contact-page-tittle")}>
          <h2 className={cx("animate__animated animate__backInDown ")}>
            Liên hệ với chúng tôi
          </h2>
          <DiamondIcon className={cx("diamond-icon")} />
        </div>

        <div className={cx("contact-row")}>
          <div className={cx("contact-col")}>
            <div className={cx("contact__img-wrapper")}>
              <ImageCustom
                src={images.contactImg}
                hash={"LHP6KmD4,,IVu6R3ivE18_RjtSWW"}
                height="450px"
                className={cx("contact-img")}
              />
            </div>
          </div>
          <motion.div className={cx("contact-col")} ref={contactRef}>
            <motion.div
              className={cx("contact-wrapper")}
              variants={fadeInRight(1, 0 / 2, 1)}
              initial="hidden"
              animate={isInView && "show"}
            >
              <div className={cx("contact-tittle")}>Liên Lạc</div>
              <div className={cx("contact-address")}>
                <PhoneIcon className={cx("contact-icon")} />
                <div className={cx("contact-text")}>
                  HotLine đặt hàng: <strong>0766980574</strong>
                </div>
              </div>
              <div className={cx("contact-address")}>
                <MailIcon className={cx("contact-icon")} />
                <div className={cx("contact-text")}>
                  Email: <strong>datbui18102002@gmail.com</strong>
                </div>
              </div>
            </motion.div>

            <motion.div
              className={cx("contact-wrapper")}
              variants={fadeInRight(1, 1 / 2, 1)}
              initial="hidden"
              animate={isInView && "show"}
            >
              <div className={cx("contact-tittle")}>Thời gian</div>
              <div className={cx("contact-address")}>
                <div className={cx("contact-text")}>
                  Thứ 2 - Thứ 6: <strong>7 am - 11 pm</strong>
                </div>
              </div>
              <div className={cx("contact-address")}>
                <div className={cx("contact-text")}>
                  Thứ 7 - Chủ nhật : <strong>8 am - 9 pm</strong>
                </div>
              </div>
            </motion.div>

            <motion.div
              className={cx("contact-wrapper")}
              variants={fadeInRight(1, 2 / 2, 1)}
              initial="hidden"
              animate={isInView && "show"}
            >
              <div className={cx("contact-tittle")}>Địa chỉ</div>
              <div className={cx("contact-address")}>
                <PlaceIcon className={cx("contact-icon")} />
                <div className={cx("contact-text")}>
                  CH1: 125/2 Hòa Hưng, Phường 10, Quận 10, TP.HCM, Việt Nam
                </div>
              </div>
              <div className={cx("contact-address")}>
                <PlaceIcon className={cx("contact-icon")} />
                <div className={cx("contact-text")}>
                  CH2: 128/5 Đường Bùi Quang Là, Phường 12, Quận Gò Vấp,TP.HCM,
                  Việt Nam
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className={cx("contact__form-wrapper")}>
          <div className={cx("contact-form")}>
            <h3 className={cx("contact__form-title")}>Liên hệ </h3>
            <ContactForm />
          </div>

          <div className={cx("contact__form-map")}>
            <iframe
              title="Vị trí Tiệm"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d582.6267255130549!2d106.67216106257494!3d10.778356697644139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f8663dc4a19%3A0xa53f92e041dc33a!2zR2FtZUhvbWUgSMOyYSBIxrBuZw!5e0!3m2!1svi!2s!4v1693385424847!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: "15px" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
