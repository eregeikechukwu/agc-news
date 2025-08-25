export function useImage(url = "") {
  const safeBannerImage = String(url || "").trim();

  const imageSrc = safeBannerImage
    ? safeBannerImage
    : "/images/placeholder-image.jpg";

  return imageSrc;
}
