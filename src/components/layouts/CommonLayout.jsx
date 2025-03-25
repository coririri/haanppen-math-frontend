/* eslint-disable react/no-danger */
import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AiOutlineCheck, AiOutlineDown } from 'react-icons/ai';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import instance from '../../apis/instance';
import Header from './Header';
import Navigation from './Navigation';
import { refreshLogin } from '../../apis/login';
import TodayLessonItem from './components/TodayLessonItem';
import getBanners, {
  deleteBanner,
  postBanner,
  putBanner,
} from '../../apis/banner';
import { getMonthlyCourse } from '../../apis/onlineLesson';
import { formatDate } from '../../utils/dateTimeToDate';
import './css/custom-datepicker.css';

function CommonLayout() {
  const location = useLocation(); // 현재 경로 가져오기

  const [notifications, setNotifications] = useState([]); // 공지사항 데이터
  const [modificationNotificationTextArr, setModificationNotificationTextArr] =
    useState([]); // 공지사항 수정 데이터
  const [isModificationNotificationArr, setIsModificationNotificationArr] =
    useState(); // 공지사항 리스트 수정할지 말지?
  const [addNotificationArr, setAddNotificationArr] = useState([]); // 추가할 공지사항들
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [monthClass, setMonthClass] = useState([]);
  const [markedDates, setMarkedDates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const curToken = instance.defaults.headers.common.Authorization;
      const curUserName = localStorage.getItem('userName');
      const curRole = localStorage.getItem('role');
      try {
        if (!curToken || !curUserName || !curRole) {
          const response = await refreshLogin();

          const newToken = response.data.accessToken;
          const { role, userName } = response.data;
          instance.defaults.headers.common.Authorization = newToken;
          localStorage.setItem('role', role);
          localStorage.setItem('userName', userName);
        }
      } catch (e) {
        console.error('토큰을 갱신하는 중 에러가 발생했습니다:', e);
      }

      try {
        const { data } = await getBanners();
        setNotifications(
          data.map((item) => ({
            bannerId: item.bannerId,
            bannerContent: item.bannerContent,
          })),
        );
        setModificationNotificationTextArr(
          data.map((item) => ({
            bannerId: item.bannerId,
            bannerContent: item.bannerContent,
          })),
        );
        setIsModificationNotificationArr(Array(data.length).fill(false));
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getMonthlyCourse(formatDate(selectedDate));
        setMonthClass(data);

        setMarkedDates(
          data.map((course) => course.registeredDateTime.split('T')[0]),
        );
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const handleNotificationModify = (index) => {
    setIsModificationNotificationArr((prev) => {
      const tempIsModificationNotificationArr = [...prev];
      tempIsModificationNotificationArr[index] = true;

      return tempIsModificationNotificationArr;
    });
  };

  const handleNotificationCancel = (index, notification) => {
    setIsModificationNotificationArr((prev) => {
      const tempIsModificationNotificationArr = [...prev];
      tempIsModificationNotificationArr[index] = false;

      return tempIsModificationNotificationArr;
    });

    setModificationNotificationTextArr((prev) => {
      const tempModificationNotificationTextArr = [...prev];
      tempModificationNotificationTextArr[index] = notification;
      return tempModificationNotificationTextArr;
    });
  };

  const handleAddNotificationCancel = (index) => {
    const newArr = [...addNotificationArr]; // 원본 배열 복사 (불변성 유지)
    console.log(newArr, index);
    newArr.splice(index, 1); // index 위치의 1개 요소 제거
    console.log(newArr);
    setAddNotificationArr(newArr);
  };

  console.log(monthClass);
  console.log(selectedDate);

  // 날짜를 'YYYY-MM-DD' 형식으로 변환하여 비교하는 함수
  const isMarkedDate = (date) => {
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    return markedDates.includes(formattedDate);
  };

  if (localStorage.getItem('role') === 'ADMIN')
    return (
      <div>
        <Header />
        <Navigation />
        <div className="w-[1440px] min-h-[680px] relative mx-auto border-[20px] border-hpBackgroundGray border-solid">
          {location.pathname === '/' ? (
            <div className="min-h-screen ">
              <hr />

              <div className="min-h-[620px] p-6 bg-white">
                {/* Notice Section */}
                <div className="bg-white p-6 rounded-lg shadow-lg mb-6 ">
                  <h3 className="text-2xl font-bold mb-2">학원 공지사항</h3>
                  <ul className="text-gray-700">
                    {notifications.map((notification, index) => (
                      <li
                        className="flex  relative pl-2 justify-between mb-1"
                        key={notification.bannerId}
                      >
                        <div className="flex items-center ">
                          <AiOutlineCheck className="mr-2" />
                          {isModificationNotificationArr[index] === false ? (
                            <span>{notification.bannerContent}</span>
                          ) : (
                            <input
                              type="text"
                              key={
                                modificationNotificationTextArr[index].bannerId
                              }
                              value={
                                modificationNotificationTextArr[index]
                                  .bannerContent
                              }
                              onChange={(e) => {
                                setModificationNotificationTextArr((prev) => {
                                  const tempModificationNotificationTextArr =
                                    prev.map((item) => ({
                                      bannerId: item.bannerId,
                                      bannerContent: item.bannerContent,
                                    }));

                                  tempModificationNotificationTextArr[
                                    index
                                  ].bannerContent = e.target.value;

                                  return tempModificationNotificationTextArr;
                                });
                              }}
                              className="w-full px-4 py-2 text-sm text-gray-800 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 hover:bg-gray-50 transition duration-200"
                            />
                          )}
                        </div>

                        {isModificationNotificationArr[index] === false ? (
                          <div className="flex space-x-2">
                            <button
                              type="button"
                              className="bg-blue-500 text-white px-3 py-1 rounded-md shadow hover:bg-blue-400 transition-colors duration-200"
                              onClick={() => {
                                handleNotificationModify(index, notification);
                              }}
                            >
                              수정
                            </button>
                            <button
                              type="button"
                              className="bg-red-500 text-white px-3 py-1 rounded-md shadow hover:bg-red-400 transition-colors duration-200"
                              onClick={async () => {
                                await deleteBanner(notification.bannerId);
                                setAddNotificationArr((prev) => {
                                  const tempAddNotificationArr = [...prev];
                                  tempAddNotificationArr.splice(index, 1);
                                  return tempAddNotificationArr;
                                });
                                const { data } = await getBanners();
                                setNotifications([...data]);
                                setModificationNotificationTextArr([...data]);
                                setIsModificationNotificationArr(
                                  Array(data.length).fill(false),
                                );
                              }}
                            >
                              삭제
                            </button>
                          </div>
                        ) : (
                          <div className="flex space-x-2">
                            <button
                              type="button"
                              className="bg-blue-500 text-white px-3 py-1 rounded-md shadow hover:bg-blue-400 transition-colors duration-200"
                              onClick={async () => {
                                console.log(
                                  modificationNotificationTextArr[index]
                                    .bannerId,
                                );
                                await putBanner(
                                  modificationNotificationTextArr[index]
                                    .bannerId,
                                  modificationNotificationTextArr[index]
                                    .bannerContent,
                                );
                                const { data } = await getBanners();
                                setNotifications([...data]);
                                setModificationNotificationTextArr([...data]);
                                setIsModificationNotificationArr(
                                  Array(data.length).fill(false),
                                );
                              }}
                            >
                              완료
                            </button>
                            <button
                              type="button"
                              className="bg-red-500 text-white px-3 py-1 rounded-md shadow hover:bg-red-400 transition-colors duration-200"
                              onClick={() => {
                                handleNotificationCancel(index, notification);
                              }}
                            >
                              취소
                            </button>
                          </div>
                        )}
                      </li>
                    ))}
                    {addNotificationArr.map((notification, index) => (
                      <li className="flex  relative pl-2 justify-between mb-1">
                        <div className="flex items-center ">
                          <AiOutlineCheck className="mr-2" />
                          <input
                            type="text"
                            value={notification}
                            onChange={(e) => {
                              setAddNotificationArr((prev) => {
                                const tempAddNotificationArr = [...prev];
                                tempAddNotificationArr[index] = e.target.value;
                                return tempAddNotificationArr;
                              });
                            }}
                            className="w-[800px] px-4 py-2 text-sm text-gray-800 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 hover:bg-gray-50 transition duration-200"
                          />
                        </div>
                        <div className="flex space-x-2">
                          <button
                            type="button"
                            className="bg-blue-500 text-white px-3 py-1 rounded-md shadow hover:bg-blue-400 transition-colors duration-200"
                            onClick={async () => {
                              await postBanner(addNotificationArr[index]);
                              setAddNotificationArr((prev) => {
                                const tempAddNotificationArr = [...prev];
                                tempAddNotificationArr.splice(index, 1);
                                return tempAddNotificationArr;
                              });
                              const { data } = await getBanners();
                              setNotifications([...data]);
                              setModificationNotificationTextArr([...data]);
                              setIsModificationNotificationArr(
                                Array(data.length).fill(false),
                              );
                            }}
                          >
                            완료
                          </button>
                          <button
                            type="button"
                            className="bg-red-500 text-white px-3 py-1 rounded-md shadow hover:bg-red-400 transition-colors duration-200"
                            onClick={() => {
                              handleAddNotificationCancel(index);
                            }}
                          >
                            취소
                          </button>
                        </div>
                      </li>
                    ))}
                    <div className="mt-2 flex justify-center">
                      <button
                        type="button"
                        className=" bg-green-500 text-white  rounded-full shadow-lg hover:bg-green-400 flex items-center justify-center transition-colors duration-200"
                        onClick={() => {
                          setAddNotificationArr((prev) => {
                            const tempAddNotificationArr = [...prev];
                            tempAddNotificationArr.push('');
                            return tempAddNotificationArr;
                          });
                        }}
                      >
                        <span className="w-[24px] leading-[24px]">+</span>
                      </button>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    );

  const fqaData = [
    {
      question: '학생 등록과 학생 로그인',
      answer: `1. 관리 - 학생 관리에서 학생을 등록할 수 있습니다. <br/>
               2. 학년 정보/이름/연락처를 입력하면 학생이 등록 됩니다. <br/>
               3. 학생은 ID: “본인 전화번호”, 비밀번호: “0000”으로 초기 로그인을 하면 된다고 안내해주세요. <br/>
               4. 보안을 위해 “오른쪽 상단 내정보”를 가서 비밀번호를 바꿔주세요`,
    },
    {
      question: '질문 타겟 선생님이 뭔가요??',
      answer: `학생은 질문 글을 작성할 때, 질문을 받아줄 타겟 선생님을
                          선택할 수 있습니다.<br />
                         <br />
                          타겟 선생님이 아닌 선생님이 답변을 해도 됩니다.
                          <br />
                          (단순 타겟 선생님을 명확하게 할 의도 입니다.)`,
    },
    {
      question: '질문 글은 언제 해결로 바뀌나요?',
      answer: `선생님이 질문 게시글에 답변을 달면 자동으로 게시글이 해결로 바뀝니다.`,
    },
    {
      question: '학원 강좌 / 단과 강좌의 차이점',
      answer: `학원 강좌(반)은 “학원에서 수업한 수업”을 뜻합니다.<br/><br/>
      단과 강좌는 “온라인 전용 수업”을 뜻합니다. (개설 강좌는 개설 강좌 탭을 통해 학생들이 수업을 직접 탐색해볼 수 있습니다.)`,
    },
    {
      question: '학생 입장에서는 어떻게 보이나요?',
      answer: `초1(테스트) 학생을 원하는 반에 등록하고, 사이트에 01011111111/0000으로 로그인해서 확인하시면 됩니다.
      <br/> (핸드폰으로 로그인하시면 조금더 정확한 UI로 보실 수 있습니다.)`,
    },
  ];

  const [teacherTutorialIndex, setTeacherTutorialIndex] = useState(0);
  const [isOpenFQAArr, setIsOpenFQAArr] = useState(
    Array(fqaData.length).fill(false),
  );
  if (localStorage.getItem('role') === 'TEACHER')
    return (
      <div>
        <Header />
        <Navigation />
        <div className="w-[1440px] min-h-[680px] relative mx-auto border-[20px] border-hpBackgroundGray border-solid">
          {location.pathname === '/' ? (
            <div className="min-h-screen ">
              <div className="flex flex-col gap-1 mt-4">
                <div className="mx-auto flex justify-center items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      setTeacherTutorialIndex(0);
                    }}
                  >
                    <h2
                      className={`w-[380px] py-2 text-center text-md font-semibold leading-[40px] border-gray-200  border-solid ${teacherTutorialIndex === 0 ? 'text-white bg-[#a40033] border-0' : 'text-black bg-white border-[3px]'}`}
                    >
                      자주 묻는 질문
                    </h2>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTeacherTutorialIndex(1);
                    }}
                  >
                    <h2
                      className={`w-[380px] py-2 text-center text-md font-semibold  leading-[40px] border-gray-200  border-solid ${teacherTutorialIndex === 1 ? 'text-white bg-[#a40033] border-0' : 'text-black bg-white border-[3px]'}`}
                    >
                      학원 영상 관리 탭 설명
                    </h2>
                  </button>
                </div>
                <div className="mx-auto flex justify-center items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      setTeacherTutorialIndex(2);
                    }}
                  >
                    <h2
                      className={`w-[380px] py-2 text-center text-md font-semibold  leading-[40px] border-gray-200  border-solid ${teacherTutorialIndex === 2 ? 'text-white bg-[#a40033] border-0' : 'text-black bg-white border-[3px]'}`}
                    >
                      학원 강좌 등록 설명
                    </h2>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTeacherTutorialIndex(3);
                    }}
                  >
                    <h2
                      className={`w-[380px] py-2 text-center text-md font-semibold  leading-[40px] border-gray-200  border-solid ${teacherTutorialIndex === 3 ? 'text-white bg-[#a40033] border-0' : 'text-black bg-white border-[3px]'}`}
                    >
                      단과 강좌 등록 설명
                    </h2>
                  </button>
                </div>
                <div className="mx-auto flex justify-center items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      setTeacherTutorialIndex(4);
                    }}
                  >
                    <h2
                      className={`w-[380px] py-2 text-center text-md font-semibold  leading-[40px] border-gray-200  border-solid ${teacherTutorialIndex === 4 ? 'text-white bg-[#a40033] border-0' : 'text-black bg-white border-[3px]'}`}
                    >
                      QR코드 링크로 변환
                    </h2>
                  </button>
                  <div>
                    <p className="w-[380px] py-2 text-center text-md font-semibold  leading-[40px]   " />
                  </div>
                </div>
              </div>

              {teacherTutorialIndex === 0 && (
                <div className="mx-auto w-[770px] mt-12">
                  {fqaData.map((fqa, fqaIndex) => (
                    <button
                      className={`border-gray-200 border-solid border-[2.2px] mb-3 ${isOpenFQAArr[fqaIndex] ? 'bg-[#f8f8f8]' : 'bg-white'}`}
                      type="button"
                      onClick={() => {
                        setIsOpenFQAArr((prev) => {
                          const copiedIsOpenFQAArr = [...prev];
                          copiedIsOpenFQAArr[fqaIndex] =
                            !copiedIsOpenFQAArr[fqaIndex];
                          return copiedIsOpenFQAArr;
                        });
                      }}
                    >
                      <div className="w-[770px]  py-4 flex items-center justify-start">
                        <div className="w-[200px] flex items-center justify-start ml-12">
                          <span className="mr-4 text-[#a40033] text-3xl font-semibold">
                            Q
                          </span>
                          <span className="text-[#a40033] text-lg">
                            [질문게시판]
                          </span>
                        </div>
                        <span
                          className={`text-lg w-[500px] text-left ${isOpenFQAArr[0] ? 'text-[#a40033]' : 'text-black '}`}
                        >
                          {fqa.question}
                        </span>
                        <div>
                          <AiOutlineDown
                            className={`w-[70px] ${isOpenFQAArr[0] ? 'transform rotate-180' : ''} transition-transform duration-300 ease-in-out`}
                          />
                        </div>
                      </div>
                      {isOpenFQAArr[fqaIndex] && (
                        <div
                          className="text-left pl-20 font-semibold py-2"
                          dangerouslySetInnerHTML={{
                            __html: fqa.answer,
                          }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}
              {teacherTutorialIndex === 1 && (
                <div className="mx-auto w-[770px] mt-12">
                  <iframe
                    title="학원 강좌"
                    width="770"
                    height="433"
                    src="https://www.youtube.com/embed/FOJMD4mHku0?si=eN_L8p7ACmlBVSZq"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  />
                </div>
              )}
              {teacherTutorialIndex === 2 && (
                <div className="mx-auto w-[770px] mt-12">
                  <iframe
                    title="단과 강좌"
                    width="770"
                    height="433"
                    src="https://www.youtube.com/embed/M8Ksr0WsZMI?si=b3--kVPrTIAZD0Pq"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  />
                </div>
              )}
              {teacherTutorialIndex === 3 && (
                <div className="mx-auto w-[770px] mt-12">
                  <iframe
                    title="단과 강좌"
                    width="770"
                    height="433"
                    src="https://www.youtube.com/embed/U2q63VbHvfI?si=wlnIi2LemS8I7HoW"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  />
                </div>
              )}
              {teacherTutorialIndex === 4 && (
                <div className="mx-auto w-[770px] mt-12">
                  <iframe
                    title="QR코드 링크로 변환"
                    width="770"
                    height="433"
                    src="https://youtube.com/embed/19Y33m-zEmk?si=Ua1dZ0HmuF1vNnL5"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  />
                </div>
              )}
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    );

  return (
    <div>
      <Header />
      <Navigation />
      <div className="w-full min-h-[620px] relative border-[12px] mx-auto  border-hpBackgroundGray border-solid">
        {location.pathname === '/' ? (
          <div className="min-h-[620px] p-6 bg-gray-100">
            <di className="flex justify-center mb-2">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                onMonthChange={(date) => {
                  setSelectedDate(date);
                  console.log('Month Changed:', date);
                }}
                inline
                dayClassName={(date) =>
                  isMarkedDate(date) ? 'highlighted-date' : undefined
                }
                locale={ko}
              />
            </di>
            {/* 오늘의 강의 */}
            <div className="bg-indigo-600 text-white p-6 rounded-lg shadow-lg mb-6">
              <h3 className="text-2xl font-bold mb-4">오늘의 강의</h3>
              <ul className="space-y-4">
                {monthClass
                  .filter(
                    (lessonItem) =>
                      // eslint-disable-next-line eqeqeq
                      lessonItem.registeredDateTime.split('T')[0] ===
                      formatDate(selectedDate),
                  )
                  .map((lessonItem) => (
                    <TodayLessonItem
                      courseId={lessonItem.courseId}
                      courseDate={lessonItem.registeredDateTime}
                      courseName={lessonItem.courseName}
                      lessonTitle={`${lessonItem.registeredDateTime.split('T')[0]} 수업`}
                    />
                  ))}
              </ul>
            </div>

            {/* Notice Section */}
            <div className="bg-white p-6 rounded-lg shadow-lg mb-6 transition-transform transform hover:scale-105 duration-300">
              <h3 className="text-2xl font-bold mb-2">학원 공지사항</h3>
              <ul className="list-disc list-inside text-gray-700">
                {notifications.map((notification) => (
                  <li
                    className="flex  relative pl-2 justify-between mb-1"
                    key={notification.bannerId}
                  >
                    <div className="flex items-center ">
                      <AiOutlineCheck className="mr-2" />

                      <span>{notification.bannerContent}</span>
                    </div>
                  </li>
                ))}{' '}
              </ul>
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}

export default CommonLayout;
