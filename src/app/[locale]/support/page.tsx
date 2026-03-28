'use client';

import { useLocale } from '@/context/LocaleContext';
import type { Locale } from '@/lib/i18n';
import Link from 'next/link';

const supportContent: Record<Locale, {
  title: string;
  intro: string;
  contactTitle: string;
  contactBody: string;
  faqTitle: string;
  faq: { q: string; a: string }[];
}> = {
  zh: {
    title: '支持',
    intro: '感谢使用 OrbNote！如果你在普通笔记或 AI 保存过程中遇到问题，可以通过以下方式获取帮助。',
    contactTitle: '联系我们',
    contactBody: '如有问题或建议，请通过 App 内的反馈功能或发送邮件至 galen_kwok@icloud.com 与我们联系。我们会尽快回复。',
    faqTitle: '常见问题',
    faq: [
      {
        q: '为什么 OrbNote 会占用我的 iCloud 空间？',
        a: '因为 OrbNote 的普通笔记和附件主要走本地优先与 iCloud 私有同步。我们没有替你托管这些内容的用户内容后台数据库，所以同步会占用你自己的 iCloud 空间。'
      },
      {
        q: 'OrbNote 会保存我发送给 AI 的内容吗？',
        a: '不会作为用户内容持久化保存。AI 请求只会在你主动使用 AI 时短暂经过 OrbNote 的无状态网关，用于鉴权、限流、路由和转发。Redis 仅保存限流所需的去标识化技术标识和计数，不保存笔记内容、提示词正文、图片内容或附件正文。'
      },
      {
        q: 'AI 会不会自动改动我的原始内容？',
        a: '不会。AI 会先生成保存建议，只有你确认后，内容才会真正写入对应的会话。'
      },
      {
        q: 'AI 会不会读取我所有笔记？',
        a: '不会。AI 只会处理你主动提交的内容，以及为了判断保存位置所需的有限上下文。普通笔记数据仍然主要保存在你的设备和 iCloud 中。'
      },
      {
        q: '上游 AI 服务会不会拿我的内容训练模型？',
        a: '我们优先选用具备严格隐私承诺的商用 AI 服务。根据其公开政策，API 请求内容不会被用于训练通用模型；我们也优先使用不保留内容，或仅保留必要短期安全数据的服务模式。'
      },
      {
        q: 'AI 保存是免费功能吗？',
        a: '不是。AI 保存现为 OrbNote Pro 能力。你仍然可以使用普通笔记、本地优先存储与 iCloud 私有同步；升级 OrbNote Pro 后可开启 AI 保存。'
      },
      {
        q: '如果我的 iCloud 空间满了怎么办？',
        a: 'OrbNote 会提示同步失败。你可以清理 iCloud 空间或升级 Apple 的存储计划。你的本地数据依然安全，只是无法同步到其他设备。'
      },
      {
        q: '支持哪些设备？',
        a: 'OrbNote 支持 Mac、iPhone、iPad 和 Apple Watch，覆盖 Apple 全生态设备。'
      }
    ]
  },
  en: {
    title: 'Support',
    intro: 'Thanks for using OrbNote. If you run into issues with regular notes or AI Save, you can get help here.',
    contactTitle: 'Contact us',
    contactBody: 'If you have questions or suggestions, contact us through the in-app feedback feature or email galen_kwok@icloud.com. We will reply as soon as we can.',
    faqTitle: 'Frequently asked questions',
    faq: [
      {
        q: 'Why does OrbNote use my iCloud storage?',
        a: 'Because regular notes and attachments in OrbNote primarily use a local-first model with private iCloud sync. We do not run a user content backend database to host that content for you, so syncing uses your own iCloud space.'
      },
      {
        q: 'Does OrbNote store what I send to AI?',
        a: 'Not as persisted user content. AI requests only pass briefly through OrbNote\'s stateless gateway for authentication, rate limiting, routing, and forwarding. Redis stores only de-identified technical identifiers and counters needed for rate limiting, not note content, prompt text, image content, or attachment body text.'
      },
      {
        q: 'Will AI automatically change my original content?',
        a: 'No. AI first generates a save suggestion, and content is written into the target thread only after you confirm it.'
      },
      {
        q: 'Does AI read all of my notes?',
        a: 'No. AI only processes the content you actively submit, plus the limited context needed to decide where it should be saved. Your regular notes still primarily remain on your devices and in iCloud.'
      },
      {
        q: 'Will upstream AI services use my content to train their models?',
        a: 'We prioritize commercial AI services with strict privacy commitments. According to their public policies, API request content is not used to train general models, and we prefer service modes that do not retain content or retain only short-term safety data when necessary.'
      },
      {
        q: 'Is AI Save included for free?',
        a: 'No. AI Save is currently an OrbNote Pro feature. You can still use regular notes, local-first storage, and private iCloud sync without it. Upgrade to OrbNote Pro to enable AI Save.'
      },
      {
        q: 'What if my iCloud storage is full?',
        a: 'OrbNote will show a sync failure notice. You can free up iCloud space or upgrade your Apple storage plan. Your local data remains safe, but it will not sync to other devices until space is available again.'
      },
      {
        q: 'Which devices are supported?',
        a: 'OrbNote supports Mac, iPhone, iPad, and Apple Watch across the Apple ecosystem.'
      }
    ]
  },
  ja: {
    title: 'サポート',
    intro: 'OrbNote をご利用いただきありがとうございます。通常ノートや AI Save で問題が発生した場合は、こちらからサポートを受けられます。',
    contactTitle: 'お問い合わせ',
    contactBody: 'ご質問やご提案は、アプリ内フィードバック機能または galen_kwok@icloud.com へのメールでご連絡ください。できるだけ早く返信します。',
    faqTitle: 'よくある質問',
    faq: [
      {
        q: 'なぜ OrbNote は私の iCloud ストレージを使用するのですか？',
        a: 'OrbNote の通常ノートと添付ファイルは主にローカルファーストと iCloud のプライベート同期で動作するためです。当社はその内容を代わりに保存するユーザー内容バックエンドデータベースを運用していないため、同期にはご自身の iCloud 容量が使われます。'
      },
      {
        q: 'AI に送った内容は OrbNote に保存されますか？',
        a: 'ユーザーコンテンツとして永続保存されることはありません。AI リクエストは認証、レート制限、ルーティング、転送のために OrbNote のステートレスなゲートウェイを短時間通過するだけです。Redis にはレート制限に必要な匿名化された技術識別子とカウンタのみを保存し、ノート本文、プロンプト、画像内容、添付ファイル本文は保存しません。'
      },
      {
        q: 'AI が元の内容を自動で変更しますか？',
        a: 'いいえ。AI はまず保存案を生成し、お客様が確認した後でのみ対象スレッドへ書き込まれます。'
      },
      {
        q: 'AI は私のノートをすべて読みますか？',
        a: 'いいえ。AI が処理するのは、お客様が自分で送った内容と、保存先を判断するために必要な最小限のコンテキストだけです。通常ノートは引き続き主にお使いのデバイスと iCloud に保存されます。'
      },
      {
        q: '上流の AI サービスは私の内容をモデル学習に使いますか？',
        a: '当社は厳格なプライバシー方針を持つ商用 AI サービスを優先しています。公開ポリシーでは API リクエスト内容は汎用モデル学習に使われず、可能な限り内容を保持しない、または必要最小限の短期安全データだけを保持するモードを選びます。'
      },
      {
        q: 'AI Save は無料ですか？',
        a: 'いいえ。AI Save は現在 OrbNote Pro の機能です。通常ノート、ローカルファースト保存、iCloud のプライベート同期は引き続き利用できます。AI Save を使うには OrbNote Pro へのアップグレードが必要です。'
      },
      {
        q: 'iCloud の容量がいっぱいになったらどうなりますか？',
        a: 'OrbNote は同期失敗を通知します。iCloud の容量を整理するか、Apple のストレージプランをアップグレードしてください。ローカルデータは安全ですが、空き容量が戻るまで他のデバイスとは同期されません。'
      },
      {
        q: 'どのデバイスに対応していますか？',
        a: 'OrbNote は Mac、iPhone、iPad、Apple Watch に対応しており、Apple エコシステム全体で利用できます。'
      }
    ]
  },
  ko: {
    title: '지원',
    intro: 'OrbNote를 사용해 주셔서 감사합니다. 일반 노트나 AI Save 사용 중 문제가 생기면 여기에서 도움을 받을 수 있습니다.',
    contactTitle: '문의하기',
    contactBody: '질문이나 제안이 있으면 앱 내 피드백 기능 또는 galen_kwok@icloud.com으로 연락해 주세요. 가능한 한 빨리 답변드리겠습니다.',
    faqTitle: '자주 묻는 질문',
    faq: [
      {
        q: '왜 OrbNote는 제 iCloud 저장 공간을 사용하나요?',
        a: 'OrbNote의 일반 노트와 첨부 파일은 주로 로컬 우선과 비공개 iCloud 동기화 방식으로 동작하기 때문입니다. 우리는 그 내용을 대신 호스팅하는 사용자 콘텐츠 백엔드 데이터베이스를 운영하지 않으므로, 동기화에는 사용자의 iCloud 공간이 사용됩니다.'
      },
      {
        q: 'AI에 보낸 내용이 OrbNote에 저장되나요?',
        a: '사용자 콘텐츠로 영구 저장되지는 않습니다. AI 요청은 인증, 속도 제한, 라우팅, 전달을 위해 OrbNote의 상태 비저장 게이트웨이를 잠시 통과할 뿐입니다. Redis에는 속도 제한에 필요한 비식별 기술 식별자와 카운터만 저장되며, 노트 내용, 프롬프트 텍스트, 이미지 내용, 첨부 파일 본문은 저장하지 않습니다.'
      },
      {
        q: 'AI가 원본 내용을 자동으로 바꾸나요?',
        a: '아니요. AI는 먼저 저장 제안을 만들고, 사용자가 확인한 뒤에만 대상 스레드에 기록됩니다.'
      },
      {
        q: 'AI가 내 모든 노트를 읽나요?',
        a: '아니요. AI는 사용자가 직접 제출한 내용과 저장 위치를 판단하는 데 필요한 최소한의 문맥만 처리합니다. 일반 노트는 계속 주로 사용자의 기기와 iCloud에 저장됩니다.'
      },
      {
        q: '상위 AI 서비스가 내 내용을 모델 학습에 쓰나요?',
        a: '우리는 엄격한 프라이버시 약속을 가진 상용 AI 서비스를 우선 사용합니다. 공개 정책에 따르면 API 요청 내용은 범용 모델 학습에 사용되지 않으며, 가능하면 내용을 저장하지 않거나 필요한 경우에만 짧은 기간의 안전 데이터만 유지하는 모드를 우선 선택합니다.'
      },
      {
        q: 'AI Save는 무료인가요?',
        a: '아니요. AI Save는 현재 OrbNote Pro 기능입니다. 일반 노트, 로컬 우선 저장, 비공개 iCloud 동기화는 계속 사용할 수 있습니다. AI Save를 사용하려면 OrbNote Pro로 업그레이드하세요.'
      },
      {
        q: 'iCloud 저장 공간이 가득 차면 어떻게 되나요?',
        a: 'OrbNote는 동기화 실패 알림을 표시합니다. iCloud 공간을 정리하거나 Apple 저장 공간 플랜을 업그레이드하세요. 로컬 데이터는 안전하지만, 다시 여유 공간이 생길 때까지 다른 기기와 동기화되지 않습니다.'
      },
      {
        q: '어떤 기기를 지원하나요?',
        a: 'OrbNote는 Mac, iPhone, iPad, Apple Watch를 지원하며 Apple 생태계 전반에서 사용할 수 있습니다.'
      }
    ]
  }
};

