import ClassItem from '../molecules/ClassItem';

function ClassList() {
  return (
    <div className="w-full">
      <div className="w-[800px] mx-auto">
        <div className="flex items-center justify-between">
          <input type="checkbox" className="w-[16px] h-[16px]" />
          <span className="text-lg font-bold text-hpGray w-[140px] text-center">
            반 이름
          </span>
          <span className="text-lg font-bold text-hpGray w-[90px]">
            반 학생
          </span>
          <span className="text-lg font-bold text-hpGray w-[140px]">
            담당 선생님
          </span>
          <span className="text-lg font-bold text-hpGray w-[100px]">상세</span>
        </div>
      </div>
      <hr className="h-[0.5px] border-0 bg-black w-[900px] mx-auto mt-2" />
      <div className="w-[800px] mx-auto mt-4">
        <ClassItem className="화53" studentNum="2명" teacherName="권나희" />
        <ClassItem className="화53" studentNum="2명" teacherName="권나희" />
        <ClassItem className="화53" studentNum="2명" teacherName="권나희" />
        <ClassItem className="화53" studentNum="2명" teacherName="권나희" />
        <ClassItem className="화53" studentNum="2명" teacherName="권나희" />
        <ClassItem className="화53" studentNum="2명" teacherName="권나희" />
        <ClassItem className="화53" studentNum="2명" teacherName="권나희" />
      </div>
      <hr className="h-[0.5px] border-0 bg-black w-[900px] mx-auto mt-2" />
    </div>
  );
}

export default ClassList;
