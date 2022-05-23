import React, {useCallback, useState} from 'react';
import {Platform} from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  ImageLibraryOptions,
  ImagePickerResponse,
  Asset,
  CameraOptions,
} from 'react-native-image-picker';
export default function useCameraAndImagePicker() {
  const [imagePickerResponse, setImagePickerResponse] =
    useState<React.SetStateAction<Asset[] | undefined>>(undefined);

  const imagePickerOption: ImageLibraryOptions = {
    mediaType: 'photo',
    quality: 1,
    includeBase64: Platform.OS === 'android',
    selectionLimit: 0,
  };

  const imagePickerCallback = useCallback((e: ImagePickerResponse) => {
    if (e.errorCode === 'permission') {
      console.warn('권한이 없습니다.');
    }
    if (e.errorCode === 'camera_unavailable') {
      console.warn('카메라가 지원되지 않는 기기입니다.');
    }
    setImagePickerResponse(e.assets);
  }, []);

  const onImagePicker = (): void | undefined => {
    launchImageLibrary(imagePickerOption, imagePickerCallback);
  };

  const takePickerOption: CameraOptions = {
    ...imagePickerOption,
    saveToPhotos: true,
  };

  const onTakePicture = () => {
    launchCamera(takePickerOption, imagePickerCallback);
  };

  return {
    onImagePicker,
    imagePickerResponse,
    onTakePicture,
  };
}
