import { parse, printParseErrorCode, type ParseError } from "jsonc-parser";
import configText from "../data/config.jsonc?raw";
import postsText from "../data/posts.jsonc?raw";

export type SupportedLanguage = "zh-Hans" | "zh-Hant" | "en" | "ja" | "ko";
export type LocalizedText = Record<SupportedLanguage, string>;

type SiteContent = {
  languages: {
    code: SupportedLanguage;
    label: string;
    enabled: boolean;
  }[];
  site: {
    name: string;
    title: string;
    description: string;
    author: string;
    establishedAt: string;
  };
  navigation: {
    homeLabel: LocalizedText;
    items: {
      href: string;
      key: string;
      label: LocalizedText;
    }[];
  };
  pages: {
    archive: {
      pageTitle: LocalizedText;
      pageSubtitle: LocalizedText;
    };
    notes: {
      pageTitle: LocalizedText;
      pageSubtitle: LocalizedText;
    };
  };
  home: {
    creativity: {
      visible: boolean;
      showOnMobile: boolean;
      url: string;
      title: LocalizedText;
      ariaLabel: LocalizedText;
      carouselMode: "diagonal" | "marquee";
      items: {
        name: string;
        color: string;
        labelColor: string;
        icon: string;
        href: string;
      }[];
    };
    feature: {
      visible: boolean;
      showOnMobile: boolean;
      backgroundImage: string;
      playLogoImage: string;
      url: string;
      title: string;
      subtitle: LocalizedText;
    };
    profile: {
      visible: boolean;
      showOnMobile: boolean;
      avatarImage: string;
      name: string;
      description: LocalizedText;
      links: {
        label: string;
        href: string;
        icon: string;
      }[];
    };
  };
  ui: {
    translations: {
      [language in SupportedLanguage]: Record<string, string>;
    };
  };
};

export type ArticlePageSettings = {
  articlePage: {
    showTableOfContents: boolean;
    showShareCard: boolean;
    showDonationCard: boolean;
    donationQrCodes: {
      binance: string;
      wechat: string;
      alipay: string;
    };
  };
};

export function parseJsonc<T>(content: string, sourcePath: string): T {
  const errors: ParseError[] = [];
  const parsed: unknown = parse(content, errors);

  if (errors.length > 0) {
    const firstError = errors[0];
    throw new Error(
      `Could not parse ${sourcePath} as JSONC at offset ${firstError.offset}: ${printParseErrorCode(firstError.error)}`,
    );
  }

  return parsed as T;
}

export const siteContent = parseJsonc<SiteContent>(
  configText,
  "src/data/config.jsonc",
);

export const postsContent = parseJsonc<ArticlePageSettings>(
  postsText,
  "src/data/posts.jsonc",
);
