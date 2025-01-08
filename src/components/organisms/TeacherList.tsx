import { TeacherType } from '../../types/teacherType';
import TeacherItem from '../molecules/TeacherItem';

interface TeacherListProps {
  teachers: TeacherType[];
  setForDeletedTeacherIds: React.Dispatch<React.SetStateAction<number[]>>;
  searchNameValue: string;
  page: number;
}

function TeacherList({
  teachers,
  setForDeletedTeacherIds,
  searchNameValue,
  page,
}: TeacherListProps) {
  return (
    <div className="w-full">
      <div className="w-[800px] mx-auto">
        <div className="flex items-center justify-between">
          {/* <input type="checkbox" className="w-[16px] h-[16px]" disabled /> */}
          <div className="w-[16px] h-[16px]" />
          <span className="text-lg font-bold text-hpGray w-[90px]">
            선생님 이름
          </span>
          <span className="text-lg font-bold text-hpGray w-[160px]">
            선생님 ID(전화번호)
          </span>
          <span className="text-lg font-bold text-hpGray w-[100px]">수정</span>
        </div>
      </div>
      <hr className="h-[0.5px] border-0 bg-black w-[900px] mx-auto mt-2" />
      <div className="w-[800px] mx-auto mt-4">
        {teachers.map((teacher) => (
          <TeacherItem
            key={teacher.id}
            id={teacher.id}
            name={teacher.name}
            phoneNumber={teacher.phoneNumber}
            setForDeletedTeacherIds={setForDeletedTeacherIds}
            searchNameValue={searchNameValue}
            page={page}
          />
        ))}
        {Array(10 - teachers.length)
          .fill(0)
          .map((value, index) => {
            const emptyKey = index + Date.now();
            return (
              <div key={emptyKey}>
                <div>
                  <div className="flex items-center justify-between my-2 h-[28.795px]">
                    <input className="w-[16px] h-[16px]" />
                    <span className="text-lg font-bold text-black w-[60px] text-center" />
                    <span className="text-lg font-bold text-black w-[90px] text-center" />
                    <span className="text-lg font-bold text-black w-[140px]" />
                    <div className="w-[100px]" />
                  </div>
                  <hr className="h-[0.5px] border-0  w-[800px] mx-auto mt-2" />
                </div>
              </div>
            );
          })}
      </div>
      <hr className="h-[0.5px] border-0 bg-black w-[900px] mx-auto mt-2" />
    </div>
  );
}

export default TeacherList;
