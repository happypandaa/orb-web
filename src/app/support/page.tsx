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
        intro: '感谢使用 OrbNote！如果你在使用过程中遇到任何问题，可以通过以下方式获取帮助。',
        contactTitle: '联系我们',
        contactBody: '如有问题或建议，请通过 App 内的反馈功能或发送邮件至 galen_kwok@icloud.com 与我们联系。我们会尽快回复。',
        faqTitle: '常见问题',
        faq: [
            {
                q: '为什么 OrbNote 会占用我的 iCloud 空间？',
                a: '因为我们不存储你的数据。为了极致的隐私，我们将数据同步的权限交还给你。这意味着你不需要支付额外的订阅费来购买「云存储」，只需利用现有的 iCloud 空间即可。'
            },
            {
                q: '如果我的 iCloud 空间满了怎么办？',
                a: 'OrbNote 会提示同步失败。你可以清理 iCloud 空间或升级 Apple 的存储计划。你的本地数据依然安全，只是无法同步到其他设备。'
            },
            {
                q: '我的数据安全吗？',
                a: 'OrbNote 采用「本地优先 + 用户私有云」架构，深度集成 Apple CloudKit 的端到端加密。你的数据仅存储在本地设备和你个人的 iCloud 中，连 Apple 和我们都无法读取。'
            },
            {
                q: '卸载 App 后数据会丢失吗？',
                a: '卸载后本地数据会被移除，但 iCloud 中的数据不受影响。重新安装后会自动从 iCloud 同步恢复。你也可以在 Apple 的 iCloud 设置中管理数据。'
            },
            {
                q: '支持哪些设备？',
                a: 'OrbNote 支持 Mac、iPhone、iPad 和 Apple Watch，覆盖 Apple 全生态设备。'
            }
        ]
    },
    en: {
        title: 'Support',
        intro: 'Thank you for using OrbNote! If you encounter any issues, here\'s how to get help.',
        contactTitle: 'Contact Us',
        contactBody: 'For questions or suggestions, reach out via the in-app feedback feature or email us at galen_kwok@icloud.com. We\'ll get back to you as soon as possible.',
        faqTitle: 'Frequently Asked Questions',
        faq: [
            {
                q: 'Why does OrbNote use my iCloud storage?',
                a: 'Because we don\'t store your data. For ultimate privacy, we hand sync control back to you. This means you don\'t need to pay extra subscription fees for "cloud storage"—just use your existing iCloud space.'
            },
            {
                q: 'What if my iCloud storage is full?',
                a: 'OrbNote will show a sync failure notice. You can free up iCloud space or upgrade your Apple storage plan. Your local data remains safe—it just won\'t sync to other devices.'
            },
            {
                q: 'Is my data secure?',
                a: 'OrbNote uses a "local-first + user-owned cloud" architecture with deep integration of Apple CloudKit\'s end-to-end encryption. Your data is stored only on your device and in your personal iCloud—not even Apple or we can read it.'
            },
            {
                q: 'Will I lose data if I uninstall the app?',
                a: 'Local data will be removed upon uninstall, but your iCloud data remains intact. Reinstalling will automatically sync from iCloud. You can also manage your data in Apple\'s iCloud settings.'
            },
            {
                q: 'Which devices are supported?',
                a: 'OrbNote supports Mac, iPhone, iPad, and Apple Watch—covering the entire Apple ecosystem.'
            }
        ]
    },
    ja: {
        title: 'サポート',
        intro: 'OrbNote をご利用いただきありがとうございます。問題が発生した場合は、以下の方法でヘルプを受けられます。',
        contactTitle: 'お問い合わせ',
        contactBody: 'ご質問やご提案は、アプリ内のフィードバック機能または galen_kwok@icloud.com へのメールでお寄せください。できる限り早くご返信いたします。',
        faqTitle: 'よくある質問',
        faq: [
            {
                q: 'なぜ OrbNote は私の iCloud ストレージを使用するのですか？',
                a: '私たちはあなたのデータを保存しないからです。究極のプライバシーのために、同期の制御をあなたに委ねています。これは「クラウドストレージ」のための追加サブスクリプション料金が不要で、既存の iCloud スペースを使用するだけで良いということです。'
            },
            {
                q: 'iCloud ストレージがいっぱいになったらどうなりますか？',
                a: 'OrbNote は同期失敗の通知を表示します。iCloud スペースを整理するか、Apple のストレージプランをアップグレードできます。ローカルデータは安全なまま—他のデバイスに同期されないだけです。'
            },
            {
                q: 'データは安全ですか？',
                a: 'OrbNote は「ローカルファースト＋ユーザー個人クラウド」アーキテクチャを採用し、Apple CloudKit のエンドツーエンド暗号化を深く統合しています。データはお客様のデバイスと個人の iCloud にのみ保存され、Apple も当社も読み取ることはできません。'
            },
            {
                q: 'アプリを削除するとデータは失われますか？',
                a: 'アンインストールするとローカルデータは削除されますが、iCloud のデータはそのまま残ります。再インストールすると iCloud から自動的に同期されます。Apple の iCloud 設定からデータを管理することもできます。'
            },
            {
                q: 'どのデバイスに対応していますか？',
                a: 'OrbNote は Mac、iPhone、iPad、Apple Watch に対応しており、Apple エコシステム全体をカバーしています。'
            }
        ]
    },
    ko: {
        title: '지원',
        intro: 'OrbNote를 사용해 주셔서 감사합니다! 문제가 발생하면 아래 방법으로 도움을 받으실 수 있습니다.',
        contactTitle: '문의하기',
        contactBody: '질문이나 제안 사항이 있으시면 앱 내 피드백 기능 또는 galen_kwok@icloud.com으로 이메일을 보내 주세요. 최대한 빨리 답변 드리겠습니다.',
        faqTitle: '자주 묻는 질문',
        faq: [
            {
                q: '왜 OrbNote는 제 iCloud 저장 공간을 사용하나요?',
                a: '우리는 사용자의 데이터를 저장하지 않기 때문입니다. 궁극의 프라이버시를 위해, 동기화 제어를 사용자에게 맡깁니다. 이는 "클라우드 저장소"를 위한 추가 구독료가 필요 없고, 기존 iCloud 공간만 사용하면 된다는 것을 의미합니다.'
            },
            {
                q: 'iCloud 저장 공간이 가득 차면 어떻게 되나요?',
                a: 'OrbNote는 동기화 실패 알림을 표시합니다. iCloud 공간을 정리하거나 Apple 저장 공간 플랜을 업그레이드할 수 있습니다. 로컬 데이터는 안전하게 유지됩니다—다른 기기로 동기화되지 않을 뿐입니다.'
            },
            {
                q: '데이터는 안전한가요?',
                a: 'OrbNote는 "로컬 우선 + 사용자 개인 클라우드" 아키텍처를 채택하고 Apple CloudKit의 엔드투엔드 암호화를 깊이 통합하고 있습니다. 데이터는 사용자의 기기와 개인 iCloud에만 저장되며, Apple이나 당사도 읽을 수 없습니다.'
            },
            {
                q: '앱을 삭제하면 데이터가 사라지나요?',
                a: '삭제하면 로컬 데이터는 제거되지만, iCloud의 데이터는 그대로 유지됩니다. 다시 설치하면 iCloud에서 자동으로 동기화됩니다. Apple의 iCloud 설정에서 데이터를 관리할 수도 있습니다.'
            },
            {
                q: '어떤 기기를 지원하나요?',
                a: 'OrbNote는 Mac, iPhone, iPad, Apple Watch를 지원하며, Apple 전체 생태계를 커버합니다.'
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

                {/* 联系方式 */}
                <section className="mb-10">
                    <h2 className="text-[20px] font-semibold text-[#1d1d1f] mb-4">
                        {data.contactTitle}
                    </h2>
                    <p className="text-[15px] leading-relaxed text-[#424245]">
                        {renderWithEmailLinks(data.contactBody)}
                    </p>
                </section>

                {/* FAQ */}
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
