import { AiFillEdit } from 'react-icons/ai';
import IconButton from '../atoms/IconButton';

function UserInformation() {
  const role = localStorage.getItem('role');
  console.log(role);
  if (role === 'STUDENT')
    return (
      <div className="mt-[110px] flex flex-col">
        <div className="flex flex-col justify-between w-[380px] h-[350px] mx-auto border-hpBlack border-[1px] border-solid rounded-lg">
          <div className="flex flex-col justify-center mt-8">
            <div className="flex justify-center">
              <label
                className="text-center block font-bold text-lg w-[120px]"
                htmlFor="userName"
              >
                이름
              </label>
              <input
                type="text"
                id="userName"
                className="w-[200px] h-[30px] text-center border-solid border-black border-[1px] rounded-md text-sm font-bold"
                value="김선우"
                onChange={() => {}}
              />
            </div>
            <hr className="h-[1px] border-0 bg-hpGray w-[320px] mx-auto my-4" />
            <div className="flex justify-center">
              <label
                className="text-center block font-bold text-lg w-[120px]"
                htmlFor="userName"
              >
                전화번호(ID)
              </label>
              <input
                type="text"
                id="userName"
                className="w-[200px] h-[30px] text-center border-solid border-black border-[1px] rounded-md ext-sm font-bold"
                value="010-3433-0652"
                onChange={() => {}}
              />
            </div>
            <hr className="h-[1px] border-0 bg-hpGray w-[320px] mx-auto my-4" />
            <div className="flex justify-center">
              <label
                className="text-center block font-bold text-lg w-[120px]"
                htmlFor="userName"
              >
                기존 비밀번호
              </label>
              <input
                type="password"
                id="userName"
                className="w-[200px] h-[30px] border-solid border-black border-[1px] rounded-md text-center text-sm font-bold"
                value="qweqwe123"
                onChange={() => {}}
              />
            </div>
            <hr className="h-[1px] border-0 bg-hpGray w-[320px] mx-auto my-4" />
            <div className="flex justify-center">
              <label
                className="text-center block font-bold text-lg w-[120px]"
                htmlFor="userName"
              >
                새 비밀번호
              </label>
              <input
                type="password"
                id="userName"
                className="w-[200px] h-[30px] border-solid border-black border-[1px] rounded-md text-center text-sm font-bold"
                value="qweqwe123"
                onChange={() => {}}
              />
            </div>
            <hr className="h-[1px] border-0 bg-hpGray w-[320px] mx-auto my-4" />
          </div>
          <div className="mb-6 w-full text-right">
            <span className="pr-12">계정 가입일: 2024.02.30</span>
          </div>
        </div>
        <div className="mx-auto mt-8 flex">
          <div className="mr-2">
            <IconButton
              bgColor="white"
              icon={<AiFillEdit size="20px" />}
              text="저장"
              handleClick={() => {}}
            />
          </div>
          <div className="ml-2">
            <IconButton
              bgColor="white"
              icon={<AiFillEdit size="20px" />}
              text="로그아웃"
              handleClick={() => {}}
            />
          </div>
        </div>
      </div>
    );
  return (
    <div className="mt-[110px] flex flex-col">
      <div className="flex flex-col justify-between w-[550px] h-[340px] mx-auto border-hpBlack border-[1px] border-solid rounded-lg">
        <div className="flex flex-col justify-center mt-8">
          <div className="flex justify-center">
            <label
              className="text-center block font-bold text-lg w-[120px]"
              htmlFor="userName"
            >
              이름
            </label>
            <input
              type="text"
              id="userName"
              className="w-[200px] h-[30px] text-center border-solid border-black border-[1px] rounded-md text-sm font-bold"
              value="김선우"
              onChange={() => {}}
            />
          </div>
          <hr className="h-[1px] border-0 bg-hpGray w-[450px] mx-auto my-4" />
          <div className="flex justify-center">
            <label
              className="text-center block font-bold text-lg w-[120px]"
              htmlFor="userName"
            >
              전화번호(ID)
            </label>
            <input
              type="text"
              id="userName"
              className="w-[200px] h-[30px] text-center border-solid border-black border-[1px] rounded-md ext-sm font-bold"
              value="010-3433-0652"
              onChange={() => {}}
            />
          </div>
          <hr className="h-[1px] border-0 bg-hpGray w-[450px] mx-auto my-4" />
          <div className="flex justify-center">
            <label
              className="text-center block font-bold text-lg w-[120px]"
              htmlFor="userName"
            >
              기존 비밀번호
            </label>
            <input
              type="password"
              id="userName"
              className="w-[200px] h-[30px] border-solid border-black border-[1px] rounded-md text-center text-sm font-bold"
              value="qweqwe123"
              onChange={() => {}}
            />
          </div>
          <hr className="h-[1px] border-0 bg-hpGray w-[450px] mx-auto my-4" />
          <div className="flex justify-center">
            <label
              className="text-center block font-bold text-lg w-[120px]"
              htmlFor="userName"
            >
              새 비밀번호
            </label>
            <input
              type="password"
              id="userName"
              className="w-[200px] h-[30px] border-solid border-black border-[1px] rounded-md text-center text-sm font-bold"
              value="qweqwe123"
              onChange={() => {}}
            />
          </div>
          <hr className="h-[1px] border-0 bg-hpGray w-[450px] mx-auto my-4" />
        </div>
        <div className="mb-6 w-full text-right">
          <span className="pr-12">계정 가입일: 2024.02.30</span>
        </div>
      </div>
      <div className="mx-auto mt-8 flex">
        <div className="mr-2">
          <IconButton
            bgColor="white"
            icon={<AiFillEdit size="20px" />}
            text="저장"
            handleClick={() => {}}
          />
        </div>
        <div className="ml-2">
          <IconButton
            bgColor="white"
            icon={<AiFillEdit size="20px" />}
            text="로그아웃"
            handleClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
}

export default UserInformation;
