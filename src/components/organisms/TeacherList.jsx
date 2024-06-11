import TeacherItem from '../molecules/TeacherItem';

function TeacherList() {
  return (
    <div className="w-full">
      <div className="w-[800px] mx-auto">
        <div className="flex items-center justify-between">
          <input type="checkbox" className="w-[16px] h-[16px]" />
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
        <TeacherItem name="권나희" id="010-3433-0652" />
        <TeacherItem name="권나희" id="010-3433-0652" />
        <TeacherItem name="권나희" id="010-3433-0652" />
        <TeacherItem name="권나희" id="010-3433-0652" />
        <TeacherItem name="권나희" id="010-3433-0652" />
        <TeacherItem name="권나희" id="010-3433-0652" />
        <TeacherItem name="권나희" id="010-3433-0652" />
        <TeacherItem name="권나희" id="010-3433-0652" />
      </div>
      <hr className="h-[0.5px] border-0 bg-black w-[900px] mx-auto mt-2" />
    </div>
  );
}

export default TeacherList;
