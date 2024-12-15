import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AiOutlineCheck } from 'react-icons/ai';
import DatePicker from 'react-datepicker';
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
        // 토큰 갱신에 실패한 경우 여기에 적절한 처리를 추가할 수 있습니다.
        // 토큰 갱신에 실패한 경우 여기에 적절한 처리를 추가할 수 있습니다.
        alert('로그인 페이지로 이동합니다');
        setTimeout(() => {
          window.location.href = '/login';
        }, 100);
      }

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
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getMonthlyCourse(formatDate(selectedDate));
      setMonthClass(data);

      setMarkedDates(
        data.map((course) => course.registeredDateTime.split('T')[0]),
      );
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

  if (localStorage.getItem('role') === 'TEACHER')
    return (
      <div>
        <Header />
        <Navigation />
        <div className="w-[1440px] min-h-[680px] relative mx-auto border-[20px] border-hpBackgroundGray border-solid">
          {location.pathname === '/' ? (
            <div className="min-h-screen ">
              {/* Hero Section */}
              <section className="bg-white py-20">
                <div className="max-w-7xl mx-auto text-center">
                  <h2 className="text-4xl font-bold mb-6">
                    수학 학습을 쉽고 재미있게!
                  </h2>
                  <p className="text-lg text-gray-600 mb-8">
                    Hannppen은 학생들에게 수학 개념을 쉽게 이해할 수 있도록
                    도와줍니다. 다양한 수학 학습 리소스와 문제 풀이로 수학
                    실력을 높이세요.
                  </p>
                  <a
                    href="/"
                    className="bg-indigo-600 text-white py-3 px-8 rounded-md shadow hover:bg-indigo-700 transition"
                  >
                    학습 시작하기
                  </a>
                </div>
              </section>

              {/* Features Section */}
              <section className="bg-gray-200 py-16">
                <div className="max-w-7xl mx-auto text-center">
                  <h3 className="text-3xl font-semibold mb-12">
                    주요 학습 콘텐츠
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="bg-white p-6 rounded-lg shadow">
                      <h4 className="text-xl font-semibold mb-4">
                        수업 녹화본 복습
                      </h4>
                      <p className="text-gray-600">
                        덧셈, 뺄셈부터 시작하여, 학생들이 수학의 기초를 단단하게
                        쌓을 수 있도록 도와줍니다.
                      </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                      <h4 className="text-xl font-semibold mb-4">
                        질문 게시판
                      </h4>
                      <p className="text-gray-600">
                        다양한 수학 문제를 통해 학생들이 실생활에서 수학을
                        어떻게 사용할 수 있는지 배워보세요.
                      </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                      <h4 className="text-xl font-semibold mb-4">
                        수업 자료 다운
                      </h4>
                      <p className="text-gray-600">
                        수학 문제를 풀고, 즉시 결과를 확인하면서 실력을 점검할
                        수 있는 퀴즈 기능을 제공합니다.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
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
