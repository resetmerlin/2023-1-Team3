import React, { useEffect, useState } from "react";

export const getImageSrc = (user) => {
  const [imageVersion, setImageVersion] = useState(Date.now());

  useEffect(() => {
    setImageVersion(Date.now());
  }, [user]);

  const imageSrc =
    user?.image === "DEFAULT" && user?.gender === "MALE"
      ? `../default/default-men.png`
      : user?.image === "DEFAULT" && user?.gender === "FEMALE"
      ? `../default/default-women.png`
      : user?.image;

  // Add imageVersion as a query parameter to the URL
  return `${imageSrc}?ver=${imageVersion}`;
};
/** 현재 IS0 format 시간대를 보내 줌 */
export const giveCurrentTime = () => {
  const date = new Date();
  const utcTime = date.getTime();
  const kstDate = new Date(utcTime + 9 * 60 * 60 * 1000);

  const year = kstDate.getUTCFullYear();
  const month = ("0" + (kstDate.getUTCMonth() + 1)).slice(-2);
  const day = ("0" + kstDate.getUTCDate()).slice(-2);
  const hours = ("0" + kstDate.getUTCHours()).slice(-2);
  const minutes = ("0" + kstDate.getUTCMinutes()).slice(-2);
  const seconds = ("0" + kstDate.getUTCSeconds()).slice(-2);

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
};
