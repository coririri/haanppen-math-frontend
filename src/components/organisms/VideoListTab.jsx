import React, { useState } from 'react';
import { AiOutlineVideoCameraAdd } from 'react-icons/ai';
import VideoItem from '../molecules/VideoItem';

function VideoListTab({
  videoData,
  setVideoData,
  memoId,
  startDate,
  selectedClassindex,
}) {
  const [nowPlusVedio, setNowPlusVdeio] = useState(false);
  console.log(videoData);

  return (
    <div className="mb-4 ">
      <div className="flex justify-center items-center mt-8">
        <AiOutlineVideoCameraAdd size="2rem" className="mr-2" />
        <span className="font-bold text-2xl">수업 영상 목록</span>
      </div>
      {videoData
        .sort((a, b) => a.mediaSequence - b.mediaSequence)
        .map((video, vedioIndex) => (
          <VideoItem
            key={video.memoMediaId}
            videoData={videoData}
            video={video}
            setVideoData={setVideoData}
            vedioIndex={vedioIndex}
            lastVideoIndex={videoData.length}
            memoId={memoId}
            startDate={startDate}
            selectedClassindex={selectedClassindex}
          />
        ))}
      {!nowPlusVedio && (
        <button
          type="button"
          className="block mx-auto my-2"
          onClick={() => {
            setVideoData((prev) => {
              const copiedVideoData = prev.map((video) => ({
                ...video,
                attachmentViews: [...video.attachmentViews],
              }));
              copiedVideoData.push({
                title: '',
                attachmentViews: [],
              });
              return copiedVideoData;
            });
            setNowPlusVdeio(true);
          }}
        >
          <div className="bg-[#BCF7FF] px-2 rounded-xl">
            <span className="text-xl font-bold">+</span>
          </div>
        </button>
      )}
    </div>
  );
}

export default VideoListTab;
