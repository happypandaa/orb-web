'use client';

import { useLocale } from '@/context/LocaleContext';
import type { Locale } from '@/lib/i18n';
import Link from 'next/link';

const termsContent: Record<Locale, { title: string; lastUpdated: string; sections: { heading: string; body: string[] }[] }> = {
  zh: {
    title: '使用条款',
    lastUpdated: '最后更新：2026 年 8 月 17 日',
    sections: [
      {
        heading: '接受条款',
        body: [
          '欢迎使用 OrbNote。通过下载、安装或使用 OrbNote 应用程序（以下简称"本应用"），即表示您同意接受本使用条款的约束。如果您不同意这些条款，请勿使用本应用。'
        ]
      },
      {
        heading: '服务说明',
        body: [
          'OrbNote 是一款对话式笔记应用，允许用户在 Apple 生态设备（Mac、iPhone、iPad、Apple Watch）上记录和管理笔记。',
          '普通笔记数据主要采用「本地优先」架构，存储在您的本地设备和您个人的 iCloud 账户中。',
          '当您主动使用 AI 功能时，相关请求可能通过 OrbNote 提供的无状态 AI 服务及其所依赖的第三方模型服务进行处理。该服务不作为用户内容数据库使用。'
        ]
      },
      {
        heading: '许可授权',
        body: [
          '我们授予您一项有限的、非排他性的、不可转让的、可撤销的许可，仅供您在个人设备上使用本应用。',
          '本许可不包括：修改、反编译、反向工程本应用或其任何部分；将本应用用于任何商业转售目的；移除本应用中的任何版权或专有标识。'
        ]
      },
      {
        heading: '用户内容',
        body: [
          '您在本应用中创建的所有内容（包括但不限于文字、录音、图片、附件）均属于您个人所有。我们不会取得您的任何内容的所有权。',
          '您对您创建的内容负全部责任，包括确保您有权使用、存储和分享该内容。'
        ]
      },
      {
        heading: 'iCloud 服务',
        body: [
          '本应用使用 Apple iCloud（CloudKit）进行跨设备数据同步。iCloud 服务的可用性、性能和存储容量受 Apple 的服务条款约束，不在我们的控制范围内。',
          '因 iCloud 服务中断、存储空间不足或 Apple 政策变更导致的数据同步失败或数据丢失，我们不承担责任。'
        ]
      },
      {
        heading: 'AI 功能',
        body: [
          'AI 功能仅在您主动触发时运行，不会在后台持续分析您的全部笔记内容。',
          '当您使用 AI 功能时，您提交的内容可能会被短暂处理以生成保存建议或返回结果；我们不会将这些内容持久化保存到自有用户内容数据库中。'
        ]
      },
      {
        heading: '自动续订订阅与付款',
        body: [
          'OrbNote Pro 通过 Apple App Store 提供月度和年度自动续订订阅。具体订阅周期、价格、当地币种以及可用的免费试用或优惠，将在您确认购买前显示，并可能因国家或地区而异。',
          '确认购买后，费用将从您的 Apple 账户中扣除。除非您在当前订阅周期结束前至少 24 小时取消订阅，否则订阅将自动续订。Apple 会在当前订阅周期结束前 24 小时内，按购买页面显示的续订价格向您的账户收取费用。',
          '您可以随时前往 Apple 账户的“订阅”设置管理或取消订阅。删除 OrbNote 不会自动取消订阅。取消后，您仍可在已付费周期结束前继续使用 OrbNote Pro。',
          '如果我们提供免费试用或促销优惠，具体期限和条件以购买时显示的信息为准。除非您在试用或优惠期结束前取消，否则订阅将按购买页面显示的价格自动续订。',
          '付款、账单争议和退款由 Apple 根据其政策及适用法律处理。您可以使用应用内的“恢复购买”功能，在符合条件的设备上恢复有效订阅。',
          '通过 App Store 进行的购买还受 Apple Media Services 条款和 Apple 标准最终用户许可协议约束。本使用条款是对这些条款的补充。',
          'Apple 标准最终用户许可协议：https://www.apple.com/legal/internet-services/itunes/dev/stdeula/'
        ]
      },
      {
        heading: '知识产权',
        body: [
          '本应用及其原始内容、功能和设计均为 OrbNote 的知识产权，受版权法和其他知识产权法保护。',
          'OrbNote 名称、标志和相关图形均为我们的商标。未经事先书面同意，不得使用这些标识。'
        ]
      },
      {
        heading: '免责声明',
        body: [
          '本应用按"原样"和"可用"基础提供，不提供任何明示或暗示的保证，包括但不限于适销性、特定用途适用性和非侵权性的暗示保证。',
          '我们不保证本应用将不间断运行、无错误或完全安全。您使用本应用的风险由您自行承担。',
          '对于因使用或无法使用本应用而导致的任何间接、附带、特殊或后果性损害，我们不承担责任。'
        ]
      },
      {
        heading: '服务变更与终止',
        body: [
          '我们保留随时修改、暂停或终止本应用（全部或部分）的权利，恕不另行通知。',
          '由于本应用的数据存储在您的本地设备和 iCloud 中，即使应用停止提供，您的数据仍可通过 iCloud 管理。'
        ]
      },
      {
        heading: '条款变更',
        body: [
          '我们保留随时修改本使用条款的权利。任何变更将在此页面上公布。继续使用本应用即表示您接受修改后的条款。'
        ]
      },
      {
        heading: '联系方式',
        body: [
          '如果您对本使用条款有任何疑问，请发送邮件至 galen_kwok@icloud.com 与我们联系。'
        ]
      }
    ]
  },
  en: {
    title: 'Terms of Use',
    lastUpdated: 'Last updated: August 17, 2026',
    sections: [
      {
        heading: 'Acceptance of terms',
        body: [
          'Welcome to OrbNote. By downloading, installing, or using the OrbNote application (the "App"), you agree to be bound by these Terms of Use. If you do not agree, please do not use the App.'
        ]
      },
      {
        heading: 'Service description',
        body: [
          'OrbNote is a conversational note app that lets users capture and manage notes across Apple devices including Mac, iPhone, iPad, and Apple Watch.',
          'Regular note data primarily follows a local-first architecture and is stored on your devices and in your personal iCloud account.',
          'When you actively use AI features, the relevant requests may be processed through OrbNote\'s stateless AI service and the third-party model services it depends on. This service is not used as a user content database.'
        ]
      },
      {
        heading: 'License grant',
        body: [
          'We grant you a limited, non-exclusive, non-transferable, revocable license to use the App on your personal devices.',
          'This license does not include modifying, decompiling, or reverse-engineering the App or any part of it, using the App for any commercial resale purpose, or removing any copyright or proprietary notices.'
        ]
      },
      {
        heading: 'User content',
        body: [
          'All content you create in the App, including text, recordings, images, and attachments, belongs to you. We do not claim ownership of your content.',
          'You are solely responsible for the content you create, including making sure that you have the right to use, store, and share it.'
        ]
      },
      {
        heading: 'iCloud services',
        body: [
          'The App uses Apple iCloud (CloudKit) for cross-device data sync. The availability, performance, and storage capacity of iCloud are governed by Apple\'s own terms and are outside our control.',
          'We are not responsible for sync failures or data loss caused by iCloud outages, insufficient storage, or changes in Apple policies.'
        ]
      },
      {
        heading: 'AI features',
        body: [
          'AI features run only when you actively trigger them. They do not continuously analyze all of your notes in the background.',
          'When you use an AI feature, the content you submit may be processed briefly to generate a save suggestion or return a result. We do not persist that content in our own user content database.'
        ]
      },
      {
        heading: 'Auto-renewable subscriptions and billing',
        body: [
          'OrbNote Pro is available through monthly and annual auto-renewable subscriptions purchased through the Apple App Store. The exact subscription period, price, local currency, and any available free trial or promotional offer are shown before you confirm a purchase and may vary by country or region.',
          'Payment is charged to your Apple Account when you confirm the purchase. Unless you cancel at least 24 hours before the end of the current subscription period, your subscription renews automatically. Apple charges your account for renewal within 24 hours before the end of the current period at the renewal price shown on the purchase screen.',
          'You can manage or cancel your subscription at any time in the Subscriptions section of your Apple Account settings. Deleting OrbNote does not cancel your subscription. After cancellation, you can continue using OrbNote Pro until the end of the paid period.',
          'If we offer a free trial or promotional offer, its duration and conditions are shown at purchase. Unless you cancel before the trial or promotional period ends, the subscription renews automatically at the price shown on the purchase screen.',
          'Apple handles payments, billing disputes, and refunds under its policies and applicable law. You can use Restore Purchases in the App to restore an eligible active subscription on your devices.',
          'Purchases made through the App Store are also subject to the Apple Media Services Terms and Apple\'s Standard End User License Agreement. These Terms of Use supplement those terms.',
          'Apple Standard End User License Agreement: https://www.apple.com/legal/internet-services/itunes/dev/stdeula/'
        ]
      },
      {
        heading: 'Intellectual property',
        body: [
          'The App and its original content, features, and design are the intellectual property of OrbNote and are protected by copyright and other intellectual property laws.',
          'The OrbNote name, logo, and related graphics are our trademarks and may not be used without prior written consent.'
        ]
      },
      {
        heading: 'Disclaimer',
        body: [
          'The App is provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied, including implied warranties of merchantability, fitness for a particular purpose, and non-infringement.',
          'We do not guarantee that the App will operate without interruption, be error-free, or be completely secure. You use the App at your own risk.',
          'We are not liable for any indirect, incidental, special, or consequential damages resulting from the use of, or inability to use, the App.'
        ]
      },
      {
        heading: 'Changes and termination',
        body: [
          'We reserve the right to modify, suspend, or discontinue the App, in whole or in part, at any time without notice.',
          'Because your data is stored on your devices and in iCloud, it can remain available through iCloud management even if the App is discontinued.'
        ]
      },
      {
        heading: 'Changes to these terms',
        body: [
          'We reserve the right to modify these Terms of Use at any time. Any changes will be posted on this page. Your continued use of the App constitutes acceptance of the updated terms.'
        ]
      },
      {
        heading: 'Contact',
        body: [
          'If you have any questions about these Terms of Use, please contact us at galen_kwok@icloud.com.'
        ]
      }
    ]
  },
  ja: {
    title: '利用規約',
    lastUpdated: '最終更新日：2026年8月17日',
    sections: [
      {
        heading: '規約への同意',
        body: [
          'OrbNote へようこそ。OrbNote アプリケーション（以下「本アプリ」）をダウンロード、インストール、または使用することにより、本利用規約に同意したものとみなされます。同意しない場合は、本アプリを使用しないでください。'
        ]
      },
      {
        heading: 'サービスの説明',
        body: [
          'OrbNote は、Mac、iPhone、iPad、Apple Watch などの Apple デバイスでノートを記録・管理できる対話型ノートアプリです。',
          '通常ノートのデータは主にローカルファースト構成を取り、お使いのデバイスと個人の iCloud アカウントに保存されます。',
          'AI 機能を自分で使うとき、関連リクエストは OrbNote のステートレスな AI サービスと、それが依存する第三者モデルサービスを通じて処理される場合があります。このサービスはユーザー内容データベースとしては使用されません。'
        ]
      },
      {
        heading: 'ライセンスの付与',
        body: [
          '当社は、お客様の個人デバイス上で本アプリを使用するための限定的、非独占的、譲渡不可、取消可能なライセンスを付与します。',
          'このライセンスには、本アプリやその一部の改変、逆コンパイル、リバースエンジニアリング、商業的再販目的での使用、著作権表示や所有権表示の削除は含まれません。'
        ]
      },
      {
        heading: 'ユーザーコンテンツ',
        body: [
          '本アプリで作成するすべての内容（テキスト、録音、画像、添付ファイルを含みます）はお客様に帰属します。当社はその所有権を主張しません。',
          '作成する内容についてはお客様が単独で責任を負い、使用、保存、共有の権利があることを保証する必要があります。'
        ]
      },
      {
        heading: 'iCloud サービス',
        body: [
          '本アプリはデバイス間同期のために Apple iCloud（CloudKit）を使用します。iCloud の可用性、性能、保存容量は Apple の条件に従い、当社の管理範囲外です。',
          'iCloud の障害、保存容量不足、または Apple ポリシー変更による同期失敗やデータ損失について、当社は責任を負いません。'
        ]
      },
      {
        heading: 'AI 機能',
        body: [
          'AI 機能はお客様が自分で使ったときだけ動作し、すべてのノート内容をバックグラウンドで継続的に解析することはありません。',
          'AI 機能を使用すると、保存案の生成や結果返却のために送信内容が短時間処理される場合がありますが、その内容を当社のユーザー内容データベースに永続保存することはありません。'
        ]
      },
      {
        heading: '自動更新サブスクリプションとお支払い',
        body: [
          'OrbNote Pro は、Apple App Store を通じて月額および年額の自動更新サブスクリプションとして提供されます。正確な期間、価格、現地通貨、利用可能な無料トライアルまたはプロモーションは、購入確定前に表示され、国や地域によって異なる場合があります。',
          '購入を確定すると、Apple Account に請求されます。現在のサブスクリプション期間が終了する少なくとも 24 時間前までに解約しない限り、サブスクリプションは自動更新されます。Apple は現在の期間が終了する前の 24 時間以内に、購入画面に表示された更新価格で請求します。',
          'サブスクリプションは、Apple Account 設定の「サブスクリプション」からいつでも管理または解約できます。OrbNote を削除してもサブスクリプションは解約されません。解約後も、支払い済み期間が終了するまでは OrbNote Pro を利用できます。',
          '無料トライアルまたはプロモーションを提供する場合、その期間と条件は購入時に表示されます。トライアルまたはプロモーション期間の終了前に解約しない限り、購入画面に表示された価格で自動更新されます。',
          '支払い、請求に関する問題、および返金は、Apple のポリシーと適用法に従って Apple が処理します。本アプリの「購入を復元」機能を使用して、対象となる有効なサブスクリプションをデバイス上で復元できます。',
          'App Store を通じた購入には、Apple Media Services 利用規約および Apple の標準エンドユーザ使用許諾契約も適用されます。本利用規約は、それらの規約を補足するものです。',
          'Apple 標準エンドユーザ使用許諾契約：https://www.apple.com/legal/internet-services/itunes/dev/stdeula/'
        ]
      },
      {
        heading: '知的財産権',
        body: [
          '本アプリおよびそのオリジナルコンテンツ、機能、デザインは OrbNote の知的財産であり、著作権法その他の知的財産法によって保護されています。',
          'OrbNote の名称、ロゴ、関連グラフィックは当社の商標であり、事前の書面による同意なく使用することはできません。'
        ]
      },
      {
        heading: '免責事項',
        body: [
          '本アプリは「現状のまま」「利用可能な状態で」提供され、明示または黙示を問わず、商品性、特定目的適合性、非侵害性を含むいかなる保証も行いません。',
          '当社は本アプリが中断なく動作すること、エラーがないこと、または完全に安全であることを保証しません。本アプリの利用はお客様自身の責任で行われます。',
          '本アプリの利用または利用不能に起因する間接的、付随的、特別、または結果的損害について、当社は責任を負いません。'
        ]
      },
      {
        heading: 'サービスの変更と終了',
        body: [
          '当社は予告なく、いつでも本アプリの全部または一部を変更、一時停止、または終了する権利を留保します。',
          'お客様のデータはデバイスと iCloud に保存されるため、本アプリの提供が終了しても iCloud 管理を通じて引き続き利用できる場合があります。'
        ]
      },
      {
        heading: '規約の変更',
        body: [
          '当社は本利用規約をいつでも変更する権利を留保します。変更はこのページに掲載されます。本アプリを継続して使用した場合、更新後の規約に同意したものとみなされます。'
        ]
      },
      {
        heading: 'お問い合わせ',
        body: [
          '本利用規約に関するご質問は galen_kwok@icloud.com までご連絡ください。'
        ]
      }
    ]
  },
  ko: {
    title: '이용약관',
    lastUpdated: '최종 업데이트: 2026년 8월 17일',
    sections: [
      {
        heading: '약관 동의',
        body: [
          'OrbNote에 오신 것을 환영합니다. OrbNote 애플리케이션(이하 "본 앱")을 다운로드, 설치 또는 사용함으로써 본 이용약관에 동의하는 것으로 간주됩니다. 동의하지 않으면 본 앱을 사용하지 마십시오.'
        ]
      },
      {
        heading: '서비스 설명',
        body: [
          'OrbNote는 Mac, iPhone, iPad, Apple Watch 등 Apple 기기에서 노트를 기록하고 관리할 수 있는 대화형 노트 앱입니다.',
          '일반 노트 데이터는 주로 로컬 우선 구조를 따르며, 사용자의 기기와 개인 iCloud 계정에 저장됩니다.',
          'AI 기능을 직접 사용할 때 관련 요청은 OrbNote의 상태 비저장 AI 서비스와, 그 서비스가 의존하는 제3자 모델 서비스에서 처리될 수 있습니다. 이 서비스는 사용자 콘텐츠 데이터베이스로 사용되지 않습니다.'
        ]
      },
      {
        heading: '라이선스 부여',
        body: [
          '당사는 사용자의 개인 기기에서 본 앱을 사용할 수 있는 제한적, 비독점적, 양도 불가, 철회 가능한 라이선스를 부여합니다.',
          '이 라이선스에는 본 앱 또는 그 일부의 수정, 디컴파일, 리버스 엔지니어링, 상업적 재판매 목적의 사용, 저작권 또는 소유권 표시 제거가 포함되지 않습니다.'
        ]
      },
      {
        heading: '사용자 콘텐츠',
        body: [
          '본 앱에서 생성하는 모든 콘텐츠(텍스트, 녹음, 이미지, 첨부 파일 포함)는 사용자에게 귀속됩니다. 당사는 그 소유권을 주장하지 않습니다.',
          '사용자는 생성하는 콘텐츠에 대해 전적인 책임을 지며, 사용·저장·공유할 권리가 있음을 보장해야 합니다.'
        ]
      },
      {
        heading: 'iCloud 서비스',
        body: [
          '본 앱은 기기 간 동기화를 위해 Apple iCloud(CloudKit)를 사용합니다. iCloud의 가용성, 성능, 저장 용량은 Apple의 약관에 따르며 당사의 통제 범위를 벗어납니다.',
          'iCloud 장애, 저장 공간 부족, 또는 Apple 정책 변경으로 인한 동기화 실패나 데이터 손실에 대해 당사는 책임을 지지 않습니다.'
        ]
      },
      {
        heading: 'AI 기능',
        body: [
          'AI 기능은 사용자가 직접 실행할 때만 동작하며, 모든 노트 내용을 백그라운드에서 지속적으로 분석하지 않습니다.',
          'AI 기능을 사용할 때 제출한 내용은 저장 제안을 만들거나 결과를 반환하기 위해 잠시 처리될 수 있지만, 그 내용을 당사의 사용자 콘텐츠 데이터베이스에 영구 저장하지는 않습니다.'
        ]
      },
      {
        heading: '자동 갱신 구독 및 결제',
        body: [
          'OrbNote Pro는 Apple App Store를 통해 월간 및 연간 자동 갱신 구독으로 제공됩니다. 정확한 구독 기간, 가격, 현지 통화 및 이용 가능한 무료 체험이나 프로모션은 구매 확정 전에 표시되며 국가 또는 지역에 따라 달라질 수 있습니다.',
          '구매를 확정하면 Apple Account로 결제됩니다. 현재 구독 기간이 끝나기 최소 24시간 전에 취소하지 않으면 구독이 자동으로 갱신됩니다. Apple은 현재 기간이 끝나기 전 24시간 이내에 구매 화면에 표시된 갱신 가격으로 계정에 청구합니다.',
          'Apple Account 설정의 구독 항목에서 언제든지 구독을 관리하거나 취소할 수 있습니다. OrbNote를 삭제해도 구독은 취소되지 않습니다. 취소 후에도 이미 결제한 기간이 끝날 때까지 OrbNote Pro를 사용할 수 있습니다.',
          '무료 체험 또는 프로모션을 제공하는 경우 기간과 조건은 구매 시 표시됩니다. 체험 또는 프로모션 기간이 끝나기 전에 취소하지 않으면 구매 화면에 표시된 가격으로 자동 갱신됩니다.',
          '결제, 청구 분쟁 및 환불은 Apple의 정책과 관련 법률에 따라 Apple이 처리합니다. 앱의 구입 복원 기능을 사용하여 대상 기기에서 유효한 구독을 복원할 수 있습니다.',
          'App Store를 통한 구매에는 Apple Media Services 이용 약관과 Apple 표준 최종 사용자 사용권 계약도 적용됩니다. 본 이용약관은 해당 약관을 보완합니다.',
          'Apple 표준 최종 사용자 사용권 계약: https://www.apple.com/legal/internet-services/itunes/dev/stdeula/'
        ]
      },
      {
        heading: '지적 재산권',
        body: [
          '본 앱과 그 원본 콘텐츠, 기능, 디자인은 OrbNote의 지적 재산이며 저작권법 및 기타 지적 재산권법의 보호를 받습니다.',
          'OrbNote 이름, 로고, 관련 그래픽은 당사의 상표이며 사전 서면 동의 없이 사용할 수 없습니다.'
        ]
      },
      {
        heading: '면책 조항',
        body: [
          '본 앱은 상품성, 특정 목적 적합성, 비침해성에 대한 묵시적 보증을 포함한 어떠한 종류의 명시적 또는 묵시적 보증 없이 "있는 그대로", "이용 가능한 상태로" 제공됩니다.',
          '당사는 본 앱이 중단 없이 작동하거나, 오류가 없거나, 완전히 안전하다는 것을 보장하지 않습니다. 본 앱의 사용은 전적으로 사용자 책임입니다.',
          '본 앱의 사용 또는 사용 불가로 인해 발생하는 간접적, 부수적, 특별 또는 결과적 손해에 대해 당사는 책임을 지지 않습니다.'
        ]
      },
      {
        heading: '서비스 변경 및 종료',
        body: [
          '당사는 사전 통지 없이 언제든지 본 앱의 전부 또는 일부를 변경, 일시 중지 또는 중단할 권리를 보유합니다.',
          '사용자 데이터는 기기와 iCloud에 저장되므로, 앱 제공이 중단되더라도 iCloud 관리를 통해 계속 접근할 수 있습니다.'
        ]
      },
      {
        heading: '약관 변경',
        body: [
          '당사는 언제든지 본 이용약관을 변경할 권리를 보유합니다. 변경 사항은 이 페이지에 게시됩니다. 본 앱을 계속 사용하면 업데이트된 약관에 동의한 것으로 간주됩니다.'
        ]
      },
      {
        heading: '문의하기',
        body: [
          '본 이용약관에 대한 문의 사항은 galen_kwok@icloud.com으로 연락해 주시기 바랍니다.'
        ]
      }
    ]
  }
};

export default function TermsPage() {
  const { locale } = useLocale();
  const data = termsContent[locale];

  function renderWithLinks(text: string) {
    const linkRegex = /(https?:\/\/[^\s]+|[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,})/g;
    const parts = text.split(linkRegex);
    const emailTest = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/;
    const urlTest = /^https?:\/\/[^\s]+$/;
    return parts.map((part, i) => {
      if (emailTest.test(part)) {
        return (
        <a key={i} href={`mailto:${part}`} className="text-[#0066cc] hover:text-[#0055b3] underline transition-colors">
          {part}
        </a>
        );
      }
      if (urlTest.test(part)) {
        return (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0066cc] hover:text-[#0055b3] underline transition-colors break-words"
          >
            {part}
          </a>
        );
      }
      return part;
    });
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
                    {renderWithLinks(paragraph)}
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
