'use client';

import { useLocale } from '@/context/LocaleContext';
import type { Locale } from '@/lib/i18n';
import Link from 'next/link';

const privacyContent: Record<Locale, { title: string; lastUpdated: string; sections: { heading: string; body: string[] }[] }> = {
  zh: {
    title: '隐私政策',
    lastUpdated: '最后更新：2026 年 3 月 25 日',
    sections: [
      {
        heading: '概述',
        body: [
          'OrbNote 高度重视用户隐私。本隐私政策说明当你使用 OrbNote 以及其中的 AI 功能时，我们如何处理相关信息。',
          '我们的核心边界是：普通笔记数据继续以本地优先和 iCloud 私有同步为主；只有当你主动使用 AI 功能时，相关请求才会短暂经过 OrbNote 的 AI 服务链路。'
        ]
      },
      {
        heading: '本地优先与 iCloud',
        body: [
          'OrbNote 的普通笔记、会话、附件等核心数据，默认采用本地优先架构，并通过你自己的 iCloud / CloudKit 环境进行同步。',
          '对于这部分普通笔记数据，我们没有用于存储用户内容的后台数据库，也不提供面向用户内容托管的公共云账号系统。'
        ]
      },
      {
        heading: 'AI 功能',
        body: [
          '当你主动使用 AI 保存等 AI 功能时，应用会将你提交的内容发送至 OrbNote AI 服务，用于生成保存建议或返回相应结果。',
          '这些内容可能包括你输入的文字、你主动附带的图片或附件摘要，以及为判断应保存到哪个分组或会话而传递的有限上下文信息。'
        ]
      },
      {
        heading: '我们自有服务的处理边界',
        body: [
          'OrbNote 的 AI 服务采用无状态的 serverless 网关，用于鉴权、限流、服务路由和结果转发。它不是用户内容数据库。',
          '我们不会将你提交给 AI 的内容持久化保存到自有数据库中，也不会在常规服务日志中记录内容明文。用于限流和稳定性控制的 Redis 仅保存必要的去标识化技术标识和计数，不保存笔记内容、提示词正文、图片内容或附件正文。'
        ]
      },
      {
        heading: '第三方 AI 服务的隐私特性',
        body: [
          '为了提供 AI 功能，我们会将相关请求转发给具备严格隐私承诺的商用 AI 服务提供商进行处理。',
          '根据这些服务的公开政策，API 请求内容不会被用于训练通用模型；我们也优先使用不保留内容，或仅保留必要短期安全数据的服务模式。'
        ]
      },
      {
        heading: '日志与诊断',
        body: [
          '为了完成鉴权、限流、稳定性控制和故障排查，我们还可能处理必要的技术信息，例如匿名安装标识、请求 ID、应用版本、地区信息、错误码、时延和 token 用量。',
          '这些技术信息仅用于服务运行和诊断，不用于广告定向，也不作为用户内容存储系统的一部分。'
        ]
      },
      {
        heading: '数据共享',
        body: [
          '除提供 AI 功能所必需的服务处理外，我们不会将你的数据出售给广告商，也不会为了广告定向而共享你的内容。',
          '对于普通笔记数据，我们不会建立用于运营或检索用户内容的后台内容库。'
        ]
      },
      {
        heading: '数据安全',
        body: [
          '普通笔记内容主要受设备本地安全能力、iCloud / CloudKit 安全机制以及你所启用的 Apple 安全设置保护。',
          'AI 请求在传输过程中会通过网络安全协议进行保护；普通笔记与同步则继续受 Apple 隐私与安全体系约束。'
        ]
      },
      {
        heading: '你的选择与控制',
        body: [
          'AI 功能由你主动触发。你可以选择不使用 AI 功能，此时普通笔记仍按本地优先与 iCloud 同步方式工作。',
          '由于你的普通笔记主要存储在你的设备和 iCloud 中，你始终拥有对这部分数据的控制权。'
        ]
      },
      {
        heading: '联系我们',
        body: [
          '如果你对本隐私政策有任何疑问，请通过 App 内反馈功能或发送邮件至 galen_kwok@icloud.com 与我们联系。'
        ]
      }
    ]
  },
  en: {
    title: 'Privacy Policy',
    lastUpdated: 'Last updated: March 25, 2026',
    sections: [
      {
        heading: 'Overview',
        body: [
          'OrbNote takes user privacy seriously. This Privacy Policy explains how we handle information when you use OrbNote and its AI features.',
          'Our core boundary is simple: regular note data continues to be local-first with private iCloud sync, while requests only pass through OrbNote\'s AI service chain when you actively use an AI feature.'
        ]
      },
      {
        heading: 'Local-first notes and iCloud',
        body: [
          'Regular notes, threads, attachments, and related core data in OrbNote follow a local-first architecture by default and sync through your own iCloud / CloudKit environment.',
          'For this regular note data, we do not run a backend database for storing user content, and we do not offer a hosted cloud account system for managing that content on your behalf.'
        ]
      },
      {
        heading: 'AI features',
        body: [
          'When you actively use AI Save or another AI feature, the app sends the content you submit to OrbNote\'s AI service in order to generate a save suggestion or return a result.',
          'That content may include text you typed, images or attachment summaries you intentionally included, and the limited context needed to determine which group or thread it should be saved into.'
        ]
      },
      {
        heading: 'Boundaries of our own services',
        body: [
          'OrbNote\'s AI service uses a stateless serverless gateway for authentication, rate limiting, service routing, and result forwarding. It is not a user content database.',
          'We do not persist the content you send to AI in our own database, and we do not record plaintext content in routine service logs. Redis is used only for rate limiting and service stability, and stores only de-identified technical identifiers and counters, not note content, prompt text, image content, or attachment body text.'
        ]
      },
      {
        heading: 'Privacy properties of third-party AI services',
        body: [
          'To provide AI features, we forward relevant requests to commercial AI service providers with strict privacy commitments.',
          'According to their public policies, API request content is not used to train general models. We also prefer service modes that do not retain content or retain only the short-term safety data necessary to operate the service.'
        ]
      },
      {
        heading: 'Logs and diagnostics',
        body: [
          'To support authentication, rate limiting, service stability, and troubleshooting, we may process necessary technical information such as anonymous installation identifiers, request IDs, app version, region information, error codes, latency, and token usage.',
          'This technical information is used only to operate and diagnose the service. It is not used for ad targeting and is not part of any user content storage system.'
        ]
      },
      {
        heading: 'Data sharing',
        body: [
          'Other than the processing required to provide AI features, we do not sell your data to advertisers and we do not share your content for ad targeting.',
          'For regular notes, we do not build a backend content repository for operating on or searching user content.'
        ]
      },
      {
        heading: 'Data security',
        body: [
          'Regular note content is primarily protected by your device security, iCloud / CloudKit security mechanisms, and the Apple security settings you enable.',
          'AI requests are protected in transit through network security protocols, while regular notes and syncing continue to rely on Apple\'s privacy and security stack.'
        ]
      },
      {
        heading: 'Your choices and control',
        body: [
          'AI features are only triggered by you. You can choose not to use them, and regular notes will continue to work through the local-first and iCloud sync model.',
          'Because your regular notes are primarily stored on your devices and in iCloud, you remain in control of that data.'
        ]
      },
      {
        heading: 'Contact us',
        body: [
          'If you have any questions about this Privacy Policy, please contact us through the in-app feedback feature or by emailing galen_kwok@icloud.com.'
        ]
      }
    ]
  },
  ja: {
    title: 'プライバシーポリシー',
    lastUpdated: '最終更新日：2026年3月25日',
    sections: [
      {
        heading: '概要',
        body: [
          'OrbNote はユーザーのプライバシーを重視しています。本プライバシーポリシーは、OrbNote とその AI 機能をご利用になる際に、当社が関連情報をどのように取り扱うかを説明するものです。',
          '当社の基本的な境界は明確です。通常のノートデータは引き続きローカルファーストと iCloud のプライベート同期を前提とし、AI 機能を自分で使ったときだけリクエストが一時的に OrbNote の AI サービス経路を通過します。'
        ]
      },
      {
        heading: 'ローカルファーストと iCloud',
        body: [
          'OrbNote の通常ノート、スレッド、添付ファイルなどの主要データは、デフォルトでローカルファースト構成を取り、各自の iCloud / CloudKit 環境を通じて同期されます。',
          'この通常ノートデータに関して、当社はユーザー内容を保存するためのバックエンドデータベースを運用せず、その内容を代わりに管理する公開クラウドアカウントシステムも提供していません。'
        ]
      },
      {
        heading: 'AI 機能',
        body: [
          'AI Save などの AI 機能を自分で使うとき、アプリは保存案の生成や結果の返却のために、送信された内容を OrbNote の AI サービスへ送ります。',
          'この内容には、入力したテキスト、意図的に添付した画像や添付ファイルの要約、どのグループやスレッドへ保存すべきか判断するために必要な最小限のコンテキストが含まれる場合があります。'
        ]
      },
      {
        heading: '自社サービスの処理境界',
        body: [
          'OrbNote の AI サービスは、認証、レート制限、サービスルーティング、結果転送のためのステートレスな serverless ゲートウェイを利用しています。これはユーザー内容データベースではありません。',
          'AI に送られた内容を当社データベースへ永続保存することはなく、通常のサービスログにも平文の内容を記録しません。Redis はレート制限と安定運用のためにのみ使われ、匿名化された技術識別子とカウンタだけを保存し、ノート本文、プロンプト本文、画像内容、添付ファイル本文は保存しません。'
        ]
      },
      {
        heading: '第三者 AI サービスのプライバシー特性',
        body: [
          'AI 機能を提供するため、当社は厳格なプライバシーコミットメントを持つ商用 AI サービス提供者へ関連リクエストを転送します。',
          '公開ポリシーによれば、API リクエスト内容は汎用モデルの学習には使用されません。当社はさらに、内容を保持しない、または運用に必要な短期安全データのみを保持するサービスモードを優先します。'
        ]
      },
      {
        heading: 'ログと診断',
        body: [
          '認証、レート制限、サービスの安定性、障害調査のために、匿名インストール識別子、リクエスト ID、アプリバージョン、地域情報、エラーコード、遅延、トークン使用量などの必要な技術情報を処理する場合があります。',
          'これらの技術情報はサービス運用と診断のためだけに使われ、広告ターゲティングには利用されず、ユーザー内容保存システムの一部にもなりません。'
        ]
      },
      {
        heading: 'データ共有',
        body: [
          'AI 機能の提供に必要な処理を除き、当社はお客様のデータを広告事業者へ販売せず、広告ターゲティングのために内容を共有することもありません。',
          '通常ノートに関して、ユーザー内容を運用したり検索したりするためのバックエンド内容リポジトリは構築しません。'
        ]
      },
      {
        heading: 'データセキュリティ',
        body: [
          '通常ノートの内容は、主にお使いのデバイスのセキュリティ、iCloud / CloudKit の保護機能、および有効にしている Apple のセキュリティ設定によって守られます。',
          'AI リクエストは通信中にネットワークセキュリティプロトコルで保護され、通常ノートと同期は引き続き Apple のプライバシーとセキュリティ基盤に依存します。'
        ]
      },
      {
        heading: 'お客様の選択とコントロール',
        body: [
          'AI 機能はお客様が自分で使ったときだけ動作します。使用しないこともでき、その場合でも通常ノートはローカルファーストと iCloud 同期モデルのまま動作します。',
          '通常ノートは主にお客様のデバイスと iCloud に保存されるため、そのデータの主導権は常にお客様にあります。'
        ]
      },
      {
        heading: 'お問い合わせ',
        body: [
          '本プライバシーポリシーに関するご質問は、アプリ内フィードバック機能または galen_kwok@icloud.com へのメールでお問い合わせください。'
        ]
      }
    ]
  },
  ko: {
    title: '개인정보 처리방침',
    lastUpdated: '최종 업데이트: 2026년 3월 25일',
    sections: [
      {
        heading: '개요',
        body: [
          'OrbNote는 사용자 개인정보를 중요하게 생각합니다. 본 개인정보 처리방침은 OrbNote 및 그 AI 기능을 사용할 때 관련 정보를 어떻게 처리하는지 설명합니다.',
          '우리의 핵심 경계는 단순합니다. 일반 노트 데이터는 계속 로컬 우선과 비공개 iCloud 동기화를 기반으로 유지되며, AI 기능을 사용자가 직접 사용할 때만 요청이 잠시 OrbNote의 AI 서비스 경로를 통과합니다.'
        ]
      },
      {
        heading: '로컬 우선과 iCloud',
        body: [
          'OrbNote의 일반 노트, 스레드, 첨부 파일 등 핵심 데이터는 기본적으로 로컬 우선 구조를 따르며, 사용자의 iCloud / CloudKit 환경을 통해 동기화됩니다.',
          '이 일반 노트 데이터에 대해 우리는 사용자 콘텐츠를 저장하는 백엔드 데이터베이스를 운영하지 않으며, 해당 내용을 대신 호스팅하는 공개 클라우드 계정 시스템도 제공하지 않습니다.'
        ]
      },
      {
        heading: 'AI 기능',
        body: [
          'AI Save와 같은 AI 기능을 직접 사용할 때, 앱은 저장 제안을 만들거나 결과를 반환하기 위해 사용자가 제출한 내용을 OrbNote AI 서비스로 전송합니다.',
          '이 내용에는 사용자가 입력한 텍스트, 의도적으로 첨부한 이미지나 첨부 파일 요약, 어떤 그룹이나 스레드에 저장해야 하는지 판단하는 데 필요한 제한된 문맥이 포함될 수 있습니다.'
        ]
      },
      {
        heading: '당사 서비스의 처리 경계',
        body: [
          'OrbNote의 AI 서비스는 인증, 속도 제한, 서비스 라우팅, 결과 전달을 위한 상태 비저장 serverless 게이트웨이를 사용합니다. 이것은 사용자 콘텐츠 데이터베이스가 아닙니다.',
          'AI에 보낸 내용을 당사 데이터베이스에 영구 저장하지 않으며, 일반 서비스 로그에도 평문 내용을 기록하지 않습니다. Redis는 속도 제한과 안정성 제어를 위해서만 사용되며, 비식별 기술 식별자와 카운터만 저장하고 노트 내용, 프롬프트 본문, 이미지 내용, 첨부 파일 본문은 저장하지 않습니다.'
        ]
      },
      {
        heading: '제3자 AI 서비스의 프라이버시 특성',
        body: [
          'AI 기능을 제공하기 위해 우리는 엄격한 프라이버시 약속을 가진 상용 AI 서비스 제공자에게 관련 요청을 전달합니다.',
          '공개 정책에 따르면 API 요청 내용은 범용 모델 학습에 사용되지 않습니다. 또한 우리는 내용을 저장하지 않거나, 서비스 운영에 필요한 단기 안전 데이터만 저장하는 서비스 모드를 우선 선택합니다.'
        ]
      },
      {
        heading: '로그와 진단',
        body: [
          '인증, 속도 제한, 서비스 안정성, 문제 해결을 위해 익명 설치 식별자, 요청 ID, 앱 버전, 지역 정보, 오류 코드, 지연 시간, 토큰 사용량과 같은 필요한 기술 정보를 처리할 수 있습니다.',
          '이 기술 정보는 서비스 운영과 진단에만 사용되며, 광고 타기팅에 사용되지 않고 사용자 콘텐츠 저장 시스템의 일부도 아닙니다.'
        ]
      },
      {
        heading: '데이터 공유',
        body: [
          'AI 기능 제공에 필요한 처리 외에는 사용자의 데이터를 광고주에게 판매하지 않으며, 광고 타기팅을 위해 콘텐츠를 공유하지도 않습니다.',
          '일반 노트에 대해서는 사용자 콘텐츠를 운영하거나 검색하기 위한 백엔드 콘텐츠 저장소를 만들지 않습니다.'
        ]
      },
      {
        heading: '데이터 보안',
        body: [
          '일반 노트 콘텐츠는 주로 사용자의 기기 보안, iCloud / CloudKit 보안 메커니즘, 그리고 사용자가 활성화한 Apple 보안 설정에 의해 보호됩니다.',
          'AI 요청은 전송 중 네트워크 보안 프로토콜로 보호되며, 일반 노트와 동기화는 계속 Apple의 프라이버시 및 보안 체계에 의존합니다.'
        ]
      },
      {
        heading: '사용자의 선택과 통제',
        body: [
          'AI 기능은 사용자가 직접 트리거할 때만 동작합니다. 사용하지 않기로 선택할 수 있으며, 그 경우에도 일반 노트는 로컬 우선과 iCloud 동기화 방식으로 계속 동작합니다.',
          '일반 노트는 주로 사용자의 기기와 iCloud에 저장되므로, 그 데이터에 대한 통제권은 계속 사용자에게 있습니다.'
        ]
      },
      {
        heading: '문의하기',
        body: [
          '본 개인정보 처리방침에 대한 문의 사항은 앱 내 피드백 기능 또는 galen_kwok@icloud.com으로 이메일을 보내 주시기 바랍니다.'
        ]
      }
    ]
  }
};

export default function PrivacyPage() {
  const { locale } = useLocale();
  const data = privacyContent[locale];

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
        <p className="mt-3 text-[14px] text-[#86868b]">
          {data.lastUpdated}
        </p>

        <hr className="my-8 border-[#e5e5e7]" />

        <div className="space-y-10">
          {data.sections.map((section, index) => (
            <section key={index}>
              <h2 className="text-[20px] font-semibold text-[#1d1d1f] mb-4">
                {section.heading}
              </h2>
              <div className="space-y-3">
                {section.body.map((paragraph, pIndex) => (
                  <p
                    key={pIndex}
                    className="text-[15px] leading-relaxed text-[#424245]"
                  >
                    {renderWithEmailLinks(paragraph)}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

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
