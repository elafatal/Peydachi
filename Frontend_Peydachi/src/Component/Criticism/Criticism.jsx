import React from 'react';

const CenteredVideo = () => {
  return (
    <div className="flex items-center flex-col justify-center py-15 lg:py-20 bg-gray-100">
        {/* <h1 className='text-2xl font-bold pb-5 '>صفحه ی انتقادات و پیشنهادات از مجموعه</h1> */}
      <video
        controls
        className="w-4/5 max-w-3xl rounded-xl shadow-lg"
      >
        <source src="/enteghad_video_peydachi.mp4" type="video/mp4" />
        مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
      </video>
    </div>
  );
};

export default CenteredVideo;
