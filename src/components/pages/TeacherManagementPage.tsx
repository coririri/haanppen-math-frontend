import { useState } from 'react';
import { AiOutlineSmile, AiOutlineSearch, AiFillEdit } from 'react-icons/ai';
import {
  InvalidateQueryFilters,
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { deleteTeacherAccount, getTeacherByPage } from '../../apis/teacher';
import IconButton from '../atoms/IconButton';
import TeacherList from '../organisms/TeacherList';
import TeacherEnrollmentModal from '../modals/TeacherEnrollmentModal';
import Pagenation from '../organisms/Pagenation';
import DeleteCheckModal from '../modals/DeleteCheckModal';

function TeacherManagementPage() {
  const queryClient: QueryClient = useQueryClient();
  const [enrollmentModalOpen, setEnrollmentModalOpen] =
    useState<boolean>(false);
  const [searchNameValue, setSearchNameValue] = useState<string>('');
  const [forDeletedTeacherIds, setForDeletedTeacherIds] = useState<number[]>(
    [],
  );
  const [page, setPage] = useState<number>(1);

  const [deleteCheckModalOpen, setDeleteCheckModalOpen] =
    useState<boolean>(false);

  const mutation = useMutation({
    mutationFn: () => deleteTeacherAccount(forDeletedTeacherIds),
    onSuccess: () => {
      queryClient.invalidateQueries([
        'teachers',
        searchNameValue,
        page - 1,
      ] as InvalidateQueryFilters);
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ['teachers', searchNameValue, page - 1],
    queryFn: getTeacherByPage,
    staleTime: 1000 * 60 * 5, // 5분 동안은 네트워크 요청 안 보내고 캐시 데이터 사용
  });

  return (
    <div className="w-full text-center">
      <TeacherEnrollmentModal
        enrollmentModalOpen={enrollmentModalOpen}
        setEnrollmentModalOpen={setEnrollmentModalOpen}
        queryClient={queryClient}
        searchNameValue={searchNameValue}
        page={page}
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

      <hr className="h-[1px] border-0 bg-hpGray w-[700px] mx-auto mt-2" />
      <div className="flex items-center  w-[550px] mx-auto justify-between mt-4">
        <div className="flex items-center">
          <div className="mr-6">
            <IconButton
              bgColor="blue"
              icon={<AiOutlineSmile size="26px" color="white" />}
              text="강사 등록"
              handleClick={() => {
                setEnrollmentModalOpen(true);
                setForDeletedTeacherIds([]);
              }}
            />
          </div>
          <div>
            <IconButton
              bgColor="white"
              icon={<AiFillEdit size="26px" color="black" />}
              text="강사 삭제"
              handleClick={() => {
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
              placeholder="강사 이름 검색"
              value={searchNameValue}
              onChange={(e) => {
                setSearchNameValue(e.target.value);
              }}
            />
            <button
              className="absolute bg-bjsBlue text-md p-1 pl-3 text-white right-0 top-[1px] rounded-r-xl "
              type="button"
              aria-label="강사 검색"
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
            <TeacherList
              teachers={data?.data}
              setForDeletedTeacherIds={setForDeletedTeacherIds}
              searchNameValue={searchNameValue}
              page={page}
            />
          </div>
          <div className=" w-[360px] mx-auto my-1">
            <Pagenation
              page={page}
              setPage={setPage}
              totalItemNumbers={data?.pageInfo?.totalItemSize}
              itemNumPerPage={10}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherManagementPage;
