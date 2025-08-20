import React, { useEffect, useRef } from "react";
import moment from "moment";
import type { DataSetDataGroup, DataSetDataItem, TimelineOptions, DataGroup } from "vis-timeline";
import { Timeline } from "vis-timeline";
import { DataSet } from "vis-data";
import "./timeline.css"

const idGenerator = (() => {
  let id = 0;
  return () => {
    id++;
    return id;
  };
})();

const BgColorClass = {
  // gray is reserved color for inactive period
  Gray: "background-color-gray",
  Blue: "background-color-blue",
  Green: "background-color-green",
  Yellow: "background-color-yellow",
  Red: "background-color-red",
  Purple: "background-color-purple",
  Orange: "background-color-orange",
  Pink: "background-color-pink",
} as const;
type AllocatableBgColorClassT = Exclude<keyof typeof BgColorClass, "Gray">;
const allocatableBgColorClasses: AllocatableBgColorClassT[] = Object.keys(BgColorClass)
  .filter(k => isNaN(Number(k)) && k !== "Gray") as AllocatableBgColorClassT[];

const bgColorClassAllocator = (() => {
  let id = 0;
  return () => {
    const bgColor = allocatableBgColorClasses[id % allocatableBgColorClasses.length];
    id++;
    return BgColorClass[bgColor];
  };
})();

