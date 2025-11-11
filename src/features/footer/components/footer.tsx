import Link from "next/link";
import { Fragment } from "react";
import { FooterType } from "../types/FooterType";
import { footerItems } from "../config/footerItems";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-bg)] md:p-6 mt-auto">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center text-base">
          {footerItems.map((item, index) => (
            <Fragment key={index}>
              {item.type === FooterType.Link ? (
                <Link
                  href={item.href ?? "/"}
                  className={`${item.className} py-0`}
                >
                  {item.text}
                </Link>
              ) : (
                <span className={item.className}>{item.text}</span>
              )}
              {index < footerItems.length - 1 && (
                <span className="px-2 hidden md:inline">|</span>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </footer>
  );
}
