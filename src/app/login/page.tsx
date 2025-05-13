import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <section aria-labelledby="login-heading">
      <header>
        <h2 id="login-heading" className="text-2xl lg:text-3xl font-bold">
          로그인
        </h2>
        <p className="mt-2 text-sm lg:text-base text-gray-500 leading-relaxed">
          이메일 주소를 입력하시면 로그인 링크가 발송돼요.
          <br />
          받은 메일에서 링크를 눌러 바로 로그인할 수 있어요.
        </p>
      </header>

      <form className="mt-14">
        <div>
          <Input
            label="이메일"
            id="email"
            name="email"
            type="email"
            placeholder="이메일을 입력하세요."
            required
          />
        </div>

        <Button type="submit" size="xl" className="w-full mt-6">
          로그인 링크 보내기
        </Button>
      </form>
    </section>
  );
}
