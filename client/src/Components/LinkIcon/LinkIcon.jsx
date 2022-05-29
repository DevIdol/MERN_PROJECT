import { MdEmail } from "react-icons/md";
import { AiFillGithub } from "react-icons/ai";
import { FaFacebookF, FaTelegramPlane } from "react-icons/fa";
import { BsInstagram, BsTwitter } from "react-icons/bs";
export const Email = ({ className, size }) => {
  return (
    <a
      href="mailto:devidol.mm@gmail.com"
      target="__back"
      rel="nofollow noopener noreferrer"
    >
      <MdEmail className={className} size={size} />
    </a>
  );
};

export const GitHub = ({ className, size }) => {
  return (
    <a
      href="https://github.com/DevIdol"
      target="__back"
      rel="nofollow noopener noreferrer"
    >
      <AiFillGithub className={className} size={size} />
    </a>
  );
};
export const Facebook = ({ className, size }) => {
  return (
    <a
      rel="nofollow noopener noreferrer"
      href="https://www.facebook.com/profile.php?id=100026052723303"
      target="_blank"
    >
      <FaFacebookF className={className} size={size} />
    </a>
  );
};
export const Instagram = ({ className, size }) => {
  return (
    <a
      rel="nofollow noopener noreferrer"
      href="https://www.instagram.com/jostthang/"
      target="_blank"
    >
      <BsInstagram className={className} size={size} />
    </a>
  );
};
export const Twitter = ({ className, size }) => {
  return (
    <a
      rel="nofollow noopener noreferrer"
      href="https://twitter.com/johst21"
      target="_blank"
    >
      <BsTwitter className={className} size={size} />
    </a>
  );
};
export const Telegram = ({ className, size }) => {
  return (
    <a
      rel="nofollow noopener noreferrer"
      href="https://t.me/devidolmm"
      target="_blank"
    >
      <FaTelegramPlane className={className} size={size} />
    </a>
  );
};
