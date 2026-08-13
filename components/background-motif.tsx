type BackgroundMotifProps = {
  variant: "education" | "research" | "capabilities" | "contact";
};

const toneClasses = {
  education: "text-amber-700 dark:text-amber-300",
  research: "text-blue-700 dark:text-blue-300",
  capabilities: "text-teal-700 dark:text-teal-300",
  contact: "text-blue-700 dark:text-blue-300",
};

const motifStyle = {
  position: "absolute",
  inset: 0,
  zIndex: 0,
  width: "100%",
  height: "100%",
} as const;

export function BackgroundMotif({ variant }: BackgroundMotifProps) {
  if (variant === "education") {
    return (
      <svg
        className={`section-motif ${toneClasses[variant]}`}
        viewBox="0 0 1280 900"
        preserveAspectRatio="none"
        fill="none"
        style={motifStyle}
        aria-hidden="true"
      >
        <g stroke="currentColor" strokeWidth="1">
          <circle cx="1088" cy="186" r="86" />
          <circle cx="1088" cy="186" r="116" strokeDasharray="2 12" />
          <path d="M964 186h248M1088 62v248" />
          <path d="m1030 128 116 116M1146 128l-116 116" opacity=".45" />
          <path d="M72 718h318M72 748h246M72 778h366" strokeDasharray="1 9" />
        </g>
        <g fill="currentColor">
          <circle cx="1088" cy="186" r="4" />
          <circle cx="1027" cy="125" r="3" />
          <circle cx="1149" cy="247" r="3" />
          <circle cx="164" cy="718" r="3" />
          <circle cx="296" cy="748" r="3" />
          <circle cx="412" cy="778" r="3" />
        </g>
        <g fill="currentColor" fontFamily="monospace" fontSize="9">
          <text x="1190" y="176">
            FTU
          </text>
          <text x="1190" y="192">
            ECON / 2027
          </text>
          <text x="72" y="702">
            ACADEMIC RECORD
          </text>
        </g>
      </svg>
    );
  }

  if (variant === "research") {
    return (
      <svg
        className={`section-motif ${toneClasses[variant]}`}
        viewBox="0 0 1280 1120"
        preserveAspectRatio="none"
        fill="none"
        style={motifStyle}
        aria-hidden="true"
      >
        <g stroke="currentColor" strokeWidth="1">
          <path d="M70 900V610h330" />
          <path d="M70 826h330M70 752h330M70 678h330" opacity=".38" />
          <path d="M152 610v290M234 610v290M316 610v290" opacity=".38" />
          <path
            d="M88 854c68-82 118-23 174-102 44-62 90-66 126-115"
            strokeDasharray="4 9"
          />
          <path d="m864 164 92 68 104-116 142 86" strokeDasharray="2 10" />
          <path d="m956 232 84 114 162-144" strokeDasharray="2 10" />
        </g>
        <g fill="currentColor">
          <circle cx="108" cy="830" r="4" />
          <circle cx="174" cy="788" r="5" />
          <circle cx="242" cy="770" r="3" />
          <circle cx="302" cy="698" r="5" />
          <circle cx="370" cy="650" r="4" />
          <circle cx="864" cy="164" r="4" />
          <circle cx="956" cy="232" r="5" />
          <circle cx="1060" cy="116" r="4" />
          <circle cx="1040" cy="346" r="3" />
          <circle cx="1202" cy="202" r="5" />
        </g>
        <g fill="currentColor" fontFamily="monospace" fontSize="9">
          <text x="70" y="930">
            CONDITIONAL EVIDENCE / MODEL SPACE
          </text>
          <text x="1080" y="374">
            RESEARCH NETWORK
          </text>
        </g>
      </svg>
    );
  }

  if (variant === "capabilities") {
    return (
      <svg
        className={`section-motif ${toneClasses[variant]}`}
        viewBox="0 0 1280 1300"
        preserveAspectRatio="none"
        fill="none"
        style={motifStyle}
        aria-hidden="true"
      >
        <g stroke="currentColor" strokeWidth="1" strokeDasharray="3 10">
          <path d="m74 992 166-92 160 132 180-76" />
          <path d="m240 900 24 280 136-148 180 122" />
          <path d="m894 890 116-124 172 52" />
          <path d="m1010 766 18 286 154-234" />
        </g>
        <g stroke="currentColor">
          <circle cx="240" cy="900" r="36" />
          <circle cx="400" cy="1032" r="26" />
          <circle cx="1010" cy="766" r="34" />
          <circle cx="1182" cy="818" r="22" />
        </g>
        <g fill="currentColor">
          <circle cx="74" cy="992" r="4" />
          <circle cx="240" cy="900" r="5" />
          <circle cx="264" cy="1180" r="4" />
          <circle cx="400" cy="1032" r="5" />
          <circle cx="580" cy="956" r="4" />
          <circle cx="580" cy="1154" r="3" />
          <circle cx="894" cy="890" r="4" />
          <circle cx="1010" cy="766" r="5" />
          <circle cx="1028" cy="1052" r="4" />
          <circle cx="1182" cy="818" r="5" />
        </g>
        <g fill="currentColor" fontFamily="monospace" fontSize="9">
          <text x="74" y="870">
            METHOD NETWORK / 01
          </text>
          <text x="972" y="1090">
            APPLIED SYSTEM / 02
          </text>
        </g>
      </svg>
    );
  }

  return (
    <svg
      className={`section-motif ${toneClasses[variant]}`}
      viewBox="0 0 1280 620"
      preserveAspectRatio="none"
      fill="none"
      style={motifStyle}
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1">
        <path d="M846 464c72-170 164-254 310-302" strokeDasharray="3 10" />
        <path d="M904 488c64-130 142-204 274-250" strokeDasharray="3 10" />
        <circle cx="1160" cy="160" r="52" />
        <circle cx="1160" cy="160" r="88" strokeDasharray="2 12" />
      </g>
      <g fill="currentColor">
        <circle cx="846" cy="464" r="4" />
        <circle cx="984" cy="302" r="4" />
        <circle cx="1160" cy="160" r="5" />
      </g>
      <text
        x="1008"
        y="514"
        fill="currentColor"
        fontFamily="monospace"
        fontSize="9"
      >
        OPEN CHANNEL / HANOI
      </text>
    </svg>
  );
}
