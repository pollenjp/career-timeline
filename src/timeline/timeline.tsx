import React, { useEffect, useRef } from "react";
import moment from "moment";
import type { DataSetDataGroup, DataSetDataItem, TimelineOptions, DataGroup } from "vis-timeline";
import { Timeline } from "vis-timeline";
import { DataSet } from "vis-data";
import { BgColorClass, bgColorClassAllocator, boxColorClassAllocator } from "./style";
import "./timeline.css"

const idGenerator = (() => {
  let id = 0;
  return () => {
    id++;
    return id;
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
    content: `副業 (インターン等)`,
  };
  groups.add(g_sub_work);

  const g_organization: DataGroup = {
    id: idGenerator(),
    content: `メイン`,
    nestedGroups: [ g_sub_work.id ],
  };
  groups.add(g_organization);

  const g_main: DataGroup = {
    id: idGenerator(),
    content: `所属`,
    // treeLevel: 0,
    nestedGroups: [ g_organization.id ],
  };
  groups.add(g_main);

  const items: DataSetDataItem = new DataSet();
  {
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
            return [
            {
              id: idGenerator(),
              group: gid,
              content: `
                受験失敗
              `,
              start: startMoment.toDate(),
              type: "point",
            }
          ]
          }
        )(),
    );
    items.add(
        (
          () => {
            const gid = g_organization.id;
            const startMoment = moment("2016-04-01");
            const endMoment = moment("2021-03-30");
            const icon_content = `<img src="https://i.gyazo.com/a618027a79330420d11240c000c8cf3f.png" alt="Image from Gyazo"/>`;
            return [{
              id: idGenerator(),
              content: `${icon_content}`,
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
                  ${icon_content}
                  <a href="https://scrapbox.io/pollenJP-Portfolio/上智大学大学院_理工学専攻_情報学領域_(山中研究室)" target="_blank">上智大学</a> (${startMoment.format('YYYY-MM-DD')} ～ ${endMoment.format('YYYY-MM-DD')})
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
        (
          () => {
            const gid = g_organization.id;
            const startMoment = moment("2017-08-01");
            const endMoment = moment("2023-03-31");
            return [
              {
                id: idGenerator(),
                group: gid,
                content: `
                  <div>
                    <img src="https://i.gyazo.com/4ef3f51230d8fcb3c3251e7e570b1175.png" alt="Image from Gyazo"/>
                    <a href="https://utvirtual.tech/" target="_blank">UT-virtual 所属 (1期生)</a> (${startMoment.format('YYYY-MM-DD')} ～ ${endMoment.format('YYYY-MM-DD')})
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
                  <a href="https://scrapbox.io/pollenJP-Portfolio/株式会社カブク_kabuku" target="_blank">株式会社Kabukuインターン</a> (${startMoment.format('YYYY-MM-DD')} ～ ${endMoment.format('YYYY-MM-DD')})
                  <br>機械学習エンジニア
                    <img src="https://skillicons.dev/icons?i=tensorflow,sklearn,python" />
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
                  <a href="https://scrapbox.io/pollenJP-Portfolio/ギリア株式会社_|_Ghelia_Inc." target="_blank">ギリア株式会社インターン</a> (${startMoment.format('YYYY-MM-DD')} ～ ${endMoment.format('YYYY-MM-DD')})
                  <br>機械学習エンジニア
                    <img src="https://skillicons.dev/icons?i=pytorch,docker,sklearn,opencv,python" />
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
            const startMoment = moment("2019-06-01");
            const endMoment = moment("2020-03-31");
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
                  <a href="https://scrapbox.io/pjp/父親の癌宣告とその後の記録" target="_blank">休学・休職 / 復学</a> (${startMoment.format('YYYY-MM-DD')} ～ ${endMoment.format('YYYY-MM-DD')})
                  <br>身内の病気の都合で実家に帰省
                </div>
              `,
              start: startMoment.toDate(),
              end: endMoment.toDate(),
              type: "range",
            }]
          }
        )(),
      );
      items.add(
        (
          () => {
            const startMoment = moment("2021-04-01");
            const endMoment = moment("2023-03-31");
            const icon_content = `<img src="https://i.gyazo.com/a618027a79330420d11240c000c8cf3f.png" alt="Image from Gyazo"/>`;
            return [
              {
                id: idGenerator(),
                content: `${icon_content}`,
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
                    ${icon_content}
                    <a href="https://scrapbox.io/pollenJP-Portfolio/上智大学大学院_理工学専攻_情報学領域_(山中研究室)" target="_blank">上智大学大学院</a> (${startMoment.format('YYYY-MM-DD')} ～ ${endMoment.format('YYYY-MM-DD')})
                    <br>理工学専攻 情報学領域 山中研究室
                      <img src="https://skillicons.dev/icons?i=pytorch,python,blender,docker" />
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
          (
            () => {
              const gid = g_organization.id;
              const startMoment = moment("2021-10-01");
              const endMoment = moment();
              return [
                {
                  id: idGenerator(),
                  group: gid,
                  content: `
                    <div>
                      <img src="https://i.gyazo.com/f253f9b2d9c1bf61982d1557eeebef76.png" alt="Image from Gyazo"/>
                      <a href="https://www.kmc.gr.jp/" target="_blank">KMC 所属 (45期)</a> (${startMoment.format('YYYY-MM-DD')} ～ ${endMoment.format('YYYY-MM-DD')} 現在)
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
                  <a href="https://scrapbox.io/pollenJP-Portfolio/KLab_Server_Side_Camp_%231" target="_blank">KLab株式会社短期インターン</a> (${startMoment.format('YYYY-MM-DD')} ～ ${endMoment.format('YYYY-MM-DD')})
                  <br>コース：Server Side Camp #1
                    <img src="https://skillicons.dev/icons?i=fastapi,python" />
                </div>
              `,
              start: startMoment.toDate(),
              end: endMoment.toDate(),
              type: "box",
              className: boxColorClassAllocator(),
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
                  <a href="https://scrapbox.io/pollenJP-Portfolio/KLab_Expert_Camp_%235" target="_blank">KLab株式会社短期インターン</a> (${startMoment.format('YYYY-MM-DD')} ～ ${endMoment.format('YYYY-MM-DD')})
                  <br>コース：Expert Camp #5 (発展コース mikanos-net の再現実装)
                    <img src="https://skillicons.dev/icons?i=c,cpp" />
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
            const icon_content = `<img src="https://i.gyazo.com/49edd6816e05222cc3951f1ab92c5481.png" alt="Image from Gyazo"/>`;
            return [
              {
                id: idGenerator(),
                content: `${icon_content}`,
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
                    ${icon_content}
                    <a href="https://scrapbox.io/pollenJP-Portfolio/KLab株式会社" target="_blank">KLab株式会社 所属 SRE</a> (${startMoment.format('YYYY-MM-DD')} ～ ${endMoment.format('YYYY-MM-DD')})
                    <br>内容：サービス運用・開発インフラ整備・ログ監視ツール作成
                    <br>
                      <img src="https://skillicons.dev/icons?i=python,go,typescript,rust,ansible,kubernetes,grafana,docker,jenkins,aws,bash,git" />
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
                    <a href="https://scrapbox.io/pjp/父親の癌宣告とその後の記録" target="_blank">壮絶な介護期</a> (${startMoment.format('YYYY-MM-DD')} ～ ${endMoment.format('YYYY-MM-DD')})
                    <br>フルリモートでガッツリ働きながら介護
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
  }

  /**
   * 成果物 group
   */

  const g_software_development: DataGroup = {
    id: idGenerator(),
    content: ``,
  };
  groups.add(g_software_development);

  const _g_software_development: DataGroup = {
    id: idGenerator(),
    content: `成果物：ソフトウェア開発`,
    nestedGroups: [ g_software_development.id ],
  };
  groups.add(_g_software_development);

  const g_article: DataGroup = {
    id: idGenerator(),
    content: ``,
  };
  groups.add(g_article);

  const _g_article: DataGroup = {
    id: idGenerator(),
    content: `成果物：記事`,
    nestedGroups: [ g_article.id ],
  };
  groups.add(_g_article);

  {
    items.add(
      (
        () => {
          const startMoment = moment("2017-07-30");
          return [
            {
              id: idGenerator(),
              group: g_software_development.id,
              content: `
                <img src="https://i.gyazo.com/c2dca644b47fbd4376b0bc4915ed03bd.png" alt="Image from Gyazo"/>
                WebApp: <a href="https://scrapbox.io/pollenJP-Portfolio/手書き数字認識Webアプリケーション" target="_blank">手書き数字認識App</a>
                <img src="https://skillicons.dev/icons?i=python" />
              `,
              start: startMoment.toDate(),
              type: "box",
              className: boxColorClassAllocator(),
            },
          ]
        }
      )()
    );
    items.add(
      (
        () => {
          const startMoment = moment("2017-11-24");
          return [
            {
              id: idGenerator(),
              group: g_software_development.id,
              content: `
                <img src="https://i.gyazo.com/f2c24d977b963164870de81ede667d38.png" alt="Image from Gyazo"/>
                <a href="https://scrapbox.io/pollenJP-Portfolio/駒場祭2017_WebAR" target="_blank">駒場祭2017 WebAR</a>
                <img src="https://skillicons.dev/icons?i=html,css,js,threejs" />
              `,
              start: startMoment.toDate(),
              type: "box",
              className: boxColorClassAllocator(),
            },
          ]
        }
      )()
    );
    items.add(
      (
        () => {
          const startMoment = moment("2018-04-01");
          return [
            {
              id: idGenerator(),
              group: g_article.id,
              content: `
                <img src="https://i.gyazo.com/5d17ee021a1747402fac77a5db414457.png" alt="Image from Gyazo"/>
                <a href="https://scrapbox.io/pollenJP-Portfolio/『30日でできる！OS自作入門』を_Ubuntu16.04%2FNASM_で実装してみた記事" target="_blank">『OS自作入門』のNASM実装記事</a>
              `,
              start: startMoment.toDate(),
              type: "box",
              className: boxColorClassAllocator(),
            },
          ]
        }
      )()
    );
    items.add(
      (
        () => {
          const startMoment = moment("2018-07-23");
          return [
            {
              id: idGenerator(),
              group: g_software_development.id,
              content: `
                <img src="https://i.gyazo.com/850e054cffe7f75ee60641ad32d921d5.png" alt="Image from Gyazo"/>
                <a href="https://scrapbox.io/pollenJP-Portfolio/傘忘防ボット_LINE_Bot" target="_blank">傘忘防ボット</a>
                <img src="https://skillicons.dev/icons?i=nodejs,postgres,raspberrypi,heroku" />
                <img src="https://i.gyazo.com/8235593118e5b941da2f337b0293f0ab.png" alt="line logo"/>
              `,
              start: startMoment.toDate(),
              type: "box",
              className: boxColorClassAllocator(),
            },
          ]
        }
      )()
    );
    items.add(
      (
        () => {
          const startMoment = moment("2018-01-08");
          return [
            {
              id: idGenerator(),
              group: g_software_development.id,
              content: `
                Game: <a href="https://scrapbox.io/pollenJP-Portfolio/PombperMan" target="_blank">PombperMan</a>
                <img src="https://skillicons.dev/icons?i=unity" />
              `,
              start: startMoment.toDate(),
              type: "box",
              className: boxColorClassAllocator(),
            },
          ]
        }
      )()
    );
    items.add(
      (
        () => {
          const startMoment = moment("2019-04-01");
          return [
            {
              id: idGenerator(),
              group: g_article.id,
              content: `
                <img src="https://i.gyazo.com/1f1d059137200662cb4b76746b1949e7.png" alt="Image from Gyazo"/>
                <a href="https://scrapbox.io/pollenJP-Portfolio/DL輪読会:_Simple_Online_Realtime_Tracking_with_a_Deep_Association_Metric" target="_blank">DL輪読会: Simple Online Realtime Tracking with a Deep Association Metric</a>
              `,
              start: startMoment.toDate(),
              type: "box",
              className: boxColorClassAllocator(),
            },
          ]
        }
      )()
    );
    items.add(
      (
        () => {
          const startMoment = moment("2019-05-31");
          return [
            {
              id: idGenerator(),
              group: g_article.id,
              content: `
                <img src="https://i.gyazo.com/1f1d059137200662cb4b76746b1949e7.png" alt="Image from Gyazo"/>
                <a href="https://scrapbox.io/pollenJP-Portfolio/DL輪読会:_Simple_Online_Realtime_Tracking_with_a_Deep_Association_Metric" target="_blank">
                  DL輪読会: PSMNet Pyramid Stereo Matching Network
                </a>
              `,
              start: startMoment.toDate(),
              type: "box",
              className: boxColorClassAllocator(),
            },
          ]
        }
      )()
    );
    items.add(
      (
        () => {
          const startMoment = moment("2019-09-13");
          return [
            {
              id: idGenerator(),
              group: g_software_development.id,
              content: `
                <img src="https://i.gyazo.com/6f07a58794db7ae6cf2d8edc041d8352.png" alt="Image from Gyazo"/>
                <br />
                <a href="https://scrapbox.io/pollenJP-Portfolio/脱走中VR" target="_blank">脱走中VR</a>
                <img src="https://skillicons.dev/icons?i=unrealengine" />
              `,
              start: startMoment.toDate(),
              type: "box",
              className: boxColorClassAllocator(),
            },
          ]
        }
      )()
    );
    items.add(
      (
        () => {
          const startMoment = moment("2020-11-25");
          return [
            {
              id: idGenerator(),
              group: g_software_development.id,
              content: `
                <a href="https://scrapbox.io/pollenJP-Portfolio/CIC_Tokyo_オープンハウス_Shader_2020-11-25" target="_blank">Shader のプロジェクション展示</a>
                <img src="https://skillicons.dev/icons?i=unrealengine" />
              `,
              start: startMoment.toDate(),
              type: "box",
              className: boxColorClassAllocator(),
            },
          ]
        }
      )()
    );
    items.add(
      (
        () => {
          const startMoment = moment("2021-07-14");
          return [
            {
              id: idGenerator(),
              group: g_software_development.id,
              content: `
                <a href="https://scrapbox.io/pollenJP-Portfolio/Djangoを利用したミニブログ_(Django_+_gunicorn_+_Docker_Compose_+_PostgreSQL_+_AWS)" target="_blank">Django Mini Blog</a>
                <img src="https://skillicons.dev/icons?i=django,python,postgres,aws,docker" />
              `,
              start: startMoment.toDate(),
              type: "box",
              className: boxColorClassAllocator(),
            },
          ]
        }
      )()
    );
    items.add(
      (
        () => {
          const startMoment = moment("2022-08-01");
          return [
            {
              id: idGenerator(),
              group: g_software_development.id,
              content: `
                <a href="https://scrapbox.io/pollenJP-Portfolio/Pomodoro_Bot_(Discord)" target="_blank">Pomodoro Discord Bot</a>
                <img src="https://skillicons.dev/icons?i=go,discord" />
              `,
              start: startMoment.toDate(),
              type: "box",
              className: boxColorClassAllocator(),
            },
          ]
        }
      )()
    );
    items.add(
      (
        () => {
          const startMoment = moment("2023-02-01");
          return [
            {
              id: idGenerator(),
              group: g_software_development.id,
              content: `
                WebApp: <a href="https://github.com/pollenjp/times-hub" target="_blank">pollenjp/times-hub</a>
                <br />
                <img src="https://skillicons.dev/icons?i=rust,react,typescript,postgresql" />
              `,
              start: startMoment.toDate(),
              type: "box",
              className: boxColorClassAllocator(),
            },
          ]
        }
      )()
    );
    items.add(
      (
        () => {
          const startMoment = moment("2023-09-20");
          return [
            {
              id: idGenerator(),
              group: g_article.id,
              content: `
                <a href="https://scrapbox.io/pollenJP-Portfolio/vagrant-libvirt_と_Ansible_で自宅鯖prod環境に近い複数ノードKubernetes環境をローカルに作る" target="_blank">vagrant-libvirt と Ansible で自宅鯖prod環境に近い複数ノードKubernetes環境をローカルに作る</a>
                <img src="https://skillicons.dev/icons?i=kubernetes,ansible" />
                <img src="https://i.gyazo.com/31fa8aed326ea966d8880cc343a0145d.png" alt="vagrant logo"/>
              `,
              start: startMoment.toDate(),
              type: "box",
              className: boxColorClassAllocator(),
            },
          ]
        }
      )()
    );
    items.add(
      (
        () => {
          const startMoment = moment("2023-12-19");
          return [
            {
              id: idGenerator(),
              group: g_article.id,
              content: `
                <img src="https://i.gyazo.com/e426d5dd7da1a4303463ac4ceede76fa.png" alt="Image from Gyazo"/>
                <a href="https://scrapbox.io/pollenJP-Portfolio/【Rust製構成管理ツール】JetPorch_とは【次世代Ansible？】" target="_blank">【Rust製構成管理ツール】JetPorch とは【次世代Ansible？】</a>
              `,
              start: startMoment.toDate(),
              type: "box",
              className: boxColorClassAllocator(),
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
                OSS貢献: <a href="https://scrapbox.io/pollenJP-Portfolio/astral-sh%2Fsetup-uv_(github.com)" target="_blank">astral-sh/setup-uv</a>
                <img src="https://skillicons.dev/icons?i=typescript,python" />
              `,
              start: startMoment.toDate(),
              type: "box",
              className: boxColorClassAllocator(),
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
                OSS: <a href="https://scrapbox.io/pollenJP-Portfolio/pollenjp%2Fsetup-shfmt_(github.com)" target="_blank">pollenjp/setup-shfmt</a>
                <img src="https://skillicons.dev/icons?i=typescript,bash" />
              `,
              start: startMoment.toDate(),
              type: "box",
              className: boxColorClassAllocator(),
            },
            {
              id: idGenerator(),
              group: g_software_development.id,
              content: `
                OSS: <a href="https://scrapbox.io/pollenJP-Portfolio/pollenjp%2Fsetup-shellcheck_(github.com)" target="_blank">pollenjp/setup-shellcheck</a>
                <img src="https://skillicons.dev/icons?i=typescript,bash" />
              `,
              start: startMoment.toDate(),
              type: "box",
              className: boxColorClassAllocator(),
            }
          ]
        }
      )()
    );
    items.add(
      (
        () => {
          const startMoment = moment("2025-01-20");
          return [
            {
              id: idGenerator(),
              group: g_article.id,
              content: `
                <img src="https://i.gyazo.com/ce55023e15350bb1728d630043fcaf81.png" alt="Image from Gyazo"/>
                Zenn Book: <a href="https://scrapbox.io/pollenJP-Portfolio/内製ツール開発を支える_IaC_の重要性" target="_blank">内製ツール開発を支える IaC の重要性</a>
              `,
              start: startMoment.toDate(),
              type: "box",
              className: boxColorClassAllocator(),
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
                OSS: <a href="https://scrapbox.io/pollenJP-Portfolio/CDK-Ansible?search=cdk-ansible" target="_blank">CDK-Ansible</a>
                <img src="https://skillicons.dev/icons?i=rust,ansible" />
              `,
              start: startMoment.toDate(),
              type: "box",
              className: boxColorClassAllocator(),
            }
          ]
        }
      )()
    );
    items.add(
      (
        () => {
          const startMoment = moment("2025-06-15");
          return [
            {
              id: idGenerator(),
              group: g_software_development.id,
              content: `
                OSS貢献: <a href="https://scrapbox.io/pollenJP-Portfolio/external-secrets%2Fexternal-secrets_(github.com)" target="_blank">external-secrets/external-secrets</a>
                <img src="https://skillicons.dev/icons?i=kubernetes,go" />
              `,
              start: startMoment.toDate(),
              type: "box",
              className: boxColorClassAllocator(),
            }
          ]
        }
      )()
    );
    items.add(
      (
        () => {
          const startMoment = moment("2025-08-17");
          return [
            {
              id: idGenerator(),
              group: g_article.id,
              content: `
                <img src="https://i.gyazo.com/f253f9b2d9c1bf61982d1557eeebef76.png" alt="Image from Gyazo"/>
                <a href="https://scrapbox.io/pollenJP-Portfolio/部誌：独習KMC_vol.22_執筆" target="_blank">部誌：独習KMC vol.22 執筆</a>
              `,
              start: startMoment.toDate(),
              type: "box",
              className: boxColorClassAllocator(),
            },
          ]
        }
      )()
    );
  }

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

  {
    items.add(
      (
        () => {
          const startMoment = moment("2016-06-01");
          return [
            {
              id: idGenerator(),
              group: g_computer_science.id,
              content: `
                大学の授業で人生で初めてのプログラミング言語に触れる (Excel VBA)
              `,
              start: startMoment.toDate(),
              type: "box",
              className: boxColorClassAllocator(),
            }
          ]
        }
      )()
    );
    items.add(
      (
        () => {
          const startMoment = moment("2016-09-01");
          return [
            {
              id: idGenerator(),
              group: g_computer_science.id,
              content: `
                大学の授業でC言語に出会う
                <img src="https://skillicons.dev/icons?i=c" />
              `,
              start: startMoment.toDate(),
              type: "box",
              className: boxColorClassAllocator(),
            }
          ]
        }
      )()
    );
    items.add(
      (
        () => {
          const startMoment = moment("2016-10-01");
          return [
            {
              id: idGenerator(),
              group: g_computer_science.id,
              content: `
                <img src="https://i.gyazo.com/8aad6ea883abff1fe7a3ea2c2070dbc4.png" alt="Image from Gyazo"/>
                <a href="https://www.amazon.co.jp/dp/4339024880" target="_blank">『コンピュータ設計概論: CMOSから組み込みCPUまで』</a>
              `,
              start: startMoment.toDate(),
              type: "box",
              className: boxColorClassAllocator(),
            }
          ]
        }
      )()
    );
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
                <a href="https://www.oreilly.co.jp/books/9784873117584/" target="_blank">『ゼロから作るDeep Learning』</a>
                <img src="https://skillicons.dev/icons?i=python" />
              `,
              start: startMoment.toDate(),
              end: endMoment.toDate(),
              type: "box",
              className: boxColorClassAllocator(),
            }
          ]
        }
      )()
    );
    items.add(
      (
        () => {
          const startMoment = moment("2017-01-01");
          return [
            {
              id: idGenerator(),
              group: g_computer_science.id,
              content: `
                <img src="https://i.gyazo.com/d07f5ac25c5828725f16315c6ac382f1.png" alt="Image from Gyazo"/>
                <a href="https://booklog.jp/item/1/4822298426" target="_blank">『コンピュータの構成と設計』第5版 上 (パタヘネ)</a>
              `,
              start: startMoment.toDate(),
              type: "box",
              className: boxColorClassAllocator(),
            }
          ]
        }
      )()
    );
    items.add(
      (
        () => {
          const startMoment = moment("2017-03-01");
          return [
            {
              id: idGenerator(),
              group: g_computer_science.id,
              content: `
                <img src="https://i.gyazo.com/2ffdda5f8eb8bad2ebc291d989ca8ea3.png" alt="Image from Gyazo"/>
                <a href="https://booklog.jp/item/1/4822298434" target="_blank">『コンピュータの構成と設計』第5版 下 (パタヘネ)</a>
              `,
              start: startMoment.toDate(),
              type: "box",
              className: boxColorClassAllocator(),
            }
          ]
        }
      )()
    );
    items.add(
      (
        () => {
          const startMoment = moment("2017-02-01");
          return [
            {
              id: idGenerator(),
              group: g_computer_science.id,
              content: `
                <img src="https://i.gyazo.com/8b6a4fab26838eb2f0083185fe24c63e.png" alt="Image from Gyazo"/>
                <a href="https://amzn.asia/d/ftZAB4m" target="_blank">『CPUの創りかた』</a>
                <img src="https://skillicons.dev/icons?i=c" />
              `,
              start: startMoment.toDate(),
              type: "box",
              className: boxColorClassAllocator(),
            }
          ]
        }
      )()
    );
    items.add(
      (
        () => {
          const startMoment = moment("2017-02-01");
          const endMoment = moment("2017-02-28");
          return [
            {
              id: idGenerator(),
              group: g_computer_science.id,
              content: `
                <img src="https://i.gyazo.com/569bc353b659d67427843d0bf01bb6c3.png" alt="Image from Gyazo"/>
                <a href="https://book.impress.co.jp/books/1119101009" target="_blank">『1週間でLPICの基礎が学べる本 第2版』</a>
                <img src="https://skillicons.dev/icons?i=linux" />
              `,
              start: startMoment.toDate(),
              end: endMoment.toDate(),
              type: "box",
              className: boxColorClassAllocator(),
            }
          ]
        }
      )()
    );
    items.add(
      (
        () => {
          const startMoment = moment("2017-03-01");
          const endMoment = moment("2017-08-31");
          return [
            {
              id: idGenerator(),
              group: g_computer_science.id,
              content: `
                <img src="https://i.gyazo.com/1689dba5e06a5d18e2a43b0be7cf564c.png" alt="Image from Gyazo"/>
                <a href="https://www.amazon.co.jp/dp/4797380942" target="_blank">『新しいLinuxの教科書』</a>
                <img src="https://skillicons.dev/icons?i=linux" />
              `,
              start: startMoment.toDate(),
              end: endMoment.toDate(),
              type: "box",
              className: boxColorClassAllocator(),
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
                <a href="https://book.impress.co.jp/books/1115101122" target="_blank">『Python機械学習プログラミング』 達人データサイエンティストによる理論と実践</a>
                <img src="https://skillicons.dev/icons?i=sklearn,python" />
              `,
              start: startMoment.toDate(),
              end: endMoment.toDate(),
              type: "box",
              className: boxColorClassAllocator(),
            }
          ]
        }
      )()
    );
    items.add(
      (
        () => {
          const startMoment = moment("2017-07-01");
          return [
            {
              id: idGenerator(),
              group: g_data_science.id,
              content: `
                <img src="https://i.gyazo.com/586ffd0645d9e387f1da52f15ef5c5f3.png" alt="Image from Gyazo" />
                <a href="https://booklog.jp/item/1/4061529021" target="_blank">『深層学習 (機械学習プロフェッショナルシリーズ)』</a>
              `,
              start: startMoment.toDate(),
              type: "box",
              className: boxColorClassAllocator(),
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
                <a href="https://scrapbox.io/pollenJP-Portfolio/『30日でできる！OS自作入門』を_Ubuntu16.04%2FNASM_で実装してみた記事" target="_blank">『30日でできる！OS自作入門』</a>
                <img src="https://skillicons.dev/icons?i=c" />
              `,
              start: startMoment.toDate(),
              end: endMoment.toDate(),
              type: "box",
              className: boxColorClassAllocator(),
            }
          ]
        }
      )()
    );
    items.add(
      (
        () => {
          const startMoment = moment("2018-09-01");
          const endMoment = moment("2018-10-31");
          return [
            {
              id: idGenerator(),
              group: g_data_science.id,
              content: `
                <img src="https://i.gyazo.com/fbf7c8fc4c6b912d69af342e922732e2.png" alt="Image from Gyazo"/>
                <a href="https://book.impress.co.jp/books/1116101172" target="_blank">『TensorFlow機械学習クックブック』Pythonベースの活用レシピ60+</a>
                <img src="https://skillicons.dev/icons?i=tensorflow,sklearn,python" />
              `,
              start: startMoment.toDate(),
              end: endMoment.toDate(),
              type: "box",
              className: boxColorClassAllocator(),
            }
          ]
        }
      )()
    );
    items.add(
      (
        () => {
          const startMoment = moment("2021-04-01");
          const endMoment = moment("2022-01-31");
          return [
            {
              id: idGenerator(),
              group: g_computer_science.id,
              content: `
                <img src="https://i.gyazo.com/bea028e6ad037240df848e1e4cbc7c4e.png" alt="Image from Gyazo"/>
                <a href="https://book.mynavi.jp/ec/products/detail/id=121220" target="_blank">『つくりながら学ぶ!PyTorchによる発展ディープラーニング』</a>
                <img src="https://skillicons.dev/icons?i=pytorch,python" />
              `,
              start: startMoment.toDate(),
              end: endMoment.toDate(),
              type: "box",
              className: boxColorClassAllocator(),
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
                <a href="https://book.mynavi.jp/ec/products/detail/id=121220" target="_blank">『ゼロからのOS自作入門』 (みかん本 MikanOS本)</a>
                <img src="https://skillicons.dev/icons?i=c,cpp" />
              `,
              start: startMoment.toDate(),
              end: endMoment.toDate(),
              type: "box",
              className: boxColorClassAllocator(),
            }
          ]
        }
      )()
    );
    items.add(
      (
        () => {
          const startMoment = moment("2021-06-15");
          const endMoment = moment("2022-06-31");
          return [
            {
              id: idGenerator(),
              group: g_computer_science.id,
              content: `
                <img src="https://i.gyazo.com/d9c4062188b9478ea26ce3577beee1b8.png" alt="Image from Gyazo"/>
                <a href="https://contendo.jp/store/ric_t/Product/Detail/Code/J0010400BK0090738001/" target="_blank">『15Stepで習得 Dockerから入るKubernetes』</a>
                <img src="https://skillicons.dev/icons?i=kubernetes,docker" />
              `,
              start: startMoment.toDate(),
              end: endMoment.toDate(),
              type: "box",
              className: boxColorClassAllocator(),
            }
          ]
        }
      )()
    );
    items.add(
      (
        () => {
          const startMoment = moment("2023-02-01");
          const endMoment = moment("2023-02-28");
          return [
            {
              id: idGenerator(),
              group: g_computer_science.id,
              content: `
                <img src="https://i.gyazo.com/f4153c4d1b8ff71bd3cf7c21bb774198.png" alt="Image from Gyazo"/>
                <a href="https://book.mynavi.jp/manatee/c-r/books/detail/id=131170" target="_blank">『詳解Go言語Webアプリケーション開発』</a>
                <img src="https://skillicons.dev/icons?i=go" />
              `,
              start: startMoment.toDate(),
              end: endMoment.toDate(),
              type: "box",
              className: boxColorClassAllocator(),
            }
          ]
        }
      )()
    );
    items.add(
      (
        () => {
          const startMoment = moment("2023-03-01");
          const endMoment = moment("2023-03-31");
          return [
            {
              id: idGenerator(),
              group: g_computer_science.id,
              content: `
                <img src="https://i.gyazo.com/d360cfcef09e02dbfc46685eff45deac.png" alt="Image from Gyazo"/>
                <a href="https://www.shuwasystem.co.jp/book/9784798067315.html" target="_blank">『Webアプリ開発で学ぶ Rust言語入門』</a>
                <img src="https://skillicons.dev/icons?i=rust" />
              `,
              start: startMoment.toDate(),
              end: endMoment.toDate(),
              type: "box",
              className: boxColorClassAllocator(),
            }
          ]
        }
      )()
    );
    items.add(
      (
        () => {
          const startMoment = moment("2025-07-01");
          const endMoment = moment("2025-08-31");
          return [
            {
              id: idGenerator(),
              group: g_computer_science.id,
              content: `
                <img src="https://i.gyazo.com/5fd026987d8fe03c3e93fd60d889897d.png" alt="Image from Gyazo"/>
                <a href="https://gihyo.jp/dp/ebook/2025/978-4-297-14900-0" target="_blank">『Docker&Kubernetesネットワークのしくみ』</a>
                <img src="https://skillicons.dev/icons?i=kubernetes,docker" />
              `,
              start: startMoment.toDate(),
              end: endMoment.toDate(),
              type: "box",
              className: boxColorClassAllocator(),
            }
          ]
        }
      )()
    );
  }

  /**
   * timeline options
   */

  const options: TimelineOptions = (() => {
    const endMoment = moment().add(2, "year");
    const startMoment = endMoment.clone().subtract(12, "year");
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
      clickToUse: true,
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

  const move = (timeline: Timeline, percentage: number) => {
    const range = timeline.getWindow();
    const interval = range.end.getTime() - range.start.getTime();

    timeline.setWindow(
      new Date(range.start.getTime() - interval * percentage),
      new Date(range.end.getTime() - interval * percentage),
    );
  }


  const zoomIn = () => {
    if (timelineRef.current === null) {
      console.log("timelineRef.current is null");
      return;
    }
    timelineRef.current.zoomIn(0.2);
    console.log("zoomIn");
  }

  const zoomOut = () => {
    if (timelineRef.current === null) {
      console.log("timelineRef.current is null");
      return;
    }
    timelineRef.current.zoomOut(0.2);
    console.log("zoomOut");
  }

  const moveLeft   = () => {
    if (timelineRef.current === null) {
      console.log("timelineRef.current is null");
      return;
    }
    move(timelineRef.current, 0.2);
    console.log("moveLeft");
  }

  const moveRight = () => {
    if (timelineRef.current === null) {
      console.log("timelineRef.current is null");
      return;
    }
    move(timelineRef.current, -0.2);
    console.log("moveRight");
  }

  return <div>
    <div>
      <button onClick={zoomIn}>zoomIn</button>
      <button onClick={zoomOut}>zoomOut</button>
      <button onClick={moveLeft}>moveLeft</button>
      <button onClick={moveRight}>moveRight</button>
    </div>
    <div
      ref={containerRef}
      style={{
        boxSizing: "border-box",
        width: "100%",
        border: "1px solid lightgray",
      }}
    >
    </div>;
  </div>;
};

export default VisTimeline;
