import { useState } from 'react';
import { AiOutlineSmile, AiOutlineSearch, AiFillEdit } from 'react-icons/ai';
import {
  useQuery,
  useMutation,
  useQueryClient,
  InvalidateQueryFilters,
  QueryClient,
} from '@tanstack/react-query';
import TextButton from '../atoms/TextButton';
import IconButton from '../atoms/IconButton';
import StudentList from '../organisms/StudentList';
import StudentEnrollmentModal from '../modals/StudentEnrollmentModal';
import {
  deleteStudent,
  getAllStudents,
  getStudentByPage,
  modifyStudent,
} from '../../apis/student';
import Pagenation from '../organisms/Pagenation';
import DeleteCheckModal from '../modals/DeleteCheckModal';
import LoadingBarModal from '../modals/LoadingBarModal';
import { LoadingType } from '../../types/loadingType';

function StudentManagementPage() {
  const queryClient: QueryClient = useQueryClient();
  const [choosenGradeIndex, setChoosenGradeIndex] = useState<boolean[]>([
    true,
    false,
    false,
    false,
  ]);
  const [searchNameValue, setSearchNameValue] = useState<string>('');
  const [enrollmentModalOpen, setEnrollmentModalOpen] =
    useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [forDeletedStudentIds, setForDeletedStudentIds] = useState<number[]>(
    [],
  );
  const [deleteCheckModalOpen, setDeleteCheckModalOpen] =
    useState<boolean>(false);
  const [loadingInfo, setLaodingInfo] = useState<LoadingType>({
    current: 0,
    end: 0,
  });
  const [loadingBarModalOpen, setLoadingBarModalOpen] =
    useState<boolean>(false);

  const mutation = useMutation({
    mutationFn: async () => deleteStudent(forDeletedStudentIds),
    onSuccess: () => {
      queryClient.invalidateQueries([
        'students',
        choosenGradeIndex.findIndex((value) => value === true),
        searchNameValue,
        page - 1,
      ] as InvalidateQueryFilters);
    },
    onError: () => {
      alert('실패');
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: [
      'students',
      choosenGradeIndex.findIndex((value) => value === true),
      searchNameValue,
      page - 1,
    ],
    queryFn: getStudentByPage,
    staleTime: 1000 * 60 * 5, // 5분 동안은 네트워크 요청 안 보내고 캐시 데이터 사용
  });

  return (
    <div className="w-full text-center">
      <StudentEnrollmentModal
        enrollmentModalOpen={enrollmentModalOpen}
        setEnrollmentModalOpen={setEnrollmentModalOpen}
        queryKeyQueryClient={queryClient}
        queryKeyChoosenGradeIndex={choosenGradeIndex.findIndex(
          (value) => value === true,
        )}
        queryKeySearchNameValue={searchNameValue}
        queryKeyPage={page}
      />
      <DeleteCheckModal
        deleteCheckModalOpen={deleteCheckModalOpen}
        setDeleteCheckModalOpen={setDeleteCheckModalOpen}
        handleDelete={async () => {
          if (data?.data.length === 1 && page > 1) {
            // 현재 페이지에 1명 남았다면 + 2페이지 이상이라면
            setPage(page - 1);
          }
          mutation.mutate();
          setDeleteCheckModalOpen(false);
        }}
      />

      <LoadingBarModal
        modalOpen={loadingBarModalOpen}
        loadingInfo={loadingInfo}
      />
      <hr className="h-[1px] border-0 bg-hpGray w-[700px] mx-auto mt-2" />

      <div
        className={`mt-3 flex items-center justify-between mx-auto ${localStorage.getItem('role') === 'ADMIN' ? 'w-[460px]' : 'w-[300px]'}`}
      >
        <TextButton
          color="white"
          moreStyle="w-[70px]"
          isClick={choosenGradeIndex[0]}
          handleClick={() => {
            setChoosenGradeIndex([true, false, false, false]);
          }}
        >
          전체
        </TextButton>
        <TextButton
          color="white"
          moreStyle="w-[45px]"
          isClick={choosenGradeIndex[1]}
          handleClick={() => {
            setPage(1);
            setForDeletedStudentIds([]);
            setChoosenGradeIndex([false, true, false, false]);
          }}
        >
          초
        </TextButton>
        <TextButton
          color="white"
          moreStyle="w-[45px]"
          isClick={choosenGradeIndex[2]}
          handleClick={() => {
            setPage(1);
            setForDeletedStudentIds([]);
            setChoosenGradeIndex([false, false, true, false]);
          }}
        >
          중
        </TextButton>
        <TextButton
          color="white"
          moreStyle="w-[45px]"
          isClick={choosenGradeIndex[3]}
          handleClick={() => {
            setPage(1);
            setForDeletedStudentIds([]);
            setChoosenGradeIndex([false, false, false, true]);
          }}
        >
          고
        </TextButton>
        <span className="text-xl font-bold">
          {data?.pageInfo?.totalItemSize}명
        </span>
        {localStorage.getItem('role') === 'ADMIN' && (
          <div className="flex flex-col gap-2">
            <TextButton
              color="gray"
              textMoreStyle="p-4"
              handleClick={async () => {
                const allStudentResponse = await getAllStudents();
                setLaodingInfo({
                  current: 0,
                  end: allStudentResponse.data.length,
                });
                setLoadingBarModalOpen(true);
                for (let i = 0; i < allStudentResponse.data.length; i += 1) {
                  const student = allStudentResponse.data[i];
                  const payload = {
                    id: student.id,
                    name: student.name,
                    phoneNumber: student.phoneNumber,
                    grade:
                      student.grade === 11 ? student.grade : student.grade + 1,
                  };
                  await modifyStudent(payload);
                  setLaodingInfo((prev) => ({
                    current: prev.current + 1,
                    end: allStudentResponse.data.length,
                  }));
                }
                queryClient.invalidateQueries([
                  'students',
                  choosenGradeIndex.findIndex((value) => value === true),
                  searchNameValue,
                  page - 1,
                ] as InvalidateQueryFilters);
                setLoadingBarModalOpen(false);
              }}
            >
              전체 학년 승급
            </TextButton>
            <TextButton
              color="gray"
              textMoreStyle="p-4"
              handleClick={async () => {
                const allStudentResponse = await getAllStudents();
                setLaodingInfo({
                  current: 0,
                  end: allStudentResponse.data.length,
                });
                setLoadingBarModalOpen(true);
                for (let i = 0; i < allStudentResponse.data.length; i += 1) {
                  const student = allStudentResponse.data[i];
                  const payload = {
                    id: student.id,
                    name: student.name,
                    phoneNumber: student.phoneNumber,
                    grade:
                      student.grade === 0 ? student.grade : student.grade - 1,
                  };
                  await modifyStudent(payload);
                  setLaodingInfo((prev) => ({
                    current: prev.current + 1,
                    end: allStudentResponse.data.length,
                  }));
                }

                queryClient.invalidateQueries([
                  'students',
                  choosenGradeIndex.findIndex((value) => value === true),
                  searchNameValue,
                  page - 1,
                ] as InvalidateQueryFilters);
                setLoadingBarModalOpen(false);
              }}
            >
              전체 학년 강등
            </TextButton>
          </div>
        )}
      </div>
      <hr className="h-[1px] border-0 bg-hpGray w-[700px] mx-auto mt-2" />
      <div className="flex items-center  w-[550px] mx-auto justify-between mt-4">
        <div className="flex items-center">
          <div className="mr-6">
            <IconButton
              bgColor="blue"
              icon={<AiOutlineSmile size="26px" color="white" />}
              text="학생 등록"
              handleClick={() => {
                setEnrollmentModalOpen(true);
              }}
            />
          </div>
          <div>
            <IconButton
              bgColor="white"
              icon={<AiFillEdit size="26px" color="black" />}
              text="학생 삭제"
              handleClick={async () => {
                setDeleteCheckModalOpen(true);
              }}
            />
          </div>
        </div>
        <div>
          <div className="relative inline-block">
            <input
              type="text"
              className="w-[180px] h-[36px] leading-[21px] border-[1.3px] border-solid border-black pr-2 pl-4 rounded-sm focus-visible:outline-0 text-lg"
              placeholder="학생 이름 검색"
              value={searchNameValue}
              onChange={(e) => {
                setSearchNameValue(e.target.value);
              }}
            />
            <button
              className="absolute bg-bjsBlue text-md p-1 pl-3 text-white right-0 top-[1px] rounded-r-xl "
              type="button"
              aria-label="학생 검색"
              disabled
            >
              <AiOutlineSearch size="26px" className="mr-2" color="black" />
            </button>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div>로딩중</div>
      ) : (
        <div>
          <div className="mt-2">
            <StudentList
              students={data?.data}
              setForDeletedStudentIds={setForDeletedStudentIds}
              searchNameValue={searchNameValue}
              page={page}
              choosenGradeIndex={choosenGradeIndex.findIndex(
                (value) => value === true,
              )}
            />
          </div>
        </div>
      )}
      <div className="w-[360px] mx-auto my-1">
        <Pagenation
          page={page}
          setPage={setPage}
          totalItemNumbers={data?.pageInfo?.totalItemSize}
          itemNumPerPage={10}
        />
      </div>
    </div>
  );
}

export default StudentManagementPage;
