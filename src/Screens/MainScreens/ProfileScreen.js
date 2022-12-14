import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DocumentPicker from "react-native-document-picker";
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  FlatList,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import {
  collection,
  query,
  where,
  onSnapshot,
  updateProfile,
} from "firebase/firestore";
import { db, auth } from "../../firebase/config";
import { logoutUser } from "../../redux/auth/authOperations";
import {
  getUserName,
  getUserId,
  getUserPhoto,
} from "../../redux/auth/authSelectors";
import { changePhoto } from "../../redux/auth/authSlice";
import Post from "../../components/Post";

const ProfileScreen = ({ navigation }) => {
  const name = useSelector(getUserName);
  const userId = useSelector(getUserId);
  const photo = useSelector(getUserPhoto);

  const [posts, setPosts] = useState([]);

  const dispatch = useDispatch();

  const getOwnPosts = async () => {
    const q = query(collection(db, "posts"), where("userId", "==", userId));
    onSnapshot(q, (querySnapshot) => {
      const postsArray = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPosts(postsArray);
    });
  };

  useEffect(() => {
    getOwnPosts();
  }, []);

  const loadPhoto = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });
      return res.uri;
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("error -----", err);
      } else {
        console.log("DocumentPicker error", err);
      }
    }
  };

  const uploadPhotoToServer = async () => {
    const loadedPhoto = await loadPhoto();
    const response = await fetch(loadedPhoto);
    const file = await response.blob();

    const uniqueImageId = Date.now().toString();

    const storageRef = ref(storage, `authImages/${uniqueImageId}`);
    await uploadBytes(storageRef, file);

    const photoUrl = await getDownloadURL(
      ref(storage, `authImages/${uniqueImageId}`)
    );
    await updateProfile(auth.currentUser, { photoURL: photoUrl });
    dispatch(changePhoto(photoUrl));
  };

  const deletePhoto = async () => {
    await updateProfile(auth.currentUser, { photoURL: null });
    dispatch(changePhoto(null));
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("../../assets/images/Photo-BG.png")}
      >
        <View style={styles.block}>
          <View style={styles.photoBlock}>
            {photo ? (
              <>
                <Image source={{ uri: photo }} style={styles.img} />
                <AntDesign
                  name="closecircleo"
                  size={24}
                  color="#BDBDBD"
                  style={styles.btn}
                  onPress={deletePhoto}
                />
              </>
            ) : (
              <View style={styles.img}>
                <AntDesign
                  name="pluscircleo"
                  size={24}
                  color="#FF6C00"
                  onPress={uploadPhotoToServer}
                  style={styles.btn}
                />
              </View>
            )}
          </View>
          <Ionicons
            name="exit-outline"
            style={styles.iconExit}
            size={24}
            color="#BDBDBD"
            onPress={() => dispatch(logoutUser())}
          />
          <Text style={styles.name}>{name}</Text>
          <FlatList
            data={posts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Post item={item} navigation={navigation} />
            )}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  block: {
    position: "relative",
    flex: 1,
    width: "100%",
    // alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 92,
    paddingHorizontal: 16,
    marginTop: 103,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
  },
  photoBlock: {
    position: "absolute",
    top: -60,
    left: "36%",
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  img: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  btn: {
    position: "absolute",
    right: -12,
    bottom: 18,
  },
  iconExit: {
    position: "absolute",
    top: 22,
    right: 16,
  },
  name: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,
    textAlign: "center",
    color: "#212121",
    marginBottom: 32,
  },
});

export default ProfileScreen;
