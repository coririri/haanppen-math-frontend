import { AiFillEdit } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '../atoms/IconButton';
import getMyAccountInfo, { putAccountInfo } from '../../apis/account';
import idValidation from '../../utils/idValidation';
import passwordValidation from '../../utils/passwordValidation';
import { logout } from '../../apis/login';
import instance from '../../apis/instance';
import {
  AccountInfoType,
  UserFormType,
  UserInformationErrorMessageType,
} from '../../types/userType';

function UserInformation() {
  const navigate = useNavigate();
  const [userForm, setUserForm] = useState<UserFormType>({
    name: '',
    phoneNumber: '',
    password: '',
    newPassword: '',
    registerDate: '24.08.02',
  });

  const [errorMessages, setErrorMessages] =
    useState<UserInformationErrorMessageType>({
      name: '',
      phoneNumber: '',
      password: '',
      newPassword: '',
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data }: { data: AccountInfoType } = await getMyAccountInfo();

        setUserForm({
          name: data.userName,
          phoneNumber: data.phoneNumber,
          password: '',
          newPassword: '',
          registerDate: '24.08.02',
        });
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (userForm.name === '')
      setErrorMessages((prev) => ({
        ...prev,
        name: '이름은 빈칸일 수 없습니다.',
      }));
    else {
      setErrorMessages((prev) => ({
        ...prev,
        name: '',
      }));
    }
  }, [userForm.name]);

  useEffect(() => {
    const validationMessage = idValidation(userForm.phoneNumber);
    setErrorMessages((prev) => ({
      ...prev,
      phoneNumber: validationMessage,
    }));
  }, [userForm.phoneNumber]);

  useEffect(() => {
    const validationMessage = passwordValidation(userForm.password);
    setErrorMessages((prev) => ({
      ...prev,
      password: validationMessage,
    }));
  }, [userForm.password]);

  useEffect(() => {
    const validationMessage = passwordValidation(userForm.newPassword);
    setErrorMessages((prev) => ({
      ...prev,
      newPassword: validationMessage,
    }));
  }, [userForm.newPassword]);

  return (
    <div className="lg:w-[1440px] md:w-[834px] w-[280px] mt-[30px] flex flex-col mx-auto">
      <div className="flex flex-col justify-between lg:w-[380px] md:w-[320px] w-[280px] mx-auto border-hpBlack border-[1px] border-solid rounded-lg">
        <div className="flex flex-col justify-center mt-8">
          <div className="flex justify-center">
            <label
              className="text-center block font-bold text-lg w-[120px]"
              htmlFor="name"
            >
              이름
            </label>
            <input
              type="text"
              id="name"
              className="lg:w-[200px] md:w-[180px] w-[150px] h-[30px] text-center border-solid border-black border-[1px] rounded-md text-sm font-bold"
              defaultValue={userForm.name}
              onChange={(e) => {
                setUserForm((prev) => ({
                  ...prev,
                  name: e.target.value,
                }));
              }}
            />
          </div>
          <div className="text-center ml-[120px] mt-2 text-hpLightRed font-bold">
            {errorMessages.name}
          </div>
          <hr className="h-[1px] border-0 bg-hpGray lg:w-[320px] md:w-[240px] w-full mx-auto mb-4 mt-2" />
          <div className="flex justify-center">
            <label
              className="text-center block font-bold text-lg w-[120px]"
              htmlFor="id"
            >
              전화번호(ID)
            </label>
            <input
              type="text"
              id="id"
              className="lg:w-[200px] md:w-[180px] w-[150px] h-[30px] text-center border-solid border-black border-[1px] rounded-md ext-sm font-bold"
              defaultValue={userForm.phoneNumber}
              onChange={(e) => {
                setUserForm((prev) => ({
                  ...prev,
                  phoneNumber: e.target.value,
                }));
              }}
            />
          </div>
          <div className="text-center ml-[120px] mt-2 text-hpLightRed font-bold">
            {errorMessages.phoneNumber}
          </div>
          <hr className="h-[1px] border-0 bg-hpGray lg:w-[320px] md:w-[240px] w-full mx-auto mt-2 mb-4" />
          <div className="flex justify-center">
            <label
              className="text-center block font-bold text-lg w-[120px]"
              htmlFor="password"
            >
              기존 비밀번호
            </label>
            <input
              type="password"
              id="password"
              className="lg:w-[200px] md:w-[180px] w-[150px] h-[30px] border-solid border-black border-[1px] rounded-md text-center text-sm font-bold"
              defaultValue={userForm.password}
              onChange={(e) => {
                setUserForm((prev) => ({
                  ...prev,
                  password: e.target.value,
                }));
              }}
            />
          </div>
          <div className="text-center ml-[40px] mt-2 text-hpLightRed font-bold">
            {errorMessages.password}
          </div>
          <hr className="h-[1px] border-0 bg-hpGray lg:w-[320px] md:w-[240px] w-full mx-auto mt-2 mb-4" />
          <div className="flex justify-center">
            <label
              className="text-center block font-bold text-lg w-[120px]"
              htmlFor="newPassword"
            >
              새 비밀번호
            </label>
            <input
              type="password"
              id="newPassword"
              className="lg:w-[200px] md:w-[180px] w-[150px] h-[30px] border-solid border-black border-[1px] rounded-md text-center text-sm font-bold"
              defaultValue=""
              onChange={(e) => {
                setUserForm((prev) => ({
                  ...prev,
                  newPassword: e.target.value,
                }));
              }}
            />
          </div>
          <div className="text-center ml-[120px] mt-2 text-hpLightRed font-bold">
            {errorMessages.newPassword}
          </div>
          <hr className="h-[1px] border-0 bg-hpGray lg:w-[320px] md:w-[240px] w-full mx-auto mt-2 mb-4" />
        </div>
        <div className="mb-6 w-full text-right flex justify-center">
          <span>계정 가입일: {userForm.registerDate}</span>
        </div>
      </div>
      <div className="mx-auto mt-8 flex">
        <div className="mr-2">
          <IconButton
            bgColor="white"
            icon={
              <AiFillEdit
                size="20px"
                color={`${
                  errorMessages.name !== '' ||
                  errorMessages.phoneNumber !== '' ||
                  errorMessages.password !== '' ||
                  errorMessages.newPassword !== ''
                    ? 'gray'
                    : 'black'
                }`}
              />
            }
            text="저장"
            handleClick={async () => {
              try {
                await putAccountInfo(userForm);
                await logout();
                localStorage.removeItem('hp_accessToekn');
                window.location.href = '/login';
                instance.defaults.headers.common.Authorization = null;
              } catch (e) {
                setErrorMessages((prev) => ({
                  ...prev,
                  password: '기존 비밀번호가 틀렸습니다',
                }));
              }
            }}
            disabled={
              errorMessages.name !== '' ||
              errorMessages.phoneNumber !== '' ||
              errorMessages.password !== '' ||
              errorMessages.newPassword !== ''
            }
          />
        </div>
        <div className="ml-2">
          <IconButton
            bgColor="white"
            icon={<AiFillEdit size="20px" />}
            text="로그아웃"
            handleClick={async () => {
              await logout();
              localStorage.removeItem('hp_accessToekn');
              navigate('/login');
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default UserInformation;
