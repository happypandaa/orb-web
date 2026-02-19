'use client';

import { useLocale } from '@/context/LocaleContext';
import type { Locale } from '@/lib/i18n';
import Link from 'next/link';

const termsContent: Record<Locale, { title: string; lastUpdated: string; sections: { heading: string; body: string[] }[] }> = {
    zh: {
        title: '使用条款',
        lastUpdated: '最后更新：2026 年 2 月 19 日',
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
                    '本应用采用「本地优先」架构，您的数据存储在本地设备和您个人的 iCloud 账户中。我们不运行任何后端服务器。'
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
                    '您在本应用中创建的所有内容（包括但不限于文字、录音、图片、附件）均属于您个人所有。我们不会访问、收集或取得您的任何内容的所有权。',
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
        lastUpdated: 'Last updated: February 19, 2026',
        sections: [
            {
                heading: 'Acceptance of Terms',
                body: [
                    'Welcome to OrbNote. By downloading, installing, or using the OrbNote application ("the App"), you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use the App.'
                ]
            },
            {
                heading: 'Service Description',
                body: [
                    'OrbNote is a conversational note-taking application that allows users to record and manage notes across Apple ecosystem devices (Mac, iPhone, iPad, Apple Watch).',
                    'The App uses a "local-first" architecture. Your data is stored on your local device and in your personal iCloud account. We do not operate any backend servers.'
                ]
            },
            {
                heading: 'License Grant',
                body: [
                    'We grant you a limited, non-exclusive, non-transferable, revocable license to use the App on your personal devices.',
                    'This license does not include: modifying, decompiling, or reverse-engineering the App or any part thereof; using the App for any commercial resale purpose; removing any copyright or proprietary notices from the App.'
                ]
            },
            {
                heading: 'User Content',
                body: [
                    'All content you create in the App (including but not limited to text, recordings, images, and attachments) belongs to you. We do not access, collect, or claim ownership of any of your content.',
                    'You are solely responsible for the content you create, including ensuring you have the right to use, store, and share such content.'
                ]
            },
            {
                heading: 'iCloud Services',
                body: [
                    'The App uses Apple iCloud (CloudKit) for cross-device data synchronization. The availability, performance, and storage capacity of iCloud are governed by Apple\'s terms of service and are beyond our control.',
                    'We are not responsible for data sync failures or data loss caused by iCloud service interruptions, insufficient storage, or changes in Apple\'s policies.'
                ]
            },
            {
                heading: 'Intellectual Property',
                body: [
                    'The App and its original content, features, and design are the intellectual property of OrbNote and are protected by copyright and other intellectual property laws.',
                    'The OrbNote name, logo, and related graphics are our trademarks. They may not be used without prior written consent.'
                ]
            },
            {
                heading: 'Disclaimer of Warranties',
                body: [
                    'The App is provided on an "as is" and "as available" basis without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.',
                    'We do not guarantee that the App will operate without interruption, be error-free, or be completely secure. Your use of the App is at your own risk.',
                    'We shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use the App.'
                ]
            },
            {
                heading: 'Modification and Termination',
                body: [
                    'We reserve the right to modify, suspend, or discontinue the App (in whole or in part) at any time without notice.',
                    'Since your data is stored on your local device and in iCloud, your data remains accessible through iCloud management even if the App is discontinued.'
                ]
            },
            {
                heading: 'Changes to Terms',
                body: [
                    'We reserve the right to modify these Terms of Use at any time. Any changes will be posted on this page. Your continued use of the App constitutes acceptance of the modified terms.'
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
        lastUpdated: '最終更新日：2026年2月19日',
        sections: [
            {
                heading: '規約への同意',
                body: [
                    'OrbNote へようこそ。OrbNote アプリケーション（以下「本アプリ」）をダウンロード、インストール、または使用することにより、本利用規約に拘束されることに同意したものとみなされます。これらの条件に同意しない場合は、本アプリを使用しないでください。'
                ]
            },
            {
                heading: 'サービスの説明',
                body: [
                    'OrbNote は、Apple エコシステムのデバイス（Mac、iPhone、iPad、Apple Watch）でノートを記録・管理できる対話型ノートアプリケーションです。',
                    '本アプリは「ローカルファースト」アーキテクチャを採用しています。お客様のデータはローカルデバイスと個人の iCloud アカウントに保存されます。当社はバックエンドサーバーを一切運用していません。'
                ]
            },
            {
                heading: 'ライセンスの付与',
                body: [
                    '当社はお客様に対し、個人のデバイスで本アプリを使用するための限定的、非独占的、譲渡不可、取消可能なライセンスを付与します。',
                    '本ライセンスには以下は含まれません：本アプリまたはその一部の改変、逆コンパイル、リバースエンジニアリング、商業的再販目的での本アプリの使用、本アプリからの著作権表示や所有権表示の除去。'
                ]
            },
            {
                heading: 'ユーザーコンテンツ',
                body: [
                    '本アプリで作成されたすべてのコンテンツ（テキスト、録音、画像、添付ファイルを含むがこれらに限定されない）はお客様に帰属します。当社はお客様のコンテンツにアクセス、収集、または所有権を主張することはありません。',
                    'お客様は作成するコンテンツについて全責任を負います。'
                ]
            },
            {
                heading: 'iCloud サービス',
                body: [
                    '本アプリはデバイス間のデータ同期に Apple iCloud（CloudKit）を使用しています。iCloud の可用性、パフォーマンス、ストレージ容量は Apple の利用規約に準拠し、当社の管理範囲外です。',
                    'iCloud サービスの中断、ストレージ不足、または Apple のポリシー変更によるデータ同期の失敗やデータ損失について、当社は責任を負いません。'
                ]
            },
            {
                heading: '知的財産権',
                body: [
                    '本アプリおよびそのオリジナルコンテンツ、機能、デザインは OrbNote の知的財産であり、著作権法およびその他の知的財産法により保護されています。',
                    'OrbNote の名称、ロゴ、関連グラフィックは当社の商標です。事前の書面による同意なしに使用することはできません。'
                ]
            },
            {
                heading: '免責事項',
                body: [
                    '本アプリは「現状のまま」「利用可能な状態で」提供され、商品性、特定目的への適合性、非侵害性の暗示的保証を含む、明示または暗示のいかなる保証もありません。',
                    '当社は本アプリが中断なく動作すること、エラーがないこと、または完全に安全であることを保証しません。本アプリの使用はお客様自身の責任で行われます。',
                    '本アプリの使用または使用不能に起因する間接的、付随的、特別または結果的損害について、当社は責任を負いません。'
                ]
            },
            {
                heading: 'サービスの変更と終了',
                body: [
                    '当社は予告なく、いつでも本アプリ（全体または一部）を変更、一時停止、または終了する権利を留保します。',
                    'お客様のデータはローカルデバイスと iCloud に保存されるため、アプリが終了しても iCloud 管理を通じてデータにアクセスできます。'
                ]
            },
            {
                heading: '規約の変更',
                body: [
                    '当社は本利用規約をいつでも変更する権利を留保します。変更はこのページに掲載されます。本アプリの継続的な使用は、変更された規約への同意を意味します。'
                ]
            },
            {
                heading: 'お問い合わせ',
                body: [
                    '本利用規約に関するご質問は、galen_kwok@icloud.com までメールでお問い合わせください。'
                ]
            }
        ]
    },
    ko: {
        title: '이용약관',
        lastUpdated: '최종 업데이트: 2026년 2월 19일',
        sections: [
            {
                heading: '약관 동의',
                body: [
                    'OrbNote에 오신 것을 환영합니다. OrbNote 애플리케이션(이하 "본 앱")을 다운로드, 설치 또는 사용함으로써 본 이용약관에 동의하는 것으로 간주됩니다. 본 약관에 동의하지 않는 경우 본 앱을 사용하지 마십시오.'
                ]
            },
            {
                heading: '서비스 설명',
                body: [
                    'OrbNote는 Apple 생태계 기기(Mac, iPhone, iPad, Apple Watch)에서 노트를 기록하고 관리할 수 있는 대화형 노트 애플리케이션입니다.',
                    '본 앱은 "로컬 우선" 아키텍처를 채택하고 있습니다. 사용자의 데이터는 로컬 기기와 개인 iCloud 계정에 저장됩니다. 당사는 백엔드 서버를 운영하지 않습니다.'
                ]
            },
            {
                heading: '라이선스 부여',
                body: [
                    '당사는 사용자에게 개인 기기에서 본 앱을 사용할 수 있는 제한적, 비독점적, 양도 불가, 철회 가능한 라이선스를 부여합니다.',
                    '본 라이선스에는 다음이 포함되지 않습니다: 본 앱 또는 그 일부의 수정, 디컴파일, 리버스 엔지니어링, 상업적 재판매 목적의 본 앱 사용, 본 앱의 저작권 또는 소유권 표시 제거.'
                ]
            },
            {
                heading: '사용자 콘텐츠',
                body: [
                    '본 앱에서 생성한 모든 콘텐츠(텍스트, 녹음, 이미지, 첨부 파일 포함)는 사용자에게 귀속됩니다. 당사는 사용자의 콘텐츠에 접근, 수집하거나 소유권을 주장하지 않습니다.',
                    '사용자는 생성하는 콘텐츠에 대해 전적인 책임을 집니다.'
                ]
            },
            {
                heading: 'iCloud 서비스',
                body: [
                    '본 앱은 기기 간 데이터 동기화를 위해 Apple iCloud(CloudKit)를 사용합니다. iCloud의 가용성, 성능 및 저장 용량은 Apple의 서비스 약관에 따르며 당사의 통제 범위 밖에 있습니다.',
                    'iCloud 서비스 중단, 저장 공간 부족 또는 Apple 정책 변경으로 인한 데이터 동기화 실패 또는 데이터 손실에 대해 당사는 책임을 지지 않습니다.'
                ]
            },
            {
                heading: '지적 재산권',
                body: [
                    '본 앱과 그 독창적인 콘텐츠, 기능 및 디자인은 OrbNote의 지적 재산이며 저작권법 및 기타 지적 재산권법에 의해 보호됩니다.',
                    'OrbNote 이름, 로고 및 관련 그래픽은 당사의 상표입니다. 사전 서면 동의 없이 사용할 수 없습니다.'
                ]
            },
            {
                heading: '보증 면책',
                body: [
                    '본 앱은 상품성, 특정 목적 적합성, 비침해성에 대한 묵시적 보증을 포함하여 명시적이든 묵시적이든 어떠한 종류의 보증 없이 "있는 그대로" 및 "이용 가능한 상태로" 제공됩니다.',
                    '당사는 본 앱이 중단 없이 작동하거나, 오류가 없거나, 완전히 안전하다는 것을 보장하지 않습니다. 본 앱의 사용은 사용자 자신의 책임 하에 이루어집니다.',
                    '본 앱의 사용 또는 사용 불가로 인한 간접적, 부수적, 특별 또는 결과적 손해에 대해 당사는 책임을 지지 않습니다.'
                ]
            },
            {
                heading: '서비스 변경 및 종료',
                body: [
                    '당사는 사전 통지 없이 언제든지 본 앱(전체 또는 일부)을 변경, 일시 중지 또는 중단할 권리를 보유합니다.',
                    '사용자의 데이터는 로컬 기기와 iCloud에 저장되므로 앱이 중단되더라도 iCloud 관리를 통해 데이터에 접근할 수 있습니다.'
                ]
            },
            {
                heading: '약관 변경',
                body: [
                    '당사는 언제든지 본 이용약관을 변경할 권리를 보유합니다. 변경 사항은 이 페이지에 게시됩니다. 본 앱을 계속 사용하면 변경된 약관에 동의하는 것으로 간주됩니다.'
                ]
            },
            {
                heading: '문의하기',
                body: [
                    '본 이용약관에 대한 문의 사항은 galen_kwok@icloud.com으로 이메일을 보내 주시기 바랍니다.'
                ]
            }
        ]
    }
};

export default function TermsPage() {
    const { locale } = useLocale();
    const data = termsContent[locale];

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
