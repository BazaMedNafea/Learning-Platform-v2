import { useTranslation } from "react-i18next";
import { StudentFormData } from "../../../types/types";
import StudentForm from "./StudentForm";

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  studentData: StudentFormData;
  setStudentData: (data: StudentFormData) => void;
  loading: boolean;
}

const AddStudentModal = ({
  isOpen,
  onClose,
  onSubmit,
  studentData,
  setStudentData,
  loading,
}: AddStudentModalProps) => {
  const { t } = useTranslation("profile");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        ></div>
        <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all dark:bg-gray-800 sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            {t("addNewStudent")}
          </h2>
          <StudentForm
            isEdit={false}
            onSubmit={onSubmit}
            studentData={studentData}
            setStudentData={setStudentData}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default AddStudentModal;
