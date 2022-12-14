import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Text,
  ImageBackground,
  Image,
  Platform,
} from "react-native";
import DocumentPicker from "react-native-document-picker";
import { AntDesign } from "@expo/vector-icons";
import { registerUser } from "../../redux/auth/authOperations";
import { getAuthError, getAuthLoading } from "../../redux/auth/authSelectors";
import { changeError } from "../../redux/auth/authSlice";
import Loader from "../../components/Loader";

const RegistrationScreen = ({ navigation }) => {
  const [login, setLogin] = useState("");
  const [isActiveLogin, setIsActiveLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [isActiveEmail, setIsActiveEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [isActivePassword, setIsActivePassword] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [secure, setSecure] = useState(true);
  const [secureText, setSecureText] = useState("Показать");
  const [photo, setPhoto] = useState();

  const dispatch = useDispatch();
  const error = useSelector(getAuthError);
  const isLoading = useSelector(getAuthLoading);

  useEffect(() => {
    if (!error) return;
    alert(error);
  }, [error]);

  const loginHandler = (text) => setLogin(text);
  const emailHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);
  const reset = () => {
    setLogin("");
    setEmail("");
    setPassword("");
  };

  const registerHandler = async () => {
    if (!login || !email || !password) {
      alert("Введите логин, адрес электронной почты и пароль");
      return;
    }
    if (photo) {
      const photoUrl = await uploadPhotoToServer();
      dispatch(registerUser({ login, email, password, photo: photoUrl }));
      reset();
      return;
    }
    dispatch(registerUser({ login, email, password, photo }));
    reset();
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();

    const uniqueImageId = Date.now().toString();

    const storageRef = ref(storage, `authImages/${uniqueImageId}`);
    await uploadBytes(storageRef, file);

    const photoUrl = await getDownloadURL(
      ref(storage, `authImages/${uniqueImageId}`)
    );
    return photoUrl;
  };

  const showPassword = () => {
    if (password === "" && secure) return;
    if (secure) {
      setSecure(false);
      setSecureText("Скрыть");
      return;
    }
    setSecure(true);
    setSecureText("Показать");
  };

  const loadPhoto = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });
      setPhoto(res.uri);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("error -----", err);
      } else {
        console.log("DocumentPicker error", err);
      }
    }
  };

  const deletePhoto = () => {
    setPhoto(null);
  };

  const onLinkClick = () => {
    if (error) {
      dispatch(changeError());
    }
    navigation.navigate("Login");
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setShowKeyboard(false);
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../../assets/images/Photo-BG.png")}
        >
          <View
            style={{
              ...styles.form,
              paddingBottom: Platform.OS == "android" && showKeyboard ? 0 : 78,
            }}
          >
            <View style={styles.photoBlock}>
              {photo ? (
                <>
                  <Image source={{ uri: photo }} style={styles.img} />
                  <AntDesign
                    name="closecircleo"
                    size={24}
                    color="#BDBDBD"
                    style={styles.btnLoad}
                    onPress={deletePhoto}
                  />
                </>
              ) : (
                <View style={styles.img}>
                  <AntDesign
                    name="pluscircleo"
                    size={24}
                    color="#FF6C00"
                    onPress={loadPhoto}
                    style={styles.btnLoad}
                  />
                </View>
              )}
            </View>
            <Text style={styles.headerTitle}>Регистрация</Text>
            <TextInput
              placeholder="Логин"
              value={login}
              onChangeText={loginHandler}
              placeholderTextColor="#BDBDBD"
              selectionColor="#212121"
              onBlur={() => {
                setIsActiveLogin(false);
              }}
              onFocus={() => {
                setIsActiveLogin(true);
                setShowKeyboard(true);
              }}
              style={isActiveLogin ? styles.inputIsActive : styles.input}
            />
            <TextInput
              placeholder="Адрес электронной почты"
              value={email}
              onChangeText={emailHandler}
              placeholderTextColor="#BDBDBD"
              selectionColor="#212121"
              onBlur={() => {
                setIsActiveEmail(false);
              }}
              onFocus={() => {
                setIsActiveEmail(true);
                setShowKeyboard(true);
              }}
              style={isActiveEmail ? styles.inputIsActive : styles.input}
            />
            <View
              style={{
                ...styles.lastInput,
                marginBottom:
                  Platform.OS == "android" && showKeyboard ? 32 : 43,
              }}
            >
              <TextInput
                placeholder="Пароль"
                value={password}
                onChangeText={passwordHandler}
                placeholderTextColor="#BDBDBD"
                selectionColor="#212121"
                secureTextEntry={secure}
                onBlur={() => {
                  setIsActivePassword(false);
                }}
                onFocus={() => {
                  setIsActivePassword(true);
                  setShowKeyboard(true);
                }}
                style={
                  isActivePassword
                    ? {
                        ...styles.inputIsActive,
                        marginBottom:
                          Platform.OS == "ios" && showKeyboard ? 165 : 0,
                      }
                    : {
                        ...styles.input,
                        marginBottom:
                          Platform.OS == "ios" && showKeyboard ? 165 : 0,
                      }
                }
              />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={showPassword}
                style={styles.btnShowHide}
              >
                <Text style={styles.titleShowHide}>{secureText}</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                display:
                  Platform.OS == "android" && showKeyboard ? "none" : "flex",
              }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={registerHandler}
              >
                <Text style={styles.btnTitle}>Зарегистрироваться</Text>
              </TouchableOpacity>
              <View style={styles.wrapper}>
                <Text style={styles.authLink}>Уже есть аккаунт? </Text>
                <TouchableOpacity activeOpacity={0.7} onPress={onLinkClick}>
                  <Text style={styles.authLink}>Войти</Text>
                </TouchableOpacity>
              </View>
            </View>
            {isLoading && <Loader />}
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  form: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    // alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,

    paddingTop: 92,
    paddingHorizontal: 16,
  },
  headerTitle: {
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,
    color: "#212121",

    marginBottom: 33,
  },
  input: {
    height: 50,

    backgroundColor: "#F6F6F6",
    color: "#212121",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    padding: 16,
    marginBottom: 16,
  },
  inputIsActive: {
    height: 50,

    backgroundColor: "#FFF",
    color: "#212121",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FF6C00",
    padding: 16,
    marginBottom: 16,
  },
  lastInput: {
    position: "relative",
  },
  btnShowHide: {
    position: "absolute",
    right: 16,
    top: 16,
  },
  titleShowHide: {
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  btn: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    paddingVertical: 16,
    marginBottom: 16,
  },
  btnTitle: {
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#FFF",
  },
  wrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  authLink: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
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
  btnLoad: {
    position: "absolute",
    right: -12,
    bottom: 18,
  },
});

export default RegistrationScreen;
