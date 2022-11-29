import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

const initialState = {
  email: "",
  password: "",
};

export default function App() {
  console.log(Platform.OS);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setstate] = useState(initialState);
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
                Platform.OS == "android" && setIsShowKeyboard ? 0 : 144,
            }}
          >
            <Text style={styles.headerTitle}>Войти</Text>
            <TextInput
              style={isActiveEmail ? styles.activeInput : styles.input}
              placeholder="Адрес электронной почты"
              placeholderTextColor="#BDBDBD"
              selectionColor="#212121"
              onBlur={() => setIsActiveEmail(false)}
              onFocus={() => {
                setIsShowKeyboard(true);
                setIsActiveEmail(true);
              }}
              value={state.email}
              onChangeText={(value) =>
                setstate((prevState) => ({ ...prevState, email: value }))
              }
            />
            <View
              style={{
                ...styles.lastInput,
                marginBottom:
                  Platform.OS == "android" && setIsShowKeyboard ? 32 : 43,
              }}
            >
              <TextInput
                style={
                  isActivePassword
                    ? {
                        ...styles.activeInput,
                        marginBottom:
                          Platform.OS == "ios" && isShowKeyboard ? 100 : 0,
                      }
                    : {
                        ...styles.input,
                        marginBottom:
                          Platform.OS == "ios" && isShowKeyboard ? 100 : 0,
                      }
                }
                placeholder="Пароль"
                placeholderTextColor="#BDBDBD"
                selectionColor="#212121"
                secureTextEntry={true}
                onBlur={() => setIsActivePassword(false)}
                onFocus={() => {
                  setIsShowKeyboard(true);
                  setIsActivePassword(true);
                }}
                value={state.password}
                onChangeText={(value) =>
                  setstate((prevState) => ({ ...prevState, password: value }))
                }
              />
              <TouchableOpacity activeOpacity={0.8} style={styles.lastInputBtn}>
                <Text style={styles.lastInputText}>Показать</Text>
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
                onPress={keyboardHide}
              >
                <Text style={styles.btnTitle}>Войти</Text>
              </TouchableOpacity>
              <View style={styles.wrapper}>
                <Text style={styles.link}>Нет аккаунта? </Text>
                <TouchableOpacity activeOpacity={0.7}>
                  <Text style={styles.link}>Зарегистрироваться</Text>
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
  activeInput: {
    height: 50,
    backgroundColor: "#FFF",
    color: "#212121",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FF6C00",
    padding: 16,
    marginBottom: 16,
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
  btn: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    paddingVertical: 16,
    marginTop: 43,
    marginBottom: 16,
  },
  btnTitle: {
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#FFF",
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
  wrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  lastInput: {
    position: "relative",
  },
  lastInputBtn: {
    position: "absolute",
    right: 16,
    top: 16,
  },
  lastInputText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});