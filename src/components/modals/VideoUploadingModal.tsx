import ReactModal from 'react-modal';
import './css/LoadingTtitleAnimation.css';
import { LoadingType } from '../../types/loadingType';

interface VideoUploadingModalProps {
  modalOpen: boolean;
  uploadingInfo: LoadingType;
}

function VideoUploadingModal({
  modalOpen,
  uploadingInfo,
}: VideoUploadingModalProps) {
  /* overlay는 모달 창 바깥 부분을 처리하는 부분이고,
content는 모달 창부분이라고 생각하면 쉬울 것이다 */
  const customModalStyles: ReactModal.Styles = {
    overlay: {
      backgroundColor: ' rgba(0, 0, 0, 0.4)',
      width: '100%',
      height: '100vh',
      zIndex: '10',
      position: 'fixed',
      top: '0',
      left: '0',
    },
    content: {
      width: '450px',
      height: '200px',
      zIndex: '150',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '50px',
      boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
      backgroundColor: 'white',
      justifyContent: 'center',
      overflow: 'auto',
    },
  };

  const loadingBarWidth = `${Math.round(
    ((uploadingInfo.current + 1) / uploadingInfo.end) * 100,
  )}%`;

  return (
    <ReactModal isOpen={modalOpen} style={customModalStyles}>
      <div className="relative mx-auto">
        <section className="flex flex-col text-center justify-center w-[400px] h-[150px] mx-auto">
          <h1 className="font-bold text-xl leading-10 text-[#151B26] mb-[20px] flicker">
            Uploading....
          </h1>
          <div
            aria-hidden="true"
            className="w-[300px] h-[12px] bg-[#e5eaef] rounded-xl relative overflow-hidden mx-auto"
          >
            <span
              className="block absolute top-0 left-0  h-[12px] rounded-xl bg-[#13CE66]"
              style={{ width: loadingBarWidth }}
            />
          </div>
        </section>
      </div>
    </ReactModal>
  );
}

export default VideoUploadingModal;
