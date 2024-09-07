import { Alert, Image, StyleSheet, Text, View } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { useState } from "react";
import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";

export default function ImagePicker() {
  const [pickedImage, setPickedImage] = useState("");
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  async function verifyPermissions() {
    // IOS手机，如果cameraPermissionInformation的状态是UNDETERMINED，就说明还未打开请求权限窗口
    // 这时通过requestPermission向用户发送权限请求
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    // 如果permission状态是拒绝的
    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions",
        "You need to grant camera permissions to use this app."
      );
      return false;
    }

    // 否则就是用户已经同意提供权限
    return true;
  }

  async function takeImageHandler() {
    // IOS手机的权限处理
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    // 安卓手机只需要设置了launchCameraAsync就可以，但是IOS手机需要额外的配置
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (!image.canceled && image.assets && image.assets.length > 0) {
      setPickedImage(image.assets[0].uri);
    } else {
      // 处理用户取消或其他情况
      setPickedImage("");
    }
  }

  let imagePreview = <Text>No image taken yet.</Text>;

  if (pickedImage) {
    imagePreview = <Image source={{ uri: pickedImage }} style={styles.image} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton icon="camera" onPress={takeImageHandler}>
        Take Photo
      </OutlinedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

