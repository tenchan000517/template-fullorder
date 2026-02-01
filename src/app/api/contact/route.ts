import { NextRequest, NextResponse } from "next/server";

// バリデーションエラーの型
interface ValidationError {
  field: string;
  message: string;
}

// リクエストボディの型
interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

// サーバーサイドバリデーション
function validateContactForm(data: ContactFormData): ValidationError[] {
  const errors: ValidationError[] = [];

  // 名前のバリデーション
  if (!data.name || data.name.trim().length === 0) {
    errors.push({ field: "name", message: "お名前を入力してください" });
  } else if (data.name.length > 100) {
    errors.push({ field: "name", message: "お名前は100文字以内で入力してください" });
  }

  // メールアドレスのバリデーション
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || data.email.trim().length === 0) {
    errors.push({ field: "email", message: "メールアドレスを入力してください" });
  } else if (!emailRegex.test(data.email)) {
    errors.push({ field: "email", message: "正しいメールアドレスを入力してください" });
  }

  // 電話番号のバリデーション（任意項目）
  if (data.phone) {
    const phoneRegex = /^[0-9\-+() ]+$/;
    if (!phoneRegex.test(data.phone)) {
      errors.push({ field: "phone", message: "正しい電話番号を入力してください" });
    }
  }

  // メッセージのバリデーション
  if (!data.message || data.message.trim().length === 0) {
    errors.push({ field: "message", message: "お問い合わせ内容を入力してください" });
  } else if (data.message.length > 5000) {
    errors.push({ field: "message", message: "お問い合わせ内容は5000文字以内で入力してください" });
  }

  return errors;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // バリデーション
    const errors = validateContactForm(body);
    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      );
    }

    // TODO: メール送信処理（本番環境で実装）
    // 例: SendGrid, Resend, Nodemailer等を使用
    // await sendEmail({
    //   to: process.env.CONTACT_EMAIL,
    //   subject: `お問い合わせ: ${body.name}様`,
    //   body: formatEmailBody(body),
    // });

    // 開発環境ではログ出力
    if (process.env.NODE_ENV === "development") {
      console.log("Contact form submission:", body);
    }

    return NextResponse.json({
      success: true,
      message: "お問い合わせを受け付けました。",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      {
        success: false,
        errors: [{ field: "general", message: "送信中にエラーが発生しました。" }],
      },
      { status: 500 }
    );
  }
}
