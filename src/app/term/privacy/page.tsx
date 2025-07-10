export default function PrivacyPolicyPage() {
  return (
    <div className="text-sm leading-relaxed text-gray-700">
      <h2 className="text-2xl font-bold mb-6">개인정보 처리방침</h2>

      <section className="space-y-4">
        <p>
          작당(이하 ‘서비스’)은 이용자의 개인정보를 중요하게 생각하며, 아래와
          같은 방침을 통해 개인정보를 보호하고 있습니다.
        </p>

        <h3 className="text-lg font-semibold mt-6">
          1. 수집하는 개인정보 항목
        </h3>
        <p>
          서비스는 회원가입 기능 없이, 다음과 같은 항목을 이용자로부터 직접
          수집할 수 있습니다.
          <br />
          - 작가 제공 정보: 이메일 주소, SNS 계정 링크, 외부 포트폴리오 링크, 책
          관련 정보 등
          <br />- 이용자가 작성한 공개 콘텐츠에 포함된 정보
        </p>

        <h3 className="text-lg font-semibold mt-6">
          2. 개인정보 수집 및 이용 목적
        </h3>
        <p>
          수집된 개인정보는 아래의 목적에 한해 사용됩니다.
          <br />
          - 작가의 정보를 독자에게 제공하고, 콘텐츠를 홍보하기 위한 용도
          <br />- 외부 링크 연결
        </p>

        <h3 className="text-lg font-semibold mt-6">
          3. 개인정보 보유 및 이용기간
        </h3>
        <p>
          - 작가가 정보를 삭제하거나 수정 요청을 할 경우, 즉시 반영됩니다.
          <br />- 서비스 종료 또는 운영 중단 시, 수집된 정보는 지체 없이
          파기합니다.
        </p>

        <h3 className="text-lg font-semibold mt-6">4. 개인정보의 제3자 제공</h3>
        <p>
          작당은 이용자의 개인정보를 제3자에게 제공하지 않으며, 법령에 근거한
          경우를 제외하고 외부에 공유하지 않습니다.
        </p>

        <h3 className="text-lg font-semibold mt-6">
          5. 이용자의 권리와 행사 방법
        </h3>
        <p>
          - 작가는 언제든지 자신의 정보를 열람하거나 수정, 삭제를 요청할 수
          있습니다.
          <br />- 요청은 문의처 이메일을 통해 처리됩니다:{" "}
        </p>

        <h3 className="text-lg font-semibold mt-6">
          6. 개인정보 보호를 위한 노력
        </h3>
        <p>
          - 수집되는 정보는 공개된 범위를 최소화하며, 외부 접근이 제한된
          환경에서 관리됩니다.
          <br />- 로그인 및 결제 기능이 없기 때문에 고유 식별정보(주민등록번호,
          계좌정보 등)는 수집하지 않습니다.
        </p>

        <h3 className="text-lg font-semibold mt-6">7. 정책 변경 시 공지</h3>
        <p>
          개인정보 처리방침이 변경되는 경우, 변경 내용은 서비스 메인 또는 별도
          공지사항을 통해 안내됩니다.
        </p>

        <h3 className="text-lg font-semibold mt-6">8. 문의처</h3>
        <p>
          개인정보 관련 문의는 아래 메일로 보내주세요.
          <br />
          <a
            href="mailto:1008sb354@gmail.com"
            className="text-primary underline"
          >
            1008sb354@gmail.com
          </a>
        </p>

        <p className="text-xs text-gray-400 mt-8">2025년 7월 6일</p>
      </section>
    </div>
  );
}
