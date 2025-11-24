import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Box, Button, Container, Heading } from "native-base";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";

export default function Login() {
  const navigation = useNavigation<any>();
  const gotoSignUp = () => {
    navigation.navigate("SignUp");
  };
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  async function goToHome() {
    const data = await fetch("https://nestjs-lms-production.up.railway.app/auth/sign-in", {
      "headers": {
        "content-type": "application/json",
        "x-tenant-id": "THINKLAB"
      },
      "body": JSON.stringify({ email, password }),
      "method": "POST",
    });
    const user = await data.json();

    if (user.access_token) {
      await AsyncStorage.setItem("user", JSON.stringify(user));
      Alert.alert("Login Successful", `Welcome back, ${user.fullName}!`);
      navigation.navigate("Home");
    } else {
      Alert.alert("Login Failed", "Invalid email or password.");
    }
  }

  function buttonactive() {
    if (email.length > 0 && password.length > 0) {
      return true;
    }
    if (email.includes("@") && password.length >= 6) {
      return true;
    }
    return false;
  }

  return <View style={styles.screen}>
    <Box style={styles.headerContainer}>
      <Heading style={styles.headerTitle}>Login</Heading>
    </Box>

    <Container style={styles.formContainer}>
      <Container>
        <Box style={styles.inputBox}>
          <Text style={styles.label}>Your Email</Text>
          <TextInput style={styles.accountInput} value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" autoCapitalize="none" />
        </Box>

        <Box style={styles.inputBox}>
          <Text style={styles.label}>Password</Text>
          <TextInput style={styles.accountInput} value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry />
        </Box>
      </Container>

      <Text style={styles.forgotText}>Forget password?</Text>

      <Button style={styles.primaryButton} onPress={goToHome} disabled={!buttonactive()}>Login</Button>

      <Text style={styles.signupRow}>Don't have an account? <Text style={styles.linkText} onPress={gotoSignUp}>Sign up</Text></Text>

      <Box style={styles.separatorRow}>
        {/* <Box style={styles.separatorLine}></Box>
        <Text style={styles.separatorText}>Or login with</Text>
        <Box style={styles.separatorLine} /> */}
      </Box>

      <Box style={styles.socialRow}>
        <Button variant="outline" style={styles.socialButton}>Google</Button>
        <Button variant="outline" style={styles.socialButton}>Facebook</Button>
      </Box>

    </Container>
  </View>;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 48,
  },
  headerContainer: {
    height: 100,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerTitle: {
    width: 350,
  },
  formContainer: {
    display: 'flex',
  },
  inputBox: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 16,
  },
  label: {
    marginBottom: 6,
    color: '#374151',
    fontSize: 14,
  },
  accountInput: {
    width: 350,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 48,
    backgroundColor: '#ffffff',
  },
  forgotText: {
    alignSelf: 'flex-end',
    color: '#2563eb',
    marginTop: -4,
    marginBottom: 20,
  },
  primaryButton: {
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    marginBottom: 16,
  },
  signupRow: {
    textAlign: 'center',
    color: '#374151',
    marginBottom: 24,
  },
  linkText: {
    color: '#2563eb',
    fontWeight: '600',
  },
  separatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  separatorText: {
    marginHorizontal: 8,
    color: '#6B7280',
  },
  socialRow: {
    flexDirection: 'row',
    gap: 12,
  },
  socialButton: {
    flex: 1,
    height: 48,
    borderRadius: 10,
  }
});