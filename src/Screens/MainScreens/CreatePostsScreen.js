import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  TextInput,
  Platform,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as Location from "expo-location";
import { FontAwesome5 } from "@expo/vector-icons";
import { EvilIcons, Ionicons, AntDesign } from "@expo/vector-icons";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../../firebase/config";
import { getUserId } from "../../redux/auth/authSelectors";
import Loader from "../../components/Loader";

const CreatePostsScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const userId = useSelector(getUserId);

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      const locationRes = await Location.getCurrentPositionAsync({});
      console.log("location", locationRes);
      setLocation(locationRes.coords);
    })();
  }, []);

  const titleHandler = (text) => setTitle(text);
  const placeHandler = (text) => setPlace(text);
  const reset = () => {
    setPhoto(null);
    setTitle("");
    setPlace("");
  };

  const publishPost = async () => {
    if (!title || !place) {
      alert("?????? ????????????????????, ?????????? ?????????? ???????????????? ?? ??????????");
      return;
    }
    setIsLoading(true);
    try {
      const photoUrl = await uploadPhotoToServer();
      await addDoc(collection(db, "posts"), {
        photo: photoUrl,
        title,
        place,
        location,
        userId,
        likes: [],
        comments: 0,
      });
      navigation.navigate("Posts");
      reset();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const takePhoto = async () => {
    console.log(camera);
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();

    const uniquePostId = Date.now().toString();

    const storageRef = ref(storage, `postImages/${uniquePostId}`);
    await uploadBytes(storageRef, file);

    const photoUrl = await getDownloadURL(
      ref(storage, `postImages/${uniquePostId}`)
    );
    return photoUrl;
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <View style={styles.cameraContainer}>
          {!photo && (
            <Camera style={styles.camera} type={type} ref={setCamera}>
              <TouchableOpacity
                style={styles.reverseCamera}
                onPress={toggleCameraType}
              >
                <Ionicons
                  name="ios-camera-reverse-outline"
                  size={30}
                  color="#fff"
                />
              </TouchableOpacity>
              <View style={styles.containerFlipCamera}>
                <TouchableOpacity
                  onPress={takePhoto}
                  style={styles.iconContainer}
                  enabled={photo ? "false" : "true"}
                >
                  <FontAwesome5 name="camera" size={20} color="#BDBDBD" />
                </TouchableOpacity>
              </View>
            </Camera>
          )}
          {photo && (
            <ImageBackground source={{ uri: photo }} style={styles.background}>
              <TouchableOpacity
                onPress={() => setPhoto(null)}
                style={{
                  ...styles.iconContainer,
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                }}
              >
                <FontAwesome5 name="camera" size={20} color="#fff" />
              </TouchableOpacity>
            </ImageBackground>
          )}
        </View>
        <Text
          onPress={() => {
            if (!photo) return;
            setPhoto(null);
          }}
          style={styles.loadText}
        >
          {!photo ? "?????????????????? ????????" : "?????????????????????????? ????????"}
        </Text>
        <TextInput
          placeholder="????????????????..."
          value={title}
          onChangeText={titleHandler}
          placeholderTextColor="#BDBDBD"
          selectionColor="#212121"
          onFocus={() => setShowKeyboard(true)}
          onBlur={() => setShowKeyboard(false)}
          style={{
            ...styles.input,
            marginTop: Platform.OS === "android" && showKeyboard ? -20 : 0,
          }}
        />
        <View
          style={{
            ...styles.input,
            marginTop: Platform.OS === "android" && showKeyboard ? -20 : 0,
            marginBottom: 32,
            paddingLeft: 28,
            position: "relative",
          }}
        >
          <EvilIcons
            name="location"
            size={24}
            color="#BDBDBD"
            style={styles.iconLocation}
          />
          <TextInput
            placeholder="??????????????????..."
            value={place}
            onChangeText={placeHandler}
            placeholderTextColor="#BDBDBD"
            selectionColor="#212121"
            onFocus={() => setShowKeyboard(true)}
            onBlur={() => setShowKeyboard(false)}
          />
        </View>

        <TouchableOpacity
          onPress={publishPost}
          activeOpacity={0.8}
          style={{
            ...styles.btn,
            backgroundColor: "#FF6C00",
            backgroundColor: !photo ? "#F6F6F6" : "#FF6C00",
            marginBottom: Platform.OS === "ios" ? "auto" : 16,
          }}
          disabled={!photo ? true : false}
        >
          <Text
            style={{
              ...styles.btnTitle,
              color: "#fff",
              color: !photo ? "#BDBDBD" : "#FFF",
            }}
          >
            ????????????????????????
          </Text>
        </TouchableOpacity>
        <View style={styles.blockDelete}>
          <TouchableOpacity
            style={styles.btnDelete}
            activeOpacity={0.6}
            onPress={reset}
          >
            <AntDesign name="delete" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
        {isLoading && <Loader />}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 34,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraContainer: {
    height: 240,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    overflow: "hidden",
    marginBottom: 8,
  },
  camera: {
    position: "relative",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    backgroundColor: "#fff",
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  loadText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginBottom: 32,
  },
  btn: {
    borderRadius: 100,
    paddingVertical: 16,
  },
  btnTitle: {
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  blockDelete: {
    width: "100%",
    alignItems: "center",
  },
  btnDelete: {
    width: 70,
    height: 40,
    backgroundColor: "#F6F6F6",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  input: {
    position: "relative",
    height: 50,
    color: "#212121",
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    paddingVertical: 16,
    marginBottom: 16,
  },
  iconLocation: {
    position: "absolute",
    left: 0,
    top: 13,
  },
  containerFlipCamera: {
    padding: 30,
  },
  reverseCamera: {
    position: "absolute",
    right: 20,
    top: 10,
  },
});

export default CreatePostsScreen;
