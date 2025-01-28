function NetworkErrorPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-4">500</h1>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Network Error
        </h2>
        <p className="text-gray-600 mb-6">
          죄송합니다. 연결 도중 문제가 발생했습니다. 네트워크를 확인 후 후 다시
          시도해 주세요.
        </p>

        <div className="mt-4">
          <a href="/" className="text-blue-500 hover:underline">
            홈으로 이동
          </a>
        </div>
      </div>
    </div>
  );
}

export default NetworkErrorPage;
