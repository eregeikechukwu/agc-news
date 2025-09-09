import Image from "next/image";

export default function NewsLetter() {
  return (
    <div className="mt-30 flex max-md:gap-[3.175rem] md:flex-row flex-col justify-between">
      <div className="md:w-[29.81rem] w-full flex flex-col md:gap-[0.94rem] gap-[0.5rem]">
        <div className="flex gap-[0.81rem]">
          <img
            src={"/images/email.png"}
            className="w-[3.13rem] h-auto"
            alt="email"
          />
          <p className="sm:text-[1.25rem] text-[1rem] font-nunito">
            Get the latest news and stories from around Africa directly into
            your inbox daily.
          </p>
        </div>
        <label htmlFor="email"></label>
        <input
          type="email"
          id="email"
          className="h-12 rounded-[0.31rem] p-4 bg-[#dedede]"
          placeholder="Enter your email address"
        />
        <button className="h-12 w-full bg-[#D32C89] hover:bg-[#d32c89cc] text-white rounded-[0.31rem] ">
          Get me in
        </button>
      </div>

      {/* Ad */}
      <div className="flex items-center">
        <Image
          src="/images/ads/BottomAd.jpg"
          width={577.6}
          height={148}
          alt="Ad"
        />
      </div>
    </div>
  );
}