export default function SupportPage() {
  const { locale } = useLocale();
  const data = supportContent[locale];

  function renderWithEmailLinks(text: string) {
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,})/g;
    const parts = text.split(emailRegex);
    const emailTest = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/;
    return parts.map((part, i) =>
      emailTest.test(part) ? (
        <a key={i} href={`mailto:${part}`} className="text-[#0066cc] hover:text-[#0055b3] underline transition-colors">
          {part}
        </a>
      ) : (
        part
      )
    );
  }

  return (
    <div className="min-h-screen bg-white pt-12">
      <div className="max-w-[680px] mx-auto px-6 py-16">
        <h1 className="text-[32px] sm:text-[40px] font-bold text-[#1d1d1f] tracking-tight">
          {data.title}
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-[#424245]">
          {data.intro}
        </p>

        <hr className="my-8 border-[#e5e5e7]" />

        <section className="mb-10">
          <h2 className="text-[20px] font-semibold text-[#1d1d1f] mb-4">
            {data.contactTitle}
          </h2>
          <p className="text-[15px] leading-relaxed text-[#424245]">
            {renderWithEmailLinks(data.contactBody)}
          </p>
        </section>

        <section>
          <h2 className="text-[20px] font-semibold text-[#1d1d1f] mb-6">
            {data.faqTitle}
          </h2>
          <div className="space-y-6">
            {data.faq.map((item, index) => (
              <div key={index} className="border-b border-[#e5e5e7] pb-6 last:border-0">
                <h3 className="text-[15px] font-semibold text-[#1d1d1f] mb-2">
                  {item.q}
                </h3>
                <p className="text-[15px] leading-relaxed text-[#424245]">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        <hr className="my-10 border-[#e5e5e7]" />
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[14px] text-[#0066cc] hover:text-[#0055b3] transition-colors"
        >
          ← {locale === 'zh' ? '返回首页' : locale === 'ja' ? 'トップページへ戻る' : locale === 'ko' ? '홈으로 돌아가기' : 'Back to Home'}
        </Link>
      </div>
    </div>
  );
}
