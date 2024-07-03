import TeacherItem from '../molecules/TeacherItem';

function TeacherList({ pages, setForDeletedTeacherIds, searchNameValue }) {
  console.log(pages);
  return (
    <div className="w-full">
      <div className="w-[800px] mx-auto">
        <div className="flex items-center justify-between">
          <input type="checkbox" className="w-[16px] h-[16px]" disabled />
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
        {pages.map((page) => {
          const teachers = page.data.contents;
          return teachers.map((teacher) => (
            <TeacherItem
              key={teacher.id}
              id={teacher.id}
              name={teacher.name}
              phoneNumber={teacher.phoneNumber}
              setForDeletedTeacherIds={setForDeletedTeacherIds}
              searchNameValue={searchNameValue}
            />
          ));
        })}
      </div>
      <hr className="h-[0.5px] border-0 bg-black w-[900px] mx-auto mt-2" />
    </div>
  );
}

export default TeacherList;
