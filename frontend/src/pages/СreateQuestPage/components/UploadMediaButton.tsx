import style from "../CreateQuestPage.module.scss";
import { IoMdCloudUpload } from "react-icons/io";
import { Button } from "@mui/material";

interface UploadMediaButtonProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  buttonText: string; // Додано пропс для тексту кнопки
}

export const UploadMediaButton = ({
  onChange,
  buttonText,
}: UploadMediaButtonProps) => {
  return (
    <Button
      variant="contained"
      component="label"
      className={style.uploadButton}
      startIcon={<IoMdCloudUpload />}
    >
      {buttonText}
      <input type="file" hidden onChange={onChange} />
    </Button>
  );
};
