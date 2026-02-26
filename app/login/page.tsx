import { LoginPage } from "@/src/components/auth/LoginPage";
import { loginPageData } from "@/src/data/mockData";

export default function LoginRoutePage() {
  return <LoginPage data={loginPageData} />;
}
