import React from 'react'
import Resizer from 'react-image-file-resizer'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Avatar, Badge } from 'antd';

import { removeImage, uploadImages } from '../../functions/product';

const FileUpload = ({ values, setValues, setLoading }) => {
    const { user } = useSelector(state => ({ ...state }))

    const imageUploadAndResize = (e) => {
        const files = e.target.files
        const uploadedFiles = values.images

        if (files.length) {
            setLoading(true)
            for (let i = 0; i < files.length; i++) {
                Resizer.imageFileResizer(
                    files[i],
                    720,
                    720,
                    'JPEG',
                    100,
                    0,
                    uri => {
                        uploadImages(user ? user.token : "", uri)
                            .then(res => {
                                console.log("UPLOAD SUCCESS", res);
                                setLoading(false)
                                uploadedFiles.push(res.data)
                                setValues({ ...values, images: uploadedFiles })
                            })
                            .catch(err => {
                                setLoading(false)
                                console.log('CLOUDINARY UPLOAD ERR', err);
                            })
                    },
                    'base64'
                )
            }
        }
    }

    const handleImageRemove = (public_id) => {
        setLoading(true)
        removeImage(user ? user.token : "", public_id)
            .then(res => {
                setLoading(false)
                const { images } = values
                const filteredImages = images.filter(image => image.public_id !== public_id)
                setValues({ ...values, images: filteredImages })
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    }

    return (
        <>
            <div className="row">
                {values.images &&
                    values.images.map(image => (
                        <Badge
                            count="X"
                            key={image.public_id}
                            style={{ cursor: "pointer" }}
                            onClick={() => handleImageRemove(image.public_id)}
                        >
                            <Avatar
                                size={100}
                                src={image.url}
                                className="ml-3"
                                shape="square"
                            />
                        </Badge>
                    ))}
            </div>
            <div className="row mt-3">
                <label className="btn btn-primary btn-raised">
                    Choose file
                <input
                        type="file"
                        accept="images/*"
                        onChange={imageUploadAndResize}
                        multiple
                        hidden
                    />
                </label>
            </div>
        </>
    )
}

export default FileUpload
