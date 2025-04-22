import clsx from "clsx";
import { twMerge } from "tailwind-merge";

type CSSModuleClasses = {
  readonly [key: string]: string;
};

export function cssClassBuilderFactory(cssModuleClasses: CSSModuleClasses) {
  /**
   * @param {(string|string[])} input.tw - The Tailwind CSS class or classes.
   * @param {string} input.cssModule - The string of the CSS module classes
   */
  return function CssClassBuilder(input: {
    tw?: string | string[];
    cssModule?: string;
  }) {
    const { tw, cssModule } = input;
    const twClassNames = twMerge(tw);
    const other =
      cssModule?.split(" ").map((name) => cssModuleClasses[name]) ?? [];

    return clsx(twClassNames, ...other);
  };
}
