'use client';

import { useLocale } from '@/context/LocaleContext';
import type { Locale } from '@/lib/i18n';
import Link from 'next/link';

// 隐私政策内容 - 每种语言单独维护
const privacyContent: Record<Locale, { title: string; lastUpdated: string; sections: { heading: string; body: string[] }[] }> = {
  zh: {
    title: '隐私政策',
    lastUpdated: '最后更新：2026 年 2 月 19 日',
    sections: [
      {
        heading: '概述',
        body: [
          'OrbNote（以下简称"我们"）高度重视用户隐私保护。本隐私政策说明了我们在您使用 OrbNote 应用程序时如何处理您的信息。',
          '核心原则：OrbNote 采用「本地优先 + 用户私有云」架构。我们不运行任何后端服务器，不收集、不存储、不传输您的任何笔记内容。'
        ]
      },
      {
        heading: '数据收集与使用',
        body: [
          '我们不收集任何个人数据。您的所有笔记、录音、附件等内容仅存储在您的本地设备和您个人的 iCloud 存储空间中。',
          '我们不使用任何第三方分析工具或广告 SDK。我们不会追踪您的使用行为。'
        ]
      },
      {
        heading: '数据存储',
        body: [
          '您的数据通过 Apple CloudKit 存储在您个人的 iCloud 账户中。我们不维护任何服务器端存储。',
          '如果您启用了 iCloud 的「高级数据保护」（Advanced Data Protection），您的数据将获得端到端加密保护，连 Apple 也无法访问。'
        ]
      },
      {
        heading: '数据共享',
        body: [
          '我们不会与任何第三方共享您的数据，因为我们根本无法访问您的数据。'
        ]
      },
      {
        heading: '数据安全',
        body: [
          'OrbNote 深度集成 Apple CloudKit 的端到端加密 (E2EE) 技术。在传输和存储过程中，您的内容均受到加密保护。只有您本人的设备可以解密这些内容。'
        ]
      },
      {
        heading: '用户权利',
        body: [
          '由于您的数据完全存储在您的设备和 iCloud 中，您始终拥有数据的完整控制权。您可以随时导出、删除或管理您的数据。',
          '卸载 OrbNote 后，本地数据将被移除。iCloud 中的数据可通过 Apple 的 iCloud 设置管理。'
        ]
      },
      {
        heading: '儿童隐私',
        body: [
          'OrbNote 不会有意收集 13 岁以下儿童的个人信息。由于我们不收集任何用户数据，因此不存在儿童数据问题。'
        ]
      },
      {
        heading: '隐私政策更新',
        body: [
          '我们可能会不定期更新本隐私政策。任何变更将在此页面上公布。继续使用 OrbNote 即表示您接受更新后的隐私政策。'
        ]
      },
      {
        heading: '联系我们',
        body: [
          '如果您对本隐私政策有任何疑问，请通过 App 内的反馈功能或发送邮件至 galen_kwok@icloud.com 与我们联系。'
        ]
      }
    ]
  },
  en: {
    title: 'Privacy Policy',
    lastUpdated: 'Last updated: February 19, 2026',
    sections: [
      {
        heading: 'Overview',
        body: [
          'OrbNote ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we handle your information when you use the OrbNote application.',
          'Core principle: OrbNote uses a "local-first + user-owned cloud" architecture. We do not operate any backend servers and do not collect, store, or transmit any of your note content.'
        ]
      },
      {
        heading: 'Data Collection and Use',
        body: [
          'We do not collect any personal data. All your notes, recordings, attachments, and other content are stored only on your local device and in your personal iCloud storage.',
          'We do not use any third-party analytics tools or advertising SDKs. We do not track your usage behavior.'
        ]
      },
      {
        heading: 'Data Storage',
        body: [
          'Your data is stored in your personal iCloud account via Apple CloudKit. We do not maintain any server-side storage.',
          'If you enable iCloud\'s Advanced Data Protection, your data receives end-to-end encryption, making it inaccessible even to Apple.'
        ]
      },
      {
        heading: 'Data Sharing',
        body: [
          'We do not share your data with any third parties because we simply cannot access your data.'
        ]
      },
      {
        heading: 'Data Security',
        body: [
          'OrbNote deeply integrates Apple CloudKit\'s end-to-end encryption (E2EE) technology. Your content is encrypted during both transmission and storage. Only your own devices can decrypt this content.'
        ]
      },
      {
        heading: 'Your Rights',
        body: [
          'Since your data is stored entirely on your device and in your iCloud, you always maintain full control. You can export, delete, or manage your data at any time.',
          'After uninstalling OrbNote, local data will be removed. Data in iCloud can be managed through Apple\'s iCloud settings.'
        ]
      },
      {
        heading: 'Children\'s Privacy',
        body: [
          'OrbNote does not knowingly collect personal information from children under 13. Since we do not collect any user data, there are no children\'s data concerns.'
        ]
      },
      {
        heading: 'Changes to This Policy',
        body: [
          'We may update this Privacy Policy from time to time. Any changes will be posted on this page. Your continued use of OrbNote constitutes acceptance of the updated Privacy Policy.'
        ]
      },
      {
        heading: 'Contact Us',
        body: [
          'If you have any questions about this Privacy Policy, please contact us through the in-app feedback feature or by emailing galen_kwok@icloud.com.'
        ]
      }
    ]
  },
  ja: {
    title: 'プライバシーポリシー',
    lastUpdated: '最終更新日：2026年2月19日',
    sections: [
      {
        heading: '概要',
        body: [
          'OrbNote（以下「当社」）は、ユーザーのプライバシー保護を最優先事項としています。本プライバシーポリシーは、OrbNote アプリケーションご利用時の情報の取り扱いについて説明します。',
          '基本原則：OrbNote は「ローカルファースト＋ユーザー個人クラウド」アーキテクチャを採用しています。バックエンドサーバーを一切運用せず、ノートの内容を収集、保存、送信することはありません。'
        ]
      },
      {
        heading: 'データの収集と利用',
        body: [
          '当社は個人データを一切収集しません。すべてのノート、録音、添付ファイルなどのコンテンツは、お客様のローカルデバイスと個人の iCloud ストレージにのみ保存されます。',
          'サードパーティの分析ツールや広告 SDK は使用しておらず、ご利用状況のトラッキングも行いません。'
        ]
      },
      {
        heading: 'データの保管',
        body: [
          'お客様のデータは Apple CloudKit を通じて、個人の iCloud アカウントに保存されます。サーバー側のストレージは一切保持していません。',
          'iCloud の「高度なデータ保護」を有効にすると、エンドツーエンドの暗号化により、Apple でさえもアクセスできなくなります。'
        ]
      },
      {
        heading: 'データの共有',
        body: [
          '当社はお客様のデータにアクセスできないため、第三者とデータを共有することはありません。'
        ]
      },
      {
        heading: 'データセキュリティ',
        body: [
          'OrbNote は Apple CloudKit のエンドツーエンド暗号化（E2EE）技術を深く統合しています。転送時と保管時の両方でコンテンツは暗号化されます。お客様ご自身のデバイスのみがコンテンツを復号化できます。'
        ]
      },
      {
        heading: 'お客様の権利',
        body: [
          'データはお客様のデバイスと iCloud に完全に保存されるため、常に完全な管理権を持ちます。いつでもデータをエクスポート、削除、管理できます。',
          'OrbNote をアンインストールすると、ローカルデータは削除されます。iCloud 内のデータは Apple の iCloud 設定から管理できます。'
        ]
      },
      {
        heading: 'お子様のプライバシー',
        body: [
          'OrbNote は 13 歳未満のお子様から意図的に個人情報を収集することはありません。ユーザーデータを一切収集しないため、お子様のデータに関する懸念はありません。'
        ]
      },
      {
        heading: 'ポリシーの変更',
        body: [
          '本プライバシーポリシーは随時更新される場合があります。変更はこのページに掲載されます。OrbNote の継続的なご利用は、更新されたプライバシーポリシーへの同意を意味します。'
        ]
      },
      {
        heading: 'お問い合わせ',
        body: [
          '本プライバシーポリシーに関するご質問は、アプリ内のフィードバック機能または galen_kwok@icloud.com までメールでお問い合わせください。'
        ]
      }
    ]
  },
  ko: {
    title: '개인정보 처리방침',
    lastUpdated: '최종 업데이트: 2026년 2월 19일',
    sections: [
      {
        heading: '개요',
        body: [
          'OrbNote(이하 "당사")는 사용자의 개인정보 보호를 최우선으로 생각합니다. 본 개인정보 처리방침은 OrbNote 애플리케이션 사용 시 정보 처리 방법을 설명합니다.',
          '핵심 원칙: OrbNote는 "로컬 우선 + 사용자 개인 클라우드" 아키텍처를 채택하고 있습니다. 백엔드 서버를 운영하지 않으며, 노트 내용을 수집, 저장 또는 전송하지 않습니다.'
        ]
      },
      {
        heading: '데이터 수집 및 사용',
        body: [
          '당사는 개인 데이터를 일절 수집하지 않습니다. 모든 노트, 녹음, 첨부 파일 등의 콘텐츠는 사용자의 로컬 기기와 개인 iCloud 저장 공간에만 저장됩니다.',
          '서드파티 분석 도구나 광고 SDK를 사용하지 않으며, 사용 행태를 추적하지 않습니다.'
        ]
      },
      {
        heading: '데이터 저장',
        body: [
          '사용자의 데이터는 Apple CloudKit을 통해 개인 iCloud 계정에 저장됩니다. 서버 측 스토리지는 일절 운영하지 않습니다.',
          'iCloud의 "고급 데이터 보호"를 활성화하면 엔드투엔드 암호화가 적용되어 Apple조차도 접근할 수 없게 됩니다.'
        ]
      },
      {
        heading: '데이터 공유',
        body: [
          '당사는 사용자의 데이터에 접근할 수 없으므로, 제3자와 데이터를 공유하지 않습니다.'
        ]
      },
      {
        heading: '데이터 보안',
        body: [
          'OrbNote는 Apple CloudKit의 엔드투엔드 암호화(E2EE) 기술을 깊이 통합하고 있습니다. 전송 및 저장 과정에서 콘텐츠가 암호화됩니다. 사용자 본인의 기기만이 콘텐츠를 복호화할 수 있습니다.'
        ]
      },
      {
        heading: '사용자 권리',
        body: [
          '데이터가 사용자의 기기와 iCloud에 전적으로 저장되므로, 항상 완전한 통제권을 유지합니다. 언제든지 데이터를 내보내기, 삭제 또는 관리할 수 있습니다.',
          'OrbNote를 삭제하면 로컬 데이터가 제거됩니다. iCloud의 데이터는 Apple의 iCloud 설정에서 관리할 수 있습니다.'
        ]
      },
      {
        heading: '아동 개인정보',
        body: [
          'OrbNote는 13세 미만 아동의 개인정보를 의도적으로 수집하지 않습니다. 사용자 데이터를 일절 수집하지 않으므로 아동 데이터 문제는 존재하지 않습니다.'
        ]
      },
      {
        heading: '정책 변경',
        body: [
          '본 개인정보 처리방침은 수시로 업데이트될 수 있습니다. 변경 사항은 이 페이지에 게시됩니다. OrbNote를 계속 사용하면 업데이트된 개인정보 처리방침에 동의하는 것으로 간주됩니다.'
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

  // 将文本中的邮箱地址自动转换为 mailto 链接
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
        {/* 标题 */}
        <h1 className="text-[32px] sm:text-[40px] font-bold text-[#1d1d1f] tracking-tight">
          {data.title}
        </h1>
        <p className="mt-3 text-[14px] text-[#86868b]">
          {data.lastUpdated}
        </p>

        {/* 分隔线 */}
        <hr className="my-8 border-[#e5e5e7]" />

        {/* 正文 */}
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

        {/* 返回首页 */}
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
