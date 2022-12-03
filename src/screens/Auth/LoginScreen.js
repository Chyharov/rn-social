import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  TouchableOpacity,
  Text,
  ImageBackground,
} from "react-native";
import { changeError } from "../../redux/auth/authSlice";
import { loginUser } from "../../redux/auth/authOperations";
import { getAuthError, getAuthLoading } from "../../redux/auth/authSelectors";
import Loader from "../../components/Loader";

export default function LoginScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isActiveEmail, setIsActiveEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [isActivePassword, setIsActivePassword] = useState(false);
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState("Показать");
  const [secure, setSecure] = useState(true);

  const dispatch = useDispatch();
  const error = useSelector(getAuthError);
  const isLoading = useSelector(getAuthLoading);

  useEffect(() => {
    if (!error) return;
    alert(error);
  }, [error]);

  const emailHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);
  const reset = () => {
    setEmail("");
    setPassword("");
  };

  const loginHandler = () => {
    if (!email || !password) {
      alert("Введите адрес электронной почты и пароль");
      return;
    }
    dispatch(loginUser({ email, password }));
    reset();
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

  const onLinkClick = () => {
    if (error) {
      dispatch(changeError());
    }
    navigation.navigate("Register");
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setIsShowKeyboard(false);
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
              paddingBottom:
                Platform.OS == "android" && isShowKeyboard ? 0 : 144,
            }}
          >
            <Text style={styles.headerTitle}>Войти</Text>
            <TextInput
              placeholder="Адрес электронной почты"
              value={email}
              onChangeText={emailHandler}
              placeholderTextColor="#BDBDBD"
              selectionColor="#212121"
              onBlur={() => setIsActiveEmail(false)}
              onFocus={() => {
                setIsActiveEmail(true);
                setIsShowKeyboard(true);
              }}
              style={isActiveEmail ? styles.inputIsActive : styles.input}
            />
            <View
              style={{
                ...styles.lastInput,
                marginBottom:
                  Platform.OS == "android" && isShowKeyboard ? 32 : 43,
              }}
            >
              <TextInput
                placeholder="Пароль"
                value={password}
                onChangeText={passwordHandler}
                placeholderTextColor="#BDBDBD"
                selectionColor="#212121"
                secureTextEntry={secure}
                onBlur={() => setIsActivePassword(false)}
                onFocus={() => {
                  setIsActivePassword(true);
                  setIsShowKeyboard(true);
                }}
                style={
                  isActivePassword
                    ? {
                        ...styles.inputIsActive,
                        marginBottom:
                          Platform.OS == "ios" && isShowKeyboard ? 100 : 0,
                      }
                    : {
                        ...styles.input,
                        marginBottom:
                          Platform.OS == "ios" && isShowKeyboard ? 100 : 0,
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
                  Platform.OS == "android" && isShowKeyboard ? "none" : "flex",
              }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={loginHandler}
              >
                <Text style={styles.btnTitle}>Войти</Text>
              </TouchableOpacity>
              <View style={styles.wrapper}>
                <Text style={styles.authLink}>Нет аккаунта? </Text>
                <TouchableOpacity activeOpacity={0.7} onPress={onLinkClick}>
                  <Text style={styles.authLink}>Зарегистрироваться</Text>
                </TouchableOpacity>
              </View>
            </View>
            {isLoading && <Loader />}
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

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
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingTop: 32,
    paddingHorizontal: 16,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
  },
  headerTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,
    color: "#212121",
    textAlign: "center",
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
    fontFamily: "Roboto-Regular",
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
});
