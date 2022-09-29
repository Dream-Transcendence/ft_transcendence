import { Avatar, IconButton } from "@mui/material";
import AddPhotoAlternateTowToneIcon from '@mui/icons-material/AddPhotoAlternate';

function FileUploadButton() {
    return (
        <IconButton color="primary" aria-label="upload picture" component="label">
            <input hidden accept="image/*" type="file" />
            <AddPhotoAlternateTowToneIcon color="disabled" />
        </IconButton>
    )
}

export default FileUploadButton;