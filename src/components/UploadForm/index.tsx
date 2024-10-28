import { useCallback, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import css from './UploadForm.module.css';
import clsx from 'clsx';

enum UploadStatus {
    Success = 'success',
    Error = 'error',
};

export const UploadForm = () => {
    const [status, setStatus] = useState<UploadStatus | null>(null);
    const [processing, setProcessing] = useState(false);

    const onDrop = useCallback(acceptedFiles => {
        setProcessing(true);
        acceptedFiles.forEach(async (file) => {
            const formData = new FormData();

            formData.append('file', file);

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            
            setProcessing(false);
            setStatus(res.ok ? UploadStatus.Success : UploadStatus.Error);
        });
    }, []);

    const {
        getRootProps,
        getInputProps,
        isDragActive,
    } = useDropzone({onDrop})

    const inputRef = useRef(null);

    if (processing) {
        return (
            <div className={css.processingFile}>Prosesserer fil</div>
        );
    }

    if (status === UploadStatus.Success) {
        return (
            <div className={css.processingFile}>Filen er lastet opp 🎉</div>
        )
    }

    if (status === UploadStatus.Error) {
        return (
            <div className={css.processingFile}>Noe gikk galt 💥</div>
        );
    }

    return (
        <div {...getRootProps()}>
            <input ref={inputRef} {...getInputProps()} />
            <div className={clsx(css.dropZone, {
                [css.dropZoneActive]: isDragActive,
            })}>
                {isDragActive ? (
                    <>
                        <span>Slipp filen for å laste opp</span>
                    </>
                ) : (
                    <>
                        <span>Slipp ønsket fil i området, eller</span>
                        <span
                            onClick={() => inputRef.current.click()}
                            className={css.fileExplorerButton}
                        >Velg fil fra filutforsker</span>
                    </>
                )}
            </div>
        </div>
    )
};