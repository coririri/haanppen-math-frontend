import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import instance from '../../apis/instance';
import Header from './Header';
import Navigation from './Navigation';
import { refreshLogin } from '../../apis/login';

function CommonLayout() {
  const location = useLocation(); // 현재 경로 가져오기

  useEffect(() => {
    const fetchData = async () => {
      const curToken = instance.defaults.headers.common.Authorization;
      const curUserName = localStorage.getItem('userName');
      const curRole = localStorage.getItem('role');
      if (!curToken || !curUserName || !curRole) {
        refreshLogin();
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <Navigation />
      {localStorage.getItem('role') === 'STUDENT' ? (
        <div className="w-full min-h-[620px] relative border-[12px] mx-auto  border-hpBackgroundGray border-solid">
          {location.pathname === '/' ? (
            <div className="min-h-[620px] p-6 bg-white">
              {/* Introduction Section */}
              <div className="bg-white p-6 rounded-lg shadow-lg mb-6 transition-transform transform hover:scale-105 duration-300">
                <h3 className="text-2xl font-bold mb-2">웹사이트 소개</h3>
                <p className="text-gray-700 text-base">
                  MathLearn은 학생들에게 수학을 쉽고 재미있게 학습할 수 있도록
                  돕는 플랫폼입니다. 다양한 학습 자료와 문제 풀이, 퀴즈 기능을
                  통해 학생들이 수학을 이해하고 실력을 향상시킬 수 있도록
                  지원합니다.
                </p>
              </div>

              {/* Notice Section */}
              <div className="bg-white p-6 rounded-lg shadow-lg mb-6 transition-transform transform hover:scale-105 duration-300">
                <h3 className="text-2xl font-bold mb-2">학원 공지사항</h3>
                <ul className="list-disc list-inside text-gray-700">
                  <li className="mb-1">10월 10일: 개학식 안내</li>
                  <li className="mb-1">10월 15일: 수학 대회 개최</li>
                  <li className="mb-1">10월 20일: 학부모 상담일</li>
                </ul>
              </div>

              {/* Banner Section */}
              <div className="bg-indigo-600 text-white p-6 rounded-lg shadow-lg mb-6 transition-transform transform hover:scale-105 duration-300">
                <h2 className="text-lg font-bold">특별 프로모션!</h2>
                <p className="text-base">
                  지금 등록하시면 첫 달 수업료 20% 할인!
                </p>
              </div>
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      ) : (
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
      )}
    </div>
  );
}

export default CommonLayout;
