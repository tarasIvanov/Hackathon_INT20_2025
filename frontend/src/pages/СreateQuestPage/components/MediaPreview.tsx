import { Box, IconButton } from "@mui/material";
import { MdOutlineDelete } from "react-icons/md";

interface MediaPreviewProps {
  media: File;
  onDelete: () => void;
}

export const MediaPreview: React.FC<MediaPreviewProps> = ({
  media,
  onDelete,
}) => {
  return (
    <Box
      sx={{
        ml: 2,
        mt: 2,
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      {media.type.startsWith("image/") ? (
        <img
          src={URL.createObjectURL(media)}
          alt="Uploaded media"
          style={{ maxWidth: "100%", maxHeight: "400px" }}
        />
      ) : (
        <video controls style={{ maxWidth: "100%", maxHeight: "400px" }}>
          <source src={URL.createObjectURL(media)} type={media.type} />
          Your browser does not support the video tag.
        </video>
      )}

      <IconButton
        onClick={onDelete}
        sx={{
          position: "absolute",
          top: 3,
          right: 18,
          backgroundColor: "rgba(0,0,0,0.6)",
          color: "white",
          "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
        }}
      >
        <MdOutlineDelete fontSize="18px" />
      </IconButton>
    </Box>
  );
};
