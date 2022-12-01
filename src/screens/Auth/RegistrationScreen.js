import React, { useState } from "react";
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
import { AntDesign } from "@expo/vector-icons";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen({ navigation }) {
  console.log(Platform.OS);
  // console.log("navigation", navigation);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setstate] = useState(initialState);
  const [isActiveLogin, setIsActiveLogin] = useState(false);
  const [isActiveEmail, setIsActiveEmail] = useState(false);
  const [isActivePassword, setIsActivePassword] = useState(false);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setstate(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../../assets/images/Photo-BG.jpg")}
        >
          <View
            style={{
              ...styles.form,
              paddingBottom:
                Platform.OS == "android" && isShowKeyboard ? 0 : 78,
            }}
          >
            <View style={styles.photoBlock}>
              <View style={styles.img}>
                <AntDesign
                  name="pluscircleo"
                  size={24}
                  color="#FF6C00"
                  style={styles.btnLoad}
                />
              </View>
            </View>
            <Text style={styles.headerTitle}>Регистрация</Text>
            <TextInput
              placeholder="Логин"
              value={state.login}
              onChangeText={(value) =>
                setstate((prevState) => ({ ...prevState, login: value }))
              }
              placeholderTextColor="#BDBDBD"
              selectionColor="#212121"
              onBlur={() => {
                setIsActiveLogin(false);
              }}
              onFocus={() => {
                setIsActiveLogin(true);
                setIsShowKeyboard(true);
              }}
              style={isActiveLogin ? styles.inputIsActive : styles.input}
            />
            <TextInput
              placeholder="Адрес электронной почты"
              value={state.email}
              onChangeText={(value) =>
                setstate((prevState) => ({ ...prevState, email: value }))
              }
              placeholderTextColor="#BDBDBD"
              selectionColor="#212121"
              onBlur={() => {
                setIsActiveEmail(false);
              }}
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
                value={state.password}
                onChangeText={(value) =>
                  setstate((prevState) => ({ ...prevState, password: value }))
                }
                placeholderTextColor="#BDBDBD"
                selectionColor="#212121"
                secureTextEntry={true}
                onBlur={() => {
                  setIsActivePassword(false);
                }}
                onFocus={() => {
                  setIsActivePassword(true);
                  setIsShowKeyboard(true);
                }}
                style={
                  isActivePassword
                    ? {
                        ...styles.inputIsActive,
                        marginBottom:
                          Platform.OS == "ios" && isShowKeyboard ? 165 : 0,
                      }
                    : {
                        ...styles.input,
                        marginBottom:
                          Platform.OS == "ios" && isShowKeyboard ? 165 : 0,
                      }
                }
              />
              <TouchableOpacity activeOpacity={0.8} style={styles.btnShowHide}>
                <Text style={styles.titleShowHide}>Показать</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                display:
                  Platform.OS == "android" && isShowKeyboard ? "none" : "flex",
              }}
            >
              <TouchableOpacity activeOpacity={0.8} style={styles.btn}>
                <Text style={styles.btnTitle}>Зарегистрироваться</Text>
              </TouchableOpacity>
              <View style={styles.wrapper}>
                <Text style={styles.authLink}>Уже есть аккаунт? </Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate("Login")}
                >
                  <Text style={styles.authLink}>Войти</Text>
                </TouchableOpacity>
              </View>
            </View>
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
