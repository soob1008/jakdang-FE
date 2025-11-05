"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/shared/ui/select";
import { Banknote, CheckCircle, Loader2 } from "lucide-react";

export default function SettlementAccountCard() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const [accountInfo, setAccountInfo] = useState({
    bank: "",
    account: "",
    holder: "",
  });

  const handleVerify = async () => {
    setIsVerifying(true);

    await new Promise((res) => setTimeout(res, 1200));

    // 실제 구현 시, API 결과로 예금주명 자동 업데이트
    setAccountInfo((prev) => ({ ...prev, holder: "김작가" }));
    setIsVerified(true);
    setIsVerifying(false);
  };

  const handleSave = () => {
    if (!isVerified) return alert("계좌 실명 인증을 먼저 완료해주세요.");
    setIsRegistered(true);
  };

  const handleEdit = () => {
    setIsRegistered(false);
    setIsVerified(false);
  };

  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle>입금 계좌 정보</CardTitle>
        <CardDescription>
          정산 시 입금 받을 계좌 정보를 등록하세요.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {!isRegistered ? (
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label>은행 선택</Label>
              <Select
                value={accountInfo.bank}
                onValueChange={(v) =>
                  setAccountInfo((p) => ({ ...p, bank: v }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="은행을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="신한은행">신한은행</SelectItem>
                  <SelectItem value="국민은행">국민은행</SelectItem>
                  <SelectItem value="농협은행">농협은행</SelectItem>
                  <SelectItem value="우리은행">우리은행</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>계좌번호</Label>
              <Input
                placeholder="123-456-789012"
                value={accountInfo.account}
                onChange={(e) =>
                  setAccountInfo((p) => ({ ...p, account: e.target.value }))
                }
              />
            </div>

            <div className="grid gap-2">
              <Label>예금주명</Label>
              <Input
                placeholder="계좌 인증 후 자동 표시"
                value={accountInfo.holder}
                readOnly
              />
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleVerify}
                disabled={
                  !accountInfo.bank || !accountInfo.account || isVerifying
                }
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-1 animate-spin" /> 인증 중...
                  </>
                ) : isVerified ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-1 text-green-600" /> 인증
                    완료
                  </>
                ) : (
                  "계좌 실명 인증"
                )}
              </Button>

              <Button onClick={handleSave} disabled={!isVerified}>
                {isVerified ? "등록하기" : "등록 대기"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between border rounded-lg p-4 bg-muted/30">
            <div className="flex items-center gap-3">
              <Banknote className="h-6 w-6 text-green-600" />
              <div>
                <p className="font-medium text-base">
                  {accountInfo.bank} {accountInfo.account}
                </p>
                <p className="text-sm text-muted-foreground">
                  예금주: {accountInfo.holder}
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleEdit}>
              수정
            </Button>
          </div>
        )}
      </CardContent>

      <CardFooter className="text-xs text-muted-foreground">
        계좌 정보는 금융결제원 실명 인증을 통해 검증됩니다.
      </CardFooter>
    </Card>
  );
}
