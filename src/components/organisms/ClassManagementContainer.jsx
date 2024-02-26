import { useSelector } from 'react-redux';
import ClassManagementList from '../molecules/ClassManagementList';

function ClassManagementContainer() {
  const { classes } = useSelector((state) => state.class);

  return (
    <div className="m-10">
      <div className="w-[42.875rem] h-[3.375rem] flex items-center">
        <div className="w-[7.5rem]">
          <input
            type="checkbox"
            className="w-[1.125rem] h-[1.125rem] mx-auto flex items-center border-hpLightkBlack border-solid border-[0.1rem]"
            disabled
          />
        </div>
        <div className="w-[8rem] flex justify-center">
          <span className="text-xl text-hpGray font-bold">반 이름</span>
        </div>
        <div className="w-[11.375rem] flex justify-center">
          <span className="text-xl text-hpGray font-bold">반 학생</span>
        </div>
        <div className="w-[16rem] flex justify-center">
          <span className="text-xl text-hpGray font-bold">담당 선생님</span>
        </div>
        <div className="w-[11rem] text-xl flex justify-center text-hpGray font-bold">
          상세
        </div>
      </div>
      <div className="w-[45rem] h-[20.25rem] overflow-y-auto border-hpBlack border-solid border-y-[0.125rem]">
        {classes.map((group, index) => (
          <div
            key={group.className}
            className="border-hpGray border-solid border-b-[0.1rem]"
          >
            <ClassManagementList index={index} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClassManagementContainer;
