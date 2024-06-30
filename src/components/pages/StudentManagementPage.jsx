import React, { useRef, useState } from 'react';
import { AiOutlineSmile, AiOutlineSearch, AiFillEdit } from 'react-icons/ai';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import TextButton from '../atoms/TextButton';
import IconButton from '../atoms/IconButton';
import StudentList from '../organisms/StudentList';
import StudentEnrollmentModal from '../modals/StudentEnrollmentModal';
import { deleteStudent, getStudentList } from '../../apis/student';

function StudentManagementPage() {
  const queryClient = useQueryClient();
  const [choosenGradeIndex, setChoosenGradeIndex] = useState([
    true,
    false,
    false,
    false,
  ]);
  const [searchNameValue, setSearchNameValue] = useState('');
  const searchRef = useRef();
  const [enrollmentModalOpen, setEnrollmentModalOpen] = useState(false);
  const [forDeletedStudentIds, setForDeletedStudentIds] = useState([]);
  console.log(forDeletedStudentIds);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['studentList', choosenGradeIndex, searchNameValue],
      queryFn: getStudentList,
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage?.data?.nextCursor,
    });

  const mutation = useMutation({
    mutationFn: () => deleteStudent(forDeletedStudentIds),
    onSuccess: () => {
      queryClient.invalidateQueries([
        'studentList',
        choosenGradeIndex,
        searchNameValue,
      ]);
    },
  });

  if (isLoading) return <div>로딩중</div>;
  return (
    <div className="w-full text-center">
      <StudentEnrollmentModal
        enrollmentModalOpen={enrollmentModalOpen}
        setEnrollmentModalOpen={setEnrollmentModalOpen}
        queryKeyQueryClient={queryClient}
        queryKeyChoosenGradeIndex={choosenGradeIndex}
        queryKeySearchNameValue={searchNameValue}
      />
      <hr className="h-[1px] border-0 bg-hpGray w-[700px] mx-auto mt-2" />
      <div className="mt-3 flex items-center justify-between w-[250px] mx-auto">
        <TextButton
          color="white"
          shape="square"
          size="small"
          isClick={choosenGradeIndex[0]}
          handleClick={() => {
            queryClient.invalidateQueries('students', choosenGradeIndex);
            setChoosenGradeIndex([true, false, false, false]);
            setForDeletedStudentIds([]);
          }}
        >
          전체
        </TextButton>
        <TextButton
          color="white"
          shape="square"
          size="small"
          isClick={choosenGradeIndex[1]}
          handleClick={() => {
            setChoosenGradeIndex([false, true, false, false]);
            setForDeletedStudentIds([]);
          }}
        >
          초
        </TextButton>
        <TextButton
          color="white"
          shape="square"
          size="small"
          isClick={choosenGradeIndex[2]}
          handleClick={() => {
            setChoosenGradeIndex([false, false, true, false]);
            setForDeletedStudentIds([]);
          }}
        >
          중
        </TextButton>
        <TextButton
          color="white"
          shape="square"
          size="small"
          isClick={choosenGradeIndex[3]}
          handleClick={() => {
            setChoosenGradeIndex([false, false, false, true]);
            setForDeletedStudentIds([]);
          }}
        >
          고
        </TextButton>
        <span className="text-xl font-bold">123명</span>
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
                mutation.mutate(forDeletedStudentIds);
                console.log('학생 삭제');
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
              ref={searchRef}
            />
            <button
              className="absolute bg-bjsBlue text-md p-1 pl-3 text-white right-0 top-[1px] rounded-r-xl "
              type="button"
              aria-label="학생 검색"
              onClick={() => {
                console.log(searchRef.current.value);
                setChoosenGradeIndex([false, false, false, false]);
                setForDeletedStudentIds([]);
                setSearchNameValue(searchRef.current.value);
                console.log('검색');
              }}
            >
              <AiOutlineSearch size="26px" className="mr-2" color="black" />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <StudentList
          pages={data?.pages}
          setForDeletedStudentIds={setForDeletedStudentIds}
          choosenGradeIndex={choosenGradeIndex}
          searchNameValue={searchNameValue}
        />
      </div>
      <div>
        <button
          type="button"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
              ? 'Load More'
              : 'Nothing more to load'}
        </button>
      </div>
    </div>
  );
}

export default StudentManagementPage;