const VisTimeline: React.FC = () => {
	const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<Timeline | null>(null);

  const groups: DataSetDataGroup = new DataSet();

  /**
   * 所属・副業 group
   */

  const g_sub_work: DataGroup = {
    id: idGenerator(),
    content: "副業 (インターン等)",
  };
  groups.add(g_sub_work);

  const g_organization: DataGroup = {
    id: idGenerator(),
    content: "所属",
    nestedGroups: [ g_sub_work.id ],
  };
  groups.add(g_organization);

  const items: DataSetDataItem = new DataSet();
  items.add(
        (() => {
          const gid = g_organization.id;
          const startMoment = moment("2013-04-01");
          const endMoment = moment("2016-03-30");
          return [
              {
              id: idGenerator(),
              content: ``,
              start: startMoment.toDate(),
              end: endMoment.toDate(),
              type: "background",
              className: bgColorClassAllocator(),
            },
            {
              id: idGenerator(),
              group: gid,
              content: `
                <div>
                高等学校 (${startMoment.format('YYYY-MM-DD')} ～ ${endMoment.format('YYYY-MM-DD')})
                <br>地方の普通科進学校
                </div>
              `,
              start: startMoment.toDate(),
              end: endMoment.toDate(),
              type: "range",
            },
          ];
        }
      )(),
  );
  items.add(
      (
        () => {
          const gid = g_organization.id;
          const startMoment = moment("2016-04-01");
          const endMoment = moment("2021-03-30");
          return [{
            id: idGenerator(),
            content: ``,
            start: startMoment.toDate(),
            end: endMoment.toDate(),
            type: "background",
              className: bgColorClassAllocator(),
          },
          {
            id: idGenerator(),
            group: gid,
            content: `
              <div>
                <img src="https://i.gyazo.com/a618027a79330420d11240c000c8cf3f.png" alt="Image from Gyazo"/>
                <a href="https://scrapbox.io/pollenJP-Portfolio/上智大学大学院_理工学専攻_情報学領域_(山中研究室)">上智大学</a> (${startMoment.format('YYYY-MM-DD')} ～ ${endMoment.format('YYYY-MM-DD')})
                <br>理工学部 情報理工学科
              </div>
            `,
            start: startMoment.toDate(),
            end: endMoment.toDate(),
            type: "range",
          }
        ]
        }
      )(),
  );
  items.add(
    [
      (
        () => {
          const startMoment = moment("2017-11-01");
          const endMoment = moment("2018-08-31");
          return {
            id: idGenerator(),
            group: g_sub_work.id,
            content: `
              <div>
                <img src="https://i.gyazo.com/e8d7f0091feca5c11d2500c35688a46a.jpg" alt="Image from Gyazo"/>
                <a href="https://scrapbox.io/pollenJP-Portfolio/株式会社カブク_kabuku">株式会社Kabukuインターン</a> (${startMoment.format('YYYY-MM-DD')} ～ ${endMoment.format('YYYY-MM-DD')})
                <br>機械学習エンジニア
                  <a href="https://skillicons.dev">
                    <img src="https://skillicons.dev/icons?i=tensorflow,sklearn,python" />
                  </a>
              </div>
            `,
            start: startMoment.toDate(),
            end: endMoment.toDate(),
            type: "range",
          }
        }
      )(),
      (
        () => {
          const startMoment = moment("2018-09-01");
          const endMoment = moment("2021-11-30");
          return {
            id: idGenerator(),
            group: g_sub_work.id,
            content: `
              <div>
                <img src="https://i.gyazo.com/5f1d5871a467ee44084c903906c2386a.png" alt="Image from Gyazo"/>
                <a href="https://scrapbox.io/pollenJP-Portfolio/ギリア株式会社_|_Ghelia_Inc.">ギリア株式会社インターン</a> (${startMoment.format('YYYY-MM-DD')} ～ ${endMoment.format('YYYY-MM-DD')})
                <br>機械学習エンジニア
                  <a href="https://skillicons.dev">
                    <img src="https://skillicons.dev/icons?i=pytorch,docker,sklearn,opencv,python" />
                  </a>
              </div>
            `,
            start: startMoment.toDate(),
            end: endMoment.toDate(),
            type: "range",
          }
        }
      )(),
    ]);
    items.add(
      (
        () => {
          const startMoment = moment("2019-05-01");
          const endMoment = moment("2020-04-01");
          return [
          {
            id: idGenerator(),
            content: ``,
            start: startMoment.toDate(),
            end: endMoment.toDate(),
            type: "background",
            className: BgColorClass.Gray,
          },
          {
            id: idGenerator(),
            group: g_organization.id,
            content: `
              <div>
                <a href="https://scrapbox.io/pjp/父親の癌宣告とその後の記録">休学・休職 / 復学</a> (${startMoment.format('YYYY-MM-DD')} ～ ${endMoment.format('YYYY-MM-DD')})
                <br>身内の病気の都合で実家に帰省
              </div>
            `,
            start: startMoment.toDate(),
            end: endMoment.toDate(),
            type: "point",
          }]
        }
      )(),
    );
    items.add(
      (
        () => {
          const startMoment = moment("2021-04-01");
          const endMoment = moment("2023-03-31");
          return [
            {
              id: idGenerator(),
              content: ``,
              start: startMoment.toDate(),
              end: endMoment.toDate(),
              type: "background",
              className: bgColorClassAllocator(),
            },
            {
              id: idGenerator(),
              group: g_organization.id,
              content: `
                <div>
                  <img src="https://i.gyazo.com/a618027a79330420d11240c000c8cf3f.png" alt="Image from Gyazo"/>
                  <a href="https://scrapbox.io/pollenJP-Portfolio/上智大学大学院_理工学専攻_情報学領域_(山中研究室)">上智大学大学院</a> (${startMoment.format('YYYY-MM-DD')} ～ ${endMoment.format('YYYY-MM-DD')})
                  <br>理工学専攻 情報学領域 山中研究室
                    <a href="https://skillicons.dev">
                      <img src="https://skillicons.dev/icons?i=pytorch,python,blender,docker" />
                    </a>
                </div>
              `,
              start: startMoment.toDate(),
              end: endMoment.toDate(),
              type: "range",
            }
          ]
        }
      )(),
    );
    items.add([
      (
        () => {
          const startMoment = moment("2021-12-27");
          const endMoment = moment("2022-01-07");
          return {
            id: idGenerator(),
            group: g_sub_work.id,
            content: `
              <div>
                <img src="https://i.gyazo.com/49edd6816e05222cc3951f1ab92c5481.png" alt="Image from Gyazo"/>
                <a href="https://scrapbox.io/pollenJP-Portfolio/KLab_Server_Side_Camp_%231">KLab株式会社短期インターン</a> (${startMoment.format('YYYY-MM-DD')} ～ ${endMoment.format('YYYY-MM-DD')})
                <br>コース：Server Side Camp #1
                  <a href="https://skillicons.dev">
                    <img src="https://skillicons.dev/icons?i=fastapi,python" />
                  </a>
              </div>
            `,
            start: startMoment.toDate(),
            end: endMoment.toDate(),
            type: "box",
            options: {
              align: "right",
            },
          }
        }
      )(),
      (
        () => {
          const startMoment = moment("2022-03-03");
          const endMoment = moment("2022-03-09");
          return {
            id: idGenerator(),
            group: g_sub_work.id,
            content: `
              <div>
                <img src="https://i.gyazo.com/49edd6816e05222cc3951f1ab92c5481.png" alt="Image from Gyazo"/>
                <a href="https://scrapbox.io/pollenJP-Portfolio/KLab_Expert_Camp_%235">KLab株式会社短期インターン</a> (${startMoment.format('YYYY-MM-DD')} ～ ${endMoment.format('YYYY-MM-DD')})
                <br>コース：Expert Camp #5 (発展コース mikanos-net の再現実装)
                  <a href="https://skillicons.dev">
                    <img src="https://skillicons.dev/icons?i=c,cpp" />
                  </a>
              </div>
            `,
            start: startMoment.toDate(),
            end: endMoment.toDate(),
            type: "box",
          }
        }
      )(),
    ]);
    items.add(
      (
        () => {
          const startMoment = moment("2023-04-04");
          const endMoment = moment("2025-06-30");
          return [
            {
              id: idGenerator(),
              content: ``,
              start: startMoment.toDate(),
              end: endMoment.toDate(),
              type: "background",
              className: bgColorClassAllocator(),
            },
            {
              id: idGenerator(),
              group: g_organization.id,
              content: `
                <div>
                  <img src="https://i.gyazo.com/49edd6816e05222cc3951f1ab92c5481.png" alt="Image from Gyazo"/>
                  <a href="https://scrapbox.io/pollenJP-Portfolio/KLab株式会社">KLab株式会社 所属 SRE</a> (${startMoment.format('YYYY-MM-DD')} ～ ${endMoment.format('YYYY-MM-DD')})
                  <br>内容：サービス運用・開発インフラ整備・ログ監視ツール作成
                  <br>
                    <a href="https://skillicons.dev">
                      <img src="https://skillicons.dev/icons?i=python,go,typescript,rust,ansible,kubernetes,grafana,docker,jenkins,aws,bash,git" />
                    </a>
                </div>
              `,
              start: startMoment.toDate(),
              end: endMoment.toDate(),
              type: "range",
            },
          ]
        }
      )(),
    );
    items.add(
      (
        () => {
          const startMoment = moment("2024-02-01");
          const endMoment = moment("2024-09-30");
          return [
              {
                id: idGenerator(),
                content: ``,
                start: startMoment.toDate(),
                end: endMoment.toDate(),
                type: "background",
                className: BgColorClass.Gray,
              },
              {
              id: idGenerator(),
              group: g_organization.id,
              content: `
                <div>
                  <a href="https://scrapbox.io/pjp/父親の癌宣告とその後の記録">壮絶な介護期</a> (${startMoment.format('YYYY-MM-DD')} ～ ${endMoment.format('YYYY-MM-DD')})
                  <br>フルリモートで働きながら介護
                </div>
              `,
              start: startMoment.toDate(),
              end: endMoment.toDate(),
              type: "point",
            },
          ]
        }
      )(),
  );

  /**
   * 個人開発
   */

  const g_software_development: DataGroup = {
    id: idGenerator(),
    content: "ソフトウェア開発",
  };
  groups.add(g_software_development);

  const g_personal_development: DataGroup = {
    id: idGenerator(),
    content: "個人開発",
    nestedGroups: [ g_software_development.id ],
  };
  groups.add(g_personal_development);

  items.add(
    (
      () => {
        const startMoment = moment("2024-12-01");
        return [
          {
            id: idGenerator(),
            group: g_software_development.id,
            content: `
              OSS: <a href="https://scrapbox.io/pollenJP-Portfolio/astral-sh%2Fsetup-uv_(github.com)">astral-sh/setup-uv</a>
              <a href="https://skillicons.dev">
                <img src="https://skillicons.dev/icons?i=typescript,python" />
              </a>
            `,
            start: startMoment.toDate(),
            type: "box",
          },
        ]
      }
    )()
  );
  items.add(
    (
      () => {
        const startMoment = moment("2024-12-01");
        return [
          {
            id: idGenerator(),
            group: g_software_development.id,
            content: `
              OSS: <a href="https://scrapbox.io/pollenJP-Portfolio/pollenjp%2Fsetup-shfmt_(github.com)">pollenjp/setup-shfmt</a>
              <a href="https://skillicons.dev">
                <img src="https://skillicons.dev/icons?i=typescript,bash" />
              </a>
            `,
            start: startMoment.toDate(),
            type: "box",
          },
          {
            id: idGenerator(),
            group: g_software_development.id,
            content: `
              OSS: <a href="https://scrapbox.io/pollenJP-Portfolio/pollenjp%2Fsetup-shellcheck_(github.com)">pollenjp/setup-shellcheck</a>
              <a href="https://skillicons.dev">
                <img src="https://skillicons.dev/icons?i=typescript,bash" />
              </a>
            `,
            start: startMoment.toDate(),
            type: "box",
          }
        ]
      }
    )()
  );
  items.add(
    (
      () => {
        const startMoment = moment("2025-02-01");
        return [
          {
            id: idGenerator(),
            group: g_software_development.id,
            content: `
              <a href="https://scrapbox.io/pollenJP-Portfolio/CDK-Ansible?search=cdk-ansible">CDK-Ansible</a>
              <a href="https://skillicons.dev">
                <img src="https://skillicons.dev/icons?i=rust,ansible" />
              </a>
            `,
            start: startMoment.toDate(),
            type: "box",
          }
        ]
      }
    )()
  );

  /**
   * 自己研鑽 group
   */

  const g_computer_science: DataGroup = {
    id: idGenerator(),
    content: "コンピュータサイエンス",
  };
  groups.add(g_computer_science);

  const g_data_science: DataGroup = {
    // Machine Learning / Deep Learning
    id: idGenerator(),
    content: "Data Science",
  };
  groups.add(g_data_science);

  const g_learning: DataGroup = {
    id: idGenerator(),
    content: "自己研鑽",
    nestedGroups: [ g_computer_science.id, g_data_science.id ],
  };
  groups.add(g_learning);

  items.add(
    (
      () => {
        const startMoment = moment("2016-12-01");
        const endMoment = moment("2017-03-31");
        return [
          {
            id: idGenerator(),
            group: g_data_science.id,
            content: `
              <img src="https://i.gyazo.com/cc020c6733a72b50d507c02cbb4ddf07.png" alt="Image from Gyazo"/>
              <a href="https://www.oreilly.co.jp/books/9784873117584/">『ゼロから作るDeep Learning』</a>
            `,
            start: startMoment.toDate(),
            end: endMoment.toDate(),
            type: "box",
          }
        ]
      }
    )()
  );
  items.add(
    (
      () => {
        const startMoment = moment("2017-04-01");
        const endMoment = moment("2017-06-30");
        return [
          {
            id: idGenerator(),
            group: g_data_science.id,
            content: `
              <img src="https://i.gyazo.com/c94e97129d2bcae0fa7a72eeda8239ed.png" alt="Image from Gyazo"/>
              <a href="https://book.impress.co.jp/books/1115101122">『Python機械学習プログラミング』 達人データサイエンティストによる理論と実践</a>
            `,
            start: startMoment.toDate(),
            end: endMoment.toDate(),
            type: "box",
          }
        ]
      }
    )()
  );
  items.add(
    (
      () => {
        const startMoment = moment("2018-03-01");
        const endMoment = moment("2018-05-31");
        return [
          {
            id: idGenerator(),
            group: g_computer_science.id,
            content: `
              <img src="https://i.gyazo.com/8d5f458a9a1cf13492ded2745ed9ac27.png" alt="Image from Gyazo"/>
              <a href="https://scrapbox.io/pollenJP-Portfolio/『30日でできる！OS自作入門』を_Ubuntu16.04%2FNASM_で実装してみた記事">『30日でできる！OS自作入門』</a>
            `,
            start: startMoment.toDate(),
            end: endMoment.toDate(),
            type: "box",
          }
        ]
      }
    )()
  );
  items.add(
    (
      () => {
        const startMoment = moment("2022-02-01");
        const endMoment = moment("2022-03-01");
        return [
          {
            id: idGenerator(),
            group: g_computer_science.id,
            content: `
              <img src="https://i.gyazo.com/674d05e81629e3650bc88e141d00d58b.png" alt="Image from Gyazo"/>
              <a href="https://book.mynavi.jp/ec/products/detail/id=121220">『ゼロからのOS自作入門』 (みかん本 MikanOS本)</a>
            `,
            start: startMoment.toDate(),
            end: endMoment.toDate(),
            type: "box",
          }
        ]
      }
    )()
  );

  /**
   * timeline options
   */

  const options: TimelineOptions = (() => {
    const endMoment = moment();
    const startMoment = endMoment.clone().subtract(5, "year");
    return {
      align: "left",
      start: startMoment.toDate(),
      end: endMoment.toDate(),
      horizontalScroll: true,
      horizontalScrollKey: "shiftKey",
      zoomKey: "ctrlKey",
      // stack: true, // default
      // stack: false,
      orientation: {
        axis: "both", // axis orientation: 'bottom', 'top', or 'both'
        item: "bottom",
      },
    };
  })();

  const initTimeline = () => {
    if (containerRef.current === null) {
      console.log("containerRef.current is null");
      return;
    }

    timelineRef.current = new Timeline(containerRef.current, items, groups, options);
    console.log("updated!");
  };

	useEffect(() => {
    if (containerRef.current !== null) {
      initTimeline();
    }
	}, [containerRef, timelineRef]);

	return <div
    ref={containerRef}
    style={{
      boxSizing: "border-box",
      width: "100%",
      border: "1px solid lightgray",
    }}
  >
    <div></div>
  </div>;
};

export default VisTimeline;
