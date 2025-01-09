import { useEffect, useState } from 'react';
import { BsBoxSeamFill } from 'react-icons/bs';
import { useSearchParams } from 'react-router-dom';
import { getOnlineLesson } from '../../apis/onlineLesson';
import { AttachmentDetailType } from '../../types/onlineVideoType';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function OnlineLessonPage() {
  const [searchParams] = useSearchParams();
  const [videoData, setVideoData] = useState<{
    title: string;
    src: string;
    attachments: AttachmentDetailType[];
  }>({
    title: '',
    src: '',
    attachments: [],
  });

  useEffect(() => {
    const onlineCourseId = searchParams.get('onlineCourseId');

    const fetchData = async () => {
      try {
        const { data } = await getOnlineLesson(Number(onlineCourseId));
        for (let i = 0; i < data.onlineVideoDetails.length; i += 1) {
          if (
            // eslint-disable-next-line eqeqeq
            data.onlineVideoDetails[i].videoId == searchParams.get('videoId')
          ) {
            setVideoData({
              title: data.onlineVideoDetails[i].mediaName,
              src: `${backendUrl}api/media/stream?resourceId=${data.onlineVideoDetails[i].mediaSrc}`,
              attachments: data.onlineVideoDetails[i].attachmentDetails,
            });
            break;
          }
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-center items-center my-6 space-x-6 bg-gradient-to-r from-gray-100 to-blue-50 py-3 px-6 rounded-lg shadow-md">
        <span className="font-extrabold text-xl text-indigo-700 tracking-wide">
          {searchParams.get('courseName')}
        </span>
      </div>
      <div className="w-full h-[1.4px] bg-hpGray" />
      <div>
        <div className="text-center mt-3">
          <span className="text-2xl font-bold text-gray-900">영상 제목</span>
        </div>
        <div className="px-6 py-4 border-2 border-gray-700 text-center rounded-xl mx-4 mb-5 mt-1 text-lg bg-gradient-to-r from-blue-100 to-indigo-100 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
          <span className="font-bold text-gray-900 tracking-wide hover:text-indigo-600 transition-colors duration-300 ease-in-out">
            {videoData.title.split('.')[0]}
          </span>
        </div>
        {videoData.src !== '' && (
          <div className="flex flex-col justify-center items-center">
            <video
              src={videoData.src}
              width="360px"
              height="240px"
              autoPlay
              muted
              controls
            />

            <div className="p-6">
              <h1 className="text-3xl font-extrabold mb-6 text-gray-900 flex items-center">
                <BsBoxSeamFill className="mr-2 text-purple-600" /> 수업 자료
              </h1>
              <ul className="space-y-4">
                {videoData.attachments.map((attachment) => (
                  <li
                    key={attachment.attachmentId}
                    className="bg-white  border border-gray-300 flex items-center"
                  >
                    <BsBoxSeamFill className="text-gray-500 mr-4 text-2xl" />
                    <a
                      href={attachment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg text-blue-600 hover:underline font-semibold"
                    >
                      {attachment.attachmentTitle} (Click)
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OnlineLessonPage;
